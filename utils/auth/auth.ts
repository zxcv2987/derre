import { cookies } from "next/headers";

export async function getAccessToken() {
  return (await cookies()).get("accessToken")?.value;
}

export async function getRefreshToken() {
  return (await cookies()).get("refreshToken")?.value;
}

export async function setTokens(accessToken: string, refreshToken: string) {
  const cookieStore = cookies();
  (await cookieStore).set("accessToken", accessToken, {
    httpOnly: true,
    path: "/",
  });
  (await cookieStore).set("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
  });
}

export async function clearTokens() {
  const cookieStore = cookies();
  (await cookieStore).delete("accessToken");
  (await cookieStore).delete("refreshToken");
}
