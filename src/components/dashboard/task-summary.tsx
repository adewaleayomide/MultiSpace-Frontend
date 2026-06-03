"use client";

import { Card } from "@/components/ui/card";
import { Task } from "@/app/(platform)/dashboard/dashboard-data";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AlertCircle, CheckCircle2, Archive } from "lucide-react";

interface TaskCardProps {
  label: string;
  count: number;
  tasks?: Task[];
  variant?: "large" | "compact";
  icon?: React.ReactNode;
}

function TaskCardContent({ tasks }: { tasks?: Task[] }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground text-sm">No tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.slice(0, 3).map((task) => (
        <div key={task.id} className="space-y-1">
          <p className="text-sm font-medium text-foreground line-clamp-1">
            {task.title}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{task.dueDate}</span>
            {task.assignees && task.assignees.length > 0 && (
          <div className="flex -space-x-2">
                {task.assignees.slice(0, 2).map((assignee) => (
                  <Avatar
                    key={assignee.id}
                    className="w-5 h-5 border border-background"
                  >
                    <AvatarImage src={assignee.avatar} alt={assignee.initials} />
                    <AvatarFallback className="text-xs">
                      {assignee.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TaskSummaryCard({
  label,
  count,
  tasks,
  variant = "large",
  icon,
}: TaskCardProps) {
  const isLarge = variant === "large" && tasks && tasks.length > 0;

  return (
    <Card className="p-6 flex flex-col h-full bg-card border-border hover:border-border/80 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && <div className="text-muted-foreground">{icon}</div>}
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {label}
          </h3>
        </div>
      </div>

      {isLarge ? (
        <>
          <div className="mb-4">
            <p className="text-4xl font-bold text-foreground">{count}</p>
          </div>
          <TaskCardContent tasks={tasks} />
        </>
      ) : (
        <div className="text-center py-6">
          <p className="text-3xl font-bold text-foreground mb-1">{count}</p>
          <p className="text-xs text-muted-foreground">Tasks</p>
        </div>
      )}
    </Card>
  );
}

interface TaskSummaryProps {
  overdueTasks?: Task[];
  upcomingTasks?: Task[];
  completedCount?: number;
  archivedCount?: number;
  overdueCount?: number;
  thisWeekCount?: number;
}

export function TaskSummarySection({
  overdueTasks = [],
  upcomingTasks = [],
  completedCount = 0,
  archivedCount = 0,
  overdueCount = 0,
  thisWeekCount = 0,
}: TaskSummaryProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">MY TASK SUMMARY</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overdue Tasks - Large */}
        <div className="lg:col-span-1">
          <TaskSummaryCard
            label="Overdue Tasks"
            count={overdueCount}
            tasks={overdueTasks}
            variant="large"
            icon={<AlertCircle className="w-4 h-4" />}
          />
        </div>

        {/* This Week's Deadlines */}
        <div className="lg:col-span-1">
          <TaskSummaryCard
            label={`This Week's Deadlines (${thisWeekCount})`}
            count={thisWeekCount}
            tasks={upcomingTasks}
            variant="large"
            icon={<AlertCircle className="w-4 h-4" />}
          />
        </div>

        {/* Completed Tasks */}
        <div className="lg:col-span-1">
          <TaskSummaryCard
            label="Completed Tasks"
            count={completedCount}
            variant="compact"
            icon={<CheckCircle2 className="w-4 h-4" />}
          />
        </div>

        {/* Archived Tasks */}
        <div className="lg:col-span-1">
          <TaskSummaryCard
            label="Archived Tasks"
            count={archivedCount}
            variant="compact"
            icon={<Archive className="w-4 h-4" />}
          />
        </div>
      </div>
    </div>
  );
}
