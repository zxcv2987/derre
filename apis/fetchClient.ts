import { cookies } from "next/headers";

export async function fetchClient(input: RequestInfo, init: RequestInit = {}) {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${input}`;
  const token = (await cookies()).get("accessToken")?.value;

  const headers = {
    ...(init.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
  };

  return fetch(baseUrl, {
    ...init,
    headers,
  });
}
