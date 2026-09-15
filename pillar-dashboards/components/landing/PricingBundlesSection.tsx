"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function PricingBundlesSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual",
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Trigger animations when the section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger only once when scrolled into view
        }
      },
      { threshold: 0.15 }, // Triggers when 15% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const bundles = [
    {
      name: "STARTER TEACHER",
      value: "Starter Teacher",
      tagline:
        "Just a dashboard where you track student status only. No real homework submissions or PDFs.",
      priceMonthly: "950 EGP",
      priceAnnual: "750 EGP",
      features: [
        "Simple student status tracking dashboard",
        "All built for you out of the box",
        "Use our pre-designed dashboard templates",
        "Remove any sections you don't need",
        "Standard support",
      ],
      highlighted: false,
      ctaText: "GET STARTED",
    },
    {
      name: "PROFESSIONAL PORTAL",
      value: "Professional Portal",
      tagline:
        "All features included plus PDF uploads, homework submissions, and exam deliverables.",
      priceMonthly: "1,950 EGP",
      priceAnnual: "1,450 EGP",
      features: [
        "Everything in Starter Teacher",
        "Upload PDFs, study materials & links",
        "Homework submissions & exam tracking",
        "Use our templates (customize or remove sections)",
        "Priority sync & support",
      ],
      highlighted: true,
      ctaText: "BUILD YOUR PORTAL",
    },
    {
      name: "CUSTOMIZABLE DASHBOARD",
      value: "Customizable Dashboard",
      tagline:
        "Full customization of your dashboard appearance plus an AI assistant for student insights.",
      priceMonthly: "3,950 EGP",
      priceAnnual: "3,150 EGP",
      features: [
        "Fully customize how the full dashboard looks",
        "Includes all features & free feature modules",
        "AI assistant to help you understand & support students better",
        "Dedicated setup & configuration",
        "Full flexibility on layout and design",
      ],
      highlighted: false,
      ctaText: "CONTACT US",
    },
  ];

  // Auto-slide effect for mobile screens only
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bundles.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, bundles.length]);

  // Touch handlers for manual mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) {
      setCurrentIndex((prev) => (prev + 1) % bundles.length);
    } else if (diff < -threshold) {
      setCurrentIndex((prev) => (prev - 1 + bundles.length) % bundles.length);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="bundles"
      className="relative bg-white text-[#1F2937] py-32 px-6 md:px-16 font-mono border-t border-zinc-200 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-16">
        {/* Section Header with Scroll Entrance Animation */}
        <div
          className={`flex flex-col items-center text-center gap-5 transition-all duration-700 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans text-[#1F2937] max-w-3xl leading-[1.15]">
            CHOOSE YOUR CLASSROOM WORKSPACE BUNDLE
          </h2>
          <p className="text-zinc-600 max-w-xl text-sm font-sans leading-relaxed">
            Select a tier tailored to your teaching scale. Upgrade or switch
            plans anytime. Note: You can use our templates and remove any
            sections you don&apos;t need, but adding completely new custom brand
            sections isn&apos;t supported on standard tiers.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center gap-3 bg-[#F9FAFB] p-1.5 rounded-2xl border border-zinc-200 mt-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-[#1F2937] shadow-sm border border-zinc-200/80"
                  : "text-zinc-500 hover:text-[#1F2937]"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${
                billingCycle === "annual"
                  ? "bg-[#6B1D2F] text-white shadow-md"
                  : "text-zinc-500 hover:text-[#1F2937]"
              }`}
            >
              <span>Annual Billing</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${billingCycle === "annual" ? "bg-white/20 text-white" : "bg-[#6B1D2F]/10 text-[#6B1D2F]"}`}
              >
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Grid Layout with Staggered Scroll Animations */}
        <div className="hidden lg:grid grid-cols-3 gap-8 w-full items-stretch">
          {bundles.map((bundle, idx) => {
            const price =
              billingCycle === "annual"
                ? bundle.priceAnnual
                : bundle.priceMonthly;

            return (
              <div
                key={idx}
                style={{
                  transitionDelay: `${200 + idx * 150}ms`,
                }}
                className={`relative flex flex-col justify-between bg-[#F9FAFB] rounded-3xl p-8 sm:p-10 border transition-all duration-700 transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                } ${
                  bundle.highlighted
                    ? "border-[#6B1D2F] ring-4 ring-[#6B1D2F]/10 shadow-xl bg-white scale-[1.02]"
                    : "border-zinc-200/80 hover:border-zinc-300 shadow-sm"
                }`}
              >
                {bundle.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#6B1D2F] text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1 rounded-full shadow-md">
                    MOST POPULAR CHOICE
                  </div>
                )}

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-black font-sans uppercase text-[#1F2937] tracking-tight">
                      {bundle.name}
                    </h3>
                    <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                      {bundle.tagline}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 pt-2 border-t border-zinc-200/60">
                    <span className="text-3xl sm:text-4xl font-black font-sans text-[#1F2937] tracking-tighter">
                      {price}
                    </span>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
                      / month{" "}
                      {billingCycle === "annual" ? "(billed annually)" : ""}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3.5 pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                      What&apos;s included:
                    </span>
                    {bundle.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-3 text-xs text-zinc-700 font-sans"
                      >
                        <svg
                          className="w-4 h-4 text-[#6B1D2F] shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-10">
                  <Link
                    href={`/?bundle=${encodeURIComponent(bundle.value)}#contact`}
                    className={`w-full inline-flex items-center justify-center py-4 rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-sm ${
                      bundle.highlighted
                        ? "bg-[#6B1D2F] text-white hover:bg-[#581C03] shadow-lg"
                        : "bg-white text-[#1F2937] border-2 border-zinc-300 hover:border-[#6B1D2F] hover:text-[#6B1D2F]"
                    }`}
                  >
                    <span>{bundle.ctaText}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Slider Layout with Scroll Entrance */}
        <div
          className={`lg:hidden flex flex-col gap-6 w-full transition-all duration-700 delay-300 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div
            className="overflow-hidden relative touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {bundles.map((bundle, idx) => {
                const price =
                  billingCycle === "annual"
                    ? bundle.priceAnnual
                    : bundle.priceMonthly;

                return (
                  <div key={idx} className="w-full flex-shrink-0 px-1">
                    <div
                      className={`relative flex flex-col justify-between bg-[#F9FAFB] rounded-3xl p-8 sm:p-10 border transition-all duration-300 h-full ${
                        bundle.highlighted
                          ? "border-[#6B1D2F] ring-4 ring-[#6B1D2F]/10 shadow-xl bg-white"
                          : "border-zinc-200/80 shadow-sm"
                      }`}
                    >
                      {bundle.highlighted && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#6B1D2F] text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1 rounded-full shadow-md">
                          MOST POPULAR CHOICE
                        </div>
                      )}

                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-lg font-black font-sans uppercase text-[#1F2937] tracking-tight">
                            {bundle.name}
                          </h3>
                          <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                            {bundle.tagline}
                          </p>
                        </div>

                        <div className="flex items-baseline gap-1 pt-2 border-t border-zinc-200/60">
                          <span className="text-3xl sm:text-4xl font-black font-sans text-[#1F2937] tracking-tighter">
                            {price}
                          </span>
                          <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
                            / month{" "}
                            {billingCycle === "annual"
                              ? "(billed annually)"
                              : ""}
                          </span>
                        </div>

                        <div className="flex flex-col gap-3.5 pt-4">
                          <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                            What&apos;s included:
                          </span>
                          {bundle.features.map((feat, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-start gap-3 text-xs text-zinc-700 font-sans"
                            >
                              <svg
                                className="w-4 h-4 text-[#6B1D2F] shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-10">
                        <Link
                          href={`/?bundle=${encodeURIComponent(bundle.value)}#contact`}
                          className={`w-full inline-flex items-center justify-center py-4 rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-sm ${
                            bundle.highlighted
                              ? "bg-[#6B1D2F] text-white hover:bg-[#581C03] shadow-lg"
                              : "bg-white text-[#1F2937] border-2 border-zinc-300 hover:border-[#6B1D2F] hover:text-[#6B1D2F]"
                          }`}
                        >
                          <span>{bundle.ctaText}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center items-center gap-2.5 pt-2">
            {bundles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPaused(true);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-[#6B1D2F]" : "w-2 bg-zinc-300"
                }`}
                aria-label={`Jump to pricing card ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
