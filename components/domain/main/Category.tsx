import { CategoryType } from "@/types/category";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";

export default function Category({
  categories,
  category,
  setCategory,
}: {
  categories: CategoryType[];
  category: string | null;
  setCategory: (category: string | null) => void;
}) {
  const queryClient = useQueryClient();
  return (
    <div className="flex gap-1 text-sm text-zinc-600 font-semibold whitespace-nowrap">
      <button
        className={clsx(
          "px-2 py-3 cursor-pointer border-b-4 transition-all duration-100",
          category === null ? "border-orange-400" : "border-transparent"
        )}
        onClick={() => {
          setCategory(null);
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        }}
      >
        전체
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={clsx(
            "px-2 py-3 cursor-pointer border-b-4 transition-all duration-100",
            cat.name === category ? "border-orange-400" : "border-transparent"
          )}
          onClick={() => {
            setCategory(cat.name);
            queryClient.invalidateQueries({ queryKey: ["posts"] });
          }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
