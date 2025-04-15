import { getBlogDetail } from "@/apis/blog";
import { getCategory } from "@/apis/category";
import EditPostForm from "@/components/domain/blog/edit/EditPostForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const categories = (await getCategory()).data;
  const post = await getBlogDetail((await params).id);
  return <EditPostForm categories={categories} post={post} />;
}
