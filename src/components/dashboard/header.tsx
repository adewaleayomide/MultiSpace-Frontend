"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  mockCurrentUser,
  mockCurrentWorkspace,
  User,
  Workspace,
} from "@/app/(platform)/dashboard/dashboard-data";
import { UserPlus, ChevronDown } from "lucide-react";
import { useState } from "react";

interface EnhancedHeaderProps {
  user?: User;
  workspace?: Workspace;
  onInviteClick?: () => void;
}

export function EnhancedHeader({
  user = mockCurrentUser,
  workspace = mockCurrentWorkspace,
  onInviteClick,
}: EnhancedHeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
      {/* Left: Workspace Title */}
      <div>
        <h2 className="text-lg font-bold text-foreground uppercase tracking-wider">
          {workspace.name}
        </h2>
      </div>

      {/* Right: User Profile & Invite */}
      <div className="flex items-center gap-4">
        {/* Invite Team Members Button */}
        <Button
          onClick={onInviteClick}
          variant="outline"
          className="flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Invite Team Members
        </Button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
            </Avatar>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user.role}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-border">
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="p-2">
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                >
                  Preferences
                </button>
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                >
                  Workspace Settings
                </button>
              </div>
              <div className="p-2 border-t border-border">
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full text-left px-3 py-2 text-sm text-destructive hover:text-destructive hover:bg-destructive/10 rounded transition-colors font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
