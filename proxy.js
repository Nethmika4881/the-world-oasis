import { auth } from "./app/_lib/auth";

export const proxy = auth;
export const config = {
  matcher: ["/account/:path*"],
};

// matcher: ["/account/:path*"] means: "Only run this middleware on the /account/:path* route"
// The authorized callback only runs for /account, not other routes
// Other routes like /, /cabins, etc. are not protected and remain public
