"use server";

import { login, logout } from "@/apis/auth";
import { clearTokens, setTokens } from "@/utils/auth/auth";
import { redirect } from "next/navigation";

export async function loginFormAction(
  state: {
    ok: boolean;
    error?: undefined | { id?: string; password?: string };
  },
  formData: FormData
) {
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;

  if (!id && !password)
    return {
      ok: false,
      error: {
        id: "아이디를 입력해 주세요",
        password: "비밀번호를 입력해 주시오",
      },
    };
  if (!id)
    return {
      ok: false,
      error: { id: "아이디를 입력해 주세요" },
    };
  if (!password)
    return {
      ok: false,
      error: { password: "비밀번호를 입력해 주시오" },
    };

  try {
    const res = await login(id, password);
    await setTokens(res.access, res.refresh);
    return {
      ok: true,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      error: { id: "아이디 또는 비밀번호가 일치하지 않습니다." },
    };
  }
}

export async function logoutAction() {
  try {
    await logout();
    await clearTokens();
  } catch (e) {
    console.log(e);
  }
  redirect("/");
}
