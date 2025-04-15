export default function ModalTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-semibold text-zinc-800">{children}</h2>
    </div>
  );
}
