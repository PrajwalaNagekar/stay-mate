
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:7001/api/auth/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(
          result.message || "Login failed"
        );
        return;
      }

      const {
        accessToken,
        refreshToken,
        id,
        username,
        email: userEmail,
        role,
      } = result.data;

      if (!accessToken) {
        setError("Access token not received");
        return;
      }

      // Save access token
      localStorage.setItem(
        "accessToken",
        accessToken
      );

      // Save refresh token
      if (refreshToken) {
        localStorage.setItem(
          "refreshToken",
          refreshToken
        );
      }

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify({
          id,
          username,
          email: userEmail,
          role,
        })
      );

      // Get requested page
      const redirectTo =
        searchParams.get("redirect") ||
        "/dev/plan";

      // Redirect after login
      router.replace(redirectTo);
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            disabled={loading}
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
    </div>
  );
}