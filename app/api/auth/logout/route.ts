import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = await req.json();

    await prisma.token.deleteMany({
        where: { userId },
    });

    return NextResponse.json({ message: "Logged out" });
}
