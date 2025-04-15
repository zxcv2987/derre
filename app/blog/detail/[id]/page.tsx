import { getBlogDetail } from "@/apis/blog";
import Header from "@/components/common/layout/Header";
import Content from "@/components/common/ui/Content";
import DetailHeader from "@/components/domain/blog/detail/DetailHeader";
import { formatDate } from "@/utils/format/formatDate";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const post = await getBlogDetail(id);
  return (
    <div>
      <Header>
        <DetailHeader title={post.title} id={id} />
      </Header>
      <div className="px-4 flex gap-4 flex-col">
        {post.main_image && (
          <div className="relative w-full aspect-video rounded-lg">
            <Image
              src={post.main_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div>
          <span className="font-semibold text-zinc-500">
            {post.category.name}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-500 ">
            <span>작성일시</span>
            <span>:</span>
            <time>{formatDate(post.created_at)}</time>
          </div>
        </div>

        <article className="text-zinc-700">
          <Content content={post.content} />
        </article>
      </div>
    </div>
  );
}
