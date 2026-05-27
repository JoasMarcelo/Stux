"use client";

import { useCallback, useRef } from "react";
import { getRandomMessage } from "@/lib/notification-messages";

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
      const n = new Notification(msg.title, {
        body: msg.body,
        icon: '/favicon.ico',
        tag: 'stux-reminder',
        silent: false,
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
