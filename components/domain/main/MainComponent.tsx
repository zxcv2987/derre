import { CategoryType } from "@/types/category";
import { BlogResponseType } from "@/types/response";
import Image from "next/image";

export default function MainComponent({
  posts,
  categories,
}: {
  posts: BlogResponseType[];
  categories: CategoryType[];
}) {
  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div className="flex w-full h-32 rounded-xl overflow-hidden shadow-md bg-white">
            {post.mainImage && (
              <div className="relative">
                <Image
                  fill
                  src={post.mainImage}
                  alt={post.title}
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-4 flex flex-col justify-center gap-1">
              <h3 className="text-lg font-semibold truncate">{post.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {post.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
