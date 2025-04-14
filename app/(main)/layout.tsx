import { BellIcon } from "@/assets/icons";
import Header from "@/components/common/layout/Header";
import TabBar from "@/components/common/layout/TapBar";
import CreatePostButton from "@/components/domain/main/CreatePostButton";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <Link
          href="/"
          className="flex flex-row justify-between w-full items-center cursor-pointer"
        >
          <h1 className="logo">BLOG</h1>
          <BellIcon />
        </Link>
      </Header>
      <div className="px-4">{children}</div>
      <CreatePostButton />
      <TabBar />
    </>
  );
}
