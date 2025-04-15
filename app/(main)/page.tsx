import { getMyInfo } from "@/apis/auth";
import { getBlog } from "@/apis/blog";
import { getCategory } from "@/apis/category";
import MainComponent from "@/components/domain/main/MainComponent";
import { Suspense } from "react";
export default async function Home() {
  const categories = await getCategory();
  const posts = await getBlog();
  const user = await getMyInfo();

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <MainComponent
        postList={posts}
        categories={categories.data}
        user={user}
      />
    </Suspense>
  );
}
