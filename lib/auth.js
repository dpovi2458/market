import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'vendedor_token';

export function signToken(payload, opts = {}) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Falta JWT_SECRET');
  return jwt.sign(payload, secret, { expiresIn: '7d', ...opts });
}

export function getSellerFromCookie() {
  try {
    const token = cookies().get(COOKIE_NAME)?.value;
    if (!token) return null;
    const secret = process.env.JWT_SECRET;
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

export function setSellerCookie(token) {
  const store = cookies();
  store.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
}

export function clearSellerCookie() {
  const store = cookies();
  store.delete(COOKIE_NAME);
}
