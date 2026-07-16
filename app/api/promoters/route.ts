import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

const createInfluencerSchema = z.object({
  name: z.string().trim().min(2, "Enter a valid name"),
  mobile: z.string().trim().min(7, "Enter a valid mobile number"),
  email: z.string().trim().email("Enter a valid email"),
  tradingViewId: z.string().trim().optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize")) || 10));

  const [promoters, total] = await Promise.all([
    prisma.user.findMany({
      where: { userType: "INFULENCER" },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        _count: { select: { referrals: true } },
      },
    }),
    prisma.user.count({ where: { userType: "INFULENCER" } }),
  ]);

  return NextResponse.json({
    data: promoters.map(({ _count, ...promoter }) => ({
      ...promoter,
      createdAt: promoter.createdAt.toISOString(),
      updatedAt: promoter.updatedAt.toISOString(),
      referralCount: _count.referrals,
    })),
    total,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = createInfluencerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  try {
    const influencer = await prisma.user.create({
      data: {
        name: parsed.data.name,
        mobile: parsed.data.mobile,
        email: parsed.data.email,
        tradingViewId: parsed.data.tradingViewId || undefined,
        userType: "INFULENCER",
      },
    });

    return NextResponse.json(
      {
        data: {
          ...influencer,
          createdAt: influencer.createdAt.toISOString(),
          updatedAt: influencer.updatedAt.toISOString(),
          referralCount: 0,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      const target = err.meta?.target as string[] | undefined;
      const field = target?.[0] ?? "field";
      return NextResponse.json(
        { error: `A user with this ${field} already exists.` },
        { status: 409 }
      );
    }

    console.error("Failed to create influencer:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}