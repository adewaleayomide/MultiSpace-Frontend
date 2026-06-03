"use client";

import { Card } from "@/components/ui/card";
import { ActivityItem } from "@/app/(platform)/dashboard/dashboard-data";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";

interface ActivityFeedProps {
  activities?: ActivityItem[];
  onViewMore?: () => void;
}

export function ActivityFeed({
  activities = [],
  onViewMore,
}: ActivityFeedProps) {
  if (!activities || activities.length === 0) {
    return (
      <Card className="p-6 bg-card border-border">
        <h2 className="text-lg font-bold text-foreground mb-4">
          RECENT ACTIVITY FEED
        </h2>
        <div className="text-center py-12">
          <p className="text-muted-foreground">No recent activities</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-border flex flex-col h-full">
      <h2 className="text-lg font-bold text-foreground mb-4">
        RECENT ACTIVITY FEED
      </h2>

      <div className="space-y-4 flex-1">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 pb-4 border-b border-border/50 last:border-b-0 last:pb-0"
          >
            <Avatar className="w-8 h-8 shrink-0 mt-1">
              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
              <AvatarFallback className="text-xs">
                {activity.user.initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1 flex-wrap">
                <p className="font-medium text-foreground text-sm">
                  {activity.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
                <p className="font-medium text-foreground text-sm">
                  {activity.target}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onViewMore}
        className="mt-4 text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
      >
        <span>+ View More Activity</span>
      </button>
    </Card>
  );
}
