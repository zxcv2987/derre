"use client";

import { loginFormAction } from "@/actions/user";
import clsx from "clsx";
import { useActionState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginFormAction, {
    ok: false,
    error: undefined,
  });
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    if (state.ok) {
      startTransition(() => {
        router.replace("/");
      });
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="flex flex-col justify-between w-full h-full py-10 px-6 text-zinc-400 font-bold"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span>아이디</span>
          <input
            className="input"
            name="id"
            placeholder="실명을 입려해 주세요"
          />
          {state.error?.id && (
            <span className="text-red-400 font-normal text-sm">
              {state.error.id}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span>비밀번호</span>
          <input className="input" name="password" placeholder="- 제외" />
          {state.error?.password && (
            <span className="text-red-400 font-normal text-sm">
              {state.error.password}
            </span>
          )}
        </div>
      </div>
      <button
        className={clsx("btn", (isPending || isLoading) && "bg-zinc-200")}
      >
        {isPending || isLoading ? "로딩 중" : "로그인"}
      </button>
    </form>
  );
}
