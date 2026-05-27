import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MarkLevel } from '../lib/constants';

export interface StudySession {
  date: string; // ISO string
  minutes: number;
  mark: MarkLevel;
}

interface StuxState {
  heat: number;
  targetMinutes: number;
  history: StudySession[];
  lastStudyDate: string | null; // ISO string
  displayedTrophyThreshold: number;
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  scheduledHour: number | null;
  scheduledMinute: number;

  // Actions
  setTarget: (minutes: number) => void;
  addSession: (minutes: number, mark: MarkLevel) => void;
  removeSession: (index: number) => void;
  updateHeat: (delta: number) => void;
  setDisplayedTrophyThreshold: (threshold: number) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setScheduledTime: (hour: number | null, minute: number) => void;
  resetProgress: () => void;
  loadState: (state: Partial<StuxState>) => void;
}

export const useStuxStore = create<StuxState>()(
  persist(
    (set) => ({
      heat: 0,
      targetMinutes: 300, // 5 hours default
      history: [],
      lastStudyDate: null,
      displayedTrophyThreshold: 0,
      theme: 'light',
      notificationsEnabled: false,
      scheduledHour: null,
      scheduledMinute: 0,

      setTarget: (minutes) => set({ targetMinutes: minutes }),
      
      addSession: (minutes, mark) => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const newSession: StudySession = {
          date: new Date().toISOString(),
          minutes,
          mark
        };
        
        // Find if we already have a session for today in history to update it?
        // For simplicity, we just append and we'll calculate daily total in selectors if needed
        return {
          history: [...state.history, newSession],
          lastStudyDate: today
        };
      }),

      removeSession: (index) => set((state) => ({
        history: state.history.filter((_, i) => i !== index)
      })),

      setDisplayedTrophyThreshold: (threshold) => set({ displayedTrophyThreshold: threshold }),

      setTheme: (theme) => set({ theme }),

      setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),

      setScheduledTime: (scheduledHour, scheduledMinute) => set({ scheduledHour, scheduledMinute }),

      updateHeat: (delta) => set((state) => ({ heat: Math.max(0, state.heat + delta) })),
      
      resetProgress: () => set({ heat: 0, history: [], lastStudyDate: null }),

      loadState: (state) => set(state),
    }),
    {
      name: 'stux-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
