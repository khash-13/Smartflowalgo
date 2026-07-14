const BASE_URL = "https://api.sumup.com/v0.1";

export async function sumupFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.SUMUP_API_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof data === "object"
        ? JSON.stringify(data)
        : "SumUp request failed"
    );
  }

  return data;
}