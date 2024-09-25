import { NextResponse } from 'next/server';

export async function middleware(request) {
  const authToken = request.cookies.get('access_token');
  //remove below authToken with valid or invalid boolean response from api
 // http://localhost:8000/refresh_token
 
  if (!authToken) {
    if (request.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/login',
  ],
};
