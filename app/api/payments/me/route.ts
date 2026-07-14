import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.sumup.com/v0.1/me", {
      headers: {
        Authorization: `Bearer ${process.env.SUMUP_API_KEY}`,
      },
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to connect to SumUp" },
      { status: 500 }
    );
  }
}