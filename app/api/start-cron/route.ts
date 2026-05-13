import { NextResponse } from "next/server";
import { startRecurringTransactionCron } from "@/lib/cron";

startRecurringTransactionCron();

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Cron started",
  });
}