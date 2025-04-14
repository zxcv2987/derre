import Link from "next/link";
import Image from "next/image";
import { BlogResponseType } from "@/types/response";

export default function BlogPostList({ posts }: { posts: BlogResponseType[] }) {
  return (
    <>
      {posts.map((post) => (
        <Link
          href={`/blog/detail/${post.id}`}
          key={post.id}
          className="flex flex-row p-2 py-5 rounded-lg shadow-sm transition-shadow"
        >
          {post.main_image && (
            <div className="w-1/3 h-24 relative rounded-lg ">
              <Image
                src={post.main_image}
                alt={post.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
          <div className="flex flex-col flex-1 gap-1 pl-3">
            <h2 className="text-lg font-bold text-zinc-700 truncate">
              {post.title}
            </h2>
            <p className="text-zinc-600 line-clamp-2 text-sm truncate">
              {post.content}
            </p>
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-zinc-400 text-xs">
                작성일시 : {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
