import clsx from "clsx";

export default function ModalAction({
  onClick,
  variant = "disabled",
  children,
}: {
  onClick: (e: React.MouseEvent) => void;
  variant?: "primary" | "disabled" | "danger";
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx("px-4 py-2 rounded-lg transition-colors", {
        "bg-orange-400 text-white hover:bg-orange-500": variant === "primary",
        "bg-zinc-100 text-zinc-700 hover:bg-zinc-200": variant === "disabled",
        "bg-red-500 text-white hover:bg-red-600": variant === "danger",
      })}
    >
      {children}
    </button>
  );
}
