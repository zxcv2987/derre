export default function ModalActionsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex justify-end gap-2 px-6 py-4 ">{children}</div>;
}
