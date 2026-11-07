import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ authenticated: false, addresses: [] });
    }

    const addresses = await prisma.address.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = addresses.map((a) => ({
      id: a.id,
      name: a.name,
      contact: a.phone,
      street: a.street,
      city: a.city,
      state: a.state,
      pincode: a.zip,
      country: a.country,
      isDefault: a.isDefault,
    }));

    return NextResponse.json({ success: true, addresses: formatted });
  } catch (error: any) {
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
    const { name, contact, street, city, state, pincode, country, isDefault } = body;

    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: session.userId },
        data: { isDefault: false },
      });
    }

    const created = await prisma.address.create({
      data: {
        userId: session.userId,
        name: name || session.name,
        email: session.email,
        phone: contact || '',
        street,
        city,
        state,
        zip: pincode,
        country: country || 'India',
        isDefault: !!isDefault,
      },
    });

    return NextResponse.json({
      success: true,
      address: {
        id: created.id,
        name: created.name,
        contact: created.phone,
        street: created.street,
        city: created.city,
        state: created.state,
        pincode: created.zip,
        country: created.country,
        isDefault: created.isDefault,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to save address' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Address ID required' }, { status: 400 });
    }

    await prisma.address.deleteMany({
      where: { id, userId: session.userId },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete address' }, { status: 500 });
  }
}

