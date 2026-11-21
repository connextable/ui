import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "@lucide/vue";
import { PaginationFirst, PaginationLast, PaginationNext, PaginationPrevious } from "@sectile/vue/pagination";
import { iconButtonPart } from "./icon-button-part";

export const UIPaginationFirst = iconButtonPart(PaginationFirst, ChevronsLeft, "첫 페이지");
export const UIPaginationPrevious = iconButtonPart(PaginationPrevious, ChevronLeft, "이전 페이지");
export const UIPaginationNext = iconButtonPart(PaginationNext, ChevronRight, "다음 페이지");
export const UIPaginationLast = iconButtonPart(PaginationLast, ChevronsRight, "마지막 페이지");
