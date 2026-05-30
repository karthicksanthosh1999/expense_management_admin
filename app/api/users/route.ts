import { asyncHandler } from "@/lib/async-handler";
import { prisma } from "@/lib/prisma";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async() =>{
    const user = await prisma.user.findMany();
    return NextResponse.json({ message : "User fetch successfully", success : true, data: user})
})

export const DELETE = asyncHandler(async(req:NextRequest)=>{
    const {id} = await req.json();
    
    if(!id){
        throw new ApiError(400, "Id is required")
    }

    const deletedUser = await prisma.user.delete({ where : { id }});
    return NextResponse.json({ message : "User delete successfully", success : true, data: deletedUser})
})