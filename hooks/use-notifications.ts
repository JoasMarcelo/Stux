"use client";

import { useCallback, useRef } from "react";
import { getRandomMessage } from "@/lib/notification-messages";

function playNotificationSound() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.4);
    });

    ctx.close();
  } catch {}
}

export function useNotifications() {
  const permissionRef = useRef<NotificationPermission | null>(
    typeof Notification !== 'undefined' ? Notification.permission : null
  );

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;

    const result = await Notification.requestPermission();
    permissionRef.current = result;
    return result === 'granted';
  }, []);

  const sendNotification = useCallback(() => {
    if (!('Notification' in window)) return false;
    if (Notification.permission !== 'granted') return false;

    const msg = getRandomMessage();

    try {
      playNotificationSound();

      const n = new Notification(msg.title, {
        body: msg.body,
        icon: '/icon',
        tag: 'stux-reminder',
        silent: true,
      });

      n.onclick = () => {
        window.focus();
        n.close();
      };

      return true;
    } catch {
      return false;
    }
  }, []);

  return { requestPermission, sendNotification };
}
