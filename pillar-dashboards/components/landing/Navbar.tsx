"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About us", href: "#about" },
    { name: "Our features", href: "#features" },
    { name: "Our pricings", href: "#pricings" },
    { name: "Contact us", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F6F7FA]/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/pillerLogoText.png"
            alt="Pillar Dashboards Logo"
            width={130}
            height={40}
            className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Desktop Nav Links with Animated Underline Hover */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-1 transition-colors hover:text-[#6B1D2F] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#6B1D2F] after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="bg-[#6B1D2F] hover:bg-[#581C03] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            Request a Dashboard
          </a>
        </div>

        {/* Mobile Burger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-zinc-700 hover:bg-zinc-200/60 transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Animated Drawer Overlay & Menu */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`absolute top-20 left-0 w-full bg-[#F6F7FA] border-b border-zinc-200 shadow-xl py-6 px-6 flex flex-col gap-5 z-50 transition-all duration-300 transform md:hidden ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-zinc-700 hover:text-[#6B1D2F] transition-colors py-1 border-b border-zinc-100"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 pt-4 border-t border-zinc-200">
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="bg-[#6B1D2F] hover:bg-[#581C03] text-white text-center py-3 rounded-xl font-medium text-sm shadow-sm transition-all"
          >
            Request a Dashboard
          </a>
        </div>
      </div>
    </header>
  );
}
