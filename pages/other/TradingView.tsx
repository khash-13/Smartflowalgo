"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function TradingViewTicker() {
  const getTheme = () =>
    document.documentElement.classList.contains("dark") ? "dark" : "light";

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(getTheme());

    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Script
        src="https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js"
        type="module"
        strategy="afterInteractive"
      />

      <tv-ticker-tape
        key={theme}
        symbols="FOREXCOM:SPXUSD,FOREXCOM:NSXUSD,FOREXCOM:DJI,FX:EURUSD,BITSTAMP:BTCUSD,BITSTAMP:ETHUSD,CMCMARKETS:GOLD"
        item-size="compact"
        width="1920px"
        transparent
        theme={theme}
      />
    </>
  );
}