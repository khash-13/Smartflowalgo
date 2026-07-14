import SumUp from "@sumup/sdk";
import { NextResponse } from "next/server";

const client = new SumUp({
    apiKey: process.env.SUMUP_API_KEY!,
});

export async function POST(req: Request) {
    const body = await req.json();
    const checkout_reference = crypto.randomUUID()
    try {
        const checkout = await client.checkouts.create({
            checkout_reference: checkout_reference,
            amount: body.amount,
            currency: "GBP",

            merchant_code: process.env.SUMUP_MERCHANT_CODE!,

            description: body.description,
            redirect_url:
                `${process.env.NEXT_PUBLIC_APP_URL}/payment/pending?refe=${checkout_reference}`,
            hosted_checkout: {
                enabled: true,
            },
        });

        return NextResponse.json(checkout);

    } catch (err) {

        console.error(err);

        return NextResponse.json(
            { error: "Unable to create checkout" },
            { status: 500 }
        );
    }
}