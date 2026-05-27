"use client";

import { Trophy, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface TrophyUnlockProps {
  name: string;
  threshold: number;
  open: boolean;
  onClose: () => void;
}

export function TrophyUnlock({ name, threshold, open, onClose }: TrophyUnlockProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative flex flex-col items-center gap-6 p-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full animate-particle"
            style={{
              left: `${30 + Math.random() * 40}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${1.5 + Math.random()}s`,
            }}
          />
        ))}

        {/* Glow */}
        <div
          className={`absolute w-40 h-40 rounded-full bg-yellow-500/20 blur-3xl transition-all duration-1000 ${
            visible ? 'scale-150 opacity-100' : 'scale-50 opacity-0'
          }`}
        />

        {/* Trophy */}
        <div
          className={`relative transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/40">
            <Trophy className="w-14 h-14 text-white fill-white drop-shadow-lg" />
          </div>
        </div>

        {/* Sparkle icon */}
        <Sparkles
          className={`absolute top-8 right-8 w-8 h-8 text-yellow-300 transition-all duration-700 delay-300 ${
            visible ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-90'
          }`}
        />

        {/* Text */}
        <div className="text-center space-y-2">
          <p
            className={`text-sm font-medium text-yellow-300/80 tracking-widest uppercase transition-all duration-500 delay-200 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            Novo Troféu!
          </p>
          <h2
            className={`text-4xl font-black text-white drop-shadow-lg transition-all duration-500 delay-300 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {name}
          </h2>
          <p
            className={`text-lg text-yellow-300/70 font-medium transition-all duration-500 delay-400 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {threshold} Calor
          </p>
        </div>

        {/* Close button */}
        <Button
          variant="outline"
          className={`border-yellow-500/30 text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/10 transition-all duration-500 delay-500 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          onClick={onClose}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
