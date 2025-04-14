import { BellIcon } from "@/assets/icons";
import Header from "@/components/common/layout/Header";
import TabBar from "@/components/common/layout/TapBar";
import CreatePostButton from "@/components/domain/main/CreatePostButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <div className="flex flex-row justify-between w-full items-center">
          <h1 className="logo">BLOG</h1>
          <BellIcon />
        </div>
      </Header>
      <div className="px-4">{children}</div>
      <CreatePostButton />
      <TabBar />
    </>
  );
}
