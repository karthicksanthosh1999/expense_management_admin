import { asyncHandler } from "@/lib/async-handler";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


// GET SETTINGS
export const GET = asyncHandler(async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") as string;

  const settings = await prisma.settings.findUnique(
    {
        where: {
            id
        }
    }
  );
  return NextResponse.json({
    message: "Settings retrieved successfully",
    data: settings,
    statusCode: 200,
  });
});

// UPDATE SETTINGS
export const PUT = asyncHandler(async (req: Request) => {
  const {
    userId,
    currency,
    id,
    enable_monthly_transaction_report,
  } = await req.json();

  const settings = await prisma.settings.upsert({
    where: {
      id,
    },
    update: {
      userId,
      currency,
      enable_monthly_transaction_report,
    },

    create: {
      userId,
      currency,
      enable_monthly_transaction_report,
    },
  });

  return NextResponse.json({
    message: "Settings updated successfully",
    data: settings,
    statusCode: 200,
  });
});