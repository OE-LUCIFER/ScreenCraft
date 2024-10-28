import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
  timestamp: number;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: 'info' | 'success' | 'error') => {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: Date.now(),
    };
    setNotifications((prev) => [...prev, notification]);
    setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-white ${
            notification.type === 'success'
              ? 'bg-green-500'
              : notification.type === 'error'
              ? 'bg-red-500'
              : 'bg-blue-500'
          }`}
        >
          <Bell size={16} />
          <span>{notification.message}</span>
        </div>
      ))}
    </div>
  );
}