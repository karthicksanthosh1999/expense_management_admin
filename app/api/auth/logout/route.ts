import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.delete("accessToken")

  await prisma.token.deleteMany({
    where: { userId },
  });

  return response;
}
