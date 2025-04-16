"use server";
import { CategoryListResponseType } from "@/types/response";
import { fetchClient } from "./fetchClient";

export async function getCategory(): Promise<CategoryListResponseType> {
  const res = await fetchClient("/category", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
