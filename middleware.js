import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('vendedor_token');
  if (!token) {
    return NextResponse.redirect(new URL('/vendedor/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/vendedor/dashboard/:path*', '/vendedor/productos/:path*', '/vendedor/pedidos/:path*']
};
