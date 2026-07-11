import type * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "tv-ticker-tape": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        symbols?: string;
        "hide-chart"?: boolean;
        "item-size"?: "compact" | "regular" | string;
        "hover-type"?: string;
        "show-hover"?: boolean;
      };
    }
  }
}

export {};