export default function PostSearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="검색어를 입력해 주세요."
        className="w-full px-4 py-2 bg-orange-50 shadow-sm shadow-orange-200 pr-10 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-200 placeholder:font-medium placeholder:text-zinc-400"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <span>×</span>
        </button>
      )}
    </div>
  );
}
