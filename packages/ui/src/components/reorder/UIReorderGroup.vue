<script setup lang="ts" generic="ID extends string">
import type { ReorderInteractionSnapshot, ReorderRootSlotProps, TreeReorderRootSlotProps } from "@sectile/vue/reorder";
import { computed, nextTick, normalizeClass, normalizeStyle, ref, useAttrs, useTemplateRef, watch } from "vue";

defineOptions({ inheritAttrs: false });

type PreviewItem = { id: ID; level: number };

const props = withDefaults(defineProps<{
  as?: string;
  layout?: "list" | "grid" | "horizontal" | "wrap";
  previewItemClass?: string;
  parentId?: NoInfer<ID> | null;
  framed?: boolean;
  minRows?: number;
  interaction?: ReorderInteractionSnapshot<ID>;
  getPreviewState?: ReorderRootSlotProps<NoInfer<ID>>["getPreviewState"] | TreeReorderRootSlotProps<NoInfer<ID>>["getPreviewState"];
}>(), { as: "div", layout: "list", minRows: 2 });

defineSlots<{
  default?(): unknown;
  preview?(props: PreviewItem): unknown;
  "preview-handle"?(props: PreviewItem): unknown;
}>();

const attrs = useAttrs();
const projection = useTemplateRef<{ $el: HTMLElement }>("projection");
const showPreview = ref(false);
const sourceId = computed(() => props.interaction?.sourceID ?? null);
const ghostId = computed<ID | null>((previous) => sourceId.value ?? (showPreview.value ? previous ?? null : null));
const projectionClass = computed(() => normalizeClass(attrs.class));
const projectionStyle = computed<Record<string, string | number>>((previous) => {
  const style = normalizeStyle([attrs.style, { "--ui-reorder-min-rows": props.minRows }]) as Record<string, string | number>;
  const properties = Object.keys(style);
  if (previous && properties.length === Object.keys(previous).length &&
    properties.every((property) => Object.is(style[property], previous[property]))) return previous;
  return style;
});

watch(() => sourceId.value !== null, async (active, _, onCleanup) => {
  if (active) {
    showPreview.value = true;
    return;
  }
  if (!showPreview.value) return;

  let interrupted = false;
  onCleanup(() => { interrupted = true; });
  await nextTick();

  while (!interrupted) {
    const items = Array.from(projection.value?.$el.children ?? [])
      .filter((item) => !item.classList.contains("ui-reorder-leave-active"));
    if (items.some((item) => item.classList.contains("ui-reorder-enter-from"))) {
      // Vue applies the enter target style on a later frame.
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      continue;
    }
    const transitions = items
      .flatMap((item) => item.getAnimations())
      .filter((animation) => animation.playState !== "finished" && "transitionProperty" in animation &&
        (animation.transitionProperty === "transform" || animation.transitionProperty === "opacity"));
    if (!transitions.length) {
      showPreview.value = false;
      return;
    }
    // Cancellation can replace a transition while the preview is still settling.
    await Promise.allSettled(transitions.map((transition) => transition.finished));
  }
}, { immediate: true });

const previewState = computed(() => {
  // The getter reads the current Sectile state. Interaction snapshots invalidate it.
  if (!showPreview.value || !props.interaction) return;
  const result = props.getPreviewState?.();
  if (result?.ok) return result.value;
});

function readPreviewItems(): PreviewItem[] {
  const state = previewState.value;
  if (!state) return [];
  if ("ids" in state) return state.ids.map((id) => ({ id, level: 1 }));

  const children = new Map<ID | null, ID[]>();
  for (const { id, parentID } of state.nodes) {
    const siblings = children.get(parentID);
    if (siblings) siblings.push(id);
    else children.set(parentID, [id]);
  }

  if (props.parentId !== undefined) {
    return (children.get(props.parentId) ?? []).map((id) => ({ id, level: 1 }));
  }

  const items: PreviewItem[] = [];
  function append(parentId: ID | null, level: number) {
    for (const id of children.get(parentId) ?? []) {
      items.push({ id, level });
      append(id, level + 1);
    }
  }
  append(null, 1);
  return items;
}

const previewItems = computed<PreviewItem[]>((previous) => {
  const items = readPreviewItems();
  // Pointer coordinates can change without changing the projected order.
  if (previous?.length === items.length && previous.every((item, index) =>
    item.id === items[index]?.id && item.level === items[index]?.level,
  )) return previous;
  return items;
});
</script>

<template>
  <div v-if="getPreviewState" class="ui-reorder-group-shell" :data-layout="layout" :data-preview="showPreview || undefined">
    <TransitionGroup
      v-bind="$attrs"
      :tag="as"
      name="ui-reorder"
      class="ui-reorder-group ui-reorder-group--registered"
      :style="{ '--ui-reorder-min-rows': minRows }"
      :data-layout="layout"
      :data-ui-reorder-parent="parentId === null ? '' : parentId"
      :data-framed="framed || undefined"
    >
      <slot />
    </TransitionGroup>
    <!-- Updating forwarded slots for pointer-only changes would restart Vue's active move transitions. -->
    <TransitionGroup
      v-if="showPreview"
      v-memo="[previewItems, ghostId, as, layout, framed, previewItemClass, projectionClass, projectionStyle, !!$slots.preview, !!$slots['preview-handle']]"
      ref="projection"
      :tag="as"
      name="ui-reorder"
      class="ui-reorder-group ui-reorder-group--projection"
      :class="projectionClass"
      :style="projectionStyle"
      :data-layout="layout"
      :data-framed="framed || undefined"
      aria-hidden="true"
      inert
    >
      <component
        :is="as === 'ol' || as === 'ul' ? 'li' : 'div'"
        v-for="item in previewItems"
        :key="item.id"
        class="ui-reorder-projected-item"
        :class="previewItemClass"
        :data-ui-reorder-ghost="item.id === ghostId || undefined"
      >
        <span v-if="$slots['preview-handle']" class="ui-reorder-handle-visual">
          <slot name="preview-handle" v-bind="item" />
        </span>
        <slot name="preview" v-bind="item">{{ item.id }}</slot>
      </component>
    </TransitionGroup>
  </div>
  <TransitionGroup
    v-else
    v-bind="$attrs"
    :tag="as"
    name="ui-reorder"
    class="ui-reorder-group"
    :style="{ '--ui-reorder-min-rows': minRows }"
    :data-layout="layout"
    :data-ui-reorder-parent="parentId === null ? '' : parentId"
    :data-framed="framed || undefined"
  >
    <slot />
  </TransitionGroup>
</template>
