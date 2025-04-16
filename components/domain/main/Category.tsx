import { getCategory } from "@/apis/category";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

export default function Category({
  category,
  setCategory,
  isFetching,
}: {
  category: string | null;
  setCategory: (category: string | null) => void;
  isFetching: boolean;
}) {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory(),
  });
  return (
    <div className="flex gap-1 text-sm text-zinc-600 font-semibold whitespace-nowrap">
      <button
        disabled={isFetching}
        className={clsx(
          "px-2 py-3 cursor-pointer border-b-4 transition-all duration-100",
          category === null ? "border-orange-400" : "border-transparent"
        )}
        onClick={() => {
          setCategory(null);
        }}
      >
        전체
      </button>
      {categories?.data.map((cat) => (
        <button
          disabled={isFetching}
          key={cat.id}
          className={clsx(
            "px-2 py-3 cursor-pointer border-b-4 transition-all duration-100",
            cat.name === category ? "border-orange-400" : "border-transparent"
          )}
          onClick={() => {
            setCategory(cat.name);
          }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
