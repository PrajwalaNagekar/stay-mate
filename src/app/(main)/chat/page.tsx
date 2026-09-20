"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type TicketStatus = "Open" | "Pending" | "Resolved";

type Conversation = {
  id: string;
  ticketId: string;
  name: string;
  email: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: TicketStatus;
  online: boolean;
  category: string;
  assignedTo: string;
  assignedEmail: string;
};

type Message = {
  id: number;
  sender: "user" | "admin";
  message: string;
  time: string;
};

type Admin = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  online: boolean;
};

export default function ChatPage() {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const [selectedUser, setSelectedUser] = useState("1");

  const [showAssignMenu, setShowAssignMenu] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");

  const [assignedAdmins, setAssignedAdmins] = useState<
    Record<string, string>
  >({
    "1": "1",
    "2": "2",
    "3": "1",
    "4": "2",
    "5": "3",
    "6": "2",
  });

  const conversations: Conversation[] = [
    {
      id: "1",
      ticketId: "TKT-1024",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      avatar: "RS",
      lastMessage: "I am unable to contact my flatmate.",
      time: "10:42 AM",
      unread: 2,
      status: "Open",
      online: true,
      category: "Flatmate",
      assignedTo: "Admin",
      assignedEmail: "admin@company.com",
    },
    {
      id: "2",
      ticketId: "TKT-1023",
      name: "Priya Patel",
      email: "priya@gmail.com",
      avatar: "PP",
      lastMessage: "My verification is still pending.",
      time: "10:25 AM",
      unread: 1,
      status: "Open",
      online: true,
      category: "Verification",
      assignedTo: "Support Team",
      assignedEmail: "support@company.com",
    },
    {
      id: "3",
      ticketId: "TKT-1022",
      name: "Arjun Kumar",
      email: "arjun@gmail.com",
      avatar: "AK",
      lastMessage: "I want to report this user.",
      time: "09:45 AM",
      unread: 0,
      status: "Pending",
      online: false,
      category: "Report",
      assignedTo: "Admin",
      assignedEmail: "admin@company.com",
    },
    {
      id: "4",
      ticketId: "TKT-1021",
      name: "Neha Singh",
      email: "neha@gmail.com",
      avatar: "NS",
      lastMessage: "Thank you for resolving my issue.",
      time: "Yesterday",
      unread: 0,
      status: "Resolved",
      online: false,
      category: "Account",
      assignedTo: "Support Team",
      assignedEmail: "support@company.com",
    },
    {
      id: "5",
      ticketId: "TKT-1020",
      name: "Amit Verma",
      email: "amit@gmail.com",
      avatar: "AV",
      lastMessage: "I received the wrong notification.",
      time: "Yesterday",
      unread: 0,
      status: "Open",
      online: false,
      category: "Notifications",
      assignedTo: "Priya - Support",
      assignedEmail: "priya@company.com",
    },
    {
      id: "6",
      ticketId: "TKT-1019",
      name: "Sneha Joshi",
      email: "sneha@gmail.com",
      avatar: "SJ",
      lastMessage: "Can I cancel my request?",
      time: "Monday",
      unread: 0,
      status: "Resolved",
      online: false,
      category: "Flatmate",
      assignedTo: "Support Team",
      assignedEmail: "support@company.com",
    },
  ];

  const admins: Admin[] = [
    {
      id: "1",
      name: "Admin",
      email: "admin@company.com",
      role: "Super Admin",
      avatar: "AD",
      online: true,
    },
    {
      id: "2",
      name: "Support Team",
      email: "support@company.com",
      role: "Support",
      avatar: "ST",
      online: true,
    },
    {
      id: "3",
      name: "Priya - Support",
      email: "priya@company.com",
      role: "Support Agent",
      avatar: "PS",
      online: true,
    },
    {
      id: "4",
      name: "Amit - Moderator",
      email: "amit@company.com",
      role: "Moderator",
      avatar: "AM",
      online: false,
    },
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: "user",
      message:
        "Hello, I am unable to contact the flatmate who accepted my request.",
      time: "10:35 AM",
    },
    {
      id: 2,
      sender: "user",
      message:
        "I tried sending a message but it is not going through.",
      time: "10:36 AM",
    },
    {
      id: 3,
      sender: "admin",
      message:
        "Hi Rahul, thanks for reaching out. I'll check this issue for you.",
      time: "10:38 AM",
    },
    {
      id: 4,
      sender: "user",
      message:
        "Okay, thank you. Please let me know once it is fixed.",
      time: "10:42 AM",
    },
  ];

  const activeUser =
    conversations.find((user) => user.id === selectedUser) ??
    conversations[0];

  const activeAssignedAdmin =
    admins.find(
      (admin) => admin.id === assignedAdmins[activeUser.id]
    ) ?? admins[0];

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      conversation.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      conversation.lastMessage
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      conversation.ticketId
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const filteredAdmins = useMemo(() => {
    return admins.filter(
      (admin) =>
        admin.name
          .toLowerCase()
          .includes(adminSearch.toLowerCase()) ||
        admin.email
          .toLowerCase()
          .includes(adminSearch.toLowerCase()) ||
        admin.role
          .toLowerCase()
          .includes(adminSearch.toLowerCase())
    );
  }, [admins, adminSearch]);

  const handleSelectUser = (id: string) => {
    setSelectedUser(id);
    setShowAssignMenu(false);
    setAdminSearch("");
  };

  const handleAssignAdmin = (adminId: string) => {
    setAssignedAdmins((prev) => ({
      ...prev,
      [activeUser.id]: adminId,
    }));

    setShowAssignMenu(false);
    setAdminSearch("");

    // Later:
    // await assignTicket(activeUser.ticketId, adminId);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    console.log("Send message:", {
      ticketId: activeUser.ticketId,
      message,
    });

    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-48px)] min-h-0 flex-col">
      {/* Breadcrumb */}
      <div className="mb-4 flex shrink-0 items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-slate-500 transition hover:text-slate-900"
        >
          Dashboard
        </Link>

        <span className="text-slate-400">/</span>

        <span className="font-medium text-slate-900">
          Chat
        </span>
      </div>

      {/* Page Header */}
      <div className="mb-5 shrink-0">
        <h1 className="text-2xl font-bold text-slate-900">
          Chat
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage support conversations and user tickets.
        </p>
      </div>

      {/* Chat Application */}
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* =====================================================
            LEFT SIDEBAR
        ====================================================== */}
        <aside className="flex w-[360px] shrink-0 flex-col border-r border-slate-200">
          {/* Search */}
          <div className="border-b border-slate-200 p-4">
            <div className="relative">
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
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex shrink-0 gap-2 border-b border-slate-200 px-4 py-3">
            <button
              type="button"
              className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white"
            >
              All
            </button>

            <button
              type="button"
              className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100"
            >
              Unread
            </button>

            <button
              type="button"
              className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100"
            >
              Open
            </button>

            <button
              type="button"
              className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100"
            >
              Pending
            </button>
          </div>

          {/* Conversation List */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <svg
                    className="h-5 w-5 text-slate-400"
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
                </div>

                <p className="mt-3 text-sm font-medium text-slate-900">
                  No conversations found
                </p>
              </div>
            ) : (
              filteredConversations.map((conversation) => {
                const isSelected =
                  conversation.id === selectedUser;

                return (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() =>
                      handleSelectUser(conversation.id)
                    }
                    className={`flex w-full gap-3 border-b border-slate-100 px-4 py-4 text-left transition ${
                      isSelected
                        ? "bg-slate-100"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                        {conversation.avatar}
                      </div>

                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                      )}
                    </div>

                    {/* Conversation */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {conversation.name}
                        </p>

                        <span className="shrink-0 text-[11px] text-slate-400">
                          {conversation.time}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {conversation.lastMessage}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            conversation.status === "Open"
                              ? "bg-blue-50 text-blue-700"
                              : conversation.status ===
                                  "Pending"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {conversation.status}
                        </span>

                        {conversation.unread > 0 && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1.5 text-[10px] font-semibold text-white">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* =====================================================
            RIGHT CHAT AREA
        ====================================================== */}
        <main className="flex min-w-0 flex-1 flex-col">
          {/* Chat Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4">
            {/* User */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                  {activeUser.avatar}
                </div>

                {activeUser.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {activeUser.name}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {activeUser.online
                    ? "Online"
                    : activeUser.email}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex shrink-0 items-center gap-2">
              {/* =================================================
                  ASSIGN TICKET
              ================================================== */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowAssignMenu((prev) => !prev);
                    setAdminSearch("");
                  }}
                  className="hidden items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 sm:flex"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <span>
                    Assigned:{" "}
                    <span className="font-semibold">
                      {activeAssignedAdmin.name}
                    </span>
                  </span>

                  <svg
                    className="h-3.5 w-3.5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m6 9 6 6 6-6"
                    />
                  </svg>
                </button>

                {/* Assignment Dropdown */}
                {showAssignMenu && (
                  <div className="absolute right-0 top-11 z-50 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                    {/* Header */}
                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">
                        Assign Ticket
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Reassign this ticket to another agent.
                      </p>
                    </div>

                    {/* Search Admin */}
                    <div className="p-3">
                      <div className="relative">
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
                          placeholder="Search admin or agent..."
                          value={adminSearch}
                          onChange={(e) =>
                            setAdminSearch(e.target.value)
                          }
                          className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-xs outline-none focus:border-slate-900"
                        />
                      </div>
                    </div>

                    {/* Admin List */}
                    <div className="max-h-64 overflow-y-auto pb-2">
                      {filteredAdmins.map((admin) => {
                        const selected =
                          activeAssignedAdmin.id === admin.id;

                        return (
                          <button
                            key={admin.id}
                            type="button"
                            onClick={() =>
                              handleAssignAdmin(admin.id)
                            }
                            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                              selected
                                ? "bg-slate-50"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            {/* Avatar */}
                            <div className="relative shrink-0">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                                {admin.avatar}
                              </div>

                              {admin.online && (
                                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                              )}
                            </div>

                            {/* Details */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="truncate text-xs font-semibold text-slate-900">
                                  {admin.name}
                                </p>

                                {admin.id === "1" && (
                                  <span className="rounded bg-purple-50 px-1.5 py-0.5 text-[9px] font-medium text-purple-700">
                                    SUPER ADMIN
                                  </span>
                                )}
                              </div>

                              <p className="mt-0.5 truncate text-[11px] text-slate-500">
                                {admin.email}
                              </p>

                              <p className="mt-0.5 text-[10px] text-slate-400">
                                {admin.role}
                              </p>
                            </div>

                            {/* Selected */}
                            {selected && (
                              <svg
                                className="h-4 w-4 shrink-0 text-emerald-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="m5 12 4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>
                        );
                      })}

                      {filteredAdmins.length === 0 && (
                        <p className="px-4 py-5 text-center text-xs text-slate-500">
                          No admins found.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Info */}
              <button
                type="button"
                title="User information"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
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
                    d="M13 16h-1v-4h-1m1-4h.01M12 21a9 9 0 100-18 9 9 0 000 18z"
                  />
                </svg>
              </button>

              {/* More */}
              <button
                type="button"
                title="More options"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="5" cy="12" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="19" cy="12" r="1.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Ticket Information */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-2.5">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>
                Ticket:{" "}
                <span className="font-semibold text-slate-700">
                  #{activeUser.ticketId}
                </span>
              </span>

              <span className="hidden h-3 w-px bg-slate-300 sm:block" />

              <span className="hidden sm:block">
                Category:{" "}
                <span className="font-medium text-slate-700">
                  {activeUser.category}
                </span>
              </span>

              <span className="hidden md:block">
                Assigned to:{" "}
                <span className="font-medium text-slate-700">
                  {activeAssignedAdmin.name}
                </span>
              </span>
            </div>

            <button
              type="button"
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Mark Resolved
            </button>
          </div>

          {/* =====================================================
              MESSAGES
          ====================================================== */}
          <div className="min-h-0 flex-1 overflow-y-auto bg-[#f8fafc] px-6 py-6">
            <div className="mx-auto max-w-3xl space-y-5">
              {/* Date */}
              <div className="flex justify-center">
                <span className="rounded-full bg-white px-3 py-1 text-[11px] text-slate-400 shadow-sm">
                  Today
                </span>
              </div>

              {messages.map((msg) => {
                const isAdmin = msg.sender === "admin";

                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      isAdmin
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex max-w-[70%] flex-col ${
                        isAdmin
                          ? "items-end"
                          : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                          isAdmin
                            ? "rounded-br-md bg-slate-900 text-white"
                            : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {msg.message}
                      </div>

                      <span className="mt-1 px-1 text-[10px] text-slate-400">
                        {isAdmin && "You • "}
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              MESSAGE INPUT
          ====================================================== */}
          <div className="shrink-0 border-t border-slate-200 bg-white p-4">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-end gap-2 rounded-xl border border-slate-300 bg-white p-2 shadow-sm transition focus-within:border-slate-900">
                {/* Attachment */}
                <button
                  type="button"
                  title="Attach file"
                  className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
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
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 00-5.657-5.657l-6.586 6.586a6 6 0 108.485 8.485L18.5 13"
                    />
                  </svg>
                </button>

                {/* Textarea */}
                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !e.shiftKey
                    ) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={1}
                  placeholder="Type your message..."
                  className="max-h-32 min-h-[38px] flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

                {/* Send */}
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
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
                      d="M5 12h14M13 6l6 6-6 6"
                    />
                  </svg>
                </button>
              </div>

              <p className="mt-2 text-[10px] text-slate-400">
                Press Enter to send • Shift + Enter for a new
                line
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}