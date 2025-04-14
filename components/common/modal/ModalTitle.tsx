export default function ModalTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 py-4 border-b border-zinc-100">
      <h2 className="text-xl font-bold text-zinc-700">{children}</h2>
    </div>
  );
}
