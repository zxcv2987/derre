import { getMyInfo } from "@/apis/auth";
import { getBlog } from "@/apis/blog";
import { getCategory } from "@/apis/category";
import MainComponent from "@/components/domain/main/MainComponent";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const categories = await getCategory();
  const user = await getMyInfo();
  const posts = await getBlog();

  const queryClient = new QueryClient();

  queryClient.setQueryData(["posts"], {
    page: 1,
    page_size: 10,
    title: "",
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MainComponent
        postList={posts}
        categories={categories.data}
        user={user}
      />
    </HydrationBoundary>
  );
}
