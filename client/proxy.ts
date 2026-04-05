import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isStrictlyPublic = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Protect dashboard routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Redirect ONLY if user is signed in
  if (isStrictlyPublic(req) && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
