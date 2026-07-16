import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@/generated/prisma/enums";
import { Prisma } from "@/generated/prisma/client";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const ref = params.get("ref");

    if (ref) {
      const payments = await prisma.payment.findMany({
        where: {
          checkoutReference: ref,
        },
        include: {
          user: true,
          promoter: true,
        },
      });
      return NextResponse.json(payments[0]);
    }

    const payments = await prisma.payment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        promoter: true,
      },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch payments",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      amount,
      currency,
      checkoutId,
      checkoutReference,
      status,
      userId,
      promoterId,
    } = body;

    if (!amount) {
      return NextResponse.json(
        {
          error: "Amount is required",
        },
        {
          status: 400,
        },
      );
    }

    if (!userId) {
      return NextResponse.json(
        {
          error: "userId is required",
        },
        {
          status: 400,
        },
      );
    }

    // A promoter can't also be the paying client on their own payment
    if (promoterId && promoterId === userId) {
      return NextResponse.json(
        {
          error: "promoterId cannot be the same as userId",
        },
        {
          status: 400,
        },
      );
    }

    const payment = await prisma.payment.create({
      data: {
        amount,
        currency: currency ?? "USD",
        checkoutId,
        checkoutReference,
        merchantCode: process.env.SUMUP_MERCHANT_CODE as string,
        status: status ?? PaymentStatus.PENDING,
        user: {
          connect: {
            id: userId,
          },
        },
        ...(promoterId && {
          promoter: {
            connect: {
              id: promoterId,
            },
          },
        }),
      },
      include: {
        user: true,
        promoter: true,
      },
    });

    return NextResponse.json(payment, {
      status: 201,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        {
          error: "userId or promoterId does not match an existing user",
        },
        {
          status: 400,
        },
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to create payment",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const { checkoutId, status } = body;

    if (!checkoutId) {
      return NextResponse.json(
        { error: "checkoutId is required" },
        { status: 400 },
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: "status is required" },
        { status: 400 },
      );
    }

    const payment = await prisma.payment.update({
      where: {
        checkoutId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(payment, {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to update payment status",
      },
      {
        status: 500,
      },
    );
  }
}