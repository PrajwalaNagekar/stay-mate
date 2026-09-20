"use client";

import { useMemo, useState } from "react";

type CouponStatus = "Active" | "Scheduled" | "Expired" | "Disabled";

type Coupon = {
  id: number;
  code: string;
  name: string;
  description: string;
  discountType: "Percentage" | "Fixed";
  discountValue: number;
  applicablePlans: string[];
  startDate: string;
  endDate: string;
  used: number;
  usageLimit: number | null;
  eligibility: string;
  status: CouponStatus;
};

const initialCoupons: Coupon[] = [
  {
    id: 1,
    code: "WELCOME20",
    name: "Welcome Offer",
    description: "20% discount for new users.",
    discountType: "Percentage",
    discountValue: 20,
    applicablePlans: ["Premium"],
    startDate: "15 Sep 2026",
    endDate: "30 Sep 2026",
    used: 124,
    usageLimit: 500,
    eligibility: "New Users",
    status: "Active",
  },
  {
    id: 2,
    code: "STAR50",
    name: "Star Plan Offer",
    description: "Flat ₹50 off on the Star plan.",
    discountType: "Fixed",
    discountValue: 50,
    applicablePlans: ["Star"],
    startDate: "18 Sep 2026",
    endDate: "10 Oct 2026",
    used: 68,
    usageLimit: 200,
    eligibility: "Everyone",
    status: "Active",
  },
  {
    id: 3,
    code: "PREMIUM100",
    name: "Premium Discount",
    description: "Flat ₹100 discount on Premium.",
    discountType: "Fixed",
    discountValue: 100,
    applicablePlans: ["Premium"],
    startDate: "25 Sep 2026",
    endDate: "15 Oct 2026",
    used: 0,
    usageLimit: 300,
    eligibility: "Everyone",
    status: "Scheduled",
  },
  {
    id: 4,
    code: "FLAT10",
    name: "Flat Discount",
    description: "10% discount on all subscription plans.",
    discountType: "Percentage",
    discountValue: 10,
    applicablePlans: ["All Plans"],
    startDate: "01 Aug 2026",
    endDate: "31 Aug 2026",
    used: 340,
    usageLimit: 500,
    eligibility: "Everyone",
    status: "Expired",
  },
  {
    id: 5,
    code: "NEWUSER25",
    name: "New User Offer",
    description: "Special discount for new customers.",
    discountType: "Percentage",
    discountValue: 25,
    applicablePlans: ["Basic", "Star"],
    startDate: "01 Sep 2026",
    endDate: "30 Sep 2026",
    used: 42,
    usageLimit: 100,
    eligibility: "New Users",
    status: "Disabled",
  },
];

