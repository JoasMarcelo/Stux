import { MARKS, Mark, MarkLevel } from './constants';

export function calculateMark(minutes: number, targetMinutes: number): Mark {
  const percentage = (minutes / targetMinutes) * 100;
  
  // Find the highest mark achieved
  // Reversing to check from highest to lowest
  const achievedMark = [...MARKS].reverse().find(mark => percentage >= mark.percentage);
  
  return achievedMark || MARKS[0]; // Fallback to NONE
}

export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const parts = [];
  if (hrs > 0) parts.push(hrs.toString().padStart(2, '0'));
  parts.push(mins.toString().padStart(2, '0'));
  parts.push(secs.toString().padStart(2, '0'));
  
  return parts.join(':');
}

export function getMinutesFromSeconds(seconds: number): number {
  return Math.floor(seconds / 60);
}

export const ALL_TROPHIES = [
  { name: 'Nenhum', threshold: 0 },
  { name: 'Faísca', threshold: 5 },
  { name: 'Brasa', threshold: 15 },
  { name: 'Chama', threshold: 25 },
  { name: 'Fogueira', threshold: 40 },
  { name: 'Tocha', threshold: 60 },
  { name: 'Pira', threshold: 100 },
  { name: 'Vulcão', threshold: 150 },
  { name: 'Fornalha', threshold: 200 },
  { name: 'Magma', threshold: 275 },
  { name: 'Sol', threshold: 400 },
];

export function getTrophy(heat: number) {
  return [...ALL_TROPHIES].reverse().find(t => heat >= t.threshold) || ALL_TROPHIES[0];
}

export function getNewTrophies(heat: number, lastThreshold: number) {
  return ALL_TROPHIES.filter(t => t.threshold > lastThreshold && t.threshold <= heat);
}
