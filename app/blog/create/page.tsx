import { getCategory } from "@/apis/category";
import CreatePostForm from "@/components/domain/blog/create/CreatePostForm";

export default async function Page() {
  return <CreatePostForm categories={(await getCategory()).data} />;
}
