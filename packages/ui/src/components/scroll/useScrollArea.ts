import { computed, readonly, ref, shallowRef, toValue, watch, type MaybeRefOrGetter } from "vue";

export const scrollEdges = ["top", "right", "bottom", "left"] as const;
export type UIScrollEdge = typeof scrollEdges[number];
type ScrollElement = MaybeRefOrGetter<HTMLElement | null | undefined>;

export interface UIScrollAreaOptions {
  content?: ScrollElement;
}

export interface UIScrollToElementOptions {
  axis?: "horizontal" | "vertical" | "both";
  align?: "nearest" | "center";
  behavior?: ScrollBehavior;
}

export interface UIScrollState {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly scrollWidth: number;
  readonly scrollHeight: number;
  readonly distance: Readonly<Record<UIScrollEdge, number>>;
  readonly atEdge: Readonly<Record<UIScrollEdge, boolean>>;
}

function scrollState(x = 0, y = 0, width = 0, height = 0, scrollWidth = 0, scrollHeight = 0): UIScrollState {
  const distance = {
    top: y,
    right: Math.max(0, scrollWidth - width - x),
    bottom: Math.max(0, scrollHeight - height - y),
    left: x,
  };
  return {
    x, y, width, height, scrollWidth, scrollHeight, distance,
    atEdge: { top: y <= 1, right: distance.right <= 1, bottom: distance.bottom <= 1, left: x <= 1 },
  };
}

function clampOffset(value: number, max: number) {
  return Math.max(0, Math.min(value, max));
}

export function useScrollArea(target: ScrollElement, options: UIScrollAreaOptions = {}) {
  const element = computed(() => toValue(target) ?? null);
  const state = shallowRef(scrollState());
  const isScrolling = ref(false);

  function refresh() {
    const node = element.value;
    const width = node?.clientWidth ?? 0;
    const height = node?.clientHeight ?? 0;
    const scrollWidth = node?.scrollWidth ?? 0;
    const scrollHeight = node?.scrollHeight ?? 0;
    const maxX = Math.max(0, scrollWidth - width);
    const rtl = node && getComputedStyle(node).direction === "rtl";
    const x = clampOffset((node?.scrollLeft ?? 0) + (rtl ? maxX : 0), maxX);
    const y = clampOffset(node?.scrollTop ?? 0, Math.max(0, scrollHeight - height));
    const previous = state.value;
    if (x !== previous.x || y !== previous.y || width !== previous.width || height !== previous.height ||
      scrollWidth !== previous.scrollWidth || scrollHeight !== previous.scrollHeight) {
      state.value = scrollState(x, y, width, height, scrollWidth, scrollHeight);
    }
    return state.value;
  }

  watch([element, () => toValue(options.content)], ([node, content], _, onCleanup) => {
    refresh();
    if (!node) return;

    let idle: ReturnType<typeof setTimeout> | undefined;
    const settle = () => {
      clearTimeout(idle);
      isScrolling.value = false;
    };
    const scroll = () => {
      refresh();
      isScrolling.value = true;
      clearTimeout(idle);
      idle = setTimeout(settle, 150);
    };
    const resize = new ResizeObserver(refresh);
    resize.observe(node);
    if (content && content !== node) resize.observe(content);
    const mutations = new MutationObserver(refresh);
    mutations.observe(content ?? node, { childList: true, subtree: true, characterData: true });
    node.addEventListener("scroll", scroll, { passive: true });
    node.addEventListener("scrollend", settle);
    node.addEventListener("load", refresh, true);
    onCleanup(() => {
      settle();
      resize.disconnect();
      mutations.disconnect();
      node.removeEventListener("scroll", scroll);
      node.removeEventListener("scrollend", settle);
      node.removeEventListener("load", refresh, true);
    });
  }, { immediate: true, flush: "post" });

  function scrollTo({ left, top, behavior }: ScrollToOptions) {
    const node = element.value;
    if (!node) return;
    const current = refresh();
    const maxX = Math.max(0, current.scrollWidth - current.width);
    const rtl = getComputedStyle(node).direction === "rtl";
    node.scrollTo({
      left: clampOffset(left ?? current.x, maxX) - (rtl ? maxX : 0),
      top: clampOffset(top ?? current.y, current.scrollHeight - current.height),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : behavior,
    });
  }

  function scrollBy({ left = 0, top = 0, behavior }: ScrollToOptions) {
    const current = refresh();
    scrollTo({ left: current.x + left, top: current.y + top, behavior });
  }

  function scrollToEdge(edge: UIScrollEdge, behavior?: ScrollBehavior) {
    const current = refresh();
    if (edge === "top" || edge === "bottom") {
      scrollTo({ top: edge === "top" ? 0 : current.scrollHeight - current.height, behavior });
    } else {
      scrollTo({ left: edge === "left" ? 0 : current.scrollWidth - current.width, behavior });
    }
  }

  function scrollToElement(target: Element | null, { axis = "both", align = "nearest", behavior = "instant" }: UIScrollToElementOptions = {}) {
    const node = element.value;
    if (!node || !target || target === node || !node.contains(target) || !target.getClientRects().length) return;
    const viewport = node.getBoundingClientRect();
    const bounds = target.getBoundingClientRect();
    const current = refresh();
    function offset(start: number, end: number, size: number) {
      if (align === "center") return (start + end - size) / 2;
      if (start < 0 && end > size) return 0;
      if (start < 0) return end - start > size ? end - size : start;
      if (end > size) return end - start > size ? start : end - size;
      return 0;
    }
    const left = viewport.left + node.clientLeft;
    const top = viewport.top + node.clientTop;
    scrollTo({
      left: axis !== "vertical" && current.width ? current.x + offset(bounds.left - left, bounds.right - left, current.width) : undefined,
      top: axis !== "horizontal" && current.height ? current.y + offset(bounds.top - top, bounds.bottom - top, current.height) : undefined,
      behavior,
    });
  }

  return { element, state: readonly(state), isScrolling: readonly(isScrolling), refresh, scrollTo, scrollBy, scrollToEdge, scrollToElement };
}

export type UIScrollAreaController = ReturnType<typeof useScrollArea>;
