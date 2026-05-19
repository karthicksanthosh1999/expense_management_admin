import { asyncHandler } from "@/lib/async-handler";
import { AppError } from "@/lib/errors";
import { sendOTPEmail } from "@/lib/mail";
import { generateOTP } from "@/lib/otp";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async(req: NextRequest) => {
    const body = await req.json()
    const { email } = body; 
    console.log(email)
    if(!email){
        throw new AppError("Email id is required", 400)
    };

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 + 60 + 1000);

    await prisma.oTPVerification.create({
        data: {
            email, 
            otp, 
            expiresAt
        }
    });
    console.log(email, otp)
    await sendOTPEmail(email, otp);

    return NextResponse.json(
        {
            message : "OTP send successfully",
            success: true,
            statusCode : 200
        }
    )

})
