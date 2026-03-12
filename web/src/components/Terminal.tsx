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
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-300">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><br/>
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
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);
  const [matrixChars, setMatrixChars] = useState<string[]>([]);
  const [guestbook, setGuestbook] = useState<{name: string; message: string; time: string}[]>([
    { name: "Alice", message: "Cool portfolio! 🤘", time: "2024-01-15" },
    { name: "Bob", message: "Love the retro vibe", time: "2024-01-16" },
  ]);
  const [dvdPosition, setDvdPosition] = useState({ x: 0, y: 0 });
  const [dvdColor, setDvdColor] = useState(0);
  const dvdColors = ["red", "blue", "green", "yellow", "magenta", "cyan"];
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const songs = [
    { title: "Tu Jaane Na", artist: "Atif Aslam", year: 2009, duration: "5:37", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Tere Bin", artist: "Simrat", year: 2009, duration: "4:58", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Dil Dil Pakistan", artist: "Junaid Jamshed", year: 2007, duration: "4:12", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { title: "Wooh", artist: "Ali Zafar", year: 2010, duration: "3:45", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { title: "Dhoom Machale", artist: "Shankar-Ehsaan-Loy", year: 2004, duration: "4:18", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    { title: "Bhare Naina", artist: "Vishal-Shekhar", year: 2010, duration: "4:51", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  ];

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

  useEffect(() => {
    setHistory([{ id: "boot", command: "", output: (
      <div className="mb-4">
        {asciiPortrait}
        <p className="mt-2 text-zinc-400">Welcome to DhruvOS (v1.0.0)</p>
        <p className="text-zinc-500">Type 'help' to see available commands.</p>
      </div>
    )}]);
  }, []);

  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener("click", handleClick);
    return () => { document.removeEventListener("click", handleClick); stopProgressTracking(); };
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  // DVD Bounce
  useEffect(() => {
    if (!isPlaying) return;
    let x = 0, y = 0, dx = 1, dy = 1, maxX = 30, maxY = 8;
    const interval = setInterval(() => {
      x += dx; y += dy;
      if (x >= maxX || x <= 0) { dx = -dx; setDvdColor(p => (p + 1) % dvdColors.length); }
      if (y >= maxY || y <= 0) { dy = -dy; setDvdColor(p => (p + 1) % dvdColors.length); }
      setDvdPosition({ x, y });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playSong = (index: number) => {
    if (audioRef.current) {
      audioRef.current.src = songs[index].src;
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentSongIndex(index);
      setProgress(0);
      startProgressTracking();
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) { audioRef.current.pause(); stopProgressTracking(); }
      else { audioRef.current.src ? audioRef.current.play() : playSong(0); startProgressTracking(); }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => playSong((currentSongIndex + 1) % songs.length);
  const prevSong = () => playSong((currentSongIndex - 1 + songs.length) % songs.length);

  const startProgressTracking = () => {
    stopProgressTracking();
    progressIntervalRef.current = setInterval(() => {
      if (audioRef.current?.duration) {
        const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(p);
        if (p >= 99) nextSong();
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; }
  };

  const startMatrixRain = () => {
    setShowMatrix(true);
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
    const interval = setInterval(() => setMatrixChars(Array(50).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)])));
    setTimeout(() => { clearInterval(interval); setShowMatrix(false); setMatrixChars([]); }, 5000);
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    let output: ReactNode = null;
    if (trimmedCmd === "") { addHistory(trimmedCmd, null); return; }
    const args = trimmedCmd.split(" ");
    const lowerCmd = args[0].toLowerCase();

    switch (lowerCmd) {
      case "help":
        output = (
          <div className={`flex flex-col space-y-1 mt-1 mb-2 ${colors.text}`}>
            <div className="flex"><span className="w-24">help</span><span className="text-zinc-500">Show this list</span></div>
            <div className="flex"><span className="w-24">about</span><span className="text-zinc-500">About me</span></div>
            <div className="flex"><span className="w-24">projects</span><span className="text-zinc-500">My projects</span></div>
            <div className="flex"><span className="w-24">whoami</span><span className="text-zinc-500">ASCII portrait</span></div>
            <div className="flex"><span className="w-24">contact</span><span className="text-zinc-500">Get in touch</span></div>
            <div className="flex"><span className="w-24">music</span><span className="text-zinc-500">Bollywood music player</span></div>
            <div className="flex"><span className="w-24">weather</span><span className="text-zinc-500">Weather display</span></div>
            <div className="flex"><span className="w-24">guestbook</span><span className="text-zinc-500">Sign/view guestbook</span></div>
            <div className="flex"><span className="w-24">matrix</span><span className="text-zinc-500">Enter the Matrix</span></div>
            <div className="flex"><span className="w-24">snake</span><span className="text-zinc-500">Snake game</span></div>
            <div className="flex"><span className="w-24">dvd</span><span className="text-zinc-500">DVD bounce</span></div>
            <div className="flex"><span className="w-24">fortune</span><span className="text-zinc-500">Fortune cookie</span></div>
            <div className="flex"><span className="w-24">sysinfo</span><span className="text-zinc-500">System info</span></div>
            <div className="flex"><span className="w-24">theme</span><span className="text-zinc-500">[minimal|matrix|ocean]</span></div>
            <div className="flex"><span className="w-24">clear</span><span className="text-zinc-500">Clear terminal</span></div>
          </div>
        );
        break;
      case "about":
        output = <div className="mt-1 mb-2 space-y-2 text-zinc-300"><p>Hi, I'm Dhruv.</p><p>I build cool, automated things with code and AI.</p></div>;
        break;
      case "projects":
        output = (
          <div className="mt-1 mb-2 space-y-3">
            <div><span className="text-zinc-200">1. OpenClaw Automation</span><p className="text-zinc-500 text-sm">Advanced system automation with AI partners.</p></div>
            <div><span className="text-zinc-200">2. Terminal Portfolio</span><p className="text-zinc-500 text-sm">DOM-based CLI environment.</p></div>
            <div><span className="text-zinc-200">3. SSH Portfolio</span><p className="text-zinc-500 text-sm">Connect via SSH for CLI experience.</p></div>
          </div>
        );
        break;
      case "whoami":
        output = <div className="mt-1 mb-2">{asciiPortrait}</div>;
        break;
      case "contact":
        output = <div className="mt-1 mb-2 space-y-1 text-zinc-300"><p><span className="text-zinc-500">Email:</span> dhruv@example.com</p><p><span className="text-zinc-500">GitHub:</span> github.com/iamdhrv</p></div>;
        break;
      case "music":
        output = (
          <div className="mt-1 mb-2">
            <p className="text-zinc-300 mb-2">Now Playing:</p>
            <div className="bg-zinc-900/50 p-3 rounded border border-zinc-800 mb-3">
              <p className="text-cyan-400 font-semibold">♫ {songs[currentSongIndex].title}</p>
              <p className="text-zinc-400 text-sm">{songs[currentSongIndex].artist} ({songs[currentSongIndex].year})</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
                <span>{formatTime((progress / 100) * (audioRef.current?.duration || 0))}</span>
                <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <span>{songs[currentSongIndex].duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <button onClick={prevSong} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-sm">⏮ Prev</button>
              <button onClick={togglePlayPause} className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-sm font-medium">{isPlaying ? "⏸ Pause" : "▶ Play"}</button>
              <button onClick={nextSong} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-sm">Next ⏭</button>
            </div>
            <p className="text-zinc-400 text-sm mb-2">Playlist:</p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {songs.map((song, i) => (
                <div key={i} onClick={() => playSong(i)} className={`cursor-pointer px-2 py-1 rounded text-sm flex justify-between ${i === currentSongIndex ? "bg-cyan-900/30 text-cyan-300" : "text-zinc-400 hover:bg-zinc-800"}`}>
                  <span>{i + 1}. {song.title} - {song.artist}</span><span className="text-zinc-500">{song.duration}</span>
                </div>
              ))}
            </div>
            <audio ref={audioRef} src={songs[currentSongIndex].src} onEnded={nextSong} />
          </div>
        );
        break;
      case "weather":
        output = (
          <div className="mt-1 mb-2">
            <div className="flex items-center gap-4 mb-3"><span className="text-4xl">🌤️</span><div><p className="text-zinc-200 text-xl font-bold">24°C</p><p className="text-zinc-400 text-sm">Partly Cloudy</p></div></div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-zinc-800/50 p-2 rounded"><p className="text-zinc-500">💧 Humidity</p><p className="text-zinc-300">65%</p></div>
              <div className="bg-zinc-800/50 p-2 rounded"><p className="text-zinc-500">💨 Wind</p><p className="text-zinc-300">12 km/h</p></div>
              <div className="bg-zinc-800/50 p-2 rounded"><p className="text-zinc-500">👁️ Visibility</p><p className="text-zinc-300">10 km</p></div>
            </div>
            <p className="text-zinc-500 text-xs mt-2 italic">Location: Mumbai, India (demo)</p>
          </div>
        );
        break;
      case "matrix":
        startMatrixRain();
        output = <div className="mt-1 mb-2 font-mono"><p className="text-green-500 mb-2">Entering the Matrix...</p></div>;
        break;
      case "guestbook":
        const gbArgs = args.slice(1);
        if (gbArgs[0] === "sign" && gbArgs.length >= 2) {
          setGuestbook([...guestbook, { name: "Guest", message: gbArgs.slice(1).join(" "), time: new Date().toISOString().split("T")[0] }]);
          output = <div className="mt-1 mb-2 text-green-400">✓ Thanks for signing!</div>;
        } else {
          output = (
            <div className="mt-1 mb-2">
              <p className="text-zinc-400 mb-2">📖 Guestbook ({guestbook.length} entries)</p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {guestbook.map((e, i) => <div key={i} className="bg-zinc-800/30 p-2 rounded border-l-2 border-cyan-500"><p className="text-zinc-300 text-sm">"{e.message}"</p><p className="text-zinc-500 text-xs mt-1">— {e.name} • {e.time}</p></div>)}
              </div>
              <p className="text-zinc-500 text-sm mt-2">Type 'guestbook sign &lt;message&gt;' to add</p>
            </div>
          );
        }
        break;
      case "snake":
        output = (
          <div className="mt-1 mb-2">
            <p className="text-zinc-300 mb-2">🐍 SNAKE GAME</p>
            <div className="bg-zinc-900 p-3 rounded font-mono text-xs mb-2">
              <p className="text-green-400">┌──────────────────────┐</p>
              <p className="text-green-400">│▓▓▓░░░░░░░░░░░░░░░░░░│</p>
              <p className="text-green-400">│░░░░░░░░░░░░░░▓▓▓░░░░░│</p>
              <p className="text-green-400">│░░░░░░░░░░░░░░░░░▓▓▓░░│</p>
              <p className="text-green-400">│░░░░░░░░░░░░░░░░░░░░░░│</p>
              <p className="text-green-400">└──────────────────────┘</p>
            </div>
            <p className="text-zinc-400 text-sm">Score: 15 | Use arrow keys! (Coming soon)</p>
          </div>
        );
        break;
      case "dvd":
        output = (
          <div className="mt-1 mb-2">
            <p className="text-zinc-400 mb-2">💿 DVD Bounce</p>
            <div className="bg-zinc-900 p-2 rounded font-mono text-xs inline-block relative" style={{ width: 200, height: 100 }}>
              <span className="absolute transition-all" style={{ color: dvdColors[dvdColor], left: dvdPosition.x * 6, top: dvdPosition.y * 10, textShadow: `0 0 5px ${dvdColors[dvdColor]}` }}>DVD</span>
            </div>
          </div>
        );
        break;
      case "fortune":
        const fortunes = ["A thrilling time is in your immediate future.", "Your creativity will lead you to success.", "An unexpected event will bring you fortune.", "Rest is the sweet sauce of labor.", "A beautiful, smart, and loving person will be coming into your life.", "The fortune you seek is in another cookie.", "Do not be afraid of competition.", "Adventure is worthwhile in itself."];
        const rf = fortunes[Math.floor(Math.random() * fortunes.length)];
        output = <div className="mt-1 mb-2 text-center"><div className="text-amber-500 text-2xl mb-2">🍪</div><p className="text-zinc-300 italic">"{rf}"</p><p className="text-zinc-500 text-xs mt-2">~ Fortune Cookie</p></div>;
        break;
      case "sysinfo":
        output = (
          <div className="mt-1 mb-2 font-mono text-sm">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <span className="text-zinc-500">Hostname:</span><span className="text-zinc-300">dhruv-os</span>
              <span className="text-zinc-500">OS:</span><span className="text-zinc-300">DhruvOS v1.0.0</span>
              <span className="text-zinc-500">Uptime:</span><span className="text-zinc-300">42 days, 13 hours</span>
              <span className="text-zinc-500">CPU:</span><span className="text-zinc-300">Neural Core i9</span>
              <span className="text-zinc-500">Memory:</span><span className="text-zinc-300">16GB / 64GB</span>
            </div>
          </div>
        );
        break;
      case "theme":
        const st = args[1] as "minimal" | "matrix" | "ocean";
        if (st && ["minimal", "matrix", "ocean"].includes(st)) { setTheme(st); output = <p className={colors.text}>Theme set to {st}.</p>; }
        else output = <p className="text-zinc-400">Usage: theme [minimal|matrix|ocean]</p>;
        break;
      case "sudo":
        if (args.join(" ") === "sudo rm -rf /") output = <div className="mt-1 mb-2"><p className="text-red-500 font-bold">[KERNEL PANIC] CRITICAL SYSTEM FAILURE...</p><p className="text-zinc-500">Just kidding. Nice try! 😄</p></div>;
        else output = <p className="mt-1 mb-2 text-zinc-400">Nice try. No sudo for you.</p>;
        break;
      case "clear":
        setHistory([]); return;
      case "exit":
        output = <p className="mt-1 mb-2 text-zinc-400">Goodbye!</p>;
        break;
      default:
        output = <div className="mt-1 mb-2 text-red-400/80">Command not found: {trimmedCmd}. Type 'help' for available commands.</div>;
    }
    addHistory(trimmedCmd, output);
  };

  const addHistory = (command: string, output: ReactNode) => {
    setHistory(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, command, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { handleCommand(input); setInput(""); }
  };

  return (
    <div className="w-full max-w-3xl mx-auto font-mono text-sm md:text-base">
      {showMatrix && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
          <div className="text-green-500 font-mono text-xl leading-relaxed">
            {matrixChars.map((c, i) => <span key={i} className="animate-pulse" style={{ opacity: Math.random() * 0.8 + 0.2 }}>{c}</span>)}
          </div>
        </div>
      )}
      {history.map(item => (
        <div key={item.id} className="mb-1">
          {item.command && <div className="flex items-center space-x-2"><span className={colors.prompt}>~/portfolio</span><span className={colors.symbol}>$</span><span className="text-zinc-200">{item.command}</span></div>}
          {item.output && <div>{item.output}</div>}
        </div>
      ))}
      <div className="flex items-center space-x-2 mt-2">
        <span className={colors.prompt}>~/portfolio</span>
        <span className={colors.symbol}>$</span>
        <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 bg-transparent border-none outline-none text-zinc-200" autoFocus spellCheck={false} autoComplete="off" />
      </div>
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
