import { asyncHandler } from "@/lib/async-handler";
import { AppError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET SETTINGS
export const GET = asyncHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") as string;

  const settings = await prisma.settings.findUnique({
    where: { userId },
  });
  if (!settings) {
    throw new AppError("Settings not found", 404);
  }

  return NextResponse.json({
    message: "Settings retrieved successfully",
    data: settings,
    statusCode: 200,
  });
});

// UPDATE SETTINGS
export const PUT = asyncHandler(async (req: Request) => {
  const { userId, currency, enable_monthly_transaction_report } =
    await req.json();

  const settings = await prisma.settings.upsert({
    where: { userId },

    update: {
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
    message: "Settings saved successfully",
    data: settings,
    statusCode: 200,
  });
});
