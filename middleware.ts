import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized, unauthorizedResponse } from "@/lib/basic-auth";

export function middleware(req: NextRequest) {
  if (!isAuthorized(req)) {
    return unauthorizedResponse();
  }
  return NextResponse.next();
}

// If you already have a middleware.ts, merge this matcher + check into it
// instead of having two files — Next.js only runs one middleware.ts per project.
export const config = {
  matcher: ["/admin/:path*"],
};