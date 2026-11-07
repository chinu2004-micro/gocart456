import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '40', 10);

    const where: any = {
      isActive: true,
    };

    if (category) {
      where.category = {
        name: { equals: category, mode: 'insensitive' },
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        brand: true,
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to query products' },
      { status: 500 }
    );
  }
}

