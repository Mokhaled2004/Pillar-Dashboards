"use client";

import React, { useState, useEffect, useRef } from "react";

export default function AboutUsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const cards = [
    {
      number: "01",
      title: "Zero Setup Hassle",
      description:
        "Everything is built for you out of the box. No code, no complex databases, and no wasted weekends setting things up.",
      tag: "Instant Deployment",
    },
    {
      number: "02",
      title: "Stripped to Fit You",
      description:
        "If a template section doesn't fit your teaching workflow, we strip it out completely. You keep only what matters.",
      tag: "Fully Tailored",
    },
    {
      number: "03",
      title: "IGCSE Focused",
      description:
        "Designed specifically for student tracking, homework submissions, curriculum files, and one-tap professional reporting.",
      tag: "Built for Teachers",
    },
  ];

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

  // Auto-slide effect for mobile screens only
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, cards.length]);

  // Touch handlers for manual swipe
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
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    } else if (diff < -threshold) {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-white text-[#1F2937] py-28 px-6 md:px-16 font-mono border-t border-zinc-200 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-14">
        {/* Section Header with Scroll-Triggered Animation */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-10 transition-all duration-700 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="text-[11px] uppercase tracking-widest text-[#6B1D2F] font-bold">
              // DESIGNED FOR REAL EDUCATORS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans text-[#1F2937] leading-[1.1]">
              Built because spreadsheets and bloated portals don&apos;t cut it.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 font-sans max-w-xs leading-relaxed">
            No steep learning curves or clunky school software. Just a clean
            workspace built exactly around how you manage your classes.
          </p>
        </div>

        {/* Desktop Grid Layout with Staggered Scroll-Triggered Animations */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              style={{
                transitionDelay: `${200 + idx * 150}ms`,
              }}
              className={`bg-[#F9FAFB] rounded-3xl p-8 border border-zinc-200/85 flex flex-col justify-between gap-8 hover:border-[#6B1D2F]/30 transition-all duration-700 shadow-sm hover:shadow-md transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="flex flex-col gap-3">
                <span className="text-2xl font-black font-sans text-[#6B1D2F]">
                  {card.number}
                </span>
                <h3 className="text-base font-black font-sans uppercase text-[#1F2937]">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                  {card.description}
                </p>
              </div>
              <div className="pt-4 border-t border-zinc-200/60 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                {card.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider Layout */}
        <div className="md:hidden flex flex-col gap-6">
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
              {cards.map((card, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-1">
                  <div className="bg-[#F9FAFB] rounded-3xl p-8 border border-zinc-200/80 flex flex-col justify-between gap-8 h-full shadow-sm">
                    <div className="flex flex-col gap-3">
                      <span className="text-2xl font-black font-sans text-[#6B1D2F]">
                        {card.number}
                      </span>
                      <h3 className="text-base font-black font-sans uppercase text-[#1F2937]">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-zinc-200/60 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                      {card.tag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Pagination Dots */}
          <div className="flex justify-center items-center gap-2.5 pt-2">
            {cards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPaused(true);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-[#6B1D2F]" : "w-2 bg-zinc-300"
                }`}
                aria-label={`Slide to card ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
