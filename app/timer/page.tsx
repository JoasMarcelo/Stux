"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, Play, Pause, Square, Flame, Target } from "lucide-react";
import { useStuxStore } from "@/hooks/use-stux-store";
import { MARKS, MarkLevel } from "@/lib/constants";
import { calculateMark, formatTime, getMinutesFromSeconds } from "@/lib/stux-logic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function TimerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { targetMinutes, setTarget, addSession, updateHeat } = useStuxStore();
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const resumeMinutes = searchParams.get('resume');
    if (resumeMinutes) {
      setSeconds(Number(resumeMinutes) * 60);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  if (!mounted) return null;

  const currentMinutes = getMinutesFromSeconds(seconds);
  const currentMark = calculateMark(currentMinutes, targetMinutes);
  
  // Find next mark
  const nextMarkIndex = MARKS.findIndex(m => m.level === currentMark.level) + 1;
  const nextMark = MARKS[nextMarkIndex] || null;
  
  const progressToNext = nextMark 
    ? (currentMinutes / (targetMinutes * (nextMark.percentage / 100))) * 100 
    : 100;

  const handleStop = () => {
    setIsActive(false);
    if (seconds > 0) {
      addSession(currentMinutes, currentMark.level);
      updateHeat(currentMark.heat);
      router.push("/");
    }
  };

  return (
    <div className="relative h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden">
      {/* Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 pb-32">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Cronômetro</h1>
          
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border">
            <Target className="w-4 h-4 text-orange-500" />
            <Input 
              type="number" 
              className="w-12 h-6 p-0 border-none bg-transparent text-center focus-visible:ring-0 font-bold"
              value={targetMinutes / 60}
              onChange={(e) => setTarget(Math.max(1, Number(e.target.value)) * 60)}
            />
            <span className="text-sm font-medium">horas</span>
          </div>
        </div>

        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <div className="text-7xl font-mono font-bold tracking-tighter">
              {formatTime(seconds)}
            </div>
            <div className={`text-xl font-bold ${currentMark.color} flex items-center justify-center gap-2`}>
              <Flame className="w-5 h-5 fill-current" />
              Nível Atual: {currentMark.label}
            </div>
          </CardContent>
        </Card>

        {nextMark && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex justify-between">
                <span>Próximo Objetivo: {nextMark.label}</span>
                <span>{nextMark.percentage}% da meta</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Progress value={progressToNext} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Faltam {Math.ceil((targetMinutes * (nextMark.percentage / 100)) - currentMinutes)} minutos
              </p>
            </CardContent>
          </Card>
        )}

        {/* Marks List (Bottom to Top) */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Progressão</h3>
          <div className="flex flex-col-reverse gap-2">
            {MARKS.slice(1).map((mark) => {
              const isAchieved = currentMinutes >= (targetMinutes * (mark.percentage / 100));
              return (
                <div 
                  key={mark.level}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    isAchieved ? `bg-muted/50 border-${mark.color.split('-')[1]}-500/50` : 'opacity-40 border-dashed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isAchieved ? mark.color.replace('text', 'bg') : 'bg-muted'}`} />
                    <span className={`font-medium ${isAchieved ? mark.color : ''}`}>{mark.label}</span>
                  </div>
                  <span className="text-xs font-mono">{mark.percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Floating Bottom Bar (Fixed relative to this page) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-background via-background/90 to-transparent pt-10 pointer-events-none">
        <div className="flex gap-4 max-w-2xl mx-auto pointer-events-auto">
          {!isActive ? (
            <Button onClick={() => setIsActive(true)} size="lg" className="flex-1 h-16 text-xl rounded-2xl gap-2 shadow-xl shadow-orange-500/10">
              <Play className="w-6 h-6 fill-current" />
              {seconds > 0 ? 'Continuar' : 'Começar'}
            </Button>
          ) : (
            <Button onClick={() => setIsActive(false)} variant="secondary" size="lg" className="flex-1 h-16 text-xl rounded-2xl gap-2 shadow-xl">
              <Pause className="w-6 h-6 fill-current" />
              Pausar
            </Button>
          )}
          <Button onClick={handleStop} variant="destructive" size="lg" className="w-16 h-16 rounded-2xl p-0 shadow-xl shadow-destructive/10">
            <Square className="w-6 h-6 fill-current" />
          </Button>
        </div>
      </div>
    </div>
  );
}
