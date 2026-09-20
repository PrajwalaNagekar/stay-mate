"use client";

import { useState } from "react";
import Link from "next/link";

export default function NotificationsPage() {
  const [audience, setAudience] = useState<"all" | "selected">("all");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const users = [
    { id: "1", name: "Rahul Sharma", email: "rahul@gmail.com" },
    { id: "2", name: "Priya Patel", email: "priya@gmail.com" },
    { id: "3", name: "Arjun Kumar", email: "arjun@gmail.com" },
    { id: "4", name: "Neha Singh", email: "neha@gmail.com" },
  ];

  const toggleUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-slate-500 transition hover:text-slate-900"
        >
          Dashboard
        </Link>

        <span className="text-slate-400">/</span>

        <span className="font-medium text-slate-900">
          Notifications
        </span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Notifications
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Send notifications and important updates to your users.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Form Section */}
        <div className="xl:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Create Notification
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Compose a notification and choose who should receive it.
            </p>

            {/* Title */}
            <div className="mt-6">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Notification Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notification title"
                maxLength={100}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
              />

              <div className="mt-1 text-right text-xs text-slate-400">
                {title.length}/100
              </div>
            </div>

            {/* Body */}
            <div className="mt-4">
              <label
                htmlFor="body"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Notification Body
              </label>

              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your notification message..."
                rows={6}
                maxLength={500}
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
              />

              <div className="mt-1 text-right text-xs text-slate-400">
                {body.length}/500
              </div>
            </div>

            {/* Audience */}
            <div className="mt-6">
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Publish To
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* All Users */}
                <button
                  type="button"
                  onClick={() => setAudience("all")}
                  className={`rounded-lg border p-4 text-left transition ${
                    audience === "all"
                      ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border ${
                        audience === "all"
                          ? "border-slate-900"
                          : "border-slate-300"
                      }`}
                    >
                      {audience === "all" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-slate-900" />
                      )}
                    </div>

                    <div>
                      <p className="font-medium text-slate-900">
                        All Users
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Send this notification to all registered users.
                      </p>
                    </div>
                  </div>
                </button>

                {/* Selected Users */}
                <button
                  type="button"
                  onClick={() => setAudience("selected")}
                  className={`rounded-lg border p-4 text-left transition ${
                    audience === "selected"
                      ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border ${
                        audience === "selected"
                          ? "border-slate-900"
                          : "border-slate-300"
                      }`}
                    >
                      {audience === "selected" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-slate-900" />
                      )}
                    </div>

                    <div>
                      <p className="font-medium text-slate-900">
                        Selected Users
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Send this notification to specific users.
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* User Selection */}
            {audience === "selected" && (
              <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Select Users
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Choose the users who should receive this notification.
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                    {selectedUsers.length} selected
                  </span>
                </div>

                {/* Search */}
                <input
                  type="text"
                  placeholder="Search users..."
                  className="mb-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />

                {/* Users */}
                <div className="max-h-56 overflow-y-auto rounded-lg border border-slate-200 bg-white">
                  {users.map((user) => {
                    const selected = selectedUsers.includes(user.id);

                    return (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => toggleUser(user.id)}
                        className="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3 text-left last:border-b-0 hover:bg-slate-50"
                      >
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded border ${
                            selected
                              ? "border-slate-900 bg-slate-900"
                              : "border-slate-300"
                          }`}
                        >
                          {selected && (
                            <svg
                              className="h-3.5 w-3.5 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.415 0l-3.25-3.25a1 1 0 011.415-1.42l2.543 2.544 6.543-6.544a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {user.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {user.email}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
              <button
                type="button"
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={
                  !title.trim() ||
                  !body.trim() ||
                  (audience === "selected" &&
                    selectedUsers.length === 0)
                }
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send Notification
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <div className="sticky top-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Preview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              This is how the notification will appear to users.
            </p>

            {/* Notification Preview */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {title || "Notification title"}
                  </p>

                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    {body ||
                      "Your notification message will appear here."}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Just now
                  </p>
                </div>
              </div>
            </div>

            {/* Audience Summary */}
            <div className="mt-5 rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Audience
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {audience === "all"
                  ? "All Users"
                  : `${selectedUsers.length} Selected User${
                      selectedUsers.length !== 1 ? "s" : ""
                    }`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}