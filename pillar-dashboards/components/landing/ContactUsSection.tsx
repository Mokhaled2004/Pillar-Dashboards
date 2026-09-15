"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactUsSection() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  // Custom dropdown state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState({
    label: "Starter Teacher (750-950 EGP/mo)",
    value: "Starter Teacher",
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { label: "Starter Teacher (750-950 EGP/mo)", value: "Starter Teacher" },
    {
      label: "Professional Portal (1,450-1,950 EGP/mo)",
      value: "Professional Portal",
    },
    {
      label: "Customizable Dashboard (3,150-3,950 EGP/mo)",
      value: "Customizable Dashboard",
    },
    { label: "Request a Live Demo", value: "Request a Live Demo" },
    { label: "General Inquiry / Custom Request", value: "General Inquiry" },
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

  // Auto-select bundle based on URL search parameter
  useEffect(() => {
    const bundleParam = searchParams.get("bundle");
    if (bundleParam) {
      const matchingOption = options.find(
        (opt) => opt.value.toLowerCase() === bundleParam.toLowerCase(),
      );
      if (matchingOption) {
        setSelectedBundle(matchingOption);
      }
    }
  }, [searchParams]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const formData = new FormData(e.currentTarget);
    formData.set("bundle", selectedBundle.value);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#F9FAFB] text-[#1F2937] py-32 px-6 md:px-16 font-mono border-t border-zinc-200 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-16">
        {/* Section Header with Scroll Entrance Animation */}
        <div
          className={`flex flex-col items-center text-center gap-5 transition-all duration-700 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans text-[#1F2937] max-w-2xl leading-[1.15]">
            READY TO BUILD OR SEE A DEMO?
          </h2>
          <p className="text-zinc-600 max-w-lg text-sm font-sans leading-relaxed">
            Send us a message directly. Request a live walkthrough or let us set
            up your custom teaching dashboard and templates.
          </p>
        </div>

        {/* Contact Form Box with Scroll Entrance Animation */}
        <div
          className={`w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-zinc-200/80 transition-all duration-700 delay-200 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {submitted ? (
            <div className="flex flex-col items-center text-center py-12 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#6B1D2F]/10 flex items-center justify-center text-[#6B1D2F]">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-black font-sans uppercase text-[#1F2937]">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-zinc-600 font-sans max-w-md">
                Thank you for reaching out. Your message has been sent directly
                to our inbox, and we will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#1F2937] text-white text-xs uppercase tracking-wider font-bold hover:bg-black transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="hidden"
                name="access_key"
                value="66f052f1-f80d-4e23-915b-66fafb530019"
              />
              <input type="hidden" name="bundle" value={selectedBundle.value} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-zinc-700">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Mr. Hassan"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F9FAFB] border border-zinc-300 text-sm font-sans text-[#1F2937] focus:outline-none focus:border-[#6B1D2F] focus:bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-zinc-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="teacher@school.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F9FAFB] border border-zinc-300 text-sm font-sans text-[#1F2937] focus:outline-none focus:border-[#6B1D2F] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Custom Dropdown */}
              <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
                <label className="text-xs uppercase tracking-wider font-bold text-zinc-700">
                  Interested Bundle / Request a Demo
                </label>

                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#F9FAFB] border border-zinc-300 text-sm font-sans text-[#1F2937] flex items-center justify-between cursor-pointer hover:border-[#6B1D2F] hover:bg-white transition-all shadow-sm"
                >
                  <span className="font-medium">{selectedBundle.label}</span>
                  <svg
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#6B1D2F]" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {isOpen && (
                  <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden z-50 p-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                    {options.map((option, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedBundle(option);
                          setIsOpen(false);
                        }}
                        className={`px-4 py-3 rounded-xl text-sm font-sans cursor-pointer transition-all ${
                          selectedBundle.value === option.value
                            ? "bg-[#6B1D2F]/10 text-[#6B1D2F] font-bold"
                            : "text-zinc-700 hover:bg-[#F9FAFB] hover:text-[#6B1D2F] hover:pl-6"
                        }`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider font-bold text-zinc-700">
                  Your Message or Custom Requirements *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us what sections you want to keep or remove from our templates..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F9FAFB] border border-zinc-300 text-sm font-sans text-[#1F2937] focus:outline-none focus:border-[#6B1D2F] focus:bg-white transition-all resize-none"
                ></textarea>
              </div>

              {error && (
                <p className="text-xs text-red-600 font-bold uppercase tracking-wider">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-[#6B1D2F] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#581C03] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>
                  {loading ? "SENDING MESSAGE..." : "SEND MESSAGE TO US →"}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
