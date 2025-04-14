export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 flex items-center w-full md:w-sm justify-center bg-white z-10 px-4">
      <div className="h-16 border-b border-zinc-100 w-full flex items-center bg-white">
        {children}
      </div>
    </div>
  );
}
