import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#5D1425] text-white py-16 px-6 md:px-16 font-mono border-t border-[#480F1C]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/10">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-4">
            <div className="w-[50px] h-[50px] flex items-center justify-center bg-transparent">
              <Image
                src="/pillerLogoFooter.png"
                alt="Pillar Dashboards Footer Logo"
                width={50}
                height={50}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-base font-sans tracking-tight uppercase text-white">
                Pillar Dashboards
              </span>
              <span className="text-xs text-[#F9FAFB]/70 font-sans">
                Professional classroom portals for modern IGCSE educators.
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs uppercase tracking-wider font-bold text-[#F9FAFB]/80">
            <a href="#about" className="hover:text-white transition-colors">
              About Us
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Our Features
            </a>
            <a href="#bundles" className="hover:text-white transition-colors">
              Pricing Bundles
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F9FAFB]/60 font-sans">
          <p>
            © {new Date().getFullYear()} Pillar Dashboards. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
