import { getMyInfo } from "@/apis/auth";
import { getBlog } from "@/apis/blog";
import { getCategory } from "@/apis/category";
import MainComponent from "@/components/domain/main/MainComponent";
export default async function Home() {
  const categories = await getCategory();
  const posts = await getBlog();
  const user = await getMyInfo();

  return (
    <MainComponent postList={posts} categories={categories.data} user={user} />
  );
}
