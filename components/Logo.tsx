import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "h-12 w-auto", showText = true }: LogoProps) {
  return (
    <div className="flex items-center space-x-3">
      {/* High-fidelity custom SVG replicating the candlestick/horn logo */}
      <svg
        className={className}
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="sfa-logo-svg"
      >
        {/* Left Bull Horn (Green Gradient) with Green Candlestick */}
        <path
          d="M75 140C60 160 50 185 54 210C56 218 60 225 66 226C72 227 76 220 74 212C70 195 78 178 88 165C92 160 95 158 95 155V215H85V220H95V245H101V220H111V215H101V152C101 148 97 145 92 143C85 140 80 138 75 140Z"
          fill="url(#greenGradient)"
        />
        {/* Right Bear Horn (Red Gradient) with Red Candlestick */}
        <path
          d="M245 140C260 160 270 185 266 210C264 218 260 225 254 226C248 227 244 220 246 212C250 195 242 178 232 165C228 160 225 158 225 155V185H215V190H225V245H231V190H241V185H231V152C231 148 235 145 240 143C247 140 252 138 245 140Z"
          fill="url(#redGradient)"
        />

        {/* Center Stylized Letters S F A */}
        {/* Letter S - Green */}
        <path
          d="M120 165C120 152 130 145 143 145C155 145 163 151 163 160H153C153 156 148 152 142 152C136 152 131 155 131 161C131 169 148 168 156 173C162 177 165 183 165 192C165 204 154 212 140 212C127 212 118 205 117 195H127C128 199 133 204 141 204C147 204 153 201 153 194C153 186 136 186 128 181C123 177 120 172 120 165Z"
          fill="#10B981"
          stroke="#10B981"
          strokeWidth="1.5"
        />
        {/* Letter F - Blue */}
        <path
          d="M172 147H198V155H180V171H195V179H180V210H172V147Z"
          fill="#3B82F6"
          stroke="#3B82F6"
          strokeWidth="1.5"
        />
        {/* Letter A - Red/Dark Blue Gradient */}
        <path
          d="M202 210L215 147H224L237 210H228L225 193H212L209 210H202ZM213 186H223L218 158H217L213 186Z"
          fill="#EF4444"
          stroke="#EF4444"
          strokeWidth="1.5"
        />

        {/* Text Area */}
        <defs>
          <linearGradient id="greenGradient" x1="54" y1="140" x2="111" y2="245" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="redGradient" x1="266" y1="140" x2="215" y2="245" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>
      </svg>
      
      {showText && (
        <div className="flex flex-col select-none leading-none">
          <div className="flex items-center text-lg font-bold tracking-wider">
            <span className="text-slate-800 dark:text-white">SMART</span>
            <span className="text-blue-500">FLOW</span>
          </div>
          <div className="flex items-center justify-between text-[9px] font-semibold tracking-[0.25em] text-slate-400 dark:text-slate-400 mt-0.5">
            <span className="text-emerald-500">—</span>
            <span>ALGO</span>
            <span className="text-rose-500">—</span>
          </div>
        </div>
      )}
    </div>
  );
}
