"use client";

import { useEffect, useState } from "react";
import { Flame, Trophy, Calendar, Target, Clock, Plus } from "lucide-react";
import { useStuxStore } from "@/hooks/use-stux-store";
import { getTrophy, getNewTrophies, ALL_TROPHIES } from "@/lib/stux-logic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrophyUnlock } from "@/components/trophy-unlock";
import Link from "next/link";

export default function Home() {
  const { heat, history, targetMinutes, displayedTrophyThreshold, setDisplayedTrophyThreshold } = useStuxStore();
  const [mounted, setMounted] = useState(false);
  const [showTrophy, setShowTrophy] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const newTrophies = getNewTrophies(heat, displayedTrophyThreshold);
    if (newTrophies.length > 0) {
      const latest = newTrophies[newTrophies.length - 1];
      setShowTrophy(latest.name);
    }
  }, [mounted, heat, displayedTrophyThreshold]);

  if (!mounted) return null;

  const currentTrophy = getTrophy(heat);
  const studyDates = Array.from(new Set(history.map(s => s.date.split('T')[0]))).sort();
  const totalDays = studyDates.length;
  
  // Calculate offensive days (streak)
  let offensiveDays = 0;
  if (studyDates.length > 0) {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    // Start checking from the most recent study date
    let lastDate = studyDates[studyDates.length - 1];
    
    // Only count as active streak if studied today or yesterday
    if (lastDate === today || lastDate === yesterday) {
      offensiveDays = 1;
      for (let i = studyDates.length - 2; i >= 0; i--) {
        const currentDate = new Date(studyDates[i + 1]);
        const previousDate = new Date(studyDates[i]);
        const diffTime = Math.abs(currentDate.getTime() - previousDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          offensiveDays++;
        } else {
          break;
        }
      }
    }
  }

  return (
    <main className="p-4 md:p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Stux</h1>
          <p className="text-muted-foreground">Vença a procrastinação, um nível por vez.</p>
        </div>
      </div>

      {/* Hero Heat Card */}
      <Card className="border-2 border-orange-500/20 bg-orange-500/5 overflow-hidden">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <Flame className={`w-24 h-24 ${heat > 0 ? 'text-orange-500 fill-orange-500 animate-pulse' : 'text-muted-foreground'}`} />
            <span className="absolute bottom-0 right-0 text-3xl font-black">{heat}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Calor da Chama</h2>
            <p className="text-muted-foreground">Mantenha o ritmo para aumentar sua temperatura.</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ofensiva</CardTitle>
            <Flame className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offensiveDays}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dias de Estudo</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDays}</div>
          </CardContent>
        </Card>
      </div>

      {/* Trophy Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Seu Troféu Atual
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Trophy className={`w-8 h-8 ${heat > 0 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold">{currentTrophy.name}</h3>
            <p className="text-sm text-muted-foreground">Nível de calor: {heat}</p>
          </div>
        </CardContent>
      </Card>

      <TrophyUnlock
        name={ALL_TROPHIES.find(t => t.name === showTrophy)?.name || ''}
        threshold={ALL_TROPHIES.find(t => t.name === showTrophy)?.threshold || 0}
        open={showTrophy !== null}
        onClose={() => {
          const trophy = ALL_TROPHIES.find(t => t.name === showTrophy);
          if (trophy) setDisplayedTrophyThreshold(trophy.threshold);
          setShowTrophy(null);
        }}
      />
    </main>
  );
}
