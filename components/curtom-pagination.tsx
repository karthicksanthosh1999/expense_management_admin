import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const CustomPagination = () => {
  let isActive = true;
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className="text-xl p-1 font-semibold border hover:border-violet-500 rounded-lg"
          style={{ backgroundColor: isActive ? "#7363F3" : "transparent" }}>
          <PaginationLink href="#" aria-label="Go to previous page" size="icon">
            <ChevronLeftIcon className="size-5" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className="text-xl p-1 font-semibold border hover:border-violet-500 rounded-lg"
          style={{ backgroundColor: isActive ? "#7363F3" : "transparent" }}>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem
          className="text-xl p-1 font-semibold border hover:border-violet-500 rounded-lg"
          style={{ backgroundColor: isActive ? "#7363F3" : "transparent" }}>
          <PaginationLink href="#" isActive className="bg-transparent">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className="text-xl p-1 font-semibold border hover:border-violet-500 rounded-lg"
          style={{ backgroundColor: isActive ? "#7363F3" : "transparent" }}>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem
          className="text-xl p-1 font-semibold border hover:border-violet-500 rounded-lg"
          style={{ backgroundColor: isActive ? "#7363F3" : "transparent" }}>
          <PaginationLink href="#" aria-label="Go to next page" size="icon">
            <ChevronRightIcon className="size-5" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
