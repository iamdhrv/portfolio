"use client";

import { useState, useEffect } from "react";

type BootStage = "power" | "bios" | "memory" | "drives" | "logo" | "done";

interface Props {
  onComplete: () => void;
}

export default function BiosBoot({ onComplete }: Props) {
  const [stage, setStage] = useState<BootStage>("power");
  const [lines, setLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(v => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const runBoot = async () => {
      // Stage 1: Power on
      await delay(800);
      setLines(["PhoenixBIOS 4.0.1, Copyright (C) 1985-2004 Phoenix Technologies Ltd."]);
      await delay(1500);
      setStage("bios");

      // Stage 2: BIOS info
      await delay(500);
      addLine("CPU: Neural Core i9 @ 4.2GHz");
      await delay(300);
      addLine("Memory Test: 65536K OK");
      await delay(500);
      setStage("memory");

      // Stage 3: Memory detection
      addLine("");
      addLine("Detecting hardware...");
      await delay(800);
      addLine("  ✓ USB Controller");
      await delay(400);
      addLine("  ✓ Audio Device (AC97)");
      await delay(400);
      addLine("  ✓ Network Adapter");
      await delay(400);
      addLine("  ✓ Graphics Card (VRAM: 16MB)");
      await delay(600);
      setStage("drives");

      // Stage 4: Drives
      addLine("");
      addLine("Detecting drives...");
      await delay(600);
      addLine("  → C: 512MB  (MASTER)");
      await delay(300);
      addLine("  → D: 2048MB (MASTER)");
      await delay(300);
      addLine("  → E: CD-ROM  (SLAVE)");
      await delay(600);

      // Stage 5: Logo
      setStage("logo");
      await delay(2000);

      // Stage 6: Done - fade out
      setStage("done");
      await delay(500);
      onComplete();
    };

    runBoot();
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const addLine = (text: string) => {
    setLines(prev => [...prev, text]);
  };

  if (stage === "done") {
    return (
      <div className="fixed inset-0 bg-black animate-pulse" />
    );
  }

  return (
    <div className="fixed inset-0 bg-zinc-950 font-mono text-sm md:text-base overflow-hidden">
      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 z-50">
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)]" 
          style={{ backgroundSize: "100% 2px" }} 
        />
      </div>

      {stage === "logo" ? (
        <div className="h-full flex flex-col items-center justify-center animate-pulse">
          <div className="text-cyan-400 text-4xl md:text-6xl font-bold mb-8 tracking-wider">
            DhruvOS
          </div>
          <div className="text-zinc-500 text-xl">
            Building the future...
          </div>
          <div className="mt-4 text-zinc-600 text-sm">
            Version 1.0.0
          </div>
        </div>
      ) : (
        <div className="p-4 md:p-8 max-w-3xl">
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed">
              <span className="text-cyan-400">{line}</span>
              {i === lines.length - 1 && showCursor && (
                <span className="text-cyan-400 animate-pulse">▋</span>
              )}
            </div>
          ))}
          {stage !== "logo" && showCursor && (
            <div className="text-cyan-400 animate-pulse">▋</div>
          )}
        </div>
      )}

      {/* Version info at bottom */}
      <div className="fixed bottom-2 right-4 text-zinc-600 text-xs">
        BIOS Date: 03/12/26 14:22:51 Ver: 1.0.0
      </div>
    </div>
  );
}
