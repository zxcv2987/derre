import Header from "@/components/common/layout/Header";
import GoBackConfirmModal from "@/components/common/modal/GoBackConfirmModal";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <div className="flex flex-row gap-4 items-center font-bold text-2xl">
          <GoBackConfirmModal href="/" />
          <h2 className="">글 수정</h2>
        </div>
      </Header>
      <div className="pb-10 px-4">{children}</div>
    </>
  );
}
