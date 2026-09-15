"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2400);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#F5F7F9] transition-opacity duration-600 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center gap-5 animate-pulse">
            <div className="relative w-28 h-28">
              <Image
                src="/pillarLogosplash.png"
                alt="Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
      <div className={isLoading ? "overflow-hidden h-screen" : ""}>
        {children}
      </div>
    </>
  );
}
