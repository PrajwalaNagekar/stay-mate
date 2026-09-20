"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";
import type { FeatureCollection } from "geojson";

// Load Globe only on client
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

type LocationStat = {
  id: number;
  city: string;
  country: string;
  lat: number;
  lng: number;
  posts: number;
  users: number;
};

type Post = {
  id: number;
  user: string;
  avatar: string;
  title: string;
  location: string;
  city: string;
  type: "Looking for Flatmate" | "Flat Available";
  status: "Active" | "Expired";
  createdAt: string;
};

// --------------------------------------------------
// SAMPLE LOCATION DATA
// Replace this with your API response later
// --------------------------------------------------

const locations: LocationStat[] = [
  {
    id: 1,
    city: "Bangalore",
    country: "India",
    lat: 12.9716,
    lng: 77.5946,
    posts: 128,
    users: 94,
  },
  {
    id: 2,
    city: "Mumbai",
    country: "India",
    lat: 19.076,
    lng: 72.8777,
    posts: 86,
    users: 71,
  },
  {
    id: 3,
    city: "Delhi",
    country: "India",
    lat: 28.6139,
    lng: 77.209,
    posts: 64,
    users: 52,
  },
  {
    id: 4,
    city: "Hyderabad",
    country: "India",
    lat: 17.385,
    lng: 78.4867,
    posts: 48,
    users: 39,
  },
  {
    id: 5,
    city: "Pune",
    country: "India",
    lat: 18.5204,
    lng: 73.8567,
    posts: 36,
    users: 31,
  },
  {
    id: 6,
    city: "Chennai",
    country: "India",
    lat: 13.0827,
    lng: 80.2707,
    posts: 22,
    users: 19,
  },
  {
    id: 7,
    city: "Kolkata",
    country: "India",
    lat: 22.5726,
    lng: 88.3639,
    posts: 17,
    users: 14,
  },
  {
    id: 8,
    city: "Ahmedabad",
    country: "India",
    lat: 23.0225,
    lng: 72.5714,
    posts: 12,
    users: 10,
  },
];

// --------------------------------------------------
// SAMPLE POSTS
// --------------------------------------------------

const posts: Post[] = [
  {
    id: 1,
    user: "Rahul Sharma",
    avatar: "RS",
    title: "Looking for a flatmate near Koramangala",
    location: "Koramangala",
    city: "Bangalore",
    type: "Looking for Flatmate",
    status: "Active",
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    user: "Priya Patel",
    avatar: "PP",
    title: "1BHK available for a female flatmate",
    location: "Hitech City",
    city: "Hyderabad",
    type: "Flat Available",
    status: "Active",
    createdAt: "4 hours ago",
  },
  {
    id: 3,
    user: "Amit Verma",
    avatar: "AV",
    title: "Looking for a roommate near Andheri",
    location: "Andheri West",
    city: "Mumbai",
    type: "Looking for Flatmate",
    status: "Active",
    createdAt: "6 hours ago",
  },
  {
    id: 4,
    user: "Sneha Joshi",
    avatar: "SJ",
    title: "Room available in a shared 3BHK",
    location: "Whitefield",
    city: "Bangalore",
    type: "Flat Available",
    status: "Active",
    createdAt: "Yesterday",
  },
  {
    id: 5,
    user: "Arjun Mehta",
    avatar: "AM",
    title: "Looking for a flatmate in Gurgaon",
    location: "Gurgaon",
    city: "Delhi",
    type: "Looking for Flatmate",
    status: "Active",
    createdAt: "Yesterday",
  },
  {
    id: 6,
    user: "Neha Singh",
    avatar: "NS",
    title: "Female flatmate required near Baner",
    location: "Baner",
    city: "Pune",
    type: "Looking for Flatmate",
    status: "Active",
    createdAt: "2 days ago",
  },
  {
    id: 7,
    user: "Karan Shah",
    avatar: "KS",
    title: "Private room available",
    location: "Powai",
    city: "Mumbai",
    type: "Flat Available",
    status: "Expired",
    createdAt: "3 days ago",
  },
];

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

const getLocationColor = (posts: number) => {
  if (posts >= 80) return "#ef4444";
  if (posts >= 30) return "#f59e0b";
  return "#22c55e";
};

const getLocationStatus = (posts: number) => {
  if (posts >= 80) return "High activity";
  if (posts >= 30) return "Medium activity";
  return "Low activity";
};

