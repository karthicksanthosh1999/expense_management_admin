import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const oldImage = formData.get("oldImage") as string;
    const id = formData.get("id") as string;
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "Image is required",
        },
        { status: 400 }
      );
    }

    // VALIDATE IMAGE
    if (!file.type.startsWith("image")) {
      return NextResponse.json(
        {
          success: false,
          message: "Only images allowed",
        },
        { status: 400 }
      );
    }

    // DELETE OLD IMAGE
    if (oldImage) {
      const oldImagePath = path.join(
        process.cwd(),
        "public",
        oldImage
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // CREATE UNIQUE FILE NAME
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName =
      Date.now() + "-" + file.name.replaceAll(" ", "_");

    const uploadDir = path.join(
      process.cwd(),
      "public/uploads"
    );

    // CREATE FOLDER
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    const filePath = path.join(uploadDir, fileName);

    // SAVE FILE
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    await prisma.user.update(
      {
        where: {
          id
        },
        data: {
          profileImage: imageUrl
        }
      }
    )

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("profileImage")
    const id = searchParams.get("id")
    if (!imageUrl) {
      throw new AppError("Image url is required", 400)
    }
    if (!id) {
      throw new AppError("Id is required", 400)
    }

    const imagePath = path.join(
      process.cwd(),
      "public",
      imageUrl
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    const user = await prisma.user.update(
      {
        where: {
          id
        },
        data: {
          profileImage:null
        }
      }
    )

    return NextResponse.json({
      success: true,
      message: "Image removed",
      data:user
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Delete failed",
      },
      { status: 500 }
    );
  }
}

export async function GET(req:NextRequest) {
  const {searchParams} = new URL(req.url);
  const id = searchParams.get('id');

  if(!id){
    throw new AppError("Id is required", 200)
  }

  const user = await prisma.user.findUnique(
    {
      where: {
        id
      }
    }
  );
return NextResponse.json(
  {
    message : "Profile image get successfully",
    success: true,
    statusCode : 200,
    data: user
  }
)
}