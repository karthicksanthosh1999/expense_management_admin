import { prisma } from "@/lib/prisma";
import {
    generateAccessToken,
    verifyRefreshToken,
} from "@/lib/jwt";
import { compareToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { refreshToken } = await req.json();

    const decoded: any = verifyRefreshToken(refreshToken);

    const tokens = await prisma.token.findMany({
        where: { userId: decoded.userId },
    });

    for (const t of tokens) {
        const match = await compareToken(refreshToken, t.refreshToken);
        if (match) {
            const newAccessToken = generateAccessToken(decoded.userId);
            return NextResponse.json({ accessToken: newAccessToken });
        }
    }

    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
}
