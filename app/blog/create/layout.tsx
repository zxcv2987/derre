import Header from "@/components/common/layout/Header";
import ConfirmGoBackButton from "@/components/domain/blog/ConfirmGoBackButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <div className="flex flex-row gap-4 items-center font-bold text-2xl">
          <ConfirmGoBackButton />
          <h2 className="">글 등록</h2>
        </div>
      </Header>
      <div className="pb-10 px-4">{children}</div>
    </>
  );
}
