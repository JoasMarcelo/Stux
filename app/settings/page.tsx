"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Bell, BellOff, Clock, Download, Upload, Trash2 } from "lucide-react";
import { useStuxStore } from "@/hooks/use-stux-store";
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

export default function SettingsPage() {
  const { theme, setTheme, notificationsEnabled, setNotificationsEnabled, scheduledHour, scheduledMinute, setScheduledTime, resetProgress } = useStuxStore();
  const [mounted, setMounted] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  function handleExport() {
    const raw = localStorage.getItem('stux-storage');
    if (!raw) return;
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stux-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const content = ev.target?.result as string;
        JSON.parse(content);
        localStorage.setItem('stux-storage', content);
        setImportStatus('Importado! Recarregando...');
        setTimeout(() => window.location.reload(), 1000);
      } catch {
        setImportStatus('Arquivo inválido');
        setTimeout(() => setImportStatus(null), 3000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <main className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Sun className="w-5 h-5 text-orange-500" />
            Aparência
          </h2>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Tema</p>
              <p className="text-sm text-muted-foreground">
                {theme === 'light' ? 'Claro' : 'Escuro'}
              </p>
            </div>
            <div className="flex gap-1 bg-muted p-1 rounded-lg">
              <Button
                variant={theme === 'light' ? 'default' : 'ghost'}
                size="sm"
                className="gap-1.5"
                onClick={() => setTheme('light')}
              >
                <Sun className="w-4 h-4" />
                Claro
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'ghost'}
                size="sm"
                className="gap-1.5"
                onClick={() => setTheme('dark')}
              >
                <Moon className="w-4 h-4" />
                Escuro
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            {notificationsEnabled ? (
              <Bell className="w-5 h-5 text-orange-500" />
            ) : (
              <BellOff className="w-5 h-5 text-muted-foreground" />
            )}
            Notificações
          </h2>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Lembretes</p>
              <p className="text-sm text-muted-foreground">
                {notificationsEnabled
                  ? 'Receba lembretes para não esquecer de estudar'
                  : 'Lembretes desativados'}
              </p>
            </div>
            <Button
              variant={notificationsEnabled ? 'default' : 'outline'}
              size="sm"
              className="gap-1.5"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            >
              {notificationsEnabled ? (
                <><Bell className="w-4 h-4" /> Ativado</>
              ) : (
                <><BellOff className="w-4 h-4" /> Desativado</>
              )}
            </Button>
          </div>

          {notificationsEnabled && (
            <div className="pt-2 space-y-3 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    Horário programado
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {scheduledHour !== null
                      ? `Envia lembretes 30 min antes das ${String(scheduledHour).padStart(2, '0')}h${String(scheduledMinute).padStart(2, '0')}`
                      : 'Defina um horário para receber lembretes extras'}
                  </p>
                </div>
                <Button
                  variant={scheduledHour !== null ? 'default' : 'outline'}
                  size="sm"
                  className="gap-1.5"
                  onClick={() => {
                    if (scheduledHour !== null) {
                      setScheduledTime(null, 0);
                    } else {
                      const now = new Date();
                      setScheduledTime(now.getHours(), now.getMinutes());
                    }
                  }}
                >
                  {scheduledHour !== null ? 'Ativo' : 'Ativar'}
                </Button>
              </div>

              {scheduledHour !== null && (
                <div className="flex items-center gap-2">
                  <select
                    className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={scheduledHour}
                    onChange={(e) => setScheduledTime(Number(e.target.value), scheduledMinute)}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>{String(i).padStart(2, '0')}</option>
                    ))}
                  </select>
                  <span className="text-muted-foreground font-medium">h</span>
                  <select
                    className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={scheduledMinute}
                    onChange={(e) => setScheduledTime(scheduledHour, Number(e.target.value))}
                  >
                    {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
                      <option key={m} value={m}>{String(m).padStart(2, '0')}</option>
                    ))}
                  </select>
                  <span className="text-muted-foreground font-medium">min</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Download className="w-5 h-5" />
            Dados
          </h2>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Exportar dados</p>
              <p className="text-sm text-muted-foreground">
                Baixa um arquivo .json com todo seu progresso
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={handleExport}>
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Importar dados</p>
              <p className="text-sm text-muted-foreground">
                {importStatus || 'Restaura um backup .json (substitui todos os dados atuais)'}
              </p>
            </div>
            <label>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer" asChild>
                <span><Upload className="w-4 h-4" /> Importar</span>
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/20">
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-destructive">
            <Trash2 className="w-5 h-5" />
            Zona de Perigo
          </h2>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Resetar progresso</p>
              <p className="text-sm text-muted-foreground">
                Apaga todo o histórico, calor e troféus
              </p>
            </div>
            <Dialog open={confirmReset} onOpenChange={setConfirmReset}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Resetar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Resetar progresso?</DialogTitle>
                  <DialogDescription>
                    Todo seu histórico de sessões, calor da chama e troféus serão perdidos permanentemente.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setConfirmReset(false)}>
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      resetProgress();
                      setConfirmReset(false);
                    }}
                  >
                    Resetar tudo
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
