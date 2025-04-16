"use client";

import { editPostFormAction } from "@/actions/blog";
import { CategoryType } from "@/types/category";
import { useActionState } from "react";
import PostForm from "@/components/domain/blog/PostForm";
import { BlogResponseType } from "@/types/response";

export default function EditPostForm({
  post,
  categories,
}: {
  post: BlogResponseType;
  categories: CategoryType[];
}) {
  const [state, formAction, isPending] = useActionState(editPostFormAction, {
    postId: undefined,
    error: undefined,
  });

  return (
    <PostForm
      categories={categories}
      formAction={formAction}
      isPending={isPending}
      error={state.error}
      isAllowLeave={state.postId ? true : false}
      isEdit={true}
      post={post}
    />
  );
}
