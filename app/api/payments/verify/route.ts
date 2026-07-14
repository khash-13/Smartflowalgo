import SumUp from "@sumup/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new SumUp({
  apiKey: process.env.SUMUP_API_KEY!, // or access token
});

export async function GET(req: NextRequest) {
  try {
    const checkoutId = req.nextUrl.searchParams.get("checkoutId");

    if (!checkoutId) {
      return NextResponse.json(
        { error: "checkoutId is required" },
        { status: 400 }
      );
    }

    const checkout = await client.checkouts.get(checkoutId);

    return NextResponse.json({
      status: checkout.status,
      transactionId: checkout.transaction_id,
      checkout,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
