<script setup lang="ts">
import { useScrollArea, type UIScrollEdge } from "./useScrollArea";
import { useInfiniteScroll, type UIInfiniteScrollRequest } from "./useInfiniteScroll";

const props = withDefaults(defineProps<{
  target?: HTMLElement | null;
  content?: HTMLElement | null;
  loadMore: (request: UIInfiniteScrollRequest) => void | Promise<void>;
  edge?: UIScrollEdge;
  distance?: number;
  hasMore?: boolean;
  enabled?: boolean;
  auto?: boolean;
}>(), { edge: "bottom", distance: 48, hasMore: true, enabled: true, auto: true });

defineSlots<{
  default(state: { loading: boolean; failure: { readonly cause: unknown } | null;
    canLoadMore: boolean; loadMore(): Promise<boolean>; reset(): void }): unknown;
}>();

const scroll = useScrollArea(() => props.target, { content: () => props.content });
const { loading, failure, canLoadMore, loadMore, reset } = useInfiniteScroll(scroll, {
  loadMore: request => props.loadMore(request),
  edge: () => props.edge,
  distance: () => props.distance,
  enabled: () => props.enabled,
  hasMore: () => props.hasMore,
  auto: () => props.auto,
});
</script>

<template>
  <slot :loading="loading" :failure="failure" :can-load-more="canLoadMore" :load-more="loadMore" :reset="reset" />
</template>
