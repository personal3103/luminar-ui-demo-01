import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Zap, Users, BookOpen, Clock, ShieldCheck, User, Settings } from "lucide-react";

export interface NavItemConfig {
  id: string;
  label: string;
  code: string;
  tag: string;
  path: string;
  icon: LucideIcon;
  side: "left" | "right";
}

export const LEFT_NAV_ITEMS: NavItemConfig[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    code: "01",
    tag: "SYS // METRICS",
    path: "/app/dashboard",
    icon: LayoutDashboard,
    side: "left",
  },
  {
    id: "sandbox",
    label: "Scenarios",
    code: "02",
    tag: "SIM // MATRIX",
    path: "/app/sandbox",
    icon: Zap,
    side: "left",
  },
  {
    id: "roleplay",
    label: "Roleplay",
    code: "03",
    tag: "AGT // NEURAL",
    path: "/app/roleplay",
    icon: Users,
    side: "left",
  },
];

export const RIGHT_NAV_ITEMS: NavItemConfig[] = [
  {
    id: "toolkit",
    label: "Toolkit",
    code: "04",
    tag: "LIB // PROTOCOL",
    path: "/app/toolkit",
    icon: BookOpen,
    side: "right",
  },
  {
    id: "review",
    label: "History Logs",
    code: "05",
    tag: "AUD // RECORDS",
    path: "/app/review",
    icon: Clock,
    side: "right",
  },
  {
    id: "b2b",
    label: "Team Overview",
    code: "06",
    tag: "ORG // ROSTER",
    path: "/app/b2b",
    icon: ShieldCheck,
    side: "right",
  },
];

export const EXTRA_NAV_ITEMS: NavItemConfig[] = [
  {
    id: "profile",
    label: "User Profile",
    code: "07",
    tag: "USR // IDENTITY",
    path: "/app/profile",
    icon: User,
    side: "left",
  },
  {
    id: "settings",
    label: "Settings",
    code: "08",
    tag: "CFG // PREFERENCES",
    path: "/app/settings",
    icon: Settings,
    side: "right",
  },
];

export const ALL_NAV_ITEMS: NavItemConfig[] = [
  ...LEFT_NAV_ITEMS,
  ...RIGHT_NAV_ITEMS,
  ...EXTRA_NAV_ITEMS,
];
