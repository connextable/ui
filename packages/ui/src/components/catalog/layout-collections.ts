import { CarouselIndicator, CarouselIndicatorGroup, CarouselRoot, CarouselTrack, CarouselViewport } from "@sectile/vue/carousel";
import { FeedItem, FeedRoot } from "@sectile/vue/feed";
import { defineComponent, h, type Component, type PropType, type VNodeChild } from "vue";
import { controlFlag } from "../clear/clearable";
import { UICarouselNext, UICarouselPrevious } from "./carousel-controls";
import UICarouselPause from "./UICarouselPause.vue";
import UICarouselSlide from "./UICarouselSlide.vue";

type Slide = { id: string; title: string; description?: string };
type Activity = { id: string; title: string; description?: string; time?: string; dateTime?: string; actor?: string; icon?: Component };
type Collection<Root extends Component, Key extends PropertyKey, Entry, Options, NamedSlots> = new () =>
  Root extends abstract new (...args: never[]) => infer Instance
    ? Instance extends { $props: infer Props; $slots: infer Slots }
      ? Omit<Instance, "$props" | "$slots"> & {
        $props: Omit<Props, Key> & Record<Key, readonly (string | Entry)[]> & Options;
        $slots: Slots & NamedSlots;
      }
      : never
    : never;

export const UICarousel = defineComponent({
  name: "UICarousel",
  inheritAttrs: false,
  props: { slides: { type: Array as PropType<readonly (string | Slide)[]>, required: true }, indicators: Boolean },
  setup(props, { attrs, slots }) {
    return () => {
      const slides = props.slides.map(slide => typeof slide === "string" ? { id: slide, title: slide } : slide);
      const ids = slides.map(slide => slide.id);
      if (slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])) return h(CarouselRoot as Component, { ...attrs, slides: ids }, slots);

      return h(CarouselRoot as Component, {
        indicatorGroupLabel: "슬라이드 선택",
        getSlideLabel: (id: string, index: number) => slides[index]?.title ?? id,
        getIndicatorLabel: (id: string, index: number) => `${slides[index]?.title ?? id} 슬라이드`,
        ...attrs,
        slides: ids,
      }, { default: () => [
        h(CarouselViewport, null, () => h(CarouselTrack, null, () => slides.map(slide =>
          h(UICarouselSlide, { key: slide.id, value: slide.id }, () => slots.slide?.({ slide }) ?? [
            h("strong", slide.title), slide.description && h("span", slide.description),
          ])))),
        h(UICarouselPrevious),
        props.indicators && h(CarouselIndicatorGroup, null, () => ids.map(id => h(CarouselIndicator, { key: id, value: id }))),
        h(UICarouselNext),
        Boolean(attrs.autoplay || attrs.autoplay === "") && h(UICarouselPause),
      ] });
    };
  },
}) as unknown as Collection<typeof CarouselRoot, "slides", Slide, { indicators?: boolean }, { slide?: (state: { slide: Slide }) => VNodeChild }>;

export const UIFeed = defineComponent({
  name: "UIFeed",
  inheritAttrs: false,
  props: { items: { type: Array as PropType<readonly (string | Activity)[]>, required: true } },
  setup(props, { attrs, slots }) {
    return () => {
      const items = props.items.map(item => typeof item === "string" ? { id: item, title: item } : item);
      const ids = items.map(item => item.id);
      if (slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])) return h(FeedRoot as Component, { ...attrs, items: ids }, slots);

      return h(FeedRoot as Component, { setSize: ids.length, ...attrs, items: ids }, {
        default: () => items.map(item => h(FeedItem, { key: item.id, value: item.id, "aria-label": item.title }, () => slots.item?.({ item }) ?? [
          h("div", { class: "ui-feed-entry__header" }, [
            item.icon && h(item.icon, { "aria-hidden": "true" }),
            h("strong", item.title),
            item.time && h("time", { datetime: item.dateTime }, item.time),
          ]),
          item.description && h("p", item.description),
          item.actor && h("small", item.actor),
        ])),
      });
    };
  },
}) as unknown as Collection<typeof FeedRoot, "items", Activity, {}, { item?: (state: { item: Activity }) => VNodeChild }>;
