import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import LeadsTable from "@/sections/other/LeadsTable";

export const metadata: Metadata = {
  title: "Leads | Admin",
};

const PAGE_SIZE = 10;

export default async function AdminLeadsPage() {
  const [leads, total] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
    }),
    prisma.user.count(),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 p-6 sm:p-10">
      <div className="mx-auto max-w-9xl">
        <h1 className="text-2xl font-semibold text-white">Checkout Leads</h1>
        <p className="mt-1 text-sm text-slate-400">
          Everyone who has submitted the checkout form — free and paid.
        </p>

        <div className="mt-6">
          <LeadsTable
            initialData={leads.map((lead) => ({
              ...lead,
              createdAt: lead.createdAt.toISOString(),
            }))}
            initialTotal={total}
            pageSize={PAGE_SIZE}
          />
        </div>
      </div>
    </main>
  );
}