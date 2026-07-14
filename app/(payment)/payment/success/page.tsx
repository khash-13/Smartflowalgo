"use client";

import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-6">
      {/* Floating Animated SVG Background */}
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20%"
          cy="25%"
          r="80"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          className="animate-pulse"
        />
        <circle
          cx="80%"
          cy="70%"
          r="120"
          fill="none"
          stroke="#16a34a"
          strokeWidth="2"
          className="animate-[pulse_5s_ease-in-out_infinite]"
        />
        <circle
          cx="55%"
          cy="15%"
          r="40"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2"
          className="animate-bounce"
        />
      </svg>

      {/* Floating Dots */}
      <div className="absolute left-16 top-20 h-4 w-4 animate-bounce rounded-full bg-green-500"></div>
      <div className="absolute right-20 top-32 h-3 w-3 animate-ping rounded-full bg-green-400"></div>
      <div className="absolute bottom-20 left-1/4 h-5 w-5 animate-pulse rounded-full bg-green-600"></div>
      <div className="absolute bottom-32 right-16 h-4 w-4 animate-bounce rounded-full bg-green-500"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-neutral-800 bg-neutral-900 p-10 shadow-2xl">
        {/* Success Icon */}
        <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border-4 border-green-500">
          <svg
            className="h-16 w-16 animate-[pop_0.8s_ease]"
            viewBox="0 0 52 52"
            fill="none"
          >
            <circle
              cx="26"
              cy="26"
              r="24"
              stroke="#22c55e"
              strokeWidth="2"
              strokeDasharray="150"
              strokeDashoffset="150"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="150;0"
                dur="0.8s"
                fill="freeze"
              />
            </circle>

            <path
              d="M15 27L23 35L38 18"
              stroke="#22c55e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="40"
              strokeDashoffset="40"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="40;0"
                begin="0.6s"
                dur="0.5s"
                fill="freeze"
              />
            </path>
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-center text-4xl font-bold text-white">
          Payment Successful 🎉
        </h1>

        <p className="mt-5 text-center text-neutral-400 leading-7">
          Thank you for your purchase.
          <br />
          To activate your access, please join our Telegram group and send your
          payment screenshot as proof.
        </p>

        {/* Telegram Button */}
        <Link
          href="https://t.me/yourtelegram"
          target="_blank"
          className="mt-10 flex h-14 w-full items-center justify-center rounded-xl bg-sky-500 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-sky-600 active:scale-95"
        >
          Join Telegram
        </Link>

        <p className="mt-5 text-center text-sm text-neutral-500">
          Our team will verify your payment and provide access shortly.
        </p>
      </div>

      <style jsx>{`
        @keyframes pop {
          0% {
            transform: scale(0);
          }
          70% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}