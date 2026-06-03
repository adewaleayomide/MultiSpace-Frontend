// Type definitions for dashboard data
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
  role: "admin" | "member" | "collaborator";
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
}

export interface Team {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
  members: User[];
  memberCount: number;
  projectCount: number;
  taskCount: number;
  currentProjects: Project[];
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: "active" | "completed" | "archived";
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  assignees: User[];
  status: "overdue" | "upcoming" | "completed" | "archived";
  priority?: "high" | "medium" | "low";
}

export interface ActivityItem {
  id: string;
  user: User;
  action: string;
  target: string;
  timestamp: string;
  type: "update" | "create" | "merge" | "comment";
}

export interface NotificationItem {
  id: string;
  team: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  color: string;
}

// Mock Current User
export const mockCurrentUser: User = {
  id: "user-1",
  name: "James Mitchell",
  email: "james.mitchell@acmecorp.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  initials: "JM",
  role: "admin",
};

// Mock Workspaces
export const mockWorkspaces: Workspace[] = [
  {
    id: "ws-1",
    name: "Acme Corp. Product Team",
    slug: "acme-corp-product",
    description: "Main product development workspace",
  },
  {
    id: "ws-2",
    name: "Synergy Labs",
    slug: "synergy-labs",
    description: "Innovation and research projects",
  },
  {
    id: "ws-3",
    name: "New Venture Inc.",
    slug: "new-venture-inc",
    description: "Startup incubation and development",
  },
];

export const mockCurrentWorkspace: Workspace = mockWorkspaces[0];

// Mock Navigation Items
export const mockNavigationItems: NavigationItem[] = [
  {
    id: "nav-1",
    label: "Dashboard",
    icon: "LayoutDashboard",
    href: "/dashboard",
    isActive: true,
  },
  {
    id: "nav-2",
    label: "My Tasks",
    icon: "CheckSquare2",
    href: "/tasks",
  },
  {
    id: "nav-3",
    label: "Inbox",
    icon: "MessageSquare",
    href: "/inbox",
  },
  {
    id: "nav-4",
    label: "Reports",
    icon: "BarChart3",
    href: "/reports",
  },
  {
    id: "nav-5",
    label: "Search",
    icon: "Search",
    href: "/search",
  },
];

// Mock Teams
export const mockTeams: Team[] = [
  {
    id: "team-1",
    name: "Design",
    icon: "Palette",
    color: "#FF6B6B",
    description: "UI/UX Design Team",
    memberCount: 8,
    projectCount: 5,
    taskCount: 24,
    members: [
      {
        id: "u-1",
        name: "Sarah Chen",
        email: "sarah@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        initials: "SC",
        role: "member",
      },
      {
        id: "u-2",
        name: "Robert Kim",
        email: "robert@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
        initials: "RK",
        role: "member",
      },
      {
        id: "u-3",
        name: "Emma Davis",
        email: "emma@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        initials: "ED",
        role: "member",
      },
    ],
    currentProjects: [
      {
        id: "proj-1",
        name: "Dashboard V2",
        description: "Next generation dashboard redesign",
        status: "active",
      },
      {
        id: "proj-2",
        name: "Design System Update",
        description: "Component library refresh",
        status: "active",
      },
      {
        id: "proj-3",
        name: "Mobile App UI",
        description: "Mobile application interface",
        status: "active",
      },
    ],
  },
  {
    id: "team-2",
    name: "Engineering",
    icon: "Code2",
    color: "#4ECDC4",
    description: "Backend & Frontend Development",
    memberCount: 12,
    projectCount: 8,
    taskCount: 42,
    members: [
      {
        id: "u-4",
        name: "Mark Johnson",
        email: "mark@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark",
        initials: "MJ",
        role: "member",
      },
      {
        id: "u-5",
        name: "Lisa Wong",
        email: "lisa@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
        initials: "LW",
        role: "member",
      },
      {
        id: "u-6",
        name: "David Kumar",
        email: "david@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        initials: "DK",
        role: "member",
      },
    ],
    currentProjects: [
      {
        id: "proj-4",
        name: "API Integration Test",
        description: "Third-party API integration",
        status: "active",
      },
      {
        id: "proj-5",
        name: "OAuth Implementation",
        description: "OAuth 2.0 authentication",
        status: "active",
      },
      {
        id: "proj-6",
        name: "Database Migration",
        description: "PostgreSQL upgrade",
        status: "active",
      },
    ],
  },
  {
    id: "team-3",
    name: "Marketing",
    icon: "TrendingUp",
    color: "#FFB347",
    description: "Marketing & Growth",
    memberCount: 6,
    projectCount: 4,
    taskCount: 18,
    members: [
      {
        id: "u-7",
        name: "Jessica Lee",
        email: "jessica@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
        initials: "JL",
        role: "member",
      },
      {
        id: "u-8",
        name: "Tom Harris",
        email: "tom@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
        initials: "TH",
        role: "member",
      },
    ],
    currentProjects: [
      {
        id: "proj-7",
        name: "Q3 Launch Plan",
        description: "Product launch campaign",
        status: "active",
      },
      {
        id: "proj-8",
        name: "Social Media Strategy",
        description: "Content calendar and strategy",
        status: "active",
      },
    ],
  },
  {
    id: "team-4",
    name: "Data Analytics",
    icon: "BarChart3",
    color: "#9D84B7",
    description: "Analytics & Business Intelligence",
    memberCount: 4,
    projectCount: 3,
    taskCount: 12,
    members: [
      {
        id: "u-9",
        name: "Michael Chen",
        email: "michael@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        initials: "MC",
        role: "member",
      },
    ],
    currentProjects: [
      {
        id: "proj-9",
        name: "User Analytics Dashboard",
        description: "Real-time analytics",
        status: "active",
      },
      {
        id: "proj-10",
        name: "Performance Metrics",
        description: "KPI tracking system",
        status: "active",
      },
    ],
  },
];

// Mock Tasks
export const mockOverdueTasks: Task[] = [
  {
    id: "task-1",
    title: "Design system color tokens",
    dueDate: "May 15, 2026",
    assignees: [
      {
        id: "u-1",
        name: "Sarah Chen",
        email: "sarah@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        initials: "SC",
        role: "member",
      },
    ],
    status: "overdue",
    priority: "high",
  },
  {
    id: "task-2",
    title: "Review PR #433",
    dueDate: "May 16, 2026",
    assignees: [
      {
        id: "u-4",
        name: "Mark Johnson",
        email: "mark@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark",
        initials: "MJ",
        role: "member",
      },
    ],
    status: "overdue",
    priority: "high",
  },
  {
    id: "task-3",
    title: "Update documentation",
    dueDate: "May 20, 2026",
    assignees: [
      {
        id: "u-5",
        name: "Lisa Wong",
        email: "lisa@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
        initials: "LW",
        role: "member",
      },
    ],
    status: "overdue",
    priority: "medium",
  },
];

export const mockUpcomingTasks: Task[] = [
  {
    id: "task-4",
    title: "Complete client presentation",
    dueDate: "June 2, 2026",
    assignees: [
      {
        id: "u-7",
        name: "Jessica Lee",
        email: "jessica@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
        initials: "JL",
        role: "member",
      },
    ],
    status: "upcoming",
    priority: "high",
  },
  {
    id: "task-5",
    title: "Finalize Q3 roadmap",
    dueDate: "June 3, 2026",
    assignees: [
      {
        id: "u-6",
        name: "David Kumar",
        email: "david@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        initials: "DK",
        role: "member",
      },
    ],
    status: "upcoming",
    priority: "high",
  },
  {
    id: "task-6",
    title: "Deploy staging environment",
    dueDate: "June 4, 2026",
    assignees: [
      {
        id: "u-4",
        name: "Mark Johnson",
        email: "mark@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark",
        initials: "MJ",
        role: "member",
      },
      {
        id: "u-5",
        name: "Lisa Wong",
        email: "lisa@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
        initials: "LW",
        role: "member",
      },
    ],
    status: "upcoming",
    priority: "medium",
  },
  {
    id: "task-7",
    title: "User testing sessions",
    dueDate: "June 5, 2026",
    assignees: [
      {
        id: "u-2",
        name: "Robert Kim",
        email: "robert@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
        initials: "RK",
        role: "member",
      },
    ],
    status: "upcoming",
    priority: "medium",
  },
  {
    id: "task-8",
    title: "Security audit review",
    dueDate: "June 6, 2026",
    assignees: [
      {
        id: "u-9",
        name: "Michael Chen",
        email: "michael@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        initials: "MC",
        role: "member",
      },
    ],
    status: "upcoming",
    priority: "high",
  },
  {
    id: "task-9",
    title: "Analytics dashboard launch",
    dueDate: "June 7, 2026",
    assignees: [
      {
        id: "u-8",
        name: "Tom Harris",
        email: "tom@acmecorp.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
        initials: "TH",
        role: "member",
      },
    ],
    status: "upcoming",
    priority: "medium",
  },
];

// Mock Task Summary Stats
export const mockTaskSummary = {
  overdue: 14,
  thisWeek: 6,
  completed: 19,
  archived: 29,
};

// Mock Activities
export const mockActivities: ActivityItem[] = [
  {
    id: "activity-1",
    user: {
      id: "u-1",
      name: "Sarah Chen",
      email: "sarah@acmecorp.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      initials: "SC",
      role: "member",
    },
    action: "updated",
    target: "Color Palette",
    timestamp: "2 hours ago",
    type: "update",
  },
  {
    id: "activity-2",
    user: {
      id: "u-4",
      name: "Mark Johnson",
      email: "mark@acmecorp.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark",
      initials: "MJ",
      role: "member",
    },
    action: "merged",
    target: "OAuth PR #455",
    timestamp: "4 hours ago",
    type: "merge",
  },
  {
    id: "activity-3",
    user: {
      id: "u-6",
      name: "David Kumar",
      email: "david@acmecorp.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      initials: "DK",
      role: "member",
    },
    action: "created",
    target: "Q3 Launch Plan",
    timestamp: "6 hours ago",
    type: "create",
  },
  {
    id: "activity-4",
    user: {
      id: "u-3",
      name: "Emma Davis",
      email: "emma@acmecorp.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      initials: "ED",
      role: "member",
    },
    action: "commented on",
    target: "Responsive Design Task",
    timestamp: "1 day ago",
    type: "comment",
  },
  {
    id: "activity-5",
    user: {
      id: "u-5",
      name: "Lisa Wong",
      email: "lisa@acmecorp.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      initials: "LW",
      role: "member",
    },
    action: "updated",
    target: "API Documentation",
    timestamp: "1 day ago",
    type: "update",
  },
];

// Mock Notifications
export const mockNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    team: "Engineering",
    title: "PR #455 requires review",
    description: "Mark created a pull request that needs your review",
    timestamp: "30 minutes ago",
    isRead: false,
    color: "#4ECDC4",
  },
  {
    id: "notif-2",
    team: "Marketing",
    title: "David tagged you in launch plan",
    description: "You were mentioned in the Q3 Launch Plan document",
    timestamp: "2 hours ago",
    isRead: false,
    color: "#FFB347",
  },
  {
    id: "notif-3",
    team: "Design",
    title: "Sarah commented on onboarding flow",
    description: "New feedback on the user onboarding flow design",
    timestamp: "3 hours ago",
    isRead: true,
    color: "#FF6B6B",
  },
];
