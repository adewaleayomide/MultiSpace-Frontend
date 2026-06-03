"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  mockNavigationItems,
  mockTeams,
  mockWorkspaces,
  mockCurrentWorkspace,
  NavigationItem,
  Team,
  Workspace,
} from "@/app/(platform)/dashboard/dashboard-data";
import { ChevronDown, Plus, Shield } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";

interface SidebarNavProps {
  items?: NavigationItem[];
}

interface TeamListProps {
  teams?: Team[];
}

interface WorkspaceSwitcherProps {
  currentWorkspace?: Workspace;
  workspaces?: Workspace[];
  onWorkspaceChange?: (workspace: Workspace) => void;
}

function getIconComponent(iconName: string): React.ComponentType<React.SVGProps<SVGSVGElement>> {
  const icons: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
    LayoutDashboard: LucideIcons.LayoutDashboard,
    CheckSquare2: LucideIcons.CheckSquare2,
    MessageSquare: LucideIcons.MessageSquare,
    BarChart3: LucideIcons.BarChart3,
    Search: LucideIcons.Search,
    Palette: LucideIcons.Palette,
    Code2: LucideIcons.Code2,
    TrendingUp: LucideIcons.TrendingUp,
  };

  return icons[iconName] || LucideIcons.Folder;
}

function SidebarNav({ items = mockNavigationItems }: SidebarNavProps) {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = getIconComponent(item.icon);
        return (
          <a
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              item.isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

function TeamsList({ teams = mockTeams }: TeamListProps) {
  return (
    <div className="space-y-1.5">
      {teams.map((team) => {
        const Icon = getIconComponent(team.icon);
        return (
          <button
            key={team.id}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-left"
          >
            <div
              className="w-4 h-4 rounded flex items-center justify-center text-white text-xs"
              style={{ backgroundColor: team.color }}
            >
              <Icon className="w-3 h-3" />
            </div>
            {team.name}
          </button>
        );
      })}
      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
        <Plus className="w-4 h-4" />
        Create New Team
      </button>
    </div>
  );
}

function WorkspaceSwitcher({
  currentWorkspace = mockCurrentWorkspace,
  workspaces = mockWorkspaces,
  onWorkspaceChange,
}: WorkspaceSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 pb-4 border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/50 hover:bg-muted text-sm font-medium text-foreground transition-colors"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Shield className="w-4 h-4 shrink-0" />
          <div className="text-left min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Workspace</p>
            <p className="text-sm font-semibold truncate">
              {currentWorkspace.name}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 space-y-1 p-2 bg-muted/20 rounded-lg max-h-48 overflow-y-auto">
          {workspaces.map((workspace) => (
            <button
              key={workspace.id}
              onClick={() => {
                onWorkspaceChange?.(workspace);
                setIsOpen(false);
              }}
              className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                workspace.id === currentWorkspace.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {workspace.name}
            </button>
          ))}
          <button className="w-full text-left px-2 py-1.5 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-2 mt-2 pt-2 border-t border-border">
            <Plus className="w-3.5 h-3.5" />
            + Create New Workspace
          </button>
        </div>
      )}
    </div>
  );
}

export function EnhancedSidebar() {
  return (
    <aside className="w-64 h-screen bg-background border-r border-border overflow-y-auto flex flex-col fixed left-0 top-0">
      {/* Logo Section */}
      <div className="p-4 border-b border-border">
        <div className="flex justify-start items-center gap-1">
          <Image src="/assets/favicon_io/favicon.ico" alt="logo" width={32} height={32} className="inline mr-2" />
          <h1 className="text-lg font-bold text-foreground">MultiSpace</h1>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Workspace Switcher */}
        <WorkspaceSwitcher />

        {/* Main Navigation */}
        <div>
          <SidebarNav />
        </div>

        {/* Teams Section */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-3">
            Teams
          </p>
          <TeamsList />
        </div>
      </div>
    </aside>
  );
}
