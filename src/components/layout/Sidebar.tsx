"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  FileText,
  Users,
  Heart,
  UsersRound,
  MessageCircle,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Posts",
    href: "/posts",
    icon: FileText,
  },
  {
    name: "Users",
    href: "/users",
    icon: Users,
  },
  {
    name: "Friends",
    href: "/friends",
    icon: Heart,
  },
  {
    name: "Groups",
    href: "/groups",
    icon: UsersRound,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: MessageCircle,
  },
];

const quickActions = [
  {
    name: "Users",
    href: "/users",
    icon: Users,
  },
  {
    name: "Posts",
    href: "/posts",
    icon: FileText,
  },
  {
    name: "Groups",
    href: "/groups",
    icon: UsersRound,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    router.replace("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col overflow-y-auto bg-[#202e3e] text-white">
      {/* Logo */}
      <div className="flex h-[72px] shrink-0 items-center border-b border-white/10 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2d6dcc] font-bold text-white shadow-lg">
            S
          </div>

          <span className="text-xl font-bold tracking-tight">
            StayMate
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pt-5">
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex h-[76px] flex-col items-center justify-center rounded-md border transition-all ${
                  isActive
                    ? "border-[#3d7ed6] bg-[#2d6dcc] shadow-lg"
                    : "border-white/5 bg-[#27384b] hover:bg-[#30455b]"
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={1.7}
                />

                <span className="mt-2 text-xs font-medium text-slate-200">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="mt-6 px-3">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Main
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
                  isActive
                    ? "bg-[#2d6dcc] font-medium text-white shadow-sm"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon
                  size={19}
                  strokeWidth={1.7}
                />

                <span>{item.name}</span>

                {isActive && (
                  <ChevronRight
                    size={15}
                    strokeWidth={1.8}
                    className="ml-auto text-white/70"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Management */}
      <div className="mt-6 px-3">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Management
        </p>

        <Link
          href="/reports"
          className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
            pathname === "/reports"
              ? "bg-[#2d6dcc] text-white"
              : "text-slate-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <BarChart3
            size={19}
            strokeWidth={1.7}
          />

          <span>Reports</span>

          <span className="ml-auto rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold">
            12
          </span>
        </Link>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* System */}
      <div className="border-t border-white/10 px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          System
        </p>

        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <Settings
            size={19}
            strokeWidth={1.7}
          />

          <span>Settings</span>
        </Link>

        <button
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-300 transition hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut
            size={19}
            strokeWidth={1.7}
          />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}