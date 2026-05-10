import { NextResponse } from "next/server";

export const asyncHandler =
  (fn: any) =>
  async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("API Error:", error);
      return NextResponse.json(
        {
          message: "Something went wrong",
          status: false,
          statusCode: 500,
        },
        { status: 500 },
      );
    }
  };
