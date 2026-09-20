"use client";

import { useMemo, useState } from "react";

type ReportStatus = "Open" | "Under Review" | "Resolved" | "Dismissed";
type ReportPriority = "High" | "Medium" | "Low";
type ReportType = "User" | "Post" | "Chat";

type Report = {
  id: string;
  reporter: string;
  reporterInitials: string;
  reportedUser: string;
  reportedInitials: string;
  type: ReportType;
  reason: string;
  description: string;
  location: string;
  priority: ReportPriority;
  status: ReportStatus;
  createdAt: string;
};

const reports: Report[] = [
  {
    id: "RPT-1024",
    reporter: "Priya Sharma",
    reporterInitials: "PS",
    reportedUser: "Rahul Verma",
    reportedInitials: "RV",
    type: "User",
    reason: "Fake profile",
    description:
      "The profile appears to contain false information and misleading details.",
    location: "Bangalore",
    priority: "High",
    status: "Open",
    createdAt: "10 min ago",
  },
  {
    id: "RPT-1023",
    reporter: "Amit Shah",
    reporterInitials: "AS",
    reportedUser: "Karan Mehta",
    reportedInitials: "KM",
    type: "Post",
    reason: "Inappropriate content",
    description:
      "The post contains content that does not follow the community guidelines.",
    location: "Mumbai",
    priority: "High",
    status: "Under Review",
    createdAt: "35 min ago",
  },
  {
    id: "RPT-1022",
    reporter: "Sneha Patil",
    reporterInitials: "SP",
    reportedUser: "Vikas Joshi",
    reportedInitials: "VJ",
    type: "Chat",
    reason: "Harassment",
    description:
      "User repeatedly sent unwanted messages after being asked to stop.",
    location: "Pune",
    priority: "High",
    status: "Open",
    createdAt: "1 hour ago",
  },
  {
    id: "RPT-1021",
    reporter: "Neha Singh",
    reporterInitials: "NS",
    reportedUser: "Arjun Kapoor",
    reportedInitials: "AK",
    type: "User",
    reason: "Spam",
    description:
      "Multiple promotional messages were sent to different users.",
    location: "Delhi",
    priority: "Medium",
    status: "Resolved",
    createdAt: "3 hours ago",
  },
  {
    id: "RPT-1020",
    reporter: "Rohit Kumar",
    reporterInitials: "RK",
    reportedUser: "Aditya Rao",
    reportedInitials: "AR",
    type: "Post",
    reason: "Incorrect information",
    description:
      "The property information appears to be inaccurate.",
    location: "Hyderabad",
    priority: "Medium",
    status: "Under Review",
    createdAt: "5 hours ago",
  },
  {
    id: "RPT-1019",
    reporter: "Pooja Nair",
    reporterInitials: "PN",
    reportedUser: "Manish Gupta",
    reportedInitials: "MG",
    type: "User",
    reason: "Suspicious activity",
    description:
      "The user account has unusual activity and multiple complaints.",
    location: "Chennai",
    priority: "Low",
    status: "Dismissed",
    createdAt: "Yesterday",
  },
];

