"use client";
import { CategoryType } from "@/types/category";
import { BlogListResponseType, UserResponseType } from "@/types/response";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Category from "@/components/domain/main/Category";
import BlogPostList from "@/components/domain/main/BlogPostList";
import PostSearchBar from "@/components/domain/main/PostSearchBar";
import PagiNation from "@/components/common/ui/PagiNation";
import { getBlog } from "@/apis/blog";

const getPostsQueryKey = (params: {
  page: number;
  pageSize: number;
  category: string | null;
  title: string;
}) => ["posts", params.page, params.pageSize, params.category, params.title];

export default function MainComponent({
  postList,
  categories,
  user,
}: {
  postList: BlogListResponseType;
  categories: CategoryType[];
  user: UserResponseType;
}) {
  const [currentPage, setCurrentPage] = useState<number>(postList.curPage);
  const [pageSize] = useState<number>(10);
  const [category, setCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const queryParams = {
    page: currentPage,
    pageSize,
    category,
    title: searchQuery,
  };

  const queryKey = getPostsQueryKey(queryParams);

  const { data, isLoading, isFetching } = useQuery({
    queryKey,
    queryFn: () =>
      getBlog({
        page: currentPage,
        pageSize,
        categoryName: category,
        title: searchQuery,
      }),
    initialData: postList,
  });

  return (
    <div className="flex flex-col gap-6">
      {isFetching && (
        <div className="fixed top-0 left-0 w-full h-1 bg-orange-400 animate-pulse" />
      )}

      <Category
        categories={categories}
        category={category}
        setCategory={(newCategory: string | null) => {
          setCategory(newCategory);
          setCurrentPage(1);
        }}
      />

      <PostSearchBar
        searchQuery={searchQuery}
        setSearchQuery={(newSearch: string) => {
          setSearchQuery(newSearch);
          setCurrentPage(1);
        }}
        isPending={isLoading}
      />

      {isLoading || isFetching ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-400"></div>
        </div>
      ) : data?.data.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          검색 결과가 없습니다.
        </div>
      ) : (
        <BlogPostList posts={data?.data || []} user={user} />
      )}

      <PagiNation
        currentPage={currentPage}
        totalPages={data?.pageCnt || 1}
        onPageChange={(page: number) => {
          setCurrentPage(page);
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}
