"use client";

import { createPostFormAction } from "@/actions/blog";
import { useActionState } from "react";
import PostForm from "@/components/domain/blog/PostForm";
import { CategoryType } from "@/types/category";

export default function CreatePostForm({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [state, formAction, isActionPending] = useActionState(
    createPostFormAction,
    {
      postId: undefined,
      error: undefined,
    }
  );
  return (
    <PostForm
      categories={categories}
      formAction={formAction}
      isPending={isActionPending}
      error={state.error}
      isAllowLeave={state.postId ? true : false}
    />
  );
}
