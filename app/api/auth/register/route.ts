import { asyncHandler } from "@/lib/async-handler";
import { AppError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { userValidationSchema } from "@/validation_schema/user-validation";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req: Request) => {

    const body = await req.json();
    const { email, mobile, name, password } = userValidationSchema.parse(body);

    if (!password) {
        throw new AppError("Password is required", 400);
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ email }, { mobile }]
        }
    })

    if (existingUser) {
        throw new AppError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            mobile,
            name,
        },
    });

    return NextResponse.json({
        message: "User created successfully",
        user,
    });
});
