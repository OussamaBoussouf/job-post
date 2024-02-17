import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PaginationWidget({ onNext, onPrevious, totalPages, currentPage }) {
  return (
    <Pagination className="justify-normal">
      <PaginationContent className="w-full justify-between">
        {currentPage > 1 && (
          <PaginationItem className="cursor-pointer" onClick={onPrevious}>
            <PaginationPrevious />
          </PaginationItem>
        )}
          <PaginationItem className="mx-auto">
            <p className="font-semibold">
              Page {currentPage} of {totalPages}
            </p>
          </PaginationItem>
        {currentPage < totalPages && (
          <PaginationItem className="cursor-pointer" onClick={onNext}>
            <PaginationNext/>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationWidget;
