"use client";

import { useState } from "react";
import { TaskSummarySection } from "@/components/dashboard/task-summary";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { TeamsOverview } from "@/components/dashboard/teams-overview";
import { NotificationsPanel } from "@/components/dashboard/notifications-panel";
import {
  mockTaskSummary,
  mockOverdueTasks,
  mockUpcomingTasks,
  mockActivities,
  mockTeams,
  mockNotifications,
} from "./dashboard-data";

export default function DashboardPage() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isNotificationsRead, setIsNotificationsRead] = useState(false);

  const handleViewMoreActivity = () => {
    // Implementation for view more activity would go here
  };

  const handleExpandTeamDetails = (teamId: string) => {
    // Implementation for expanding team details would go here
  };

  const handleMarkAllRead = () => {
    setIsNotificationsRead(true);
  };

  const handleViewAllNotifications = () => {
    // Implementation for viewing all notifications would go here
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Task Summary Section */}
      <section>
        <TaskSummarySection
          overdueTasks={mockOverdueTasks}
          upcomingTasks={mockUpcomingTasks}
          completedCount={mockTaskSummary.completed}
          archivedCount={mockTaskSummary.archived}
          overdueCount={mockTaskSummary.overdue}
          thisWeekCount={mockTaskSummary.thisWeek}
        />
      </section>

      {/* Dashboard Grid: Activity Feed + Notifications */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ActivityFeed
            activities={mockActivities}
            onViewMore={handleViewMoreActivity}
          />
        </div>

        {/* Notifications Panel - Takes 1 column */}
        <div>
          <NotificationsPanel
            notifications={mockNotifications}
            onMarkAllRead={handleMarkAllRead}
            onViewAll={handleViewAllNotifications}
          />
        </div>
      </section>

      {/* Teams Overview Section */}
      <section>
        <TeamsOverview
          teams={mockTeams}
          onExpandDetails={handleExpandTeamDetails}
        />
      </section>
    </div>
  );
}
