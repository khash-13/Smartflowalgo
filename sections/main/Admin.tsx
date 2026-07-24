"use client";

import { useEffect, useState } from "react";
import LeadsTable from "@/sections/other/LeadsTable";

const PAGE_SIZE = 10;

type Lead = {
  id: string;
  createdAt: string;
  // Add the rest of your User fields here
  name?: string;
  email?: string;
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchLeads = async () => {
  //     try {
  //       const res = await fetch("/api/get-leads?page=1", {
  //         cache: "no-store",
  //       });

  //       if (!res.ok) {
  //         throw new Error("Failed to fetch leads");
  //       }

  //       const data = await res.json();

  //       setLeads(data.data);
  //       setTotal(data.pagination.total);
  //     } catch (error) {
  //       console.error("Error fetching leads:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchLeads();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center py-10">
  //       <p className="text-slate-400">Loading leads...</p>
  //     </div>
  //   );
  // }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Checkout Leads</h1>
      <p className="mt-1 text-sm text-slate-400">
        Everyone who has submitted the checkout form — free and paid.
      </p>

      <div className="mt-6">
        <LeadsTable
          initialData={[]}
          initialTotal={10}
          pageSize={1}
        />
      </div>
    </div>
  );
}