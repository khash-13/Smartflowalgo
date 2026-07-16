import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({data: "no Ref"}, {status: 400})
  }

  const check = await prisma.user.findFirst({
    where: {id},
    select: {discount: true, name: true}
  })

  if (!check) {
    return NextResponse.json({data: "Invalid Code Provided"}, {status: 400})
  }
  if (check) {
    return NextResponse.json({data: check}, {status: 200})
  }
}