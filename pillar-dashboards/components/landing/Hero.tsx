"use client";

import Link from "next/link";
import WebThreads from "../WebThreads";

export default function Hero() {
  const headlineWords = [
    {
      text: "● ARE YOU READY TO",
      className: "font-black text-[#1F2937] tracking-tight",
    },
    {
      text: "BUILD YOUR OWN",
      className: "font-bold text-zinc-700",
    },
    {
      text: "LIGHTNING-FAST,",
      className:
        "font-bold text-[#1F2937] underline decoration-[#6B1D2F] decoration-2 underline-offset-4",
    },
    { text: "BESPOKE", className: "font-bold italic text-[#6B1D2F]" },
    {
      text: "IGCSE",
      className:
        "font-black text-[#6B1D2F] text-4xl sm:text-6xl lg:text-7xl tracking-tighter",
    },
    { text: "PORTAL TO", className: "font-bold text-zinc-700" },
    { text: "SEAMLESSLY MANAGE", className: "font-bold text-[#1F2937]" },
    { text: "YOUR STUDENTS & GRADES?", className: "font-bold text-zinc-700" },
  ];

  return (
    <section className="relative bg-[#F9FAFB] text-[#1F2937] pt-28 pb-32 px-6 md:px-16 border-b border-zinc-300 font-mono overflow-hidden">
      {/* 1. WebThreads Background Component Integration */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
        <WebThreads
          color1="#6B1D2F"
          color2="#D97706"
          color3="#1F2937"
          speed={0.12}
          threadCount={6}
          frequency={4.5}
          spread={0.22}
          taper={1}
          position={0.5}
          fanMode="center"
          glow={0.03}
          falloff={0.6}
          thickness={1.3}
          brightness={0.85}
          opacity={0.8}
          mirror
          shimmer={false}
          grain
          grainIntensity={0.025}
          mouseInteraction
          mouseStrength={0.25}
          lightMode={true}
          backgroundColor="#F9FAFB"
        />
      </div>

      {/* 2. Main Content Layer */}
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-12 relative z-10">
        {/* Headline Section with Animated Letter-by-Letter Entrance */}
        <div className="w-full flex flex-col items-center gap-10">
          <div className="w-full">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl uppercase leading-[1.35] font-sans flex flex-wrap justify-center gap-x-3 gap-y-2 items-baseline">
              {headlineWords.map((wordObj, wordIndex) => (
                <span key={wordIndex} className="inline-flex overflow-hidden">
                  {wordObj.text.split("").map((char, charIndex) => {
                    const globalDelay = (wordIndex * 5 + charIndex) * 0.012;
                    return (
                      <span
                        key={charIndex}
                        style={{ animationDelay: `${globalDelay}s` }}
                        className={`inline-block animate-fade-in-letter transition-all duration-200 ease-out hover:text-[#6B1D2F] hover:scale-125 hover:-translate-y-1 cursor-default ${wordObj.className}`}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>
          </div>

          {/* Single Prominent Call-to-Action Button with Entrance Animation */}
          <div className="flex flex-wrap items-center justify-center pt-6 animate-fade-in-up opacity-0 [animation-delay:0.6s]">
            <Link
              href="#bundles"
              className="group relative inline-flex items-center gap-3 bg-[#6B1D2F] text-white text-xs sm:text-sm uppercase tracking-widest px-12 py-4 hover:bg-[#581C03] transition-all shadow-xl rounded-xl font-bold hover:scale-105"
            >
              <span>LET&apos;S START</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Inline Keyframes for Letter and Button Entrance Animations */}
      <style jsx>{`
        @keyframes fadeInLetter {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-letter {
          animation: fadeInLetter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
