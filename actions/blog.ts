"use server";

import { createUploadImageUrl, uploadImage } from "@/apis/aws";
import { createPost, deletePost, updatePost } from "@/apis/blog";

// 공통 타입 정의
interface FormError {
  toast?: string;
  title?: string;
  thumbnail?: string;
  category?: string;
  content?: string;
  [key: string]: string | undefined;
}

function isValidFile(file?: File): boolean {
  if (!file) return false;
  if (!(file instanceof File)) return false;
  if (!file.name || file.name === "undefined") return false;
  if (file.size <= 0) return false;

  return true;
}

// 폼 유효성 검사 함수
function validatePostForm(
  title: string,
  thumbnail: File,
  category: string,
  content: string
): FormError | null {
  if (!title || !isValidFile(thumbnail) || !category || !content) {
    return {
      title: title ? undefined : "타이틀을 입력해 주세요.",
      thumbnail: isValidFile(thumbnail)
        ? undefined
        : "대표사진을 업로드 해 주세요.",
      category: category ? undefined : "카테고리를 선택해 주세요.",
      content: content ? undefined : "내용을 입력해 주세요.",
    };
  }
  return null;
}

// 이미지 업로드 함수
async function uploadImages(
  thumbnail: File,
  subThumbnail: File
): Promise<{ mainImageURL: string; subImageURL?: string }> {
  const mainImagePromise = createUploadImageUrl(thumbnail.name);
  const subImagePromise = isValidFile(subThumbnail)
    ? createUploadImageUrl(subThumbnail.name)
    : Promise.resolve(null);

  const [mainImageUpload, subImageUpload] = await Promise.all([
    mainImagePromise,
    subImagePromise,
  ]);

  const uploadTasks = [uploadImage(mainImageUpload.uploadURL, thumbnail)];
  if (subImageUpload) {
    uploadTasks.push(uploadImage(subImageUpload.uploadURL, subThumbnail));
  }

  await Promise.all(uploadTasks);

  return {
    mainImageURL: mainImageUpload.imageURL,
    subImageURL: subImageUpload?.imageURL,
  };
}

// 폼 데이터 추출 함수
function extractFormData(formData: FormData): {
  title: string;
  thumbnail: File;
  subThumbnail: File;
  category: string;
  content: string;
  postId?: string;
} {
  const title = formData.get("title") as string;
  const thumbnail = formData.get("thumbnail") as File;
  const subThumbnail = formData.get("subThumbnail") as File;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  const postId = (formData.get("postId") as string) || undefined;

  return {
    title,
    thumbnail,
    subThumbnail,
    category,
    content,
    postId,
  };
}

// 게시글 생성 액션
export async function createPostFormAction(
  state: unknown,
  formData: FormData
): Promise<{ postId?: string; error?: FormError | undefined }> {
  try {
    // 1. 폼 데이터 추출
    const { title, thumbnail, subThumbnail, category, content } =
      extractFormData(formData);

    // 2. 유효성 검사
    const validationError = validatePostForm(
      title,
      thumbnail,
      category,
      content
    );
    if (validationError) {
      return { error: validationError };
    }

    // 3. 이미지 업로드
    const { mainImageURL, subImageURL } = await uploadImages(
      thumbnail,
      subThumbnail
    );

    // 4. 게시글 생성
    const post = await createPost({
      category: Number(category),
      title,
      main_image: mainImageURL,
      sub_image: subImageURL,
      content,
    });

    return { postId: post.id.toString() };
  } catch (e) {
    console.error("게시글 생성 오류:", e);
    return { error: { toast: "게시글 생성 중 오류가 발생하였습니다." } };
  }
}

// 게시글 수정 액션
export async function editPostFormAction(
  state: unknown,
  formData: FormData
): Promise<{ postId?: string; error?: FormError | undefined }> {
  try {
    // 1. 폼 데이터 추출
    const { title, thumbnail, subThumbnail, category, content, postId } =
      extractFormData(formData);

    // 2. 유효성 검사
    if (!postId) {
      return { error: { toast: "게시글 ID가 없습니다." } };
    }

    const needImageValidation = isValidFile(thumbnail); // 이미지가 제공된 경우에만 검증

    if (!title || !category || !content) {
      return {
        error: {
          title: title ? undefined : "타이틀을 입력해 주세요.",
          category: category ? undefined : "카테고리를 선택해 주세요.",
          content: content ? undefined : "내용을 입력해 주세요.",
        },
      };
    }

    // 3. 조건부 이미지 업로드
    let mainImageURL;
    let subImageURL;

    if (needImageValidation) {
      const imageResults = await uploadImages(thumbnail, subThumbnail);
      mainImageURL = imageResults.mainImageURL;
      subImageURL = imageResults.subImageURL;
    }

    // 4. 게시글 업데이트
    await updatePost(postId, {
      category: Number(category),
      title,
      content,
      ...(mainImageURL && { main_image: mainImageURL }),
      ...(subImageURL && { sub_image: subImageURL }),
    });

    return { postId };
  } catch (e) {
    console.error("게시글 수정 오류:", e);
    return { error: { toast: "게시글 수정 중 오류가 발생하였습니다." } };
  }
}

// 게시글 삭제 액션
export async function deletePostAction(postId: string) {
  try {
    await deletePost(postId);
  } catch (e) {
    console.error("게시글 삭제 오류:", e);
    return { error: { toast: "게시글 삭제 중 오류가 발생하였습니다." } };
  }
}