function StatusBadge({ status }: { status: CouponStatus }) {
  const styles: Record<CouponStatus, string> = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Scheduled: "bg-blue-50 text-blue-700 border-blue-100",
    Expired: "bg-slate-100 text-slate-600 border-slate-200",
    Disabled: "bg-red-50 text-red-600 border-red-100",
  };

  const dots: Record<CouponStatus, string> = {
    Active: "bg-emerald-500",
    Scheduled: "bg-blue-500",
    Expired: "bg-slate-400",
    Disabled: "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "All" | CouponStatus
  >("All");

  const [showModal, setShowModal] = useState(false);

  const [selectedCoupon, setSelectedCoupon] =
    useState<Coupon | null>(null);

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const matchesSearch =
        coupon.code
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        coupon.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        coupon.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [coupons, search, statusFilter]);

  const activeCoupons = coupons.filter(
    (coupon) => coupon.status === "Active"
  ).length;

  const scheduledCoupons = coupons.filter(
    (coupon) => coupon.status === "Scheduled"
  ).length;

  const expiredCoupons = coupons.filter(
    (coupon) => coupon.status === "Expired"
  ).length;

  const toggleCouponStatus = (id: number) => {
    setCoupons((current) =>
      current.map((coupon) =>
        coupon.id === id
          ? {
              ...coupon,
              status:
                coupon.status === "Active"
                  ? "Disabled"
                  : "Active",
            }
          : coupon
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm">
              <span className="text-slate-400">
                Dashboard
              </span>

              <span className="text-slate-300">
                /
              </span>

              <span className="font-medium text-slate-700">
                Coupons
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Coupons
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage promotional coupons and discounts.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCoupon(null);
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

            Add Coupon
          </button>
        </div>

        {/* Stats */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Coupons
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {coupons.length}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              All coupons
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Active Coupons
            </p>

            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {activeCoupons}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Currently available
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Scheduled
            </p>

            <p className="mt-2 text-2xl font-bold text-blue-600">
              {scheduledCoupons}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Starting soon
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Expired
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-600">
              {expiredCoupons}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              No longer available
            </p>
          </div>

        </div>

        {/* Search + Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="relative w-full sm:max-w-sm">

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search coupons..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />

          </div>

          <div className="flex flex-wrap rounded-lg border border-slate-200 bg-white p-1">

            {(
              [
                "All",
                "Active",
                "Scheduled",
                "Expired",
                "Disabled",
              ] as const
            ).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`rounded-md px-3 py-2 text-xs font-medium transition ${
                  statusFilter === filter
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {filter}
              </button>
            ))}

          </div>
        </div>

        {/* Coupon Cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">

          {filteredCoupons.map((coupon) => {

            const usagePercentage =
              coupon.usageLimit
                ? Math.min(
                    (coupon.used / coupon.usageLimit) * 100,
                    100
                  )
                : 0;

            return (
              <div
                key={coupon.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >

                {/* Top Accent */}
                <div
                  className={`h-1.5 ${
                    coupon.status === "Active"
                      ? "bg-emerald-500"
                      : coupon.status === "Scheduled"
                      ? "bg-blue-500"
                      : coupon.status === "Disabled"
                      ? "bg-red-400"
                      : "bg-slate-300"
                  }`}
                />

                <div className="p-5">

                  {/* Coupon Header */}
                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        {coupon.name}
                      </p>

                      <div className="mt-2 flex items-center gap-2">

                        <h2 className="font-mono text-xl font-bold tracking-wide text-slate-900">
                          {coupon.code}
                        </h2>

                        <button
                          title="Copy coupon"
                          className="rounded-md p-1.5 text-slate-400 opacity-0 transition hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <rect
                              width="13"
                              height="13"
                              x="8"
                              y="8"
                              rx="2"
                              strokeWidth="1.8"
                            />

                            <path
                              strokeLinecap="round"
                              strokeWidth="1.8"
                              d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"
                            />
                          </svg>
                        </button>

                      </div>
                    </div>

                    <StatusBadge status={coupon.status} />

                  </div>

                  {/* Discount */}
                  <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">

                    <div>
                      <p className="text-xs text-slate-400">
                        Discount
                      </p>

                      <p className="mt-0.5 text-2xl font-bold text-slate-900">
                        {coupon.discountType ===
                        "Percentage"
                          ? `${coupon.discountValue}%`
                          : `₹${coupon.discountValue}`}
                      </p>
                    </div>

                    <div className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm">
                      {coupon.discountType}
                    </div>

                  </div>

                  {/* Description */}
                  <p className="mt-4 min-h-[40px] text-sm leading-5 text-slate-500">
                    {coupon.description}
                  </p>

                  {/* Dashed Divider */}
                  <div className="my-4 border-t border-dashed border-slate-200" />

                  {/* Details */}
                  <div className="space-y-3">

                    {/* Plans */}
                    <div className="flex items-start justify-between gap-4">

                      <span className="text-xs text-slate-400">
                        Applicable plans
                      </span>

                      <div className="flex max-w-[65%] flex-wrap justify-end gap-1.5">

                        {coupon.applicablePlans.map(
                          (plan) => (
                            <span
                              key={plan}
                              className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600"
                            >
                              {plan}
                            </span>
                          )
                        )}

                      </div>

                    </div>

                    {/* Validity */}
                    <div className="flex items-center justify-between gap-4">

                      <span className="text-xs text-slate-400">
                        Validity
                      </span>

                      <span className="text-xs font-medium text-slate-700">
                        {coupon.startDate} – {coupon.endDate}
                      </span>

                    </div>

                    {/* Eligibility */}
                    <div className="flex items-center justify-between">

                      <span className="text-xs text-slate-400">
                        Eligibility
                      </span>

                      <span className="text-xs font-medium text-slate-700">
                        {coupon.eligibility}
                      </span>

                    </div>

                  </div>

                  {/* Usage */}
                  <div className="mt-5">

                    <div className="mb-1.5 flex items-center justify-between">

                      <span className="text-xs text-slate-400">
                        Usage
                      </span>

                      <span className="text-xs font-semibold text-slate-700">
                        {coupon.used}
                        {coupon.usageLimit
                          ? ` / ${coupon.usageLimit}`
                          : ""}
                      </span>

                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                      <div
                        className="h-full rounded-full bg-slate-800 transition-all"
                        style={{
                          width: `${usagePercentage}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">

                    <button
                      onClick={() => {
                        setSelectedCoupon(coupon);
                        setShowModal(true);
                      }}
                      className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Edit Coupon
                    </button>

                    <button
                      onClick={() =>
                        toggleCouponStatus(coupon.id)
                      }
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        coupon.status === "Active"
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      }`}
                    >
                      {coupon.status === "Active"
                        ? "Disable"
                        : "Enable"}
                    </button>

                  </div>

                </div>

                {/* Coupon Cutout Decorations */}
                <div className="absolute -left-2.5 top-[51%] h-5 w-5 rounded-full border border-slate-200 bg-slate-50" />

                <div className="absolute -right-2.5 top-[51%] h-5 w-5 rounded-full border border-slate-200 bg-slate-50" />

              </div>
            );
          })}

        </div>

        {/* Empty */}
        {filteredCoupons.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">

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
                  d="M4.5 8.25A2.25 2.25 0 016.75 6h10.5a2.25 2.25 0 012.25 2.25v1.5a2.25 2.25 0 010 4.5v1.5A2.25 2.25 0 0117.25 18H6.75a2.25 2.25 0 01-2.25-2.25v-1.5a2.25 2.25 0 010-4.5v-1.5z"
                />
              </svg>

            </div>

            <p className="mt-3 font-semibold text-slate-900">
              No coupons found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filter.
            </p>

          </div>
        )}

      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">

          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {selectedCoupon
                    ? "Edit Coupon"
                    : "Create Coupon"}
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Configure discount, validity and usage.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
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

            <div className="max-h-[75vh] space-y-5 overflow-y-auto p-6">

              {/* Code / Name */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Coupon Code
                  </label>

                  <input
                    defaultValue={selectedCoupon?.code || ""}
                    placeholder="WELCOME20"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-mono text-sm uppercase text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Coupon Name
                  </label>

                  <input
                    defaultValue={selectedCoupon?.name || ""}
                    placeholder="Welcome Offer"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  defaultValue={
                    selectedCoupon?.description || ""
                  }
                  rows={2}
                  placeholder="Describe this coupon..."
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Discount */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Discount Type
                  </label>

                  <select
                    defaultValue={
                      selectedCoupon?.discountType ||
                      "Percentage"
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  >
                    <option className="bg-white text-slate-700">
                      Percentage
                    </option>
                    <option className="bg-white text-slate-700">
                      Fixed
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Discount Value
                  </label>

                  <input
                    type="number"
                    defaultValue={
                      selectedCoupon?.discountValue || ""
                    }
                    placeholder="20"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

              </div>

              {/* Plans */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Applicable Plans
                </label>

                <div className="flex flex-wrap gap-2">

                  {[
                    "All Plans",
                    "Basic",
                    "Star",
                    "Premium",
                  ].map((plan) => (
                    <label
                      key={plan}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300"
                      />

                      {plan}
                    </label>
                  ))}

                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    End Date
                  </label>

                  <input
                    type="date"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

              </div>

              {/* Usage */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Usage Limit
                  </label>

                  <input
                    type="number"
                    placeholder="500"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Usage Per User
                  </label>

                  <input
                    type="number"
                    defaultValue={1}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

              </div>

              {/* Eligibility */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Customer Eligibility
                </label>

                <select
                  defaultValue={
                    selectedCoupon?.eligibility || "Everyone"
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                >
                  <option className="bg-white text-slate-700">
                    Everyone
                  </option>

                  <option className="bg-white text-slate-700">
                    New Users
                  </option>

                  <option className="bg-white text-slate-700">
                    Existing Users
                  </option>

                  <option className="bg-white text-slate-700">
                    Selected Users
                  </option>
                </select>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Coupon Status
                  </p>

                  <p className="text-xs text-slate-500">
                    Enable this coupon for users.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked={
                    selectedCoupon
                      ? selectedCoupon.status !== "Disabled"
                      : true
                  }
                  className="h-4 w-4 rounded border-slate-300 text-slate-900"
                />

              </div>

            </div>

            {/* Footer */}
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
                {selectedCoupon
                  ? "Save Changes"
                  : "Create Coupon"}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}