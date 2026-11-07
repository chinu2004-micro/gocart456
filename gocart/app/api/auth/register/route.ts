import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { registrationSchema } from '@/schemas/velloraSchemas';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseRes = registrationSchema.safeParse(body);

    if (!parseRes.success) {
      return NextResponse.json(
        { error: 'Invalid registration details', issues: parseRes.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password, contact, street, city, state, pincode } = parseRes.data;

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists.' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create User & Default Address in Neon Postgres via Prisma
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'BUYER',
        addresses: {
          create: {
            name,
            email,
            phone: contact,
            street,
            city,
            state,
            zip: pincode,
            country: 'India',
            isDefault: true,
          },
        },
      },
      include: {
        addresses: true,
      },
    });

    // Sign session token
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
        contact,
        role: user.role,
        addresses: user.addresses,
      },
    });

    // Set secure HTTP-only session cookie
    response.cookies.set('vellora_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

