"use client";

import { useState } from "react";
import Terminal from "@/components/Terminal";
import BiosBoot from "@/components/BiosBoot";

export default function Home() {
  const [showBios, setShowBios] = useState(true);

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col relative">
      {/* CRT Scanlines Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-30" />
      </div>
      {/* CRT Screen curvature effect */}
      <div className="fixed inset-0 pointer-events-none z-40 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
      {showBios ? <BiosBoot onComplete={() => setShowBios(false)} /> : <Terminal />}
    </main>
  );
}
