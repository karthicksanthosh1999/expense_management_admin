import { asyncHandler } from "@/lib/async-handler";
import { AppError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

    if(new Date() > existingOTP.expiresAt){
        throw new AppError("OTP Expired", 400)
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

    return NextResponse.json(
        {
            message : "OTP Verified Successfully",
            success : true,
            statusCode : 200
        }
    )

})