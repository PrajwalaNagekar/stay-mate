"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type UserStatus = "Active" | "Suspended" | "Pending" | "Blocked";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  status: UserStatus;
  verified: boolean;
  requirements: number;
  connections: number;
  joinedAt: string;
  lastActive: string;
};

export default function Users() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const users: User[] = [
    {
      id: "USR-1001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+91 98765 43210",
      avatar: "RS",
      location: "Koramangala, Bangalore",
      status: "Active",
      verified: true,
      requirements: 3,
      connections: 4,
      joinedAt: "18 Aug 2026",
      lastActive: "2 min ago",
    },
    {
      id: "USR-1002",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "+91 98234 12345",
      avatar: "PP",
      location: "HSR Layout, Bangalore",
      status: "Active",
      verified: true,
      requirements: 2,
      connections: 2,
      joinedAt: "16 Aug 2026",
      lastActive: "15 min ago",
    },
    {
      id: "USR-1003",
      name: "Arjun Kumar",
      email: "arjun@gmail.com",
      phone: "+91 97654 56789",
      avatar: "AK",
      location: "Indiranagar, Bangalore",
      status: "Pending",
      verified: false,
      requirements: 1,
      connections: 0,
      joinedAt: "20 Aug 2026",
      lastActive: "1 hour ago",
    },
    {
      id: "USR-1004",
      name: "Neha Singh",
      email: "neha@gmail.com",
      phone: "+91 98123 45678",
      avatar: "NS",
      location: "Whitefield, Bangalore",
      status: "Suspended",
      verified: true,
      requirements: 2,
      connections: 1,
      joinedAt: "10 Aug 2026",
      lastActive: "2 days ago",
    },
    {
      id: "USR-1005",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "+91 98987 65432",
      avatar: "AV",
      location: "Andheri West, Mumbai",
      status: "Active",
      verified: true,
      requirements: 4,
      connections: 5,
      joinedAt: "05 Aug 2026",
      lastActive: "3 hours ago",
    },
    {
      id: "USR-1006",
      name: "Sneha Joshi",
      email: "sneha@gmail.com",
      phone: "+91 98765 11122",
      avatar: "SJ",
      location: "Baner, Pune",
      status: "Blocked",
      verified: false,
      requirements: 1,
      connections: 0,
      joinedAt: "02 Aug 2026",
      lastActive: "5 days ago",
    },
    {
      id: "USR-1007",
      name: "Karan Mehta",
      email: "karan@gmail.com",
      phone: "+91 99001 22334",
      avatar: "KM",
      location: "Powai, Mumbai",
      status: "Active",
      verified: true,
      requirements: 2,
      connections: 3,
      joinedAt: "28 Jul 2026",
      lastActive: "30 min ago",
    },
    {
      id: "USR-1008",
      name: "Ananya Rao",
      email: "ananya@gmail.com",
      phone: "+91 98876 54321",
      avatar: "AR",
      location: "Whitefield, Bangalore",
      status: "Pending",
      verified: false,
      requirements: 1,
      connections: 0,
      joinedAt: "21 Aug 2026",
      lastActive: "4 hours ago",
    },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.phone
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.location
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.id
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const statusStyles: Record<UserStatus, string> = {
    Active: "bg-emerald-50 text-emerald-700",
    Suspended: "bg-amber-50 text-amber-700",
    Pending: "bg-blue-50 text-blue-700",
    Blocked: "bg-red-50 text-red-700",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* =====================================================
          BREADCRUMB
      ====================================================== */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-slate-500 transition hover:text-slate-900"
        >
          Dashboard
        </Link>

        <span className="text-slate-400">/</span>

        <span className="font-medium text-slate-900">
          Users
        </span>
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Users
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage registered users, verification and account
            status.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>

          Add User
        </button>
      </div>

      {/* =====================================================
          STATISTICS
      ====================================================== */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Users"
          value="12,450"
          description="+8.2% this month"
          icon="users"
        />

        <StatCard
          title="Active Users"
          value="9,842"
          description="79.1% of total"
          icon="active"
        />

        <StatCard
          title="Pending Verification"
          value="324"
          description="Needs attention"
          icon="pending"
        />

        <StatCard
          title="Suspended"
          value="86"
          description="0.7% of total"
          icon="suspended"
        />
      </div>

      {/* =====================================================
          USERS TABLE
      ====================================================== */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Search + Filters */}
        <div className="border-b border-slate-200 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            {/* Search */}
            <div className="relative w-full xl:max-w-md">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by name, email, phone or location..."
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                "All",
                "Active",
                "Pending",
                "Suspended",
                "Blocked",
              ].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    setStatusFilter(status)
                  }
                  className={`rounded-lg px-3.5 py-2 text-xs font-medium transition ${
                    statusFilter === status
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  User
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Location
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Verification
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Requirements
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Connections
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Last Active
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="transition hover:bg-slate-50"
                >
                  {/* User */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                        {user.avatar}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {user.name}
                          </p>

                          {user.verified && (
                            <span
                              title="Verified user"
                              className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white"
                            >
                              ✓
                            </span>
                          )}
                        </div>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {user.email}
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          {user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 shrink-0 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
                        />

                        <circle
                          cx="12"
                          cy="10"
                          r="2.5"
                        />
                      </svg>

                      <span className="text-sm text-slate-600">
                        {user.location}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[user.status]}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Verification */}
                  <td className="px-5 py-4">
                    {user.verified ? (
                      <div className="flex items-center gap-1.5 text-sm text-emerald-600">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[10px]">
                          ✓
                        </span>

                        Verified
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-sm text-amber-600">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-[10px]">
                          !
                        </span>

                        Pending
                      </div>
                    )}
                  </td>

                  {/* Requirements */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-slate-700">
                      {user.requirements}
                    </span>
                  </td>

                  {/* Connections */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-slate-700">
                      {user.connections}
                    </span>
                  </td>

                  {/* Last Active */}
                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-600">
                      {user.lastActive}
                    </p>

                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Joined {user.joinedAt}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/users/${user.id}`}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        View
                      </Link>

                      <button
                        type="button"
                        title={
                          user.status === "Active"
                            ? "Suspend user"
                            : "Activate user"
                        }
                        className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                          user.status === "Active"
                            ? "border-amber-200 text-amber-700 hover:bg-amber-50"
                            : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        }`}
                      >
                        {user.status === "Active"
                          ? "Suspend"
                          : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty */}
          {filteredUsers.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <svg
                  className="h-6 w-6 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m8-8a4 4 0 100-8 4 4 0 000 8zm6-3v6m3-3h-6"
                  />
                </svg>
              </div>

              <p className="mt-3 text-sm font-medium text-slate-900">
                No users found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </div>

        {/* =====================================================
            PAGINATION
        ====================================================== */}
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700">
              1–8
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-700">
              12,450
            </span>{" "}
            users
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-50"
            >
              Previous
            </button>

            <button
              type="button"
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white"
            >
              1
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
            >
              2
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
            >
              3
            </button>

            <span className="px-2 text-sm text-slate-400">
              ...
            </span>

            <button
              type="button"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: "users" | "active" | "pending" | "suspended";
}) {
  const icons = {
    users: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a4 4 0 00-4-4h-1m-4 6H7v-2a4 4 0 014-4h2a4 4 0 014 4v2zM12 10a4 4 0 100-8 4 4 0 000 8zm7-4a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),

    active: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),

    pending: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),

    suspended: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
    ),
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          {icons[icon]}
        </div>
      </div>
    </div>
  );
}