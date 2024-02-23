import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
export function middleware(request: NextRequest) {
    const currentUrl = new URL(request.url)
    const token = request.cookies.get('token')?.value;

    if (token) {
        if (currentUrl.pathname === '/' || currentUrl.pathname === '/signup') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    } else if (currentUrl.pathname !== '/' && currentUrl.pathname !== '/signup') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}