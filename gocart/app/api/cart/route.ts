import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ authenticated: false, items: [] });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: session.userId },
      include: {
        product: {
          include: {
            brand: true,
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const items = cartItems.map((ci) => ({
      id: `${ci.productId}-std`,
      product: {
        id: ci.product.id,
        slug: ci.product.slug,
        name: ci.product.name,
        brand: ci.product.brand?.name || 'Vellora',
        shortDescription: ci.product.description.slice(0, 120),
        longDescription: ci.product.description,
        specifications: {},
        images: ci.product.images || [],
        mrp: ci.product.mrp,
        price: ci.product.price,
        discountPercent: Math.round(((ci.product.mrp - ci.product.price) / ci.product.mrp) * 100),
        ratingAvg: ci.product.ratingAvg || 4.5,
        ratingCount: ci.product.ratingCount || 10,
        stockQuantity: ci.product.stockCount || 50,
        category: ci.product.category?.name || 'General',
        subCategory: '',
        tags: [],
        createdAt: ci.product.createdAt.toISOString(),
        popularityScore: 80,
        gstRate: 18,
      },
      quantity: ci.quantity,
      selectedVariant: undefined,
    }));

    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    console.error('Fetch cart error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { items } = body; // Array of { productId, quantity }

    if (Array.isArray(items)) {
      for (const item of items) {
        if (!item.productId) continue;
        const product = await prisma.product.findFirst({
          where: { OR: [{ id: item.productId }, { slug: item.productId }] },
        });

        if (product) {
          await prisma.cartItem.upsert({
            where: {
              userId_productId: {
                userId: session.userId,
                productId: product.id,
              },
            },
            update: {
              quantity: { increment: item.quantity || 1 },
            },
            create: {
              userId: session.userId,
              productId: product.id,
              quantity: item.quantity || 1,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Cart synced to database' });
  } catch (error: any) {
    console.error('Cart sync error:', error);
    return NextResponse.json({ error: error.message || 'Failed to sync cart' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.cartItem.deleteMany({
      where: { userId: session.userId },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to clear cart' }, { status: 500 });
  }
}
