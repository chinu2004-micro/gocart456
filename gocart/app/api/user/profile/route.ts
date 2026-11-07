import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, contact } = body;

    const updated = await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...(name ? { name } : {}),
      },
    });

    if (contact) {
      const defaultAddr = await prisma.address.findFirst({
        where: { userId: session.userId, isDefault: true },
      });
      if (defaultAddr) {
        await prisma.address.update({
          where: { id: defaultAddr.id },
          data: { phone: contact },
        });
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        contact: contact || '',
        role: updated.role,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Update failed' }, { status: 500 });
  }
}

