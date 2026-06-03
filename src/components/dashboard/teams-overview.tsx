"use client";

import { Card } from "@/components/ui/card";
import { Team } from "@/app/(platform)/dashboard/dashboard-data";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, Folder, CheckSquare2, ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface TeamsOverviewProps {
  teams?: Team[];
  onExpandDetails?: (teamId: string) => void;
}

function getTaskIcon(iconName: string): React.ReactNode {
  const icons: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
    Palette: LucideIcons.Palette,
    Code2: LucideIcons.Code2,
    TrendingUp: LucideIcons.TrendingUp,
    BarChart3: LucideIcons.BarChart3,
  };

  const Icon = icons[iconName] || LucideIcons.Folder;
  return <Icon className="w-6 h-6" />;
}

export function TeamsOverview({
  teams = [],
  onExpandDetails,
}: TeamsOverviewProps) {
  if (!teams || teams.length === 0) {
    return (
      <Card className="p-6 bg-card border-border">
        <h2 className="text-lg font-bold text-foreground mb-4">
          MULTIPLE TEAMS OVERVIEW
        </h2>
        <div className="text-center py-12">
          <p className="text-muted-foreground">No teams available</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">
        MULTIPLE TEAMS OVERVIEW
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((team) => (
          <Card
            key={team.id}
            className="p-5 bg-card border-border hover:shadow-md transition-shadow flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: team.color }}
                >
                  {getTaskIcon(team.icon)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{team.name}</h3>
                  {team.description && (
                    <p className="text-xs text-muted-foreground">
                      {team.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Member Avatars */}
            {team.members && team.members.length > 0 && (
              <div className="flex items-center gap-1 mb-4">
                <div className="flex -space-x-2">
                  {team.members.slice(0, 3).map((member) => (
                    <Avatar key={member.id} className="w-7 h-7 border">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                {team.members.length > 3 && (
                  <span className="text-xs text-muted-foreground ml-1">
                    +{team.members.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted/30 rounded-lg">
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  {team.memberCount}
                </p>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  {team.projectCount}
                </p>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  {team.taskCount}
                </p>
                <p className="text-xs text-muted-foreground">Tasks</p>
              </div>
            </div>

            {/* Current Projects */}
            {team.currentProjects && team.currentProjects.length > 0 && (
              <div className="mb-4 flex-1">
                <p className="text-xs font-semibold text-muted-foreground mb-2">
                  Current Projects
                </p>
                <ul className="space-y-1.5">
                  {team.currentProjects.slice(0, 3).map((project) => (
                    <li
                      key={project.id}
                      className="text-sm text-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0"></span>
                      {project.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action */}
            <button
              onClick={() => onExpandDetails?.(team.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors mt-auto pt-2"
            >
              <span>Expand Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
