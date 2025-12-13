import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Previous Page Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {startPage > 1 && (
        <>
          <Button
            variant={1 === currentPage ? "primary" : "outline"}
            size="sm"
            onClick={() => onPageChange(1)}
          >
            1
          </Button>
          {startPage > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "primary" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-gray-400">...</span>
          )}
          <Button
            variant={totalPages === currentPage ? "primary" : "outline"}
            size="sm"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
