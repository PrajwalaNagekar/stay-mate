"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";

import {
  loginSchema,
  type LoginFormData,
} from "../schemas/auth.schema";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);

    // Dummy login for now
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

          {/* Logo */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              StayMate
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Welcome back! Please login to your account.
            </p>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>

            {/* Email */}
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              {...register("email")}
              error={errors.email?.message}
            />

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Forgot password?
                </button>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password")}
                error={errors.password?.message}
              />
            </div>

            {/* Remember me */}
            <div>
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300"
                  {...register("remember")}
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-600"
                >
                  Remember me
                </label>
              </div>
            </div>

            {/* Login */}
            <Button type="submit">
              Login
            </Button>

          </Form>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}

            <button
              type="button"
              className="font-semibold text-slate-900 hover:underline"
            >
              Create account
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}