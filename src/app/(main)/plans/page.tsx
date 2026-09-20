"use client";

import { useMemo, useState } from "react";

type PlanStatus = "Active" | "Inactive";

type Plan = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  subscribers: number;
  status: PlanStatus;
  createdAt: string;
};

const initialPlans: Plan[] = [
  {
    id: 1,
    name: "Basic",
    description: "Essential features for users getting started.",
    price: 199,
    duration: "1 Month",
    features: [
      "Create unlimited posts",
      "Basic profile visibility",
      "Standard support",
    ],
    subscribers: 124,
    status: "Active",
    createdAt: "12 Sep 2026",
  },
  {
    id: 2,
    name: "Star",
    description: "Enhanced visibility and additional benefits.",
    price: 349,
    duration: "1 Month",
    features: [
      "Everything in Basic",
      "Priority profile visibility",
      "Advanced search",
      "Priority support",
    ],
    subscribers: 86,
    status: "Active",
    createdAt: "10 Sep 2026",
  },
  {
    id: 3,
    name: "Premium",
    description: "Complete access to premium features.",
    price: 499,
    duration: "1 Month",
    features: [
      "Everything in Star",
      "Unlimited connections",
      "Featured profile",
      "Premium support",
    ],
    subscribers: 52,
    status: "Active",
    createdAt: "05 Sep 2026",
  },
  {
    id: 4,
    name: "Premium Yearly",
    description: "Premium access with yearly benefits.",
    price: 4999,
    duration: "1 Year",
    features: [
      "Everything in Premium",
      "Yearly subscription",
      "Priority matching",
      "Dedicated support",
    ],
    subscribers: 18,
    status: "Inactive",
    createdAt: "01 Sep 2026",
  },
];

function StatusBadge({ status }: { status: PlanStatus }) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: "plans" | "active" | "users" | "revenue";
}) {
  const icons = {
    plans: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 14.25l6-6m-7.5 9.75h9A2.25 2.25 0 0018.75 15V6A2.25 2.25 0 0016.5 3.75h-9A2.25 2.25 0 005.25 6v9A2.25 2.25 0 007.5 18z"
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
          strokeWidth={1.8}
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
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
          strokeWidth={1.8}
          d="M15 19.128a9.38 9.38 0 01-6 0M18 8.25a3 3 0 11-6 0 3 3 0 016 0zM21 19.128a9.38 9.38 0 00-3.2-1.75M3 19.128a9.38 9.38 0 013.2-1.75M6 8.25a3 3 0 116 0"
        />
      </svg>
    ),
    revenue: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 6v12m4-9.75c0-1.243-1.79-2.25-4-2.25s-4 1.007-4 2.25 1.79 2.25 4 2.25 4 1.007 4 2.25-1.79 2.25-4 2.25-4 1.007-4 2.25S9.79 17.25 12 17.25s4-1.007 4-2.25"
        />
      </svg>
    ),
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          {icons[icon]}
        </div>
      </div>
    </div>
  );
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const matchesSearch =
        plan.name.toLowerCase().includes(search.toLowerCase()) ||
        plan.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || plan.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [plans, search, statusFilter]);

  const totalSubscribers = plans.reduce(
    (total, plan) => total + plan.subscribers,
    0
  );

  const activePlans = plans.filter(
    (plan) => plan.status === "Active"
  ).length;

  const estimatedRevenue = plans.reduce(
    (total, plan) => total + plan.price * plan.subscribers,
    0
  );

  const togglePlanStatus = (id: number) => {
    setPlans((current) =>
      current.map((plan) =>
        plan.id === id
          ? {
              ...plan,
              status: plan.status === "Active" ? "Inactive" : "Active",
            }
          : plan
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <span className="text-slate-400">Dashboard</span>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-slate-700">Plans</span>
        </div>

        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Plans
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage subscription plans, pricing and user access.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedPlan(null);
              setShowModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
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
            Add Plan
          </button>
        </div>

        {/* Stats */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Plans"
            value={plans.length.toString()}
            description="All subscription plans"
            icon="plans"
          />

          <StatCard
            title="Active Plans"
            value={activePlans.toString()}
            description="Currently available"
            icon="active"
          />

          <StatCard
            title="Subscribers"
            value={totalSubscribers.toLocaleString()}
            description="Across all plans"
            icon="users"
          />

          <StatCard
            title="Estimated Revenue"
            value={`₹${estimatedRevenue.toLocaleString()}`}
            description="Based on current subscribers"
            icon="revenue"
          />
        </div>

        {/* Plans Section */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-sm">
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
                    d="M21 21l-4.35-4.35m1.35-5.15a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                  />
                </svg>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search plans..."
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Filters */}
              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
                {(["All", "Active", "Inactive"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                      statusFilter === filter
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Plan
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Price
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Features
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Subscribers
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredPlans.length > 0 ? (
                  filteredPlans.map((plan) => (
                    <tr
                      key={plan.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      {/* Plan */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {plan.name}
                          </p>
                          <p className="mt-1 max-w-xs text-xs text-slate-500">
                            {plan.description}
                          </p>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">
                          ₹{plan.price.toLocaleString()}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          / {plan.duration}
                        </p>
                      </td>

                      {/* Features */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {plan.features.slice(0, 2).map((feature) => (
                            <span
                              key={feature}
                              className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
                            >
                              {feature}
                            </span>
                          ))}

                          {plan.features.length > 2 && (
                            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
                              +{plan.features.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Subscribers */}
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">
                          {plan.subscribers.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-400">
                          subscribers
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={plan.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedPlan(plan);
                              setShowModal(true);
                            }}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => togglePlanStatus(plan.id)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                              plan.status === "Active"
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            }`}
                          >
                            {plan.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="mx-auto max-w-sm">
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
                              strokeWidth={1.8}
                              d="M9 12h6m-6 4h4m2-13H8a2 2 0 00-2 2v14l6-3 6 3V5a2 2 0 00-2-2z"
                            />
                          </svg>
                        </div>

                        <p className="mt-3 font-semibold text-slate-900">
                          No plans found
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Try changing your search or filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-5 py-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filteredPlans.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">
                {plans.length}
              </span>{" "}
              plans
            </p>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {selectedPlan ? "Edit Plan" : "Add Plan"}
                </h2>
                <p className="mt-0.5 text-sm text-slate-500">
                  Configure your subscription plan.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Plan Name
                </label>
                <input
                  defaultValue={selectedPlan?.name || ""}
                  placeholder="e.g. Premium"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  defaultValue={selectedPlan?.description || ""}
                  placeholder="Describe this plan..."
                  rows={3}
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      defaultValue={selectedPlan?.price || ""}
                      placeholder="499"
                      className="w-full rounded-lg border border-slate-200 py-2.5 pl-7 pr-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Duration
                  </label>
                  <select
                    defaultValue={selectedPlan?.duration || "1 Month"}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  >
                    <option>1 Month</option>
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>1 Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Features
                </label>
                <textarea
                  defaultValue={selectedPlan?.features.join("\n") || ""}
                  placeholder={"One feature per line"}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Plan Status
                  </p>
                  <p className="text-xs text-slate-500">
                    Allow users to purchase this plan.
                  </p>
                </div>

                <button
                  type="button"
                  className={`relative h-6 w-11 rounded-full transition ${
                    selectedPlan?.status === "Inactive"
                      ? "bg-slate-300"
                      : "bg-emerald-500"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                      selectedPlan?.status === "Inactive"
                        ? "left-1"
                        : "left-6"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                {selectedPlan ? "Save Changes" : "Create Plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}