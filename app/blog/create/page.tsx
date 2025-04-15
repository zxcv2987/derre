import { getCategory } from "@/apis/category";
import CreatePostForm from "@/components/domain/blog/create/CreatePostForm";

export default async function Page() {
  const categories = (await getCategory()).data;
  return <CreatePostForm categories={categories} />;
}
