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
