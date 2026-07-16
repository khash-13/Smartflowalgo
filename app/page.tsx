"use client";

import React from "react";
// Data
import Home from "@/sections/main/Home";

export default function Page() {

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-200 font-sans flex flex-col transition-colors selection:bg-emerald-500/30 selection:text-emerald-500">
      {/* MAIN CONTAINER */}
      <main className="grow">
        <Home />
      </main>
    </div>
  );
}
