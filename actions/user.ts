"use server";

import { login, logout } from "@/apis/user/auth";
import { clearTokens, setTokens } from "@/utils/auth/auth";
import { redirect } from "next/navigation";

export async function loginFormAction(
  state: {
    error?: undefined | { id?: string; password?: string };
  },
  formData: FormData
) {
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;

  if (!id && !password)
    return {
      error: {
        id: "아이디를 입력해 주세요",
        password: "비밀번호를 입력해 주시오",
      },
    };
  if (!id) return { error: { id: "아이디를 입력해 주세요" } };
  if (!password) return { error: { password: "비밀번호를 입력해 주시오" } };

  try {
    const res = await login(id, password);
    await setTokens(res.access, res.refresh);
  } catch (e) {
    console.log(e);
    return {};
  }
  redirect("/");
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
