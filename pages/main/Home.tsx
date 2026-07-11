"use client";

import React from "react";
import TelegramCTA from "@/components/TelegramCTA";
import Pricing from "./Pricing";
import Featured from "../other/Featured";
import Trusted from "../other/Trusted";
import Hero from "./Hero/Hero";
import PricingBanner from "../other/HorizontalPricing";
import FreePlanBanner from "../other/PricingBanner";
import TickerTape from "../other/TradingView";
import LogoMarquee from "../other/Marquee";
import { images } from "@/data/marquee";

function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <Hero />
      <div className="">
      <LogoMarquee 
      logos={images}
      />
      <TickerTape />
      </div>
      <FreePlanBanner />
      <PricingBanner />
      {/* <Pricing /> */}
      <Featured />

      {/* TELEGRAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TelegramCTA variant="banner" />
      </section>
    </div>
  );
}

export default Home;
