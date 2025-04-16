import { useState, FormEvent } from "react";

export default function PostSearchBar({
  searchQuery,
  setSearchQuery,
  isPending,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isPending: boolean;
}) {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="flex">
        <input
          type="text"
          disabled={isPending}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // 로컬 상태만 업데이트
          placeholder="검색어를 입력해 주세요."
          className="w-full px-4 py-2 bg-orange-50 shadow-sm shadow-orange-200 pr-10 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-orange-200 placeholder:font-medium placeholder:text-zinc-400"
        />
        <button
          type="submit"
          className="bg-orange-400 text-xs hover:bg-orange-500 text-white px-4 whitespace-nowrap font-semibold rounded-r-lg transition-colors"
        >
          검색
        </button>
      </div>

      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="cursor-pointer absolute right-[4.5rem] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <span>×</span>
        </button>
      )}
    </form>
  );
}
