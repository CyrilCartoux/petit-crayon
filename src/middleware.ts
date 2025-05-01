import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { apiLogger } from './middleware/api-logger'

export async function middleware(request: NextRequest) {
  // Appliquer le logger sur les routes API
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return apiLogger(request);
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}