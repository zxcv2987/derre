"use client";

import FormItem from "@/components/common/ui/FormItem";
import ImageFileInput from "@/components/common/ui/ImageFileInput";
import DropDown from "@/components/common/ui/DropDown";
import { CategoryType } from "@/types/category";
import { BlogResponseType } from "@/types/response";
import { useEffect, useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";
import clsx from "clsx";
import PreventLeaveWrapper from "@/components/common/preventLeaveWrapper";
import Modal from "@/components/common/modal/composition/ModalRoot";
import { redirect, RedirectType, useRouter } from "next/navigation";
interface FormError {
  toast?: string;
  title?: string;
  thumbnail?: string;
  category?: string;
  content?: string;
  [key: string]: string | undefined;
}

interface PostFormProps {
  categories: CategoryType[];
  formAction: (formData: FormData) => void;
  error?: FormError;
  post?: BlogResponseType;
  isEdit?: boolean;
  isPending?: boolean;
  isAllowLeave?: boolean;
}

export default function PostForm({
  categories,
  formAction,
  error = {},
  post,
  isEdit = false,
  isPending = false,
  isAllowLeave = false,
}: PostFormProps) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  useEffect(() => {
    if (error?.toast) {
      toast(error.toast);
    }
  }, [error]);

  useEffect(() => {
    if (isAllowLeave) {
      startTransition(() => {
        const currentPosition = window.history.state?.idx || 0;
        window.history.replaceState({ idx: currentPosition - 2 }, "", "/");
        redirect("/", RedirectType.replace);
      });
    }
  }, [isAllowLeave, router]);
  return (
    <PreventLeaveWrapper isSuccess={isAllowLeave}>
      <Modal.Root isOpen={isPending || isLoading} onClose={() => {}}>
        <Modal.Content>
          <div className="w-full flex justify-center">로딩중...</div>
        </Modal.Content>
      </Modal.Root>

      <form action={formAction} className="flex flex-col gap-6">
        {isEdit && post?.id && (
          <input type="hidden" name="postId" value={post.id} />
        )}

        <div className="font-semibold text-zinc-700">
          <Toaster />
        </div>

        <FormItem label="타이틀(30자 이내)" required error={error?.title}>
          <input
            name="title"
            type="text"
            maxLength={30}
            placeholder="타이틀을 입력해주세요"
            className="input"
            defaultValue={post?.title || ""}
          />
        </FormItem>

        <FormItem label="사진" error={error?.thumbnail} required={!isEdit}>
          <div className="flex flex-row gap-2 w-full">
            <ImageFileInput
              name="thumbnail"
              labelName="대표사진"
              previewUrl={post?.main_image}
            />
            <ImageFileInput
              name="subThumbnail"
              labelName="서브"
              previewUrl={post?.sub_image}
            />
          </div>
          {isEdit && (
            <p className="text-sm text-gray-500 mt-1">
              새 이미지를 업로드하지 않으면 기존 이미지가 유지됩니다.
            </p>
          )}
        </FormItem>

        <FormItem label="카테고리" error={error?.category} required>
          <DropDown
            name="category"
            options={categories}
            defaultValue={post?.category?.id}
          />
        </FormItem>

        <FormItem label="내용" error={error?.content} required>
          <textarea
            name="content"
            placeholder="블로그 글을 작성해주세요"
            rows={6}
            className="w-full input"
            defaultValue={post?.content || ""}
          />
        </FormItem>

        <div className="flex flex-row items-center">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            className="mr-2 w-4 h-4"
            defaultChecked={isEdit} // 수정 시 기본 체크
            required
          />
          <label htmlFor="agree" className="text-sm text-gray-700">
            블로그 이용 정책 위반 시 글 삭제에 동의합니다.
            <span className="text-orange-300"> (필수)</span>
          </label>
        </div>

        <div className="">
          <button
            type="submit"
            className={clsx("w-full btn", isPending && "btn-disabled")}
            disabled={isPending}
          >
            {isEdit ? "수정하기" : "작성하기"}
          </button>
        </div>
      </form>
    </PreventLeaveWrapper>
  );
}
