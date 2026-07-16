import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const PAGE_SIZE = searchParams.get("size");

    const leads = await prisma.user.findMany({
      where: {userType: "CLIENT"},
      orderBy: { createdAt: "desc" },
      take: Number(PAGE_SIZE),
    })
    const total = leads.length
  return NextResponse.json({leads, total}, {status: 200})
}