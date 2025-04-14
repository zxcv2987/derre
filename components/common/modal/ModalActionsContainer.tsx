export default function ModalActionsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-end gap-2 px-6 py-4 border-t border-zinc-100">
      {children}
    </div>
  );
}
