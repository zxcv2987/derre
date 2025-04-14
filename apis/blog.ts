import { BlogPayload } from "@/types/payload";
import { fetchClient } from "./fetchClient";
import { BlogListResponseType, BlogResponseType } from "@/types/response";

export async function createPost(
  payload: BlogPayload
): Promise<BlogResponseType> {
  const res = await fetchClient("/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  console.log("api res:", res);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getBlog(): Promise<BlogListResponseType> {
  const res = await fetchClient("/blog", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
