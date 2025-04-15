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

export async function getBlog(): Promise<BlogListResponseType> {
  const res = await fetchClient("/blog", {
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
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  revalidateTag("blog");
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
