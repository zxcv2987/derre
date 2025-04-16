"use client";
import { CategoryType } from "@/types/category";
import { UserResponseType } from "@/types/response";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Category from "@/components/domain/main/Category";
import BlogPostList from "@/components/domain/main/BlogPostList";
import PostSearchBar from "@/components/domain/main/PostSearchBar";
import PagiNation from "@/components/common/ui/PagiNation";
import { getBlog } from "@/apis/blog";

export default function MainComponent({
  categories,
  user,
}: {
  categories: CategoryType[];
  user: UserResponseType;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [categoryName, setCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const queryKey = ["posts", currentPage, pageSize, categoryName, searchQuery];

  const { data, isLoading, isFetching } = useQuery({
    queryKey,
    queryFn: () => {
      return getBlog({
        page: currentPage,
        pageSize,
        categoryName: categoryName,
        title: searchQuery,
      });
    },
  });
  return (
    <div className="flex flex-col gap-6">
      {isFetching && (
        <div className="fixed top-0 left-0 w-full h-1 bg-orange-400 animate-pulse" />
      )}

      <Category
        isFetching={isFetching}
        categories={categories}
        category={categoryName}
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
