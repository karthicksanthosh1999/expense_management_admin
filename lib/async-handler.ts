import { NextResponse } from "next/server";

export const asyncHandler =
  (fn: Function) =>
  async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error: any) {
      console.error("API Error:", error);

      return NextResponse.json(
        {
          message: error.message || "Internal Server Error",
          statusCode: error.statusCode || 500,
        },
        {
          status: error.statusCode || 500,
        },
      );
    }
  };
