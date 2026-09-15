"use client";

import React, { useState, useEffect, useRef } from "react";

export default function StackedFeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const features = [
    {
      number: "01",
      title: "MANAGE STUDENTS IN ONE PLACE",
      description:
        "Ditch messy spreadsheets and instantly organize all your IGCSE student rosters, contact records, and profiles in a clean, searchable directory.",
      svgIcon: (
        <svg
          className="w-6 h-6 text-[#6B1D2F]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "ALL CLASS FILES, VIDEOS & LINKS",
      description:
        "Store and organize lecture videos, study documents, curriculum PDFs, and meeting links in an intuitive hub instead of scattered folders.",
      svgIcon: (
        <svg
          className="w-6 h-6 text-[#6B1D2F]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      number: "03",
      title: "HOMEWORK SUBMISSIONS & TRACKING",
      description:
        "Assign homework, monitor submission statuses, and review student deliverables smoothly without losing track in endless group chats or emails.",
      svgIcon: (
        <svg
          className="w-6 h-6 text-[#6B1D2F]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      number: "04",
      title: "DETAILED PROGRESS & ONE-TAP REPORTS",
      description:
        "Track comprehensive student growth and generate clean, professional academic progress reports with just a single click.",
      svgIcon: (
        <svg
          className="w-6 h-6 text-[#6B1D2F]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      number: "05",
      title: "CURVES, TRENDS & HELP ALERTS",
      description:
        "Instantly view overall class performance curves, analyze individual learning trends, and spot students who need extra support before exams.",
      svgIcon: (
        <svg
          className="w-6 h-6 text-[#6B1D2F]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative bg-[#F9FAFB] text-[#1F2937] py-32 px-6 md:px-16 font-mono overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        {/* Section Header with Scroll Animation */}
        <div
          className={`flex flex-col items-center text-center gap-5 transition-all duration-700 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans text-[#1F2937] max-w-3xl leading-[1.15]">
            EVERYTHING YOU NEED TO MANAGE YOUR CLASS
          </h2>
          <p className="text-zinc-600 max-w-xl text-sm font-sans leading-relaxed">
            Click any stacked card to bring it forward and explore your custom
            modules.
          </p>
        </div>

        {/* Stacked Cards Interactive Container with Scroll Entrance */}
        <div
          className={`relative w-full max-w-3xl mx-auto min-h-[460px] pt-12 transition-all duration-700 delay-200 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {features.map((item, idx) => {
            const total = features.length;
            let offset = (idx - activeIndex + total) % total;

            if (offset > total / 2) {
              offset -= total;
            }

            const isCurrent = offset === 0;

            let transformStyle = "translateY(0px) scale(1)";
            let zIndex = 50 - Math.abs(offset);
            let opacity = 1;
            let pointerEvents = "auto";

            if (offset > 0) {
              transformStyle = `translateY(${offset * 32}px) scale(${1 - offset * 0.03}) rotate(${offset * 0.5}deg)`;
              opacity = Math.max(0.25, 1 - offset * 0.22);
            } else if (offset < 0) {
              transformStyle = `translateY(${offset * 32}px) scale(${1 + offset * 0.03}) rotate(${offset * 0.5}deg)`;
              opacity = Math.max(0.35, 1 + offset * 0.25);
            }

            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  transform: transformStyle,
                  zIndex: zIndex,
                  opacity: opacity,
                  pointerEvents: pointerEvents as any,
                }}
                className={`absolute inset-x-0 mx-auto max-w-3xl bg-white rounded-3xl p-8 sm:p-12 shadow-2xl transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between border border-zinc-200/80 ${
                  isCurrent
                    ? "ring-2 ring-[#6B1D2F]/20 shadow-2xl"
                    : "hover:brightness-95 hover:border-[#6B1D2F]/40"
                }`}
              >
                {/* Top header inside card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F9FAFB] flex items-center justify-center border border-zinc-200 shadow-sm">
                      {item.svgIcon}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                      Module {item.number} of 0{features.length}
                    </span>
                  </div>

                  <span className="text-2xl font-black font-sans text-[#6B1D2F] tracking-tighter">
                    {item.number}
                  </span>
                </div>

                {/* Middle Content */}
                <div className="flex flex-col gap-3 py-6">
                  <h3 className="text-xl sm:text-2xl font-black font-sans uppercase text-[#1F2937] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 font-sans leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer indicator */}
                <div className="pt-6 border-t border-zinc-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <span className="text-[#6B1D2F]">
                    {isCurrent
                      ? "✦ Click any card above or below to switch modules"
                      : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Pagination Dots */}
        <div
          className={`flex justify-center items-center gap-3 pt-16 transition-all duration-700 delay-300 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {features.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-10 bg-[#6B1D2F]"
                  : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
              aria-label={`Jump to module ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
