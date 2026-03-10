"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";

type HistoryItem = {
  id: string;
  command: string;
  output: ReactNode;
};

// Colored ASCII art for the portrait
const asciiPortrait = (
  <span className="font-mono text-xs md:text-sm leading-tight">
    <span className="text-blue-400">@</span><span className="text-blue-400">#</span><span className="text-blue-400">@</span><span className="text-blue-400">#</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">#</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">#</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-zinc-200">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-200">#</span><span className="text-blue-400">@</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-zinc-100">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-100">#</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-300">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-400">@</span><span className="text-zinc-500">#</span><span className="text-zinc-500">@</span><span className="text-zinc-500">@</span><span className="text-zinc-500">@</span><span className="text-zinc-500">@</span><span className="text-zinc-500">@</span><span className="text-zinc-500">@</span><span className="text-zinc-400">@</span><span className="text-zinc-300">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-400">#</span><span className="text-zinc-500">@</span><span className="text-zinc-500">@</span><span className="text-zinc-500">@</span><span className="text-zinc-500">@</span><span className="text-zinc-500">@</span><span className="text-zinc-400">#</span><span className="text-zinc-400">@</span><span className="text-zinc-300">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-300">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-zinc-100">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-100">#</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><br/>
    <span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-zinc-100">@</span><span className="text-zinc-200">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-200">@</span><span className="text-zinc-100">@</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><br/>
  </span>
);

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [theme, setTheme] = useState<"minimal" | "matrix" | "ocean">("minimal");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Theme colors
  const getThemeColors = () => {
    switch (theme) {
      case "matrix":
        return { prompt: "text-green-500", user: "text-green-400", symbol: "text-green-500", text: "text-green-300" };
      case "ocean":
        return { prompt: "text-cyan-500", user: "text-cyan-400", symbol: "text-cyan-500", text: "text-cyan-300" };
      default:
        return { prompt: "text-zinc-500", user: "text-zinc-400", symbol: "text-zinc-400", text: "text-zinc-300" };
    }
  };
  const colors = getThemeColors();

  // Initial boot message with ASCII art
  useEffect(() => {
    setHistory([
      {
        id: "boot",
        command: "",
        output: (
          <div className="mb-4">
            {asciiPortrait}
            <p className="mt-2 text-zinc-400">Welcome to DhruvOS (v1.0.0)</p>
            <p className="text-zinc-500">Type 'help' to see available commands.</p>
          </div>
        ),
      },
    ]);
  }, []);

  // Keep focus on input
  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    let output: ReactNode = null;

    if (trimmedCmd === "") {
      addHistory(trimmedCmd, null);
      return;
    }

    const args = trimmedCmd.split(" ");
    const lowerCmd = args[0].toLowerCase();

    switch (lowerCmd) {
      case "help":
        output = (
          <div className={`flex flex-col space-y-1 mt-1 mb-2 ${colors.text}`}>
            <div className="flex"><span className="w-24">help</span><span className="text-zinc-500">Show this list of commands</span></div>
            <div className="flex"><span className="w-24">about</span><span className="text-zinc-500">Display information about me</span></div>
            <div className="flex"><span className="w-24">projects</span><span className="text-zinc-500">List my featured projects</span></div>
            <div className="flex"><span className="w-24">whoami</span><span className="text-zinc-500">Display my ASCII portrait</span></div>
            <div className="flex"><span className="w-24">contact</span><span className="text-zinc-500">Get in touch</span></div>
            <div className="flex"><span className="w-24">music</span><span className="text-zinc-500">Play retro hits (Bollywood & English)</span></div>
            <div className="flex"><span className="w-24">theme</span><span className="text-zinc-500">Change theme [minimal|matrix|ocean]</span></div>
            <div className="flex"><span className="w-24">clear</span><span className="text-zinc-500">Clear terminal output</span></div>
          </div>
        );
        break;
      case "about":
        output = (
          <div className={`mt-1 mb-2 space-y-2 ${colors.text}`}>
            <p>Hi, I'm Dhruv.</p>
            <p>I'm a builder and software developer passionate about automating workflows,</p>
            <p>crafting minimal interfaces, and creating capable AI agents.</p>
          </div>
        );
        break;
      case "projects":
        output = (
          <div className="mt-1 mb-2 space-y-3">
            <div>
              <span className="text-zinc-200">1. OpenClaw Automation</span>
              <p className="text-zinc-500 text-sm">Advanced system automation with capable AI partners.</p>
            </div>
            <div>
              <span className="text-zinc-200">2. Minimal Terminal Portfolio</span>
              <p className="text-zinc-500 text-sm">A DOM-based CLI environment (you're looking at it).</p>
            </div>
            <div>
              <span className="text-zinc-200">3. AI Agency Agents</span>
              <p className="text-zinc-500 text-sm">Orchestrating autonomous development pipelines.</p>
            </div>
          </div>
        );
        break;
      case "whoami":
        output = (
          <div className="mt-1 mb-2">
            {asciiPortrait}
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="mt-1 mb-2 space-y-1 text-zinc-300">
            <p><span className="text-zinc-500">Email:</span> dhruv@example.com</p>
            <p><span className="text-zinc-500">GitHub:</span> github.com/iamdhrv</p>
            <p><span className="text-zinc-500">Telegram:</span> @iamdhrv</p>
          </div>
        );
        break;
      case "music":
        output = (
          <div className="mt-1 mb-2">
            <p className="text-zinc-300 mb-2">Now Playing: "Tu Jaane Na" - Atif Aslam (2009)</p>
            <div className="text-zinc-400 text-sm mb-2">
              <span className="text-green-400">▶</span> 01:23 ━━━━●──────────── 05:37
            </div>
            <p className="text-zinc-500 italic">"Kaise bataye kyu Mujhko chahe..."</p>
            <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
            <button 
              onClick={() => {
                if (audioRef.current) {
                  if (isPlaying) {
                    audioRef.current.pause();
                  } else {
                    audioRef.current.play();
                  }
                  setIsPlaying(!isPlaying);
                }
              }}
              className="mt-2 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-sm"
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
          </div>
        );
        break;
      case "theme":
        const selectedTheme = args[1] as "minimal" | "matrix" | "ocean";
        if (selectedTheme && ["minimal", "matrix", "ocean"].includes(selectedTheme)) {
          setTheme(selectedTheme);
          output = (
            <div className="mt-1 mb-2">
              <p className={colors.text}>Theme set to {selectedTheme}.</p>
            </div>
          );
        } else {
          output = (
            <div className="mt-1 mb-2 text-zinc-400">
              <p>Usage: theme [minimal|matrix|ocean]</p>
            </div>
          );
        }
        break;
      case "sudo":
        if (args.join(" ") === "sudo rm -rf /") {
          output = (
            <div className="mt-1 mb-2">
              <p className="text-red-500 font-bold">[KERNEL PANIC] CRITICAL SYSTEM FAILURE...</p>
              <p className="text-red-400">Deleting system files...</p>
              <p className="text-zinc-500">Just kidding. Nice try! 😄</p>
            </div>
          );
        } else {
          output = <p className="mt-1 mb-2 text-zinc-400">Nice try. You don't have sudo privileges.</p>;
        }
        break;
      case "clear":
        setHistory([]);
        return;
      case "exit":
        output = <p className="mt-1 mb-2 text-zinc-400">Goodbye!</p>;
        break;
      default:
        output = (
          <div className="mt-1 mb-2 text-red-400/80">
            Command not found: {trimmedCmd}. Type 'help' for available commands.
          </div>
        );
    }

    addHistory(trimmedCmd, output);
  };

  const addHistory = (command: string, output: ReactNode) => {
    setHistory((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, command, output },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto font-mono text-sm md:text-base">
      {history.map((item) => (
        <div key={item.id} className="mb-1">
          {item.command && (
            <div className="flex items-center space-x-2">
              <span className={colors.prompt}>~/portfolio</span>
              <span className={colors.symbol}>$</span>
              <span className="text-zinc-200">{item.command}</span>
            </div>
          )}
          {item.output && <div>{item.output}</div>}
        </div>
      ))}

      <div className="flex items-center space-x-2 mt-2">
        <span className={colors.prompt}>~/portfolio</span>
        <span className={colors.symbol}>$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-zinc-200 shadow-none ring-0 p-0"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
