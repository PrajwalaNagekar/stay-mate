"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Posts",
    href: "/posts",
  },
  {
    name: "Users",
    href: "/users",
  },
  {
    name: "Friends",
    href: "/friends",
  },
  {
    name: "Groups",
    href: "/groups",
  },
  {
    name: "Chat",
    href: "/chat",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Remove authentication tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirect to login
    router.push("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <h1 className="text-xl font-bold text-slate-900">
          StayMate
        </h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button
          onClick={handleLogout}
          className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}