export type MarkLevel = 'NONE' | 'BRONZE' | 'SILVER' | 'GOLD' | 'EMERALD' | 'DIAMOND' | 'LEGENDARY' | 'ASCENSION';

export interface Mark {
  level: MarkLevel;
  label: string;
  percentage: number;
  heat: number;
  color: string;
}

export const MARKS: Mark[] = [
  { level: 'NONE', label: 'Nenhum', percentage: 0, heat: -2, color: 'text-muted-foreground' },
  { level: 'BRONZE', label: 'Bronze', percentage: 2, heat: 0, color: 'text-orange-400' },
  { level: 'SILVER', label: 'Prata', percentage: 10, heat: 0, color: 'text-slate-400' },
  { level: 'GOLD', label: 'Ouro', percentage: 25, heat: 2, color: 'text-yellow-400' },
  { level: 'EMERALD', label: 'Esmeralda', percentage: 50, heat: 3, color: 'text-emerald-400' },
  { level: 'DIAMOND', label: 'Diamante', percentage: 80, heat: 3, color: 'text-blue-400' },
  { level: 'LEGENDARY', label: 'Lendário', percentage: 100, heat: 4, color: 'text-purple-400' },
  { level: 'ASCENSION', label: 'Ascensão', percentage: 120, heat: 5, color: 'text-rose-500' },
];

export const TROPHIES = [
  { phase: 1, name: 'Ignição', items: [
    { name: 'Faísca', threshold: 5 },
    { name: 'Brasa', threshold: 15 },
    { name: 'Chama', threshold: 25 },
    { name: 'Fogueira', threshold: 40 },
  ]},
  { phase: 2, name: 'Chama', items: [
    { name: 'Tocha', threshold: 60 },
    { name: 'Pira', threshold: 100 },
    { name: 'Vulcão', threshold: 150 },
  ]},
  { phase: 3, name: 'Inferno', items: [
    { name: 'Fornalha', threshold: 200 },
    { name: 'Magma', threshold: 275 },
    { name: 'Sol', threshold: 400 },
  ]},
];
