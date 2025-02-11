import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose"
import { Admin, handleIsAdmin } from "./sanity/services/admin";

const sk = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || ""

export async function middleware(request: NextRequest) {
    if(request.nextUrl.pathname.startsWith("/admin")){
        const cookiesStore = await cookies(); 

        const token =  cookiesStore.get("admin_token")?.value || ""
        if(!token) return NextResponse.redirect(new URL("/login", request.url))
            const encodedSecret = new TextEncoder().encode(sk)
            const { payload: credentials } = await jose.jwtVerify(token, encodedSecret)
            const admin = credentials as Admin

            const isAdmin = await handleIsAdmin(admin)
            if(isAdmin) {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(new URL("/login", request.url))
            }
    }
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }