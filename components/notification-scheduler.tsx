"use client";

import { useEffect, useRef } from "react";
import { useStuxStore } from "@/hooks/use-stux-store";
import { useNotifications } from "@/hooks/use-notifications";

const CHECK_INTERVAL = 30 * 60 * 1000;
const FIRST_DELAY = 5 * 60 * 1000;
const SCHEDULE_CHECK_INTERVAL = 30 * 1000;

export function NotificationScheduler() {
  const { history } = useStuxStore();
  const { requestPermission, sendNotification } = useNotifications();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scheduleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const notifiedRef = useRef(false);
  const askedRef = useRef(false);
  const preSessionSentRef = useRef(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const studiedToday = history.some(s => s.date.startsWith(today));
    notifiedRef.current = studiedToday;
    if (studiedToday) preSessionSentRef.current = true;
  });

  function checkSchedule() {
    const { scheduledHour, scheduledMinute, notificationsEnabled: ne, history: h } = useStuxStore.getState();
    if (!ne || scheduledHour === null) return;

    const todayNow = new Date().toISOString().split('T')[0];
    const studied = h.some(s => s.date.startsWith(todayNow));
    if (studied) {
      preSessionSentRef.current = true;
      return;
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const scheduledMinutes = scheduledHour * 60 + scheduledMinute;
    const windowStart = scheduledMinutes - 30;
    const windowEnd = scheduledMinutes;

    if (currentMinutes >= windowStart && currentMinutes < windowEnd && !preSessionSentRef.current) {
      sendNotification();
      preSessionSentRef.current = true;
    }

    if (currentMinutes >= windowEnd) {
      preSessionSentRef.current = false;
    }
  }

  useEffect(() => {
    if (askedRef.current) return;
    askedRef.current = true;

    const timer = setTimeout(() => {
      const { notificationsEnabled } = useStuxStore.getState();
      if (!notificationsEnabled) return;

      requestPermission().then((granted) => {
        if (!granted) return;

        if (!notifiedRef.current) {
          sendNotification();
          notifiedRef.current = true;
        }

        intervalRef.current = setInterval(() => {
          const { notificationsEnabled: ne, history: h } = useStuxStore.getState();
          if (!ne) return;

          const todayNow = new Date().toISOString().split('T')[0];
          const studied = h.some(s => s.date.startsWith(todayNow));
          if (!studied) {
            sendNotification();
          }
        }, CHECK_INTERVAL);

        scheduleIntervalRef.current = setInterval(checkSchedule, SCHEDULE_CHECK_INTERVAL);
      });
    }, FIRST_DELAY);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (scheduleIntervalRef.current) clearInterval(scheduleIntervalRef.current);
    };
  }, []);

  return null;
}
