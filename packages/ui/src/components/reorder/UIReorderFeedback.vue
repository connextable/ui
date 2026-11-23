<script setup lang="ts" generic="ID extends string">
import { Ban } from "@lucide/vue";
import { onBeforeUnmount, onMounted, shallowRef, useTemplateRef, watch, type CSSProperties } from "vue";
import type { UIReorderInteraction } from "./reorder-selection";

const props = defineProps<{
  interaction: UIReorderInteraction<ID>;
  focus?: (id: ID) => void;
  liftClass?: string;
}>();

type LiftItem = { id: ID; label: string; count: number };

defineSlots<{
  lift?(props: LiftItem): unknown;
  "lift-handle"?(props: LiftItem): unknown;
}>();

const rootSelector = '[data-scope$="-reorder"][data-part="root"]';
const itemSelector = '[data-scope$="-reorder"][data-part="item"]';
const marker = useTemplateRef<HTMLElement>("marker");
const lift = shallowRef<LiftItem & { style: CSSProperties }>();
const blocked = shallowRef<CSSProperties>();
let marked = new Set<HTMLElement>();
let source: HTMLElement | undefined;
let sourceId: ID | undefined;
let grab: { x: number; y: number } | undefined;
let frame: number | undefined;

function bounds(rect: DOMRect, x = rect.left, y = rect.top): CSSProperties {
  return {
    left: `${x}px`,
    top: `${y}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  };
}

function syncFeedback() {
  const { sourceID, sourceIDs, input, target, allowed, clientPoint } = props.interaction;
  const root = marker.value?.closest<HTMLElement>(rootSelector);
  if (!root || sourceID === null || input === null) return clear();

  const items = Array.from(root.querySelectorAll<HTMLElement>(itemSelector)).filter((item) =>
    item.closest(rootSelector) === root && !item.classList.contains("ui-reorder-leave-active"),
  );
  const itemById = new Map(items.map((item) => [item.dataset.value, item]));
  const active = itemById.get(sourceID);
  if (!active) return clear();

  if (source !== active) {
    source = active;
    sourceId = sourceID;
    grab = undefined;
  }
  const moving = new Set(sourceIDs ?? [sourceID]);
  const nextMarked = new Set(items.filter(item => moving.has(item.dataset.value as ID)));
  for (const item of marked) if (!nextMarked.has(item)) item.removeAttribute("data-ui-reorder-source");
  for (const item of nextMarked) item.dataset.uiReorderSource = input;
  marked = nextMarked;

  if (clientPoint) {
    const rect = active.getBoundingClientRect();
    const style = getComputedStyle(active);
    grab ??= { x: clientPoint.x - rect.left, y: clientPoint.y - rect.top };
    lift.value = {
      id: sourceID,
      count: moving.size,
      label: lift.value?.id === sourceID ? lift.value.label : (active.getAttribute("aria-label") ?? active.innerText.trim()),
      style: {
        ...bounds(rect, clientPoint.x - grab.x, clientPoint.y - grab.y),
        borderRadius: style.borderRadius,
        padding: style.padding,
      },
    };
  } else {
    lift.value = undefined;
  }

  if (!target || allowed) {
    blocked.value = undefined;
    return;
  }

  const group = Array.from(root.querySelectorAll<HTMLElement>("[data-ui-reorder-parent]")).find((element) =>
    element.closest(rootSelector) === root && element.dataset.uiReorderParent === (target.parentID ?? ""),
  );
  const before = target.beforeID != null ? itemById.get(target.beforeID) : undefined;
  const parent = target.parentID === null ? undefined : itemById.get(target.parentID);
  const reference = group ?? before ?? parent;
  blocked.value = reference
    ? { ...bounds(reference.getBoundingClientRect()), borderRadius: getComputedStyle(reference).borderRadius }
    : undefined;
}

function schedule() {
  if (props.interaction.sourceID === null || frame !== undefined) return;
  frame = requestAnimationFrame(() => {
    frame = undefined;
    syncFeedback();
  });
}

function clear() {
  if (frame !== undefined) cancelAnimationFrame(frame);
  frame = undefined;
  for (const item of marked) item.removeAttribute("data-ui-reorder-source");
  marked.clear();
  source = undefined;
  sourceId = undefined;
  grab = undefined;
  lift.value = undefined;
  blocked.value = undefined;
}

watch(() => props.interaction, ({ sourceID }) => {
  if (sourceID !== null) {
    schedule();
    return;
  }

  // Moving across TransitionGroups remounts the item under its new group.
  const document = source?.ownerDocument;
  if (sourceId !== undefined && document?.activeElement === document?.body) props.focus?.(sourceId);
  clear();
}, { flush: "post" });

onMounted(() => {
  window.addEventListener("scroll", schedule, { capture: true, passive: true });
  window.addEventListener("resize", schedule);
  schedule();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", schedule, true);
  window.removeEventListener("resize", schedule);
  clear();
});
</script>

<template>
  <span ref="marker" hidden />
  <Teleport to="body">
    <Transition name="ui-reorder-feedback">
      <div
        v-if="blocked"
        class="ui-reorder-blocked"
        :style="blocked"
        aria-hidden="true"
      >
        <Ban />
      </div>
    </Transition>
    <Transition name="ui-reorder-feedback">
      <div v-if="lift" class="ui-reorder-lift" :class="liftClass" :style="lift.style" aria-hidden="true" inert>
        <span v-if="$slots['lift-handle']" class="ui-reorder-handle-visual">
          <slot name="lift-handle" :id="lift.id" :label="lift.label" :count="lift.count" />
        </span>
        <slot name="lift" :id="lift.id" :label="lift.label" :count="lift.count"><span>{{ lift.label }}</span></slot>
        <span v-if="lift.count > 1" class="ui-reorder-lift-count">{{ lift.count }}</span>
      </div>
    </Transition>
  </Teleport>
</template>
