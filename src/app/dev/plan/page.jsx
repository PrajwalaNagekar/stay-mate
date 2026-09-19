"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Plans() {
  const router = useRouter();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      const accessToken =
        localStorage.getItem("accessToken");

      if (!accessToken) {
        router.replace("/dev/login");
        return;
      }

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL;

        console.log("API URL:", apiUrl);

        if (!apiUrl) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is not configured"
          );
        }

        const response = await fetch(
          `${apiUrl}/api/plan/v1`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");

          router.replace("/dev/login");
          return;
        }

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to fetch plans"
          );
        }

        setPlans(result.data || []);
      } catch (error) {
        console.error(
          "Fetch plans error:",
          error
        );

        setError(
          error.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [router]);

  if (loading) {
    return <p>Loading plans...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Plans</h1>

      {plans.length === 0 ? (
        <p>No plans available.</p>
      ) : (
        plans.map((plan) => (
          <div key={plan._id}>
            <h2>{plan.name}</h2>

            <p>Price: ₹{plan.price}</p>

            <p>
              Duration: {plan.durationDays} days
            </p>

            <p>
              {plan.isActive
                ? "Active"
                : "Inactive"}
            </p>

            <ul>
              {plan.features?.map(
                (feature, index) => (
                  <li key={index}>
                    {feature}
                  </li>
                )
              )}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}