import { CreateIcon } from "@/assets/icons";
import Link from "next/link";

export default function CreatePostButton() {
  return (
    <div className="fixed bottom-22 right-4 md:translate-x-[calc(172px)] md:right-1/2 z-50">
      <Link
        href={"/blog/create"}
        className="w-14 h-14 bg-orange-400 rounded-full flex justify-center items-center cursor-pointer"
      >
        <CreateIcon />
      </Link>
    </div>
  );
}
