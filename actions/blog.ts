"use server";

import { createUploadImageUrl } from "@/apis/aws";
import { createPost } from "@/apis/blog";
export async function createPostFormAction(state: unknown, formData: FormData) {
  const title = formData.get("title") as string;
  const thumbnail = formData.get("thumbnail") as File;
  const subThumbnail = formData.get("subThumbnail") as File;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;

  const isValidFile = (file: File) => {
    return (
      file instanceof File &&
      file.name &&
      file.name !== "undefined" &&
      file.size > 0
    );
  };

  // Validation
  if (!title || !thumbnail.name || !category || !content) {
    return {
      error: {
        title: title ? undefined : "타이틀을 입력해 주세요.",
        thumbnail: isValidFile(thumbnail)
          ? undefined
          : "대표사진을 업로드 해 주세요.",
        category: category ? undefined : "카테고리를 선택해 주세요.",
        content: content ? undefined : "내용을 입력해 주세요.",
      },
    };
  }

  // 이미지 업로드 Url 생성
  // Post 생성
  try {
    const mainImageUrl = await createUploadImageUrl(thumbnail.name);

    const subImageUrl = isValidFile(subThumbnail)
      ? await createUploadImageUrl(subThumbnail.name)
      : null;
    const post = await createPost({
      category: Number(category),
      title,
      mainImage: mainImageUrl.imageURL,
      subImage: subImageUrl?.imageURL,
      content,
    });

    return { postId: post.id };
  } catch (e) {
    console.log(e);
    return { error: { toast: "오류가 발생하었습니다." } };
  }
}
