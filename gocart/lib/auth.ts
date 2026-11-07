import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.AUTH_SECRET || 'gocart_super_secret_jwt_key_at_least_32_chars_long_aura_2026';
const key = new TextEncoder().encode(SECRET_KEY);

export interface AuthSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
  [key: string]: unknown;
}

export async function signToken(payload: AuthSessionPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(key);
}

export async function verifyToken(token: string): Promise<AuthSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload as AuthSessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AuthSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('vellora_token')?.value;
  if (!token) return null;
  return await verifyToken(token);
}

