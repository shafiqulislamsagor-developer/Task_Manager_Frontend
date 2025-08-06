// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname);

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!login|register|_next/static|favicon.ico|logo.png|api).*)"],
};
