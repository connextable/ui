<script setup lang="ts">
import { computed, readonly, shallowRef, useTemplateRef, watch } from "vue";
import { scrollEdges, type UIScrollEdge, type UIScrollState } from "./useScrollArea";

const props = withDefaults(defineProps<{
  state: UIScrollState;
  edges?: readonly UIScrollEdge[];
  sticky?: readonly (HTMLElement | null)[];
}>(), { edges: () => scrollEdges });

const element = useTemplateRef("element");
const insets = shallowRef({ top: 0, right: 0, bottom: 0, left: 0 });
defineExpose({ element, insets: readonly(insets) });

watch(
  [element, () => props.sticky, () => props.state.width, () => props.state.height],
  ([viewport, sticky], _, onCleanup) => {
    if (!viewport) return;
    const pinned = sticky?.filter((node): node is HTMLElement => node !== null && viewport.contains(node)) ?? [];

    const measure = () => {
      const left = viewport.clientLeft;
      const top = viewport.clientTop;
      const gutters = {
        top, left,
        right: Math.max(0, viewport.offsetWidth - viewport.clientWidth - left),
        bottom: Math.max(0, viewport.offsetHeight - viewport.clientHeight - top),
      };
      const next = { ...gutters };

      for (const node of pinned) {
        const style = getComputedStyle(node);
        if (style.position !== "sticky" || !node.offsetWidth || !node.offsetHeight) continue;
        for (const edge of scrollEdges) {
          const offset = Number.parseFloat(style.getPropertyValue(edge));
          if (!Number.isFinite(offset)) continue;
          const size = edge === "top" || edge === "bottom" ? node.offsetHeight : node.offsetWidth;
          next[edge] = Math.max(next[edge], gutters[edge] + offset + size);
        }
      }

      insets.value = next;
    };

    measure();
    if (!pinned.length) return;
    const resize = new ResizeObserver(measure);
    for (const node of pinned) resize.observe(node, { box: "border-box" });
    onCleanup(() => resize.disconnect());
  },
  { flush: "post" },
);

const activeEdges = computed(() => {
  const { state, edges } = props;
  if (!state.width || !state.height) return "";
  return edges.filter(edge => !state.atEdge[edge]).join(" ");
});

const maskStyle = computed(() => {
  if (!activeEdges.value) return;
  const edges = activeEdges.value.split(" ");

  function fadeSize(edge: UIScrollEdge) {
    if (!edges.includes(edge)) return;
    return `min(var(--ui-scroll-fade-${edge}, var(--ui-scroll-fade-size, 1rem)), 50%)`;
  }

  function axisMask(startEdge: UIScrollEdge, endEdge: UIScrollEdge) {
    const start = fadeSize(startEdge);
    const end = fadeSize(endEdge);
    if (!start && !end) return;
    const direction = startEdge === "left" ? "to right" : "to bottom";
    return `linear-gradient(${direction}, ${start ? "transparent" : "black"}, black ${start ?? "0px"}, black calc(100% - ${end ?? "0px"}), ${end ? "transparent" : "black"})`;
  }

  const fades = [axisMask("left", "right"), axisMask("top", "bottom")].filter(Boolean);

  // Keep sticky elements and native scrollbar gutters opaque.
  const { top, right, bottom, left } = insets.value;
  const opaque = scrollEdges.flatMap((edge) => {
    const inset = insets.value[edge];
    if (!inset) return [];
    const vertical = edge === "left" || edge === "right";
    const size = vertical ? `${inset}px 100%` : `100% ${inset}px`;
    return [`linear-gradient(black, black) ${edge} / ${size} no-repeat add`];
  });
  const width = left || right ? `max(0px, 100% - ${left + right}px)` : "100%";
  const height = top || bottom ? `max(0px, 100% - ${top + bottom}px)` : "100%";
  const layers = [...opaque, ...fades.map(fade => `${fade} ${left}px ${top}px / ${width} ${height} no-repeat intersect`)];
  return { "--ui-scroll-fade-mask": layers.join(", ") };
});
</script>

<template>
  <div ref="element" class="ui-scroll-fade" :style="maskStyle">
    <slot />
  </div>
</template>

<style scoped>
.ui-scroll-fade {
  --ui-scroll-fade-mask: none;
  display: flow-root;
}

@media (forced-colors: none) {
  .ui-scroll-fade:not(:has(:focus-visible)) {
    mask: var(--ui-scroll-fade-mask);
    mask-mode: alpha;
  }
}
</style>