export default function PostsPage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const [selectedLocation, setSelectedLocation] =
    useState<LocationStat | null>(null);

  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] = useState<
    "All" | "Active" | "Expired"
  >("All");

  const [isGlobeReady, setIsGlobeReady] = useState(false);

  // --------------------------------------------------
  // SEARCH LOCATIONS
  // --------------------------------------------------

  const filteredLocations = useMemo(() => {
    return locations.filter((location) =>
      `${location.city} ${location.country}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  // --------------------------------------------------
  // FILTER POSTS
  // --------------------------------------------------

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesLocation = selectedLocation
        ? post.city === selectedLocation.city
        : true;

      const matchesStatus =
        activeFilter === "All" || post.status === activeFilter;

      return matchesLocation && matchesStatus;
    });
  }, [selectedLocation, activeFilter]);

  // --------------------------------------------------
  // SELECT LOCATION
  // --------------------------------------------------

  const selectLocation = (location: LocationStat) => {
    setSelectedLocation(location);

    if (globeRef.current) {
      globeRef.current.pointOfView(
        {
          lat: location.lat,
          lng: location.lng,
          altitude: 1.6,
        },
        1800
      );
    }
  };

  // --------------------------------------------------
  // INITIAL GLOBE POSITION
  // --------------------------------------------------

  useEffect(() => {
    if (!isGlobeReady || !globeRef.current) return;

    globeRef.current.pointOfView(
      {
        lat: 20.5937,
        lng: 78.9629,
        altitude: 2.2,
      },
      1200
    );
  }, [isGlobeReady]);

  // --------------------------------------------------
  // TOTALS
  // --------------------------------------------------

  const totalPosts = locations.reduce(
    (total, location) => total + location.posts,
    0
  );

  const totalUsers = locations.reduce(
    (total, location) => total + location.users,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------ */}

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
              d="M9 5l7 7-7 7"
            />
          </svg>

          <span className="font-medium text-slate-900">Posts</span>
        </div>

        <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Posts
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage flatmate posts and explore activity by location.
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* STATS */}
      {/* ------------------------------------------------ */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Posts"
          value={totalPosts}
          icon="posts"
        />

        <StatCard
          title="Total Users"
          value={totalUsers}
          icon="users"
        />

        <StatCard
          title="Active Locations"
          value={locations.length}
          icon="location"
        />
      </div>

      {/* ------------------------------------------------ */}
      {/* LOCATION EXPLORER */}
      {/* ------------------------------------------------ */}

      {/* ------------------------------------------------ */}
      {/* LOCATION EXPLORER */}
      {/* ------------------------------------------------ */}

      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col lg:flex-row">

          {/* LOCATION LIST */}

          <div className="w-full border-b border-slate-200 lg:w-72 lg:border-b-0 lg:border-r">
            <div className="p-5">

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Locations
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Posts by location
                  </p>
                </div>

                {selectedLocation && (
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* SEARCH */}

              <div className="relative mt-4">
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
                  placeholder="Search location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white"
                />
              </div>
            </div>

            {/* LOCATION LIST */}

            <div className="max-h-[360px] overflow-y-auto px-3 pb-3">
              {filteredLocations.map((location) => {
                const isSelected =
                  selectedLocation?.id === location.id;

                const markerColor = getLocationColor(location.posts);

                return (
                  <button
                    key={location.id}
                    onClick={() => selectLocation(location)}
                    className={`mb-1 flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${isSelected
                        ? "bg-indigo-50"
                        : "hover:bg-slate-50"
                      }`}
                  >
                    {/* COLOR */}

                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: `${markerColor}18`,
                      }}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor: markerColor,
                        }}
                      />
                    </div>

                    {/* INFO */}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {location.city}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {location.posts} posts · {location.users} users
                      </p>
                    </div>

                    <svg
                      className={`h-4 w-4 ${isSelected
                          ? "text-indigo-600"
                          : "text-slate-300"
                        }`}
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
                  </button>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* GLOBE AREA */}
          {/* ------------------------------------------------ */}

          <div className="relative flex min-h-[420px] flex-1 items-center justify-center overflow-hidden bg-slate-50">

            {/* TITLE */}

            <div className="absolute left-5 top-5 z-10">
              <div className="rounded-xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Location activity
                </p>

                {selectedLocation ? (
                  <>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {selectedLocation.city}
                    </p>

                    <p className="text-xs text-slate-500">
                      {selectedLocation.posts} posts ·{" "}
                      {selectedLocation.users} users
                    </p>
                  </>
                ) : (
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    All locations
                  </p>
                )}
              </div>
            </div>

            {/* LEGEND */}

            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="text-xs text-slate-500">
                  Low
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <span className="text-xs text-slate-500">
                  Medium
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="text-xs text-slate-500">
                  High
                </span>
              </div>
            </div>

            {/* ------------------------------------------------ */}
            {/* GLOBE */}
            {/* ------------------------------------------------ */}

            <div className="flex h-[390px] w-[560px] max-w-full items-center justify-center">

              <Globe
                ref={globeRef}
                onGlobeReady={() => setIsGlobeReady(true)}

                width={560}
                height={390}

                backgroundColor="rgba(0,0,0,0)"

                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"

                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

                atmosphereColor="#818cf8"

                atmosphereAltitude={0.08}

                showAtmosphere={true}

                pointsData={locations}

                pointLat="lat"
                pointLng="lng"

                /* -------------------------------- */
                /* MARKER SIZE */
                /* -------------------------------- */

                pointRadius={(location: object) => {
                  const item = location as LocationStat;

                  if (item.posts >= 80) {
                    return 0.24;
                  }

                  if (item.posts >= 30) {
                    return 0.18;
                  }

                  return 0.12;
                }}

                /* -------------------------------- */
                /* MARKER HEIGHT */
                /* -------------------------------- */

                pointAltitude={0.02}

                /* -------------------------------- */
                /* MARKER COLOR */
                /* -------------------------------- */

                pointColor={(location: object) => {
                  const item = location as LocationStat;

                  return getLocationColor(item.posts);
                }}

                pointResolution={20}

                /* -------------------------------- */
                /* TOOLTIP */
                /* -------------------------------- */

                pointLabel={(location: object) => {
                  const item = location as LocationStat;

                  const color = getLocationColor(item.posts);

                  return `
              <div
                style="
                  padding:10px 12px;
                  background:white;
                  border:1px solid #e2e8f0;
                  border-radius:10px;
                  color:#0f172a;
                  min-width:150px;
                  box-shadow:0 5px 20px rgba(0,0,0,0.12);
                "
              >

                <div
                  style="
                    font-weight:600;
                    font-size:13px;
                    margin-bottom:5px;
                  "
                >
                  ${item.city}
                </div>

                <div
                  style="
                    display:flex;
                    align-items:center;
                    gap:6px;
                    font-size:12px;
                    color:#64748b;
                  "
                >
                  <span
                    style="
                      width:7px;
                      height:7px;
                      border-radius:50%;
                      background:${color};
                      display:inline-block;
                    "
                  ></span>

                  ${item.posts} posts
                </div>

                <div
                  style="
                    font-size:12px;
                    color:#64748b;
                    margin-top:3px;
                  "
                >
                  ${item.users} users
                </div>

              </div>
            `;
                }}

                /* -------------------------------- */
                /* CLICK LOCATION */
                /* -------------------------------- */

                onPointClick={(location) => {
                  selectLocation(location as LocationStat);
                }}

                /* -------------------------------- */
                /* NO AUTO ROTATION */
                /* -------------------------------- */

                controlsAutoRotate={false}

                enablePointerInteraction={true}
              />

            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* POSTS */}
      {/* ------------------------------------------------ */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* TABLE HEADER */}

        <div className="border-b border-slate-200 p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="font-semibold text-slate-900">
                {selectedLocation
                  ? `${selectedLocation.city} Posts`
                  : "All Posts"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredPosts.length} posts found
              </p>
            </div>

            {/* FILTER */}

            <div className="flex rounded-lg bg-slate-100 p-1">
              {(["All", "Active", "Expired"] as const).map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-md px-4 py-2 text-xs font-medium transition ${activeFilter === filter
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                      }`}
                  >
                    {filter}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  User
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Post
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Location
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Type
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Created
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  {/* USER */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                        {post.avatar}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {post.user}
                        </p>

                        <p className="text-xs text-slate-400">
                          User #{post.id}02
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* POST */}

                  <td className="max-w-xs px-5 py-4">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {post.title}
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

                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {post.location}
                        </p>

                        <p className="text-xs text-slate-400">
                          {post.city}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* TYPE */}

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                      {post.type}
                    </span>
                  </td>

                  {/* STATUS */}

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${post.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-slate-100 text-slate-500"
                        }`}
                    >
                      {post.status}
                    </span>
                  </td>

                  {/* CREATED */}

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {post.createdAt}
                  </td>

                  {/* ACTION */}

                  <td className="px-5 py-4 text-right">
                    <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY */}

          {filteredPosts.length === 0 && (
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
                    d="M9 13h6m-3-3v6m8-4a8 8 0 11-16 0 8 8 0 0116 0z"
                  />
                </svg>
              </div>

              <p className="font-medium text-slate-700">
                No posts found
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Try selecting another location or filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------
// STAT CARD
// --------------------------------------------------

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: "posts" | "users" | "location";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value.toLocaleString()}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
          {icon === "posts" && (
            <svg
              className="h-5 w-5 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 8h8M8 12h8M8 16h5"
              />
            </svg>
          )}

          {icon === "users" && (
            <svg
              className="h-5 w-5 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
              />

              <circle
                cx="9"
                cy="7"
                r="4"
                strokeWidth={2}
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
              />
            </svg>
          )}

          {icon === "location" && (
            <svg
              className="h-5 w-5 text-indigo-600"
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
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12h18M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}