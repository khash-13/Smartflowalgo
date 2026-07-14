export type PlanType = "FREE" | "PAID";

export interface PlanPayload {
  type: PlanType;
  price?: number;
  billingCycle?: "monthly" | "yearly";
}

function toBase64(json: string): string {
  return btoa(json);
}

function fromBase64(base64: string): string {
  return atob(base64);
}

/** Use this on the pricing page when building the "Buy" link. */
export function encodePlanToken(payload: PlanPayload): string {
  const json = JSON.stringify(payload);
  return encodeURIComponent(toBase64(json));
}

/** Returns null if the token is missing, malformed, or fails shape checks. */
export function decodePlanToken(token: string | null | undefined): PlanPayload | null {
  if (!token) return null;

  try {
    const base64 = decodeURIComponent(token);
    const json = fromBase64(base64);
    const parsed = JSON.parse(json);

    if (parsed?.type !== "FREE" && parsed?.type !== "PAID") return null;
    return {
      type: parsed.type,
      price: typeof parsed.price === "number" ? parsed.price : undefined,
      billingCycle:
        parsed.billingCycle === "monthly" || parsed.billingCycle === "yearly"
          ? parsed.billingCycle
          : undefined,
    };
  } catch(e) {
    return e as any;
  }
}


export function getToken(
    type: "FREE" | "PAID",
    price?: number,
    billingCycle?: "monthly" | "yearly"
  ) {
    const token = encodePlanToken({ type, price, billingCycle });
    return token
  };