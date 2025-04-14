import { getBlog } from "@/apis/blog";
import { getCategory } from "@/apis/category";
import MainComponent from "@/components/domain/main/MainComponent";
export default async function Home() {
  const categories = await getCategory();
  const posts = await getBlog();
  return <MainComponent postList={posts} categories={categories.data} />;
}
