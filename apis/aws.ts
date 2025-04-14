import { UploadImageUrlResponseType } from "@/types/response";
import { fetchClient } from "./fetchClient";

export async function createUploadImageUrl(
  fileName: string
): Promise<UploadImageUrlResponseType> {
  const res = await fetchClient(`/aws/upload`, {
    method: "POST",
    body: JSON.stringify({ file_name: fileName }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function uploadImage(uploadUrl: string, file: File) {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
  });

  if (!res.ok) throw new Error(await res.text());
  return res;
}
