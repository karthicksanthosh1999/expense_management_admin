import { useId } from "react";
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  totalData: number;
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsChange: (rows: number) => void;
}

const CardPagination = ({
  totalData,
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsChange,
}: IProps) => {
  const id = useId();

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const start = (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, totalData);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-6">
      {/* Rows Per Page */}
      <div className="flex items-center gap-3">
        <Label htmlFor={id}>Rows per page</Label>

        <Select
          value={String(rowsPerPage)}
          onValueChange={(value) => onRowsChange(Number(value))}>
          <SelectTrigger id={id} className="w-fit">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Showing Text */}
      <p className="text-sm text-muted-foreground">
        Showing <span>{start}</span> to <span>{end}</span> of{" "}
        <span>{totalData}</span> products
      </p>

      {/* Pagination */}
      <Pagination className="w-fit">
        <PaginationContent>
          {/* First */}
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(1)}
              className={isFirstPage ? "pointer-events-none opacity-50" : ""}>
              <ChevronFirstIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>

          {/* Prev */}
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(currentPage - 1)}
              className={isFirstPage ? "pointer-events-none opacity-50" : ""}>
              <ChevronLeftIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>

          {/* Pages */}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(currentPage + 1)}
              className={isLastPage ? "pointer-events-none opacity-50" : ""}>
              <ChevronRightIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>

          {/* Last */}
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(totalPages)}
              className={isLastPage ? "pointer-events-none opacity-50" : ""}>
              <ChevronLastIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CardPagination;
