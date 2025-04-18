"use server";

import { BlogPayload } from "@/types/payload";
import { fetchClient } from "./fetchClient";
import {
  BlogCreateResponseType,
  BlogListResponseType,
  BlogResponseType,
} from "@/types/response";
import { revalidateTag } from "next/cache";

export async function createPost(
  payload: BlogPayload
): Promise<BlogResponseType> {
  const res = await fetchClient("/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["blog"] },
    body: JSON.stringify(payload),
  });

  revalidateTag("blog");
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getBlog(params?: {
  page?: number;
  pageSize?: number;
  categoryId?: number | null;
  categoryName?: string | null;
  title?: string;
}): Promise<BlogListResponseType> {
  const {
    page = 1,
    pageSize = 10,
    categoryId = null,
    categoryName = null,
    title = "",
  } = params || {};

  let queryString = `page=${page}&page_size=${pageSize}`;
  if (categoryId !== null) queryString += `&category_id=${categoryId}`;
  if (categoryName) queryString += `&category_name=${categoryName}`;
  if (title) queryString += `&title=${title}`;

  const response = await fetchClient(`/blog?${queryString}`, {
    next: { tags: ["blog"] },
  });

  if (!response.ok) {
    throw new Error("게시물을 불러오는데 실패했습니다");
  }

  return response.json();
}

export async function getBlogDetail(id: string): Promise<BlogResponseType> {
  const res = await fetchClient(`/blog/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["blog"] },
    cache: "force-cache",
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetchClient(`/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  revalidateTag("blog");
  if (!res.ok) throw new Error(await res.text());
}

export async function updatePost(
  id: string,
  payload: {
    title: string;
    content: string;
    main_image?: string;
    sub_image?: string;
    category: number;
  }
): Promise<BlogCreateResponseType> {
  const res = await fetchClient(`/blog/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  revalidateTag("blog");
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
