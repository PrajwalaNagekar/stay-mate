import { apiClient } from "@/lib/api/client";

export interface LoginRequest {
  email: string;
  password: string;
  fcmToken?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  };
}

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}