import { refreshAccessToken } from "@/apis/auth";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login"];
export async function middleware(request: NextRequest) {
  const isAuthRoute = authRoutes.some((route) => {
    return request.nextUrl.pathname.startsWith(route);
  });

  if (isAuthRoute) return NextResponse.next();

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!accessToken && refreshToken) {
    try {
      const { accessToken: newAccess, refreshToken: newRefresh } =
        await refreshAccessToken(refreshToken);
      console.log(newAccess, newRefresh);
      const response = NextResponse.next();
      response.cookies.set("accessToken", newAccess, {
        httpOnly: true,
        path: "/",
      });
      response.cookies.set("refreshToken", newRefresh, {
        httpOnly: true,
        path: "/",
      });

      return response;
    } catch (err) {
      console.log(err);
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
