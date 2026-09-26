"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** Build a windowed list of page numbers around the current page. */
function pageWindow(currentPage: number, totalPages: number, size = 5): number[] {
  const count = Math.min(size, totalPages);
  let start = Math.max(1, currentPage - Math.floor(count / 2));
  const end = Math.min(totalPages, start + count - 1);
  start = Math.max(1, end - count + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({
  className,
  currentPage,
  limit,
  onPageChange,
  total,
}: {
  className?: string;
  currentPage: number;
  limit: number;
  /** Transport-agnostic: wire to a router push, state setter, or fetch. */
  onPageChange: (page: number) => void;
  total: number;
}) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (totalPages <= 1) {
    return null;
  }

  const go = (page: number) => onPageChange(Math.min(totalPages, Math.max(1, page)));
  const pages = pageWindow(currentPage, totalPages);

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-3 py-3 sm:px-4",
        className,
      )}
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          className="relative inline-flex items-center rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-4 py-2 text-[13px] font-medium text-[var(--ds-gray-900)] hover:bg-[var(--ds-gray-100)] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => go(currentPage - 1)}
          type="button"
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-4 py-2 text-[13px] font-medium text-[var(--ds-gray-900)] hover:bg-[var(--ds-gray-100)] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => go(currentPage + 1)}
          type="button"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-[13px] text-[var(--ds-gray-700)]">
          Showing{" "}
          <span className="font-medium">
            {Math.min((currentPage - 1) * limit + 1, total)}
          </span>{" "}
          to <span className="font-medium">{Math.min(currentPage * limit, total)}</span> of{" "}
          <span className="font-medium">{total}</span> results
        </p>
        <nav aria-label="Pagination" className="isolate inline-flex gap-1 rounded-[7px]">
          <button
            className="relative inline-flex items-center rounded-[6px] border border-[var(--ds-gray-alpha-400)] px-2 py-2 text-[var(--ds-gray-700)] hover:bg-[var(--ds-gray-100)] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => go(currentPage - 1)}
            type="button"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>

          {pages.map((pageNum) => (
            <button
              aria-current={currentPage === pageNum ? "page" : undefined}
              className={cn(
                "relative inline-flex items-center rounded-[6px] border px-3 py-2 text-[13px] font-semibold",
                currentPage === pageNum
                  ? "z-10 border-[var(--ds-gray-1000)] bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]"
                  : "border-[var(--ds-gray-alpha-400)] text-[var(--ds-gray-900)] hover:bg-[var(--ds-gray-100)]",
              )}
              key={pageNum}
              onClick={() => go(pageNum)}
              type="button"
            >
              {pageNum}
            </button>
          ))}

          <button
            className="relative inline-flex items-center rounded-[6px] border border-[var(--ds-gray-alpha-400)] px-2 py-2 text-[var(--ds-gray-700)] hover:bg-[var(--ds-gray-100)] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => go(currentPage + 1)}
            type="button"
          >
            <span className="sr-only">Next</span>
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
}
