"use client";

import { Card } from "@/components/ui/card";
import { NotificationItem } from "@/app/(platform)/dashboard/dashboard-data";
import { Bell, Check, MoreHorizontal } from "lucide-react";

interface NotificationsPanelProps {
  notifications?: NotificationItem[];
  onMarkAllRead?: () => void;
  onViewAll?: () => void;
}

export function NotificationsPanel({
  notifications = [],
  onMarkAllRead,
  onViewAll,
}: NotificationsPanelProps) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (!notifications || notifications.length === 0) {
    return (
      <Card className="p-6 bg-card border-border h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Bell className="w-5 h-5" />
            NOTIFICATIONS PANEL
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-muted-foreground">No notifications</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-border h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Bell className="w-5 h-5" />
          NOTIFICATIONS PANEL
          {unreadCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 text-red-600 text-xs font-semibold">
              {unreadCount}
            </span>
          )}
        </h2>
      </div>

      <div className="flex-1 space-y-3 min-h-0 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border transition-colors ${
              notification.isRead
                ? "bg-background/50 border-border/50"
                : "bg-muted/50 border-border hover:bg-muted"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: notification.color }}
                aria-hidden="true"
              ></div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                  {notification.team}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {notification.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {notification.description}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {notification.timestamp}
                </p>
              </div>
              {!notification.isRead && (
                <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
        <button
          onClick={onMarkAllRead}
          className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <Check className="w-3.5 h-3.5" />
          Mark All As Read
        </button>
        <button
          onClick={onViewAll}
          className="text-xs font-medium text-muted-foreground hover:text-foreground ml-auto transition-colors"
        >
          View All →
        </button>
      </div>
    </Card>
  );
}
