import { getBlogDetail } from "@/apis/blog";
import { getCategory } from "@/apis/category";
import EditPostForm from "@/components/domain/blog/edit/EditPostForm";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const categories = await getCategory();
  const post = await getBlogDetail((await params).id);
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <EditPostForm categories={categories.data} post={post} />
    </Suspense>
  );
}
