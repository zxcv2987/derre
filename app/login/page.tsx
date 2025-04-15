import Header from "@/components/common/layout/Header";
import LoginForm from "@/components/domain/login/LoginForm";

export default function Page() {
  return (
    <>
      <Header>
        <div className="w-full flex items-center justify-center h-full">
          <h1 className="logo">BLOG</h1>
        </div>
      </Header>

      <article className="flex flex-col items-center h-full w-full">
        <LoginForm />
      </article>
    </>
  );
}
