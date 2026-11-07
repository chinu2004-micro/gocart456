import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { loginSchema } from '@/schemas/velloraSchemas';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseRes = loginSchema.safeParse(body);

    if (!parseRes.success) {
      return NextResponse.json(
        { error: 'Please provide valid credentials' },
        { status: 400 }
      );
    }

    const { identifier, password } = parseRes.data;

    // Find by email or fallback to demo account
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: identifier, mode: 'insensitive' } },
          { name: { equals: identifier, mode: 'insensitive' } },
          // Allow demo quick login for alex_vellora -> buyer@example.com
          ...(identifier.toLowerCase().includes('alex') ? [{ email: 'buyer@example.com' }] : []),
        ],
      },
      include: {
        addresses: true,
      },
    });

    console.log('Login attempt for identifier:', identifier);
    console.log('Found user:', user ? { id: user.id, email: user.email, hasHash: !!user.passwordHash } : null);

    if (!user || !user.passwordHash) {
      console.log('User not found or no password hash');
      return NextResponse.json(
        { error: 'Invalid email/username or password' },
        { status: 401 }
      );
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    console.log('Password match result:', passwordMatch);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid email/username or password' },
        { status: 401 }
      );
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        contact: user.addresses[0]?.phone || '',
        role: user.role,
        addresses: user.addresses,
      },
    });

    response.cookies.set('vellora_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

