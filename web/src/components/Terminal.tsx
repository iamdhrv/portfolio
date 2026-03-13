"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";

type HistoryItem = {
  id: string;
  command: string;
  output: ReactNode;
};

const asciiPortrait = (
  <span className="font-mono text-xs md:text-sm leading-tight">
    <span className="text-blue-400">@</span><span className="text-blue-400">#</span><span className="text-blue-400">@</span><span className="text-blue-400">#</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">#</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">@</span><span className="text-blue-400">#</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-zinc-200">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-400">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-200">#</span><span className="text-blue-400">@</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-zinc-100">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-100">#</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><br/>
    <span className="text-blue-400">@</span><span className="text-zinc-100">#</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-zinc-300">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-white">@</span><span className="text-zinc-300">@</span><span className="text-zinc-100">@</span><span className="text-blue-400">@</span><br/>
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);
  const [matrixChars, setMatrixChars] = useState<string[][]>([]);
  const [guestbook, setGuestbook] = useState<{name: string; message: string; time: string}[]>([
    { name: "Alice", message: "Cool portfolio! 🤘", time: "2024-01-15" },
    { name: "Bob", message: "Love the retro vibe", time: "2024-01-16" },
  ]);
  const [dvdPosition, setDvdPosition] = useState({ x: 0, y: 0 });
  const [dvdColorIndex, setDvdColorIndex] = useState(0);
  const [showDvd, setShowDvd] = useState(false);
  const [idleTime, setIdleTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Snake game state
  const [snakeGame, setSnakeGame] = useState<{
    active: boolean;
    snake: { x: number; y: number }[];
    direction: { x: number; y: number };
    food: { x: number; y: number };
    score: number;
    gameOver: boolean;
  } | null>(null);
  
  const dvdColors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ff6600", "#6600ff"];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Initial boot
  useEffect(() => {
    setHistory([{ id: "boot", command: "", output: (
      <div className="mb-4">
        {asciiPortrait}
        <p className="mt-2 text-zinc-400">Welcome to DhruvOS (v1.0.0)</p>
        <p className="text-zinc-500">Type 'help' to see available commands.</p>
      </div>
    )}]);
  }, []);

  // Focus management
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
      setIdleTime(0);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  // Idle timer for DVD screensaver
  useEffect(() => {
    idleTimerRef.current = setInterval(() => {
      setIdleTime(t => t + 1);
      // Show DVD after 10 seconds of idle
      if (idleTime >= 10 && !showDvd && !showMatrix) {
        setShowDvd(true);
      }
    }, 1000);
    return () => { if (idleTimerRef.current) clearInterval(idleTimerRef.current); };
  }, [idleTime, showDvd, showMatrix]);

  // DVD Bounce Animation
  useEffect(() => {
    if (!showDvd) return;
    let x = 0, y = 0, dx = 1, dy = 1, maxX = 28, maxY = 12;
    const interval = setInterval(() => {
      x += dx; y += dy;
      if (x >= maxX || x <= 0) { dx = -dx; setDvdColorIndex(ci => (ci + 1) % dvdColors.length); }
      if (y >= maxY || y <= 0) { dy = -dy; setDvdColorIndex(ci => (ci + 1) % dvdColors.length); }
      setDvdPosition({ x, y });
    }, 80);
    return () => clearInterval(interval);
  }, [showDvd]);

  // Reset idle on input
  useEffect(() => {
    if (input.length > 0) {
      setIdleTime(0);
      setShowDvd(false);
    }
  }, [input]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playSong = (index: number) => {
    if (audioRef.current) {
      audioRef.current.src = songs[index].src;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
      setCurrentSongIndex(index);
      setProgress(0);
      setCurrentTime(0);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) { 
        audioRef.current.pause(); 
        setIsPlaying(false);
      } else {
        if (!audioRef.current.src) {
          playSong(0);
        } else {
          audioRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }
    }
  };

  const nextSong = () => playSong((currentSongIndex + 1) % songs.length);
  const prevSong = () => playSong((currentSongIndex - 1 + songs.length) % songs.length);

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const curr = audioRef.current.currentTime;
      const dur = audioRef.current.duration || 1;
      setCurrentTime(curr);
      setDuration(dur);
      setProgress((curr / dur) * 100);
    }
  };

  const handleAudioEnded = () => {
    nextSong();
  };

  // Snake game logic
  const startSnakeGame = () => {
    setSnakeGame({
      active: true,
      snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }],
      direction: { x: 1, y: 0 },
      food: { x: 15, y: 10 },
      score: 0,
      gameOver: false
    });
  };

  // Snake game keyboard handler
  useEffect(() => {
    if (!snakeGame?.active) return;
    
    const handleSnakeKey = (e: KeyboardEvent) => {
      // Close game on ESC
      if (e.key === "Escape") {
        setSnakeGame(null);
        return;
      }
      
      if (snakeGame.gameOver) return;
      
      const key = e.key;
      let newDir = snakeGame.direction;
      
      if (key === "ArrowUp" && snakeGame.direction.y !== 1) newDir = { x: 0, y: -1 };
      else if (key === "ArrowDown" && snakeGame.direction.y !== -1) newDir = { x: 0, y: 1 };
      else if (key === "ArrowLeft" && snakeGame.direction.x !== 1) newDir = { x: -1, y: 0 };
      else if (key === "ArrowRight" && snakeGame.direction.x !== -1) newDir = { x: 1, y: 0 };
      
      setSnakeGame(prev => prev ? { ...prev, direction: newDir } : prev);
    };
    
    window.addEventListener("keydown", handleSnakeKey);
    return () => window.removeEventListener("keydown", handleSnakeKey);
  }, [snakeGame?.active, snakeGame?.gameOver, snakeGame?.direction]);

  // Snake game loop
  useEffect(() => {
    if (!snakeGame?.active || snakeGame.gameOver) return;
    
    const interval = setInterval(() => {
      setSnakeGame(prev => {
        if (!prev || prev.gameOver) return prev;
        
        const newHead = {
          x: prev.snake[0].x + prev.direction.x,
          y: prev.snake[0].y + prev.direction.y
        };
        
        // Wall collision
        if (newHead.x < 0 || newHead.x >= 20 || newHead.y < 0 || newHead.y >= 15) {
          return { ...prev, gameOver: true };
        }
        
        // Self collision
        if (prev.snake.some(s => s.x === newHead.x && s.y === newHead.y)) {
          return { ...prev, gameOver: true };
        }
        
        const newSnake = [newHead, ...prev.snake];
        
        // Food collision
        if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
          // Generate new food
          let newFood: { x: number; y: number };
          do {
            newFood = {
              x: Math.floor(Math.random() * 20),
              y: Math.floor(Math.random() * 15)
            };
          } while (newSnake.some(s => s.x === newFood.x && s.y === newFood.y));
          
          return { ...prev, snake: newSnake, food: newFood, score: prev.score + 10 };
        }
        
        // Remove tail
        newSnake.pop();
        return { ...prev, snake: newSnake };
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, [snakeGame?.active, snakeGame?.gameOver]);

  // Render snake game
  const renderSnakeGame = () => {
    if (!snakeGame) return null;
    
    const grid: string[][] = [];
    for (let y = 0; y < 15; y++) {
      const row: string[] = [];
      for (let x = 0; x < 20; x++) {
        if (x === 0 || x === 19 || y === 0 || y === 14) {
          row.push("█");
        } else if (snakeGame.snake[0].x === x && snakeGame.snake[0].y === y) {
          row.push("●");
        } else if (snakeGame.snake.some(s => s.x === x && s.y === y)) {
          row.push("○");
        } else if (snakeGame.food.x === x && snakeGame.food.y === y) {
          row.push("★");
        } else {
          row.push(" ");
        }
      }
      grid.push(row);
    }
    
    return (
      <div className="mt-1 mb-2">
        <p className="text-zinc-300 mb-2">🐍 SNAKE - Score: {snakeGame.score}</p>
        {snakeGame.gameOver && <p className="text-red-400 mb-2">GAME OVER! Type 'snake' to play again.</p>}
        <div className="bg-zinc-900 p-2 rounded font-mono text-xs leading-tight">
          {grid.map((row, y) => (
            <div key={y}>{row.join("")}</div>
          ))}
        </div>
        <p className="text-zinc-500 text-xs mt-2">Use arrow keys to move. Press ESC to exit.</p>
      </div>
    );
  };

  // Matrix Rain Effect - Full screen vertical rain
  const startMatrixRain = () => {
    setShowDvd(false);
    setShowMatrix(true);
    // Initialize matrix with random characters
    const cols = 50;
    const rows = 20;
    const initialChars: string[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: string[] = [];
      for (let c = 0; c < cols; c++) {
        row.push(String.fromCharCode(0x30A0 + Math.random() * 96));
      }
      initialChars.push(row);
    }
    setMatrixChars(initialChars);
    
    // Update characters periodically
    const interval = setInterval(() => {
      setMatrixChars(prev => {
        const newChars = prev.map(row => 
          row.map(() => Math.random() > 0.7 ? String.fromCharCode(0x30A0 + Math.random() * 96) : '')
        );
        return newChars;
      });
    }, 100);
    
    setTimeout(() => {
      clearInterval(interval);
      setShowMatrix(false);
      setMatrixChars([]);
    }, 5000);
  };

  const handleCommand = (cmd: string) => {
    setShowDvd(false);
    setShowMatrix(false);
    setIdleTime(0);
    
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
            <div className="flex"><span className="w-24">dvd</span><span className="text-zinc-500">DVD bounce screensaver</span></div>
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
                <span>{formatTime(currentTime)}</span>
                <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden cursor-pointer" 
                     onClick={(e) => {
                       if (audioRef.current) {
                         const rect = e.currentTarget.getBoundingClientRect();
                         const percent = (e.clientX - rect.left) / rect.width;
                         audioRef.current.currentTime = percent * duration;
                       }
                     }}>
                  <div className="h-full bg-cyan-500 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <button onClick={prevSong} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-sm">⏮ Prev</button>
              <button onClick={togglePlayPause} className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-sm font-medium">{isPlaying ? "⏸ Pause" : "▶ Play"}</button>
              <button onClick={nextSong} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-sm">Next ⏭</button>
            </div>
            <p className="text-zinc-400 text-sm mb-2">Playlist (click to play):</p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {songs.map((song, i) => (
                <div key={i} onClick={() => playSong(i)} className={`cursor-pointer px-2 py-1 rounded text-sm flex justify-between ${i === currentSongIndex ? "bg-cyan-900/30 text-cyan-300" : "text-zinc-400 hover:bg-zinc-800"}`}>
                  <span>{i + 1}. {song.title} - {song.artist}</span><span className="text-zinc-500">{song.duration}</span>
                </div>
              ))}
            </div>
            <audio ref={audioRef} src={songs[currentSongIndex].src} onTimeUpdate={handleAudioTimeUpdate} onEnded={handleAudioEnded} onLoadedMetadata={handleAudioTimeUpdate} />
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
        startSnakeGame();
        output = <div className="mt-1 mb-2 text-zinc-400">Loading snake game...</div>;
        break;
      case "dvd":
        setShowDvd(true);
        output = <div className="mt-1 mb-2 text-zinc-400">Activating DVD screensaver... (will show after 10s idle)</div>;
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
    <div className="w-full max-w-3xl mx-auto font-mono text-sm md:text-base relative">
      {/* Matrix Effect - Full screen */}
      {showMatrix && (
        <div className="fixed inset-0 bg-black z-50 overflow-hidden">
          <div className="absolute inset-0 flex flex-wrap items-start content-start p-2 gap-0">
            {matrixChars.map((row, ri) => (
              <div key={ri} className="flex">
                {row.map((char, ci) => (
                  <span key={ci} className="text-green-500 text-xs md:text-sm font-mono" 
                        style={{ opacity: Math.random() * 0.8 + 0.2, textShadow: '0 0 5px #00ff00' }}>
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <p className="absolute bottom-4 left-4 text-green-400 z-50">Follow the white rabbit... 🐇</p>
        </div>
      )}

      {/* DVD Screensaver */}
      {showDvd && (
        <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center overflow-hidden bg-black/20">
          <div 
            className="absolute text-2xl md:text-4xl font-bold transition-all duration-75"
            style={{ 
              color: dvdColors[dvdColorIndex],
              textShadow: `0 0 20px ${dvdColors[dvdColorIndex]}, 0 0 40px ${dvdColors[dvdColorIndex]}`,
              left: `${dvdPosition.x * 3}%`,
              top: `${dvdPosition.y * 6}%`,
            }}
          >
            DVD
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
        <input ref={inputRef} type="text" value={input} onChange={e => { setInput(e.target.value); setIdleTime(0); setShowDvd(false); }} onKeyDown={handleKeyDown} className="flex-1 bg-transparent border-none outline-none text-zinc-200" autoFocus spellCheck={false} autoComplete="off" />
      </div>
      <div ref={bottomRef} className="h-4" />
      
      {/* Snake Game Overlay */}
      {snakeGame?.active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-zinc-950 p-4 rounded-none border-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]" style={{ minWidth: 400 }}>
            {/* Header */}
            <div className="flex justify-between items-center mb-3 border-b border-green-500/30 pb-2">
              <span className="text-green-400 font-bold text-lg">🐍 SNAKE</span>
              <span className="text-green-300 font-mono">SCORE: {snakeGame.score}</span>
            </div>
            
            {/* Game Board */}
            <div className="bg-black p-1 font-mono text-xs leading-none border border-green-500/50">
              {(() => {
                const grid: string[][] = [];
                for (let y = 0; y < 15; y++) {
                  const row: string[] = [];
                  for (let x = 0; x < 20; x++) {
                    if (x === 0 || x === 19 || y === 0 || y === 14) {
                      row.push("█");
                    } else if (snakeGame.snake[0].x === x && snakeGame.snake[0].y === y) {
                      row.push("●");
                    } else if (snakeGame.snake.some(s => s.x === x && s.y === y)) {
                      row.push("○");
                    } else if (snakeGame.food.x === x && snakeGame.food.y === y) {
                      row.push("★");
                    } else {
                      row.push("░");
                    }
                  }
                  grid.push(row);
                }
                return grid.map((row, y) => <div key={y} className="text-green-400 tracking-wide">{row.join("")}</div>);
              })()}
            </div>
            
            {/* Game Over */}
            {snakeGame.gameOver && (
              <div className="text-center mt-3 border-t border-red-500/30 pt-2">
                <p className="text-red-400 font-bold text-lg blink">GAME OVER</p>
                <p className="text-zinc-400 text-sm">Press 'snake' to play again</p>
              </div>
            )}
            
            {/* Controls */}
            <div className="mt-3 pt-2 border-t border-green-500/30 flex justify-between text-xs">
              <span className="text-zinc-500">Controls:</span>
              <span className="text-green-500">↑↓←→ move • ESC quit</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
