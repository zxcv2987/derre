"use client";

import { createPostFormAction } from "@/actions/blog";

import { CategoryType } from "@/types/category";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import PostForm from "@/components/domain/blog/PostForm";

export default function CreatePostForm({
  categories,
}: {
  categories: CategoryType[];
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createPostFormAction, {
    postId: undefined,
    error: undefined,
  });

  useEffect(() => {
    //history가 2개 쌓여있으므로 popstate 이벤트 실행 후 replace
    if (state.postId) {
      const onPopState = () => {
        router.replace(`/blog/detail/${state.postId}`);
      };

      window.addEventListener("popstate", onPopState);
      router.back();

      return () => {
        window.removeEventListener("popstate", onPopState);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <PostForm
      categories={categories}
      formAction={formAction}
      isPending={isPending}
      error={state.error}
      isAllowLeave={state.postId ? true : false}
    />
  );
}
