// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  if (!accessToken && !["/login", "/register"].includes(pathname)) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (accessToken && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!_next/static|favicon.ico|logo.png|api).*)", // সব path কভার করবে
  ],
};
