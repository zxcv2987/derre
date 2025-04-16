import { getMyInfo } from "@/apis/auth";
import { getBlog } from "@/apis/blog";
import { getCategory } from "@/apis/category";
import MainComponent from "@/components/domain/main/MainComponent";
import { getQueryClient } from "@/utils/lib/tnastack-query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Home() {
  const categories = await getCategory();
  const user = await getMyInfo();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", 1, 10, null, ""],
    queryFn: () => {
      return getBlog({ page: 1, pageSize: 10, categoryName: null, title: "" });
    },
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <MainComponent categories={categories.data} user={user} />
    </HydrationBoundary>
  );
}
