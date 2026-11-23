import { computed, nextTick, onScopeDispose, readonly, ref, shallowRef, toValue, watch, type MaybeRefOrGetter } from "vue";
import type { UIScrollAreaController, UIScrollEdge } from "./useScrollArea";

export interface UIInfiniteScrollRequest {
  edge: UIScrollEdge;
  signal: AbortSignal;
}

export interface UIInfiniteScrollOptions {
  loadMore: (request: UIInfiniteScrollRequest) => void | Promise<void>;
  edge?: MaybeRefOrGetter<UIScrollEdge>;
  distance?: MaybeRefOrGetter<number>;
  hasMore?: MaybeRefOrGetter<boolean>;
  enabled?: MaybeRefOrGetter<boolean>;
  auto?: MaybeRefOrGetter<boolean>;
}

export function useInfiniteScroll(scroll: UIScrollAreaController, options: UIInfiniteScrollOptions) {
  const loading = ref(false);
  const failure = shallowRef<{ cause: unknown } | null>(null);
  const edge = computed(() => toValue(options.edge) ?? "bottom");
  const distance = computed(() => Math.max(0, toValue(options.distance) ?? 48));
  const enabled = computed(() => toValue(options.enabled) ?? true);
  const auto = computed(() => toValue(options.auto) ?? true);
  const hasMore = computed(() => toValue(options.hasMore) ?? true);
  const extent = computed(() => edge.value === "top" || edge.value === "bottom"
    ? scroll.state.value.scrollHeight : scroll.state.value.scrollWidth);
  const visible = computed(() => scroll.state.value.width > 0 && scroll.state.value.height > 0);
  const nearEdge = computed(() => visible.value && scroll.state.value.distance[edge.value] <= distance.value);
  const canLoadMore = computed(() => enabled.value && hasMore.value && !!scroll.element.value && !loading.value);
  let request: AbortController | undefined;
  let attemptedExtent: number | undefined;
  let disposed = false;

  async function loadMore() {
    if (disposed || !canLoadMore.value) return false;
    const current = new AbortController();
    request = current;
    attemptedExtent = extent.value;
    loading.value = true;
    failure.value = null;
    try {
      await options.loadMore({ edge: edge.value, signal: current.signal });
      await nextTick();
      if (current.signal.aborted) return false;
      scroll.refresh();
      return true;
    } catch (cause) {
      if (!current.signal.aborted) failure.value = { cause };
      return false;
    } finally {
      if (request === current) {
        request = undefined;
        loading.value = false;
      }
    }
  }

  function cancel() {
    request?.abort();
    request = undefined;
    loading.value = false;
  }

  function check() {
    if (!nearEdge.value) attemptedExtent = undefined;
    if (auto.value && canLoadMore.value && nearEdge.value && !failure.value && attemptedExtent !== extent.value) {
      void loadMore();
    }
  }

  function reset() {
    cancel();
    attemptedExtent = undefined;
    failure.value = null;
    void nextTick(check);
  }

  watch([scroll.element, edge, enabled], reset, { flush: "sync" });
  watch([canLoadMore, auto, nearEdge, extent], check, { immediate: true, flush: "post" });
  onScopeDispose(() => {
    disposed = true;
    cancel();
  });

  return { loading: readonly(loading), failure: readonly(failure), canLoadMore, loadMore, reset };
}
