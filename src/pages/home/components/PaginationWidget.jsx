import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


function PaginationWidget({ onNext, onPrevious, totalPages, currentPage }) {
  return (
    <Pagination className="justify-normal">
      <PaginationContent className="w-full justify-between">
          <PaginationItem className={currentPage > 1 ?"cursor-pointer" : "invisible"} onClick={onPrevious}>
            <PaginationPrevious />
          </PaginationItem>
        <PaginationItem className="mx-auto">
          <p className="font-semibold">
            Page {currentPage}/{totalPages}
          </p>
        </PaginationItem>

        <PaginationItem
          className={currentPage != totalPages ?"cursor-pointer" : "invisible"}
          onClick={onNext}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationWidget;
