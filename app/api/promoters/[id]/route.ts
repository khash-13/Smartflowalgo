import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

const updateInfluencerSchema = z
  .object({
    name: z.string().trim().min(2, "Enter a valid name"),
    mobile: z.string().trim().min(7, "Enter a valid mobile number"),
    email: z.string().trim().email("Enter a valid email"),
    tradingViewId: z.string().trim().nullable(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "No fields to update",
  });

async function findPromoter(id: string) {
  const promoter = await prisma.user.findUnique({
    where: { id },
    include: {
        referrals: {
            include: {
                user: true
            }
        }
    },
  });

  if (!promoter || promoter.userType !== "INFULENCER") {
    return null;
  }

  return promoter;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const promoter = await findPromoter(id);

  if (!promoter) {
    return NextResponse.json({ error: "Promoter not found" }, { status: 404 });
  }


  return NextResponse.json({
    data: {
      ...promoter,
      createdAt: promoter.createdAt.toISOString(),
      updatedAt: promoter.updatedAt.toISOString(),
    //   referralCount: promoter,
    },
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const existing = await findPromoter(id);
  if (!existing) {
    return NextResponse.json({ error: "Promoter not found" }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  const parsed = updateInfluencerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { name, mobile, email, tradingViewId } = parsed.data;

  try {
    const promoter = await prisma.user.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(mobile !== undefined && { mobile }),
        ...(email !== undefined && { email }),
        ...(tradingViewId !== undefined && {
          tradingViewId: tradingViewId || null,
        }),
      },
      include: {
        _count: { select: { referrals: true } },
      },
    });

    const { _count, ...rest } = promoter;

    return NextResponse.json({
      data: {
        ...rest,
        createdAt: rest.createdAt.toISOString(),
        updatedAt: rest.updatedAt.toISOString(),
        referralCount: _count.referrals,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        const target = err.meta?.target as string[] | undefined;
        const field = target?.[0] ?? "field";
        return NextResponse.json(
          { error: `A user with this ${field} already exists.` },
          { status: 409 }
        );
      }

      if (err.code === "P2025") {
        return NextResponse.json(
          { error: "Promoter not found" },
          { status: 404 }
        );
      }
    }

    console.error("Failed to update promoter:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const existing = await findPromoter(id);
  if (!existing) {
    return NextResponse.json({ error: "Promoter not found" }, { status: 404 });
  }

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2003") {
        return NextResponse.json(
          {
            error:
              "This promoter has existing payments linked to them and can't be deleted.",
          },
          { status: 409 }
        );
      }

      if (err.code === "P2025") {
        return NextResponse.json(
          { error: "Promoter not found" },
          { status: 404 }
        );
      }
    }

    console.error("Failed to delete promoter:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}