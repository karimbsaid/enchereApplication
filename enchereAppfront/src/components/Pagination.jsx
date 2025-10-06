import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import Button from "./Button";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  console.log(currentPage);
  const isLastPage = currentPage + 1 >= totalPages;
  const isFirstPage = currentPage === 0;
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <Button
        disabled={isFirstPage}
        onClick={() => {
          if (!isFirstPage) onPageChange(currentPage - 1);
        }}
      >
        <HiChevronLeft />
        Previous
      </Button>

      <span className="px-4 text-sm">
        Page {currentPage + 1} of {totalPages}
      </span>

      <Button
        disabled={isLastPage}
        onClick={() => {
          if (!isLastPage) onPageChange(currentPage + 1);
        }}
      >
        Next
        <HiChevronRight />
      </Button>
    </div>
  );
}
