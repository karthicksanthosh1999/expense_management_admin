import { asyncHandler } from "@/lib/async-handler";
import { AppError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export const POST = asyncHandler(async(req:NextRequest) => {

    const body = await req.json();

    const { email, otp } = body;

    const existingOTP = await prisma.oTPVerification.findFirst({
        where: {
        email,
        otp
        },
        orderBy: {
        createdAt: "desc",
        },
    });
    console.log(email, otp, existingOTP)
    if(!existingOTP){
        throw new AppError("Invalid OTP", 400)
    };

    const currentTime = Date.now();
    const expiryTime = new Date(existingOTP.expiresAt).getTime();

    console.log({
        currentTime,
        expiryTime
    });

    if (currentTime > expiryTime) {
        throw new AppError("OTP Expired", 400);
    }

    await prisma.oTPVerification.update(
        {
            where: {
                id : existingOTP?.id
            },
            data: {
                verified: true
            }
        }
    );

    await prisma.user.update(
        {
            where: {
                email
            },
            data: {
                verifiedEmail: true
            }
        }
    )

    return NextResponse.json(
        {
            message : "OTP Verified Successfully",
            success : true,
            statusCode : 200
        }
    )

});

export const PUT = asyncHandler(async(req:NextRequest) =>{
    const { password, email } = await req.json();

    if(!email && !password){
        throw new AppError("Email is required", 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update(
        {
            where: {
                email
            },
            data: {
                password: hashedPassword
            }
        }
    )

    return NextResponse.json(
        {
            message : "Password updated successfully",
            statusCode : 200,
            success : true,
            data: updatedUser
        }
    )

})