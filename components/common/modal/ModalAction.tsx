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
  const variantStyles = {
    primary: "bg-orange-400 text-white ",
    disabled: "bg-zinc-100 text-zinc-700",
    danger: "bg-red-400 text-white ",
  };

  return (
    <button
      onClick={onClick}
      className={clsx([
        "px-4 py-2 rounded-lg transition-colors",
        variantStyles[variant],
      ])}
    >
      {children}
    </button>
  );
}
