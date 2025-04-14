import { getCategory } from "@/apis/category";
import PreventLeaveWrapper from "@/components/common/preventLeaveWrapper";
import CreatePostForm from "@/components/domain/blog/create/createPostForm";

export default async function Page() {
  const categories = (await getCategory()).data;
  return (
    <PreventLeaveWrapper>
      <CreatePostForm categories={categories} />
    </PreventLeaveWrapper>
  );
}
