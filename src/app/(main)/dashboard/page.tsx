const stats = [
  {
    title: "Users",
    value: "1,248",
    change: "+12.5%",
  },
  {
    title: "Posts",
    value: "356",
    change: "+8.2%",
  },
  {
    title: "Friends",
    value: "892",
    change: "+5.4%",
  },
  {
    title: "Groups",
    value: "48",
    change: "+3.1%",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Hero */}
      <section className="overflow-hidden rounded-xl bg-[#2d6dcc] shadow-sm">
        <div className="px-7 py-8">

          <p className="text-sm font-medium text-blue-100">
            StayMate Administration
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-white">
            What are you looking for?
          </h1>

          <p className="mt-2 text-sm text-blue-100">
            Manage your StayMate platform from one place.
          </p>

          <div className="mt-6 flex max-w-xl overflow-hidden rounded-md bg-white shadow-sm">

            <input
              type="text"
              placeholder="Search users, posts, groups..."
              className="flex-1 px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />

            <button className="bg-[#239b8d] px-6 text-sm font-semibold text-white transition hover:bg-[#1d867a]">
              Search
            </button>

          </div>

        </div>
      </section>

      {/* Statistics */}
      <section className="-mt-2 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-sm font-medium text-slate-500">
              {stat.title}
            </p>

            <div className="mt-2 flex items-end justify-between">
              <p className="text-2xl font-bold text-slate-800">
                {stat.value}
              </p>

              <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Lower section */}
      <section className="grid gap-6 lg:grid-cols-3">

        {/* Activity */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Latest activity across StayMate
              </p>
            </div>

            <button className="text-sm font-medium text-[#2d6dcc] hover:underline">
              View all
            </button>
          </div>

          <div className="mt-6 space-y-4">

            <Activity
              title="New user registered"
              description="john@example.com joined StayMate"
              time="2 min ago"
            />

            <Activity
              title="New post created"
              description="A new post was published"
              time="8 min ago"
            />

            <Activity
              title="New group created"
              description="Travel Buddies group was created"
              time="15 min ago"
            />

            <Activity
              title="Report submitted"
              description="A post was reported for review"
              time="24 min ago"
            />

          </div>
        </div>

        {/* Moderation */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="font-semibold text-slate-800">
            Moderation
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Items requiring attention
          </p>

          <div className="mt-6 space-y-3">

            <Moderation
              label="Posts to review"
              value="12"
            />

            <Moderation
              label="User reports"
              value="5"
            />

            <Moderation
              label="Blocked accounts"
              value="3"
            />

          </div>

        </div>

      </section>
    </div>
  );
}

function Activity({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-[#2d6dcc]">
        SM
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-700">
          {title}
        </p>

        <p className="mt-0.5 truncate text-xs text-slate-400">
          {description}
        </p>
      </div>

      <span className="shrink-0 text-xs text-slate-400">
        {time}
      </span>

    </div>
  );
}

function Moderation({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-4">

      <span className="text-sm text-slate-600">
        {label}
      </span>

      <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-red-50 px-2 text-xs font-bold text-red-600">
        {value}
      </span>

    </div>
  );
}