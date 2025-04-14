export default function ModalContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="px-6 py-4">{children}</div>;
}
