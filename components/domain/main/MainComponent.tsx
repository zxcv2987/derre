"use client";
import { CategoryType } from "@/types/category";
import { BlogListResponseType, UserResponseType } from "@/types/response";
import { useState } from "react";
import Category from "./Category";
import BlogPostList from "./BlogPostList";
import PostSearchBar from "./PostSearchBar";
import PagiNation from "@/components/common/ui/PagiNation";

export default function MainComponent({
  postList,
  categories,
  user,
}: {
  postList: BlogListResponseType;
  categories: CategoryType[];
  user: UserResponseType;
}) {
  const posts = postList.data;
  const [category, setCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = category ? post.category.name === category : true;
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      <Category
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
      <PostSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <BlogPostList posts={filteredPosts} user={user} />
      <PagiNation
        currentPage={currentPage}
        totalPages={postList.pageCnt}
        onPageChange={(e) => {
          setCurrentPage(e);
        }}
      />
    </div>
  );
}
