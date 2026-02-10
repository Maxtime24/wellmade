"use client";

export default function Logo({ className = "w-32 h-auto", color = "currentColor" }: { className?: string; color?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 240 40"
            className={className}
            fill={color}
            aria-label="Well Made Logo"
        >
            {/* Symbol: Geometric WM Monogram */}
            <path
                d="M10,10 L15,30 L25,10 L35,30 L40,10"
                stroke={color}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <rect x="5" y="5" width="40" height="30" stroke={color} strokeWidth="1.5" fill="none" />

            {/* Text: WELL MADE */}
            <text x="60" y="28" fontFamily="sans-serif" fontSize="20" fontWeight="600" letterSpacing="3" fill={color}>
                WELL MADE
            </text>
        </svg>
    );
}
