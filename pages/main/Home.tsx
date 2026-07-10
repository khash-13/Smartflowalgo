"use client";

import React from "react";
import TelegramCTA from "@/components/TelegramCTA";
import Pricing from "./Pricing";
import Featured from "../other/Featured";
import Trusted from "../other/Trusted";
import Hero from "./Hero/Hero";
import PricingBanner from "../other/HorizontalPricing";

function Home() {

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
    <Hero />
      {/* TRUST STRIP */}
    <Trusted />

      {/* FEATURE CARDS */}
      <Featured />

      {/* PRICING PLANS SECTION */}
      <Pricing />
      <PricingBanner />

      {/* TELEGRAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TelegramCTA variant="banner" />
      </section>
    </div>
  );
}

export default Home;
