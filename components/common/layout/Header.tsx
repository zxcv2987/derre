export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed h-16 border-b border-zinc-100 flex items-center md:w-sm w-full bg-white ">
      {children}
    </div>
  );
}
