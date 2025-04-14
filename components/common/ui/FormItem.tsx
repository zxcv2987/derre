import clsx from "clsx";

export default function FormItem({
  label,
  children,
  error,
  required,
}: {
  label?: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="flex h-auto w-full flex-col items-start justify-start gap-2">
      <label
        className={clsx(
          `text-md text-black`,
          required && {
            [`after:text-red-500 after:content-["*"]`]: required,
          }
        )}
      >
        {label}
      </label>
      {children}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