export default function ReportsPage() {
  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] =
    useState<ReportStatus | "All">("All");

  const [selectedReport, setSelectedReport] =
    useState<Report | null>(null);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        report.id.toLowerCase().includes(searchValue) ||
        report.reporter.toLowerCase().includes(searchValue) ||
        report.reportedUser.toLowerCase().includes(searchValue) ||
        report.reason.toLowerCase().includes(searchValue) ||
        report.location.toLowerCase().includes(searchValue);

      const matchesFilter =
        activeFilter === "All" ||
        report.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const openReports = reports.filter(
    (report) => report.status === "Open"
  ).length;

  const underReviewReports = reports.filter(
    (report) => report.status === "Under Review"
  ).length;

  const resolvedReports = reports.filter(
    (report) => report.status === "Resolved"
  ).length;

  const highPriorityReports = reports.filter(
    (report) => report.priority === "High"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Dashboard</span>

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
              d="m9 5 7 7-7 7"
            />
          </svg>

          <span className="font-medium text-slate-900">
            Reports & Complaints
          </span>
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold text-slate-900">
            Reports & Complaints
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review user reports, complaints and reported content.
          </p>
        </div>
      </div>

      {/* STATS */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          title="Open Reports"
          value={openReports}
          icon="open"
        />

        <StatCard
          title="Under Review"
          value={underReviewReports}
          icon="review"
        />

        <StatCard
          title="Resolved"
          value={resolvedReports}
          icon="resolved"
        />

        <StatCard
          title="High Priority"
          value={highPriorityReports}
          icon="high"
        />

      </div>

      {/* MAIN CARD */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* TOOLBAR */}

        <div className="border-b border-slate-200 p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}

            <div className="relative w-full lg:max-w-md">

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
                placeholder="Search reports, users or reasons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white"
              />

            </div>

            {/* FILTER */}

            <div className="flex overflow-x-auto rounded-lg bg-slate-100 p-1">

              {(
                [
                  "All",
                  "Open",
                  "Under Review",
                  "Resolved",
                  "Dismissed",
                ] as const
              ).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition ${
                    activeFilter === filter
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {filter}
                </button>
              ))}

            </div>

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1050px]">

            <thead>

              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Report
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Reported User
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Type
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Reason
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Location
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Priority
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredReports.map((report) => (

                <tr
                  key={report.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >

                  {/* REPORT */}

                  <td className="px-5 py-4">

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {report.id}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Reported by {report.reporter}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {report.createdAt}
                      </p>
                    </div>

                  </td>

                  {/* REPORTED USER */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                        {report.reportedInitials}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {report.reportedUser}
                        </p>

                        <p className="text-xs text-slate-400">
                          {report.location}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* TYPE */}

                  <td className="px-5 py-4">

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {report.type}
                    </span>

                  </td>

                  {/* REASON */}

                  <td className="max-w-[220px] px-5 py-4">

                    <p className="truncate text-sm font-medium text-slate-700">
                      {report.reason}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-400">
                      {report.description}
                    </p>

                  </td>

                  {/* LOCATION */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <svg
                        className="h-4 w-4 text-slate-400"
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
                          strokeWidth={2}
                        />
                      </svg>

                      <span className="text-sm text-slate-600">
                        {report.location}
                      </span>

                    </div>

                  </td>

                  {/* PRIORITY */}

                  <td className="px-5 py-4">

                    <PriorityBadge
                      priority={report.priority}
                    />

                  </td>

                  {/* STATUS */}

                  <td className="px-5 py-4">

                    <StatusBadge
                      status={report.status}
                    />

                  </td>

                  {/* ACTION */}

                  <td className="px-5 py-4 text-right">

                    <button
                      onClick={() =>
                        setSelectedReport(report)
                      }
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {/* EMPTY */}

          {filteredReports.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">

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
                    d="M12 9v3m0 4h.01M10.3 3.8l-8 14A2 2 0 004 21h16a2 2 0 001.7-3.2l-8-14a2 2 0 00-3.4 0z"
                  />
                </svg>

              </div>

              <p className="font-medium text-slate-700">
                No reports found
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Try changing your search or filter.
              </p>

            </div>
          )}

        </div>

      </div>

      {/* ------------------------------------------------ */}
      {/* REPORT DETAILS DRAWER */}
      {/* ------------------------------------------------ */}

      {selectedReport && (
        <div className="fixed inset-0 z-50">

          {/* BACKDROP */}

          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSelectedReport(null)}
          />

          {/* DRAWER */}

          <div className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Report
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {selectedReport.id}
                </h2>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
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
                    d="M6 6l12 12M6 18L18 6"
                  />
                </svg>
              </button>

            </div>

            {/* CONTENT */}

            <div className="flex-1 overflow-y-auto p-6">

              {/* STATUS */}

              <div className="mb-6 flex items-center gap-2">
                <StatusBadge
                  status={selectedReport.status}
                />

                <PriorityBadge
                  priority={selectedReport.priority}
                />
              </div>

              {/* REASON */}

              <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Complaint reason
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {selectedReport.reason}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {selectedReport.description}
                </p>

              </div>

              {/* REPORTER */}

              <div className="mb-6">

                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Reported by
                </p>

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                    {selectedReport.reporterInitials}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {selectedReport.reporter}
                    </p>

                    <p className="text-xs text-slate-500">
                      {selectedReport.location}
                    </p>
                  </div>

                </div>

              </div>

              {/* REPORTED USER */}

              <div className="mb-6">

                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Reported user
                </p>

                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                      {selectedReport.reportedInitials}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {selectedReport.reportedUser}
                      </p>

                      <p className="text-xs text-slate-500">
                        {selectedReport.type} report
                      </p>
                    </div>

                  </div>

                  <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                    View User
                  </button>

                </div>

              </div>

              {/* LOCATION */}

              <div className="mb-6">

                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Location
                </p>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">

                    <svg
                      className="h-4 w-4 text-slate-500"
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
                        strokeWidth={2}
                      />
                    </svg>

                  </div>

                  <span className="text-sm font-medium text-slate-700">
                    {selectedReport.location}
                  </span>

                </div>

              </div>

              {/* CREATED */}

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Reported
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {selectedReport.createdAt}
                </p>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="border-t border-slate-200 p-5">

              <div className="grid grid-cols-2 gap-3">

                <button
                  onClick={() =>
                    setSelectedReport(null)
                  }
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>

                <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
                  Take Action
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* ------------------------------------------------ */
/* STATUS BADGE */
/* ------------------------------------------------ */

function StatusBadge({
  status,
}: {
  status: ReportStatus;
}) {
  const styles = {
    Open: "bg-red-50 text-red-700",
    "Under Review": "bg-yellow-50 text-yellow-700",
    Resolved: "bg-green-50 text-green-700",
    Dismissed: "bg-slate-100 text-slate-500",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* ------------------------------------------------ */
/* PRIORITY BADGE */
/* ------------------------------------------------ */

function PriorityBadge({
  priority,
}: {
  priority: ReportPriority;
}) {
  const styles = {
    High: "bg-red-50 text-red-700",
    Medium: "bg-orange-50 text-orange-700",
    Low: "bg-slate-100 text-slate-500",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

/* ------------------------------------------------ */
/* STAT CARD */
/* ------------------------------------------------ */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: "open" | "review" | "resolved" | "high";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">

          {icon === "open" && (
            <svg
              className="h-5 w-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                strokeWidth={2}
              />

              <path
                strokeLinecap="round"
                strokeWidth={2}
                d="M12 8v4l2.5 2"
              />
            </svg>
          )}

          {icon === "review" && (
            <svg
              className="h-5 w-5 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                strokeWidth={2}
              />

              <path
                strokeLinecap="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01"
              />
            </svg>
          )}

          {icon === "resolved" && (
            <svg
              className="h-5 w-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4"
              />

              <circle
                cx="12"
                cy="12"
                r="9"
                strokeWidth={2}
              />
            </svg>
          )}

          {icon === "high" && (
            <svg
              className="h-5 w-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3l9 16H3L12 3z"
              />

              <path
                strokeLinecap="round"
                strokeWidth={2}
                d="M12 9v4m0 3h.01"
              />
            </svg>
          )}

        </div>

      </div>

    </div>
  );
}