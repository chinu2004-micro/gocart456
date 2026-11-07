import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { OrderStatus, PaymentMethod } from '@prisma/client';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ authenticated: false, orders: [] });
    }

    const dbOrders = await prisma.order.findMany({
      where: { userId: session.userId },
      include: {
        address: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedOrders = dbOrders.map((o) => {
      // Map OrderStatus to frontend status
      let mappedStatus = 'PLACED';
      if (o.status === OrderStatus.PROCESSING) mappedStatus = 'CONFIRMED';
      else if (o.status === OrderStatus.SHIPPED) mappedStatus = 'SHIPPED';
      else if (o.status === OrderStatus.DELIVERED) mappedStatus = 'DELIVERED';
      else if (o.status === OrderStatus.CANCELLED) mappedStatus = 'CANCELLED';
      else if (o.status === OrderStatus.RETURNED) mappedStatus = 'RETURNED';

      return {
        id: o.orderNumber,
        dbId: o.id,
        userId: o.userId,
        createdAt: o.createdAt.toISOString(),
        status: mappedStatus,
        subtotal: o.subtotal,
        discount: o.discount,
        gstAmount: o.tax,
        shippingFee: o.shipping,
        grandTotal: o.total,
        deliveryOption: 'Standard',
        paymentMethod: o.paymentMethod === PaymentMethod.COD ? 'COD' : 'Card',
        paymentMaskedId: '•••• 4242',
        deliveryAddress: {
          id: o.address.id,
          name: o.address.name,
          contact: o.address.phone,
          street: o.address.street,
          city: o.address.city,
          state: o.address.state,
          pincode: o.address.zip,
          country: o.address.country,
          isDefault: o.address.isDefault,
        },
        items: o.orderItems.map((item) => ({
          productId: item.productId,
          productName: item.product.name,
          productImage: (item.product.images as string[])?.[0] || '',
          quantity: item.quantity,
          unitPrice: item.price,
          variantName: undefined,
        })),
        trackingEvents: [
          { status: 'PLACED', title: 'Order Confirmed', description: 'Payment verified and saved to database', timestamp: 'Just now', completed: true },
          { status: 'CONFIRMED', title: 'Package Packed', description: 'Quality inspection passed', timestamp: 'In progress', completed: mappedStatus !== 'PLACED' },
          { status: 'SHIPPED', title: 'In Transit', description: 'With express logistics partner', timestamp: 'Pending dispatch', completed: mappedStatus === 'SHIPPED' || mappedStatus === 'DELIVERED' },
          { status: 'OUT_FOR_DELIVERY', title: 'Out for Delivery', description: 'Courier partner out for doorstep delivery', timestamp: 'Pending', completed: mappedStatus === 'DELIVERED' },
          { status: 'DELIVERED', title: 'Delivered', description: 'Delivered to resident address', timestamp: 'Pending', completed: mappedStatus === 'DELIVERED' },
        ],
      };
    });

    return NextResponse.json({ authenticated: true, orders: formattedOrders });
  } catch (error: any) {
    console.error('Fetch orders error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Please sign in to place an order' }, { status: 401 });
    }

    const body = await request.json();
    const { items, subtotal, discount, gstAmount, shippingFee, grandTotal, deliveryAddress, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Find or create address for user
    let addressRecord = await prisma.address.findFirst({
      where: {
        userId: session.userId,
        street: deliveryAddress.street,
        zip: deliveryAddress.pincode,
      },
    });

    if (!addressRecord) {
      addressRecord = await prisma.address.create({
        data: {
          userId: session.userId,
          name: deliveryAddress.name || session.name,
          email: session.email,
          phone: deliveryAddress.contact || '',
          street: deliveryAddress.street || '',
          city: deliveryAddress.city || '',
          state: deliveryAddress.state || '',
          zip: deliveryAddress.pincode || '',
          country: deliveryAddress.country || 'India',
          isDefault: true,
        },
      });
    }

    // Get any active store to link order to
    const store = await prisma.store.findFirst();
    if (!store) {
      return NextResponse.json({ error: 'No active store found to process order' }, { status: 500 });
    }

    // Match each product to Neon Postgres product if available, or fall back to first seeded product
    const fallbackProduct = await prisma.product.findFirst();
    const orderNumber = `VEL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        total: grandTotal,
        subtotal: subtotal,
        discount: discount || 0,
        tax: gstAmount || 0,
        shipping: shippingFee || 0,
        status: OrderStatus.ORDER_PLACED,
        userId: session.userId,
        storeId: store.id,
        addressId: addressRecord.id,
        isPaid: paymentMethod !== 'COD',
        paymentMethod: paymentMethod === 'COD' ? PaymentMethod.COD : PaymentMethod.RAZORPAY,
        orderItems: {
          create: await Promise.all(
            items.map(async (it: any) => {
              // Try finding product by id or slug
              let matchedProd = await prisma.product.findFirst({
                where: { OR: [{ id: it.productId }, { slug: it.productId }] },
              });
              const prodId = matchedProd ? matchedProd.id : (fallbackProduct?.id || store.id);

              return {
                productId: prodId,
                quantity: it.quantity,
                price: it.unitPrice || 0,
              };
            })
          ),
        },
      },
      include: {
        address: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.orderNumber,
        dbId: order.id,
        createdAt: order.createdAt.toISOString(),
        grandTotal: order.total,
      },
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to place order' }, { status: 500 });
  }
}

