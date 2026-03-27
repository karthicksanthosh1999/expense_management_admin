import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = cookies();

    const token = (await cookieStore).get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    return NextResponse.json({
      message: "Success",
      user: decoded,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
