import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { CarouselNext, CarouselPrevious } from "@sectile/vue/carousel";
import { iconButtonPart } from "./icon-button-part";

export const UICarouselPrevious = iconButtonPart(CarouselPrevious, ChevronLeft, "이전 슬라이드");
export const UICarouselNext = iconButtonPart(CarouselNext, ChevronRight, "다음 슬라이드");
