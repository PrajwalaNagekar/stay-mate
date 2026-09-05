"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  Settings,
} from "lucide-react";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Admin Panel
          </p>

          <h1 className="text-lg font-semibold text-slate-800">
            StayMate
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="hidden w-full max-w-[420px] md:block">
        <div className="flex h-10 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">

          <input
            type="text"
            placeholder="Search users, posts, groups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-0 flex-1 px-4 text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />

          <button
            type="button"
            aria-label="Search"
            className="flex w-12 items-center justify-center bg-[#2d6dcc] text-white transition hover:bg-[#245bab]"
          >
            <Search
              size={18}
              strokeWidth={1.8}
            />
          </button>

        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <Bell
            size={19}
            strokeWidth={1.8}
          />

          {/* Notification indicator */}
          <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Settings */}
        <button
          type="button"
          aria-label="Settings"
          className="flex h-10 w-10 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <Settings
            size={19}
            strokeWidth={1.8}
          />
        </button>

        {/* Divider */}
        <div className="mx-2 h-8 w-px bg-slate-200" />

        {/* Admin */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-md px-2 py-1.5 transition hover:bg-slate-50"
        >
          {/* Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2d6dcc] text-xs font-bold text-white">
            AD
          </div>

          {/* Admin details */}
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-800">
              ADMIN
            </p>

            <p className="text-[11px] text-slate-400">
              Administrator
            </p>
          </div>
        </button>

      </div>
    </header>
  );
}