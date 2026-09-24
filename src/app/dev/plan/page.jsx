"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadRazorpay } from "../../../lib/utils/loadRazorpay";
export default function Plans() {
  const router = useRouter();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState("");
  const verifyPayment = async (
    paymentResponse,
    planId,
    amount
  ) => {
    try {
      const accessToken =
        localStorage.getItem("accessToken");

      if (!accessToken) {
        router.replace("/dev/login");
        return {
          success: false,
          message: "Please login again",
        };
      }

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is not configured"
        );
      }

      console.log(
        "Sending payment for verification..."
      );

      const response = await fetch(
        `${apiUrl}/api/payments/v1/verify`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            amount,

            razorpayOrderId:
              paymentResponse.razorpay_order_id,

            razorpayPaymentId:
              paymentResponse.razorpay_payment_id,

            razorpaySignature:
              paymentResponse.razorpay_signature,
          }),
        }
      );

      const result = await response.json();

      console.log(
        "Payment verification response:",
        result
      );

      // Backend says verification failed
      if (
        !response.ok ||
        !result.success
      ) {
        return {
          success: false,
          message:
            result.message ||
            "Payment verification failed",
        };
      }

      // Verification successful
      return {
        success: true,
        message:
          result.message ||
          "Payment verified successfully",
        data: result.data,
      };

    } catch (error) {
      console.error(
        "Payment verification error:",
        error
      );

      return {
        success: false,
        message:
          error.message ||
          "Unable to verify payment. Please contact support.",
      };
    }
  };
  const handleSubscribe = async (planId) => {
    try {
      setPaymentLoading(true);

      // Clear previous payment message
      setPaymentStatus(null);
      setPaymentMessage("");

      const accessToken =
        localStorage.getItem("accessToken");

      if (!accessToken) {
        router.replace("/login");
        return;
      }

      const razorpayLoaded =
        await loadRazorpay();

      if (!razorpayLoaded) {
        setPaymentStatus("error");

        setPaymentMessage(
          "Unable to load Razorpay. Please try again."
        );

        return;
      }

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(
        `${apiUrl}/api/subscriptions/v1/subscribe`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            planId,
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
          "Failed to create payment order"
        );
      }

      const {
        orderId,
        amount,
        currency,
        razorpayKey,
      } = result.data;

      const options = {

        key: razorpayKey,

        amount: amount,

        currency: currency,

        name: "Your App Name",

        description:
          "Plan Subscription",

        order_id: orderId,

        handler: async function (
          paymentResponse
        ) {

          console.log(
            "Payment completed:",
            paymentResponse
          );

          // Verify payment
          const verificationResult =
            await verifyPayment(
              paymentResponse,
              planId,
              amount
            );

          if (
            verificationResult.success
          ) {

            setPaymentStatus(
              "success"
            );

            setPaymentMessage(
              "Payment successful and verified!"
            );

          } else {

            setPaymentStatus(
              "error"
            );

            setPaymentMessage(
              verificationResult.message
            );
          }
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    } catch (error) {

      console.error(
        "Subscribe error:",
        error
      );

      setPaymentStatus("error");

      setPaymentMessage(
        error.message ||
        "Unable to start payment"
      );

    } finally {

      setPaymentLoading(false);
    }
  };
  useEffect(() => {
    const fetchPlans = async () => {
      const accessToken =
        localStorage.getItem("accessToken");

      if (!accessToken) {
        router.replace("/login");
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

          router.replace("/login");
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

      {paymentMessage && (
        <div
          style={{
            margin: "20px 0",
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor:
              paymentStatus === "success"
                ? "#dcfce7"
                : "#fee2e2",
            color:
              paymentStatus === "success"
                ? "#166534"
                : "#991b1b",
            border:
              paymentStatus === "success"
                ? "1px solid #86efac"
                : "1px solid #fca5a5",
          }}
        >
          {paymentMessage}
        </div>
      )}
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
            <button
              onClick={() =>
                handleSubscribe(plan._id)
              }
              disabled={
                paymentLoading ||
                !plan.isActive
              }
            >
              {paymentLoading
                ? "Processing..."
                : "Subscribe"}
            </button>

          </div>
        ))
      )}
    </div>
  );
}