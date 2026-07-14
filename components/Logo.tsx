import React from "react";
import logo from "@/assets/logos/logo.jpg"
interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "h-12 w-auto", showText = true }: LogoProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-transparent">
      <img 
      src={logo.src}
      alt="logo"
      className="w-full h-full object-cover rounded-full"
      />
      </div>
      <p className="font-sans leading-4 text-xl text-center font-bold dark:text-white">Smart<span className="text-blue-400">Flow</span><br /><span className="text-center text-sm uppercase">Algo</span></p>
    </div>
  );
}
