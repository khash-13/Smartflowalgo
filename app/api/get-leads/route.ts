import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || "1");
    const skip = (page - 1) * PAGE_SIZE;

    const [leads, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          userType: "CLIENT",
        },
        orderBy: {
          srn: "asc",
        },
        skip,
        take: PAGE_SIZE,
      }),
      prisma.user.count({
        where: {
          userType: "CLIENT",
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: leads,
      pagination: {
        page,
        pageSize: PAGE_SIZE,
        total,
        totalPages: Math.ceil(total / PAGE_SIZE),
      },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch leads",
      },
      { status: 500 }
    );
  }
}