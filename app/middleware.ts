
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/' || 
    path === '/doctor/signin' || 
    path === '/doctor/signup' || 
    path === '/doctor/forgot-password' ||
    path === '/patient/signin' || 
    path === '/patient/signup' || 
    path === '/patient/forgot-password';

  // Get stored auth tokens from cookies
  const doctorAuth = request.cookies.get('doctorAuth')?.value;
  const patientAuth = request.cookies.get('patientAuth')?.value;

  // Handle doctor routes
  if (path.startsWith('/doctor') && !isPublicPath && !doctorAuth) {
    return NextResponse.redirect(new URL('/doctor/signin', request.url));
  }

  // Handle patient routes
  if (path.startsWith('/patient') && !isPublicPath && !patientAuth) {
    return NextResponse.redirect(new URL('/patient/signin', request.url));
  }

  // Redirect authenticated users away from login pages
  if ((path === '/doctor/signin' || path === '/doctor/signup') && doctorAuth) {
    return NextResponse.redirect(new URL('/doctor/dashboard', request.url));
  }

  if ((path === '/patient/signin' || path === '/patient/signup') && patientAuth) {
    return NextResponse.redirect(new URL('/patient/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure paths that should be matched by the middleware
export const config = {
  matcher: [
    '/',
    '/doctor/:path*',
    '/patient/:path*',
  ],
};
