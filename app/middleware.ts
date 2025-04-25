
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
  const doctorEmail = request.cookies.get('doctorEmail')?.value;
  const patientEmail = request.cookies.get('patientEmail')?.value;

  // Handle doctor routes
  if (path.startsWith('/doctor') && !isPublicPath) {
    // Check if doctor is authenticated
    if (!doctorAuth) {
      return NextResponse.redirect(new URL('/doctor/signin', request.url));
    }
    
    // Additional validation can be added here (like checking email format, token expiration, etc.)
    if (doctorAuth && !doctorEmail) {
      // Clear invalid session
      const response = NextResponse.redirect(new URL('/doctor/signin', request.url));
      response.cookies.delete('doctorAuth');
      return response;
    }
  }

  // Handle patient routes
  if (path.startsWith('/patient') && !isPublicPath) {
    // Check if patient is authenticated
    if (!patientAuth) {
      return NextResponse.redirect(new URL('/patient/signin', request.url));
    }
    
    // Additional validation
    if (patientAuth && !patientEmail) {
      // Clear invalid session
      const response = NextResponse.redirect(new URL('/patient/signin', request.url));
      response.cookies.delete('patientAuth');
      return response;
    }
  }

  // Redirect authenticated users away from login pages
  if ((path === '/doctor/signin' || path === '/doctor/signup' || path === '/doctor/forgot-password') && doctorAuth) {
    return NextResponse.redirect(new URL('/doctor/dashboard', request.url));
  }

  if ((path === '/patient/signin' || path === '/patient/signup' || path === '/patient/forgot-password') && patientAuth) {
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
