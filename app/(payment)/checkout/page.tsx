import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { decodePlanToken } from "@/lib/plan-token";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | SmartFlowAlgo",
};

interface CheckoutPageProps {
  // Next.js 15: searchParams is async
  searchParams: Promise<{ plan?: string }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const query = await searchParams;
  const token = query.plan
  const plan = decodePlanToken(token);

  if (!plan) { 
    redirect("/plans");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 py-16 sm:py-24">
      {/* Ambient background — same dot-matrix treatment used elsewhere on the site */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(56,189,248,0.15)_1px,transparent_0)] bg-[size:32px_32px]" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <CheckoutForm plan={plan} />
      </div>
    </main>
  );
}