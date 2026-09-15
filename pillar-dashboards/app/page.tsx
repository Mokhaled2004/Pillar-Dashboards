import { Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import PricingBundlesSection from "@/components/landing/PricingBundlesSection";
import ContactUsSection from "@/components/landing/ContactUsSection";
import AboutUsSection from "@/components/landing/AboutUsSection";
import Footer from "@/components/landing/Footer";
import SplashScreen from "@/components/landing/SplashScreen";

export default function Home() {
  return (
    <SplashScreen>
      <div className="flex flex-col min-h-screen bg-[#F6F7FA] font-sans text-[#1F2937]">
        <Navbar />
        <Hero />
        <AboutUsSection />
        <FeaturesGrid />
        <PricingBundlesSection />

        {/* Wrap components using useSearchParams in Suspense */}
        <Suspense
          fallback={<div className="py-20 text-center">Loading...</div>}
        >
          <ContactUsSection />
        </Suspense>

        <Footer />
      </div>
    </SplashScreen>
  );
}
