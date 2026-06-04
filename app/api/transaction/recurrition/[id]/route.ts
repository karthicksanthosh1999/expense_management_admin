import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{id : string}> },
) {
  const body = await req.json();
   const { id } = await params;

  const updated = await prisma.recurringTransaction.update({
    where: { id: id },
    data: {
      isActive: body.isActive,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{id: string}> },
) {
  const {id} = await params;
  const transaction = await prisma.recurringTransaction.delete({
    where: { id },
  });

  return NextResponse.json({
    message : "Recurrition transaction deleted sucessfully",
    success: true,
    statusCode: 200,
    data:transaction

  });
}
