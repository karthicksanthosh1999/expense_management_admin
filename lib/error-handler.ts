import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AppError } from "./errors";

export function handleError(error: any) {
    console.error("🔥 ERROR:", error);

    // ✅ Zod validation error
    if (error instanceof ZodError) {
        return NextResponse.json(
            {
                success: false,
                error: error.errors,
            },
            { status: 400 }
        );
    }

    // ✅ Custom AppError
    if (error instanceof AppError) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: error.statusCode }
        );
    }

    // ✅ Prisma errors (basic handling)
    if (error.code === "P2002") {
        return NextResponse.json(
            {
                success: false,
                message: "Duplicate field value",
            },
            { status: 400 }
        );
    }

    // ❌ Unknown error
    return NextResponse.json(
        {
            success: false,
            message: "Internal Server Error",
        },
        { status: 500 }
    );
}
