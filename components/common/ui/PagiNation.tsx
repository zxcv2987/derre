export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesShow = 5;

    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxPagesShow - 1);

    if (endPage - startPage + 1 < maxPagesShow) {
      startPage = Math.max(1, endPage - maxPagesShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-lg rounded-md disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-orange-50"
        >
          «
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-lg rounded-md disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-orange-50"
        >
          ‹
        </button>

        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-1 text-sm font-semibold rounded-md ${
              pageNum === currentPage
                ? "bg-orange-400 text-white"
                : "hover:bg-orange-50"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-lg rounded-md disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-orange-50"
        >
          ›
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-lg rounded-md disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-orange-50"
        >
          »
        </button>
      </div>
    </div>
  );
}
