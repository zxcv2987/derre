"use client";

import { createPostFormAction } from "@/actions/blog";
import DropDown from "@/components/common/ui/DropDown";
import FormItem from "@/components/common/ui/FormItem";
import ImageFileInput from "@/components/common/ui/ImageFileInput";
import { CategoryType } from "@/types/category";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CreatePostForm({
  categories,
}: {
  categories: CategoryType[];
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createPostFormAction, {
    postId: undefined,
    error: {
      toast: undefined,
      title: undefined,
      thumbnail: undefined,
      category: undefined,
      content: undefined,
    },
  });

  useEffect(() => {
    if (state.error?.toast) {
      toast(`❌ ${state.error.toast}`);
    }

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
    <form action={formAction} className="flex flex-col gap-6">
      <div className="font-semibold text-zinc-700">
        <Toaster />
      </div>
      <FormItem label="타이틀(30자 이내)" required error={state?.error?.title}>
        <input
          name="title"
          type="text"
          maxLength={30}
          placeholder="타이틀을 입력해주세요"
          className="input"
        />
      </FormItem>

      <FormItem label="사진" error={state?.error?.thumbnail} required>
        <div className="flex flex-row gap-2 w-full">
          <ImageFileInput name="thumbnail" labelName="대표사진" />
          <ImageFileInput name="subThumbnail" labelName="서브" />
        </div>
      </FormItem>

      <FormItem label="카테고리" error={state?.error?.category} required>
        <DropDown name="category" options={categories} />
      </FormItem>

      <FormItem label="내용" error={state?.error?.content} required>
        <textarea
          name="content"
          placeholder="블로그 글을 작성해주세요"
          rows={6}
          className="w-full input"
        />
      </FormItem>

      <div className="flex flex-row items-center">
        <input type="checkbox" id="agree" className="mr-2 w-4 h-4" />
        <label htmlFor="agree" className="text-sm text-gray-700">
          블로그 이용 정책 위반 시 글 삭제에 동의합니다.
          <span className="text-orange-300"> (필수)</span>
        </label>
      </div>

      <div className="">
        <button
          type="submit"
          className={clsx("w-full btn", isPending && "btn-disabled")}
        >
          제출하기
        </button>
      </div>
    </form>
  );
}
