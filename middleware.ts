import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }, pages: {
            signIn: "/"
        }
    }
)

export const config = {
    matcher: ["/dashboard/:path*"]
}