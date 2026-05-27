"use client";

import { useState, useEffect } from "react";
import { Clock, Trash2, Play, Calendar, Flame } from "lucide-react";
import { useStuxStore } from "@/hooks/use-stux-store";
import { MARKS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDateShort(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function formatTimeOfDay(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function HistoryPage() {
  const { history, removeSession } = useStuxStore();
  const [mounted, setMounted] = useState(false);
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sortedHistory = [...history].reverse();

  const markForSession = (markLevel: string) => MARKS.find(m => m.level === markLevel);

  return (
    <main className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Histórico</h1>
          <p className="text-sm text-muted-foreground">
            {sortedHistory.length} {sortedHistory.length === 1 ? 'sessão' : 'sessões'} registrada{sortedHistory.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {sortedHistory.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p>Nenhuma sessão registrada ainda.</p>
            <p className="text-sm">Complete seu primeiro cronômetro para ver o histórico.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sortedHistory.map((session, displayIndex) => {
            const originalIndex = history.length - 1 - displayIndex;
            const mark = markForSession(session.mark);
            const minutes = session.minutes;
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            const timeStr = hours > 0
              ? `${hours}h ${mins > 0 ? `${mins}min` : ''}`
              : `${mins}min`;

            return (
              <Card key={originalIndex} className="relative overflow-hidden">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="text-sm font-medium">{formatDate(session.date)}</span>
                      <span className="text-xs text-muted-foreground">{formatTimeOfDay(session.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-lg font-mono font-bold">{timeStr}</span>
                      {mark && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${mark.color} flex items-center gap-1`}>
                          <Flame className="w-3 h-3 fill-current" />
                          {mark.label}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      asChild
                    >
                      <Link href={`/timer?resume=${minutes}`}>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Retomar
                      </Link>
                    </Button>

                    <Dialog open={confirmIndex === originalIndex} onOpenChange={(open) => !open && setConfirmIndex(null)}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => setConfirmIndex(originalIndex)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Excluir sessão?</DialogTitle>
                          <DialogDescription>
                            Esta sessão de <strong>{timeStr}</strong> ({formatDateShort(session.date)} às {formatTimeOfDay(session.date)}) será removida permanentemente.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="gap-2">
                          <Button variant="outline" onClick={() => setConfirmIndex(null)}>
                            Cancelar
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              removeSession(originalIndex);
                              setConfirmIndex(null);
                            }}
                          >
                            Excluir
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}
