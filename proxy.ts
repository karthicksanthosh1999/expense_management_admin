import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const publicRoots = ["/login", "/register"];
const protectedRoot = ["/dashboard", "/settings"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoot.includes(path);
  const isPublicRoute = publicRoots.includes(path);

  const token = (await cookies()).get("accessToken")?.value;
  console.log(token);
}
