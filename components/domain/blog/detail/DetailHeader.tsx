"use client";

import { useRouter } from "next/navigation";

export default function DetailHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-row w-full justify-between items-center">
      <div className="flex flex-row gap-4 items-center justify-center">
        <button
          className="text-zinc-400 text-xl flex items-center font-bold cursor-pointer"
          onClick={() => router.back()}
        >
          ‹
        </button>
        <h1 className="font-semibold text-lg text-zinc-700">{title}</h1>
      </div>
      <button className="cursor-pointer">수정</button>
    </div>
  );
}
