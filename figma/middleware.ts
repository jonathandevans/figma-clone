import { auth } from "@/lib/auth";

const authRoutes = ["/sign-in", "/sign-up"];
const privateRoutes = ["/dashboard", "/dashboard/:path*"];

export default auth((req) => {
  const isAuthenticated = !!req.auth;

  if (!isAuthenticated && privateRoutes.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  if (isAuthenticated && authRoutes.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/sign-in", "/sign-up", "/dashboard", "/dashboard/:path*"],
};
