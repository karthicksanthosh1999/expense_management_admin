import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { hashToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  const hashedRefresh = await hashToken(refreshToken);

  await prisma.token.create({
    data: {
      userId: user.id,
      refreshToken: hashedRefresh,
      accessToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const response = NextResponse.json({
    message: "Login successful",
    user,
    statusCode: 200,
    success: true,
  });

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15, // 15 min
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return response;
}
