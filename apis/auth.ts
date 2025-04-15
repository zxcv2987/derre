import { LoginResponseType, UserResponseType } from "@/types/response";
import { fetchClient } from "./fetchClient";

export async function login(
  email: string,
  password: string
): Promise<LoginResponseType> {
  const res = await fetchClient(`/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function refreshAccessToken(refreshToken: string) {
  const res = await fetchClient("/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error("Token refresh failed");
  return res.json();
}

export async function logout() {
  const res = await fetchClient("/auth/logout", {
    method: "GET",
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getMyInfo(): Promise<UserResponseType> {
  const res = await fetchClient("/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
