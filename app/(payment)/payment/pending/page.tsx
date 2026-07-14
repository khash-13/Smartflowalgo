import PaymentProcessingPage from "@/components/Processing";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ refe?: string }>;
}) {
  const { refe } = await searchParams;

  return <PaymentProcessingPage refe={refe as string} />;
}