import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const PaginationComponent = ({ currentPage, totalPages, variant }) => {
  const renderPaginationItems = () => {
    const paginationItems = [];

    // Always add the first page
    paginationItems.push(
      <PaginationItem key={1}>
        <PaginationLink href="#" className="border border-muted-foreground">
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (totalPages > 3) {
      if (currentPage > 3) {
        // If current page is beyond the first 3 pages, show ellipsis
        paginationItems.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Determine the start and end range for the pagination items
      const startPage = Math.max(currentPage - 1, 2);
      const endPage = Math.min(currentPage + 1, totalPages - 1);

      for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink href="#" className="border border-muted-foreground">
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage + 1 < totalPages - 1) {
        // If current page is not within the last 3 pages, show ellipsis
        paginationItems.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always add the last page
      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href="#" className="border border-muted-foreground">
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    } else {
      // If total pages are 3 or less, show all pages
      for (let i = 2; i <= totalPages; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink href="#" className="border border-muted-foreground">
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return paginationItems;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem key="prev">
          <PaginationPrevious href="#" />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem key="next">
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
