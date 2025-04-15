import { getCategory } from "@/apis/category";
import CreatePostForm from "@/components/domain/blog/create/CreatePostForm";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <CreatePostForm categories={(await getCategory()).data} />
    </Suspense>
  );
}
