<script setup lang="ts">
import { hitTestChartProjection } from "@sectile/chart/query";
import type { ChartRootProps, ChartRootSlotProps } from "@sectile/vue/chart";
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef, useId, useTemplateRef, watch } from "vue";
import { chartSeriesColor } from "./chart-colors";
import { createSharedChartTooltip, resolveChartTooltip, type ChartTooltipDatum, type ChartTooltipGroup, type ChartTooltipTarget } from "./chart-tooltip";

const props = defineProps<{
  scope: ChartRootSlotProps;
  getLabel?: NonNullable<ChartRootProps["dom"]>["getAccessibleDatumLabel"];
  shared?: boolean;
  groupValue?: ChartTooltipGroup;
}>();
defineSlots<{ default?(datum: ChartTooltipDatum): unknown }>();

type TooltipMode = "pointer" | "focus" | "touch";
const id = useId();
const shell = useTemplateRef<HTMLDivElement>("shell");
const content = useTemplateRef<HTMLDivElement>("content");
const mode = ref<TooltipMode>();
const focus = shallowRef<HTMLElement>();
const shown = shallowRef<ChartTooltipTarget>();
const pointer = shallowRef<{ x: number; y: number }>();
const open = ref(false);
const follow = ref(false);
const geometry = ref<{ translate: string; width: string; height: string; transformOrigin: string }>();
const bandGeometry = ref<{ translate: string; width: string; height: string }>();
let host: HTMLElement | null = null;
let canvas: HTMLCanvasElement | null = null;
let observer: ResizeObserver | undefined;
let listeners: AbortController | undefined;
let lastPointerType = "";
let press: { id: number; x: number; y: number; dragged: boolean } | undefined;

function readCursor() {
  const { controller, state } = props.scope;
  return controller ? controller.getSnapshot().state.cursor : state?.cursor;
}

const focusedCursor = shallowRef<ReturnType<typeof readCursor>>();
watch(() => props.scope.state?.cursor, () => { focusedCursor.value = readCursor(); }, { flush: "sync" });

const currentId = computed(() => {
  const state = props.scope.state;
  if (mode.value === "pointer") return state?.activeDatum;
  if (mode.value === "touch" || mode.value === "focus") return focusedCursor.value;
});
const hoveredAggregate = computed(() => {
  const projection = props.scope.projection;
  if (mode.value !== "pointer" && mode.value !== "touch") return;
  if (!pointer.value || !projection?.diagnostics.aggregateRepresentatives) return;
  const hit = hitTestChartProjection(projection, { ...pointer.value, maximumHits: 1 })[0];
  return hit?.kind === "aggregate" ? hit : undefined;
});
const projection = computed(() => props.scope.projection);
const definition = computed(() => props.scope.definition);
const sharedGroups = computed(() => props.shared
  ? createSharedChartTooltip({ projection: projection.value, definition: definition.value }, props.groupValue)
  : undefined);
const sharedTarget = computed(() => {
  if (!sharedGroups.value) return;
  const id = currentId.value;
  if (mode.value === "focus") return id == null ? undefined : sharedGroups.value.byId.get(id);
  if ((mode.value === "pointer" || mode.value === "touch") && pointer.value) {
    return sharedGroups.value.at(pointer.value);
  }
});
const targetKey = computed(() => {
  if (sharedTarget.value) return sharedTarget.value.key;
  const hit = hoveredAggregate.value;
  if (hit) return `aggregate:${hit.batchIndex}:${hit.primitiveIndex}`;
  const id = currentId.value;
  if (id != null) return `${typeof id}:${id}`;
});
const dismissed = ref<NonNullable<typeof targetKey.value>>();
watch(targetKey, () => { dismissed.value = undefined; }, { flush: "sync" });
const target = computed(() => {
  if (targetKey.value == null || targetKey.value === dismissed.value) return;
  if (sharedTarget.value) return sharedTarget.value;
  const candidate = hoveredAggregate.value ?? currentId.value;
  return candidate == null ? undefined : resolveChartTooltip(props.scope, candidate, props.getLabel);
});

function setMode(next?: TooltipMode) {
  // Sectile can focus its option before the new cursor reaches the Vue slot.
  if (next === "focus" || next === "touch") focusedCursor.value = readCursor();
  if (mode.value === next) return;
  mode.value = next;
  dismissed.value = undefined;
}

function isChartFocus(node: EventTarget | null): node is HTMLElement {
  return node instanceof HTMLElement && (node === host
    || (node.matches('[role="option"]') && node.closest('[data-scope="chart"][data-part="root"]') === host));
}

function projectionPoint(event: MouseEvent) {
  const projection = props.scope.projection;
  if (!canvas || !projection) return;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  return {
    x: (event.clientX - rect.left) * projection.viewport.width / rect.width,
    y: (event.clientY - rect.top) * projection.viewport.height / rect.height,
  };
}

function bindCanvas() {
  const next = host?.querySelector<HTMLCanvasElement>('canvas[data-scope="chart"][data-part="renderer"]') ?? null;
  if (next === canvas) return;
  if (canvas) observer?.unobserve(canvas);
  canvas = next;
  if (canvas) observer?.observe(canvas);
}

function positionTooltip() {
  const point = target.value;
  const element = shell.value;
  const body = content.value;
  if (!point || !host || !element || !body) return;
  bindCanvas();
  if (!canvas || !host.offsetWidth || !host.offsetHeight) return;

  const hostRect = host.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();
  const scaleX = hostRect.width / host.offsetWidth;
  const scaleY = hostRect.height / host.offsetHeight;
  if (!scaleX || !scaleY) return;
  const canvasWidth = canvasRect.width / scaleX;
  const canvasHeight = canvasRect.height / scaleY;
  const padding = Number.parseFloat(getComputedStyle(body).paddingLeft) || 0;
  const right = canvasWidth - padding;
  const bottom = canvasHeight - padding;
  if (right <= padding || bottom <= padding) return;

  body.style.setProperty("--ui-chart-tooltip-width-limit", `${right - padding}px`);
  body.style.setProperty("--ui-chart-tooltip-height-limit", `${bottom - padding}px`);
  const width = body.offsetWidth;
  const height = body.offsetHeight;
  if (!width || !height) return;
  const anchorX = point.anchor.x * canvasWidth / point.viewport.width;
  const anchorY = point.anchor.y * canvasHeight / point.viewport.height;
  const toRight = anchorX + padding + width <= right || anchorX - padding - width < padding;
  const targetX = toRight ? anchorX + padding : anchorX - padding - width;
  const x = Math.max(padding, Math.min(targetX, right - width));
  const y = Math.max(padding, Math.min(anchorY - height / 2, bottom - height));
  const left = (canvasRect.left - hostRect.left) / scaleX - host.clientLeft;
  const top = (canvasRect.top - hostRect.top) / scaleY - host.clientTop;
  const band = point.band;
  bandGeometry.value = band && {
    translate: `${left + band.x * canvasWidth / point.viewport.width}px ${top + band.y * canvasHeight / point.viewport.height}px`,
    width: `${band.width * canvasWidth / point.viewport.width}px`,
    height: `${band.height * canvasHeight / point.viewport.height}px`,
  };
  const nextGeometry = {
    translate: `${left + x}px ${top + y}px`,
    width: `${width}px`,
    height: `${height}px`,
    transformOrigin: `${toRight ? "left" : "right"} center`,
  };
  if (open.value && geometry.value?.translate === nextGeometry.translate
    && geometry.value.width === nextGeometry.width && geometry.value.height === nextGeometry.height) return;
  const entering = !open.value;
  if (entering) follow.value = Number.parseFloat(getComputedStyle(element).opacity) > 0;
  geometry.value = nextGeometry;
  open.value = true;
  if (entering) {
    void nextTick(() => {
      if (!open.value || !shell.value) return;
      // Commit the entrance position before enabling movement between data points.
      shell.value.getBoundingClientRect();
      follow.value = true;
    });
  }
}

function closeTooltip() {
  if (!open.value || !shell.value || !geometry.value) return;
  const { translate, width, height } = getComputedStyle(shell.value);
  geometry.value = { ...geometry.value, translate, width, height };
  follow.value = false;
  open.value = false;
}

watch(target, next => {
  if (next) shown.value = next;
  else closeTooltip();
});
watch(target, positionTooltip, { flush: "post" });

watch([open, focus, mode], ([visible, node, input], _, onCleanup) => {
  if (!visible || !node || input !== "focus") return;
  const descriptions = new Set(node.getAttribute("aria-describedby")?.split(/\s+/).filter(Boolean));
  descriptions.add(id);
  node.setAttribute("aria-describedby", [...descriptions].join(" "));
  onCleanup(() => {
    const remaining = node.getAttribute("aria-describedby")?.split(/\s+/).filter(token => token && token !== id);
    if (remaining?.length) node.setAttribute("aria-describedby", remaining.join(" "));
    else node.removeAttribute("aria-describedby");
  });
}, { flush: "post" });

onMounted(() => {
  host = shell.value?.parentElement ?? null;
  if (!host || !content.value) return;
  const currentHost = host;
  if (typeof ResizeObserver !== "undefined") {
    observer = new ResizeObserver(positionTooltip);
    observer.observe(host);
    observer.observe(content.value);
  }
  bindCanvas();
  listeners = new AbortController();
  const signal = listeners.signal;
  const pointAtCanvas = (event: PointerEvent) => {
    if (!canvas || event.target !== canvas) return;
    lastPointerType = event.pointerType;
    if (mode.value === "focus") return;
    if (event.buttons && press?.id === event.pointerId) {
      if (!press.dragged && Math.hypot(event.clientX - press.x, event.clientY - press.y) > 4) {
        press.dragged = true;
        setMode();
      }
      return;
    }
    if (props.shared || props.scope.projection?.diagnostics.aggregateRepresentatives) pointer.value = projectionPoint(event);
    if (event.pointerType !== "touch") setMode("pointer");
  };
  host.addEventListener("pointermove", pointAtCanvas, { signal });
  host.addEventListener("pointerdown", event => {
    if (event.target === canvas && event.isPrimary && event.button === 0) {
      press = { id: event.pointerId, x: event.clientX, y: event.clientY, dragged: false };
    }
    pointAtCanvas(event);
  }, { signal });
  currentHost.ownerDocument.addEventListener("pointerup", event => {
    if (press?.id === event.pointerId) press = undefined;
  }, { signal, capture: true });
  currentHost.ownerDocument.addEventListener("pointercancel", event => {
    if (press?.id !== event.pointerId) return;
    press = undefined;
    if (mode.value === "pointer") setMode();
  }, { signal, capture: true });
  host.addEventListener("pointerout", event => {
    if (event.target === canvas && mode.value === "pointer") setMode();
  }, { signal });
  host.addEventListener("click", event => {
    if (event.target !== canvas) return;
    const node = currentHost.ownerDocument.activeElement;
    const projection = props.scope.projection;
    const point = projectionPoint(event);
    const hit = projection && point && hitTestChartProjection(projection, { ...point, maximumHits: 1 })[0];
    const cursor = props.scope.controller?.getSnapshot().state.cursor;
    if (isChartFocus(node) && hit?.kind === "datum" && hit.id === cursor) {
      focus.value = node;
      dismissed.value = undefined;
      setMode("focus");
    } else if (lastPointerType === "touch") {
      pointer.value = point;
      setMode("touch");
    } else if (node === currentHost && mode.value === "focus") {
      pointer.value = point;
      setMode("pointer");
    }
  }, { signal });
  host.ownerDocument.addEventListener("pointerdown", event => {
    if (mode.value === "touch" && event.target instanceof Node && !currentHost.contains(event.target)) setMode();
  }, { signal, capture: true });
  host.ownerDocument.addEventListener("keydown", event => {
    if (event.key === "Escape" && mode.value === "pointer" && open.value) dismissed.value = targetKey.value ?? undefined;
  }, { signal });
  host.addEventListener("focusin", event => {
    if (!isChartFocus(event.target)) return;
    focus.value = event.target;
    if (event.target !== host || !mode.value) setMode("focus");
  }, { signal });
  host.addEventListener("focusout", event => {
    if (!isChartFocus(event.target) || isChartFocus(event.relatedTarget)) return;
    focus.value = undefined;
    if (mode.value === "focus") setMode();
  }, { signal });
  host.addEventListener("keydown", event => {
    if (event.key === "Escape" && open.value && targetKey.value != null) {
      dismissed.value = targetKey.value;
      event.stopPropagation();
      event.preventDefault();
    } else if (isChartFocus(event.target) && /^(Arrow(Up|Down|Left|Right)|Home|End)$/.test(event.key)) {
      focus.value = event.target;
      setMode("focus");
    }
  }, { signal, capture: true });
});

onUnmounted(() => {
  observer?.disconnect();
  listeners?.abort();
});
</script>

<template>
  <div
    v-if="shared"
    class="ui-chart-tooltip__band"
    aria-hidden="true"
    :data-open="open && !!bandGeometry"
    :data-follow="follow"
    :style="bandGeometry"
  />
  <div
    :id="id"
    ref="shell"
    class="ui-chart-tooltip"
    role="tooltip"
    :aria-hidden="!open"
    :data-open="open"
    :data-follow="follow"
    :style="geometry"
  >
    <div ref="content" class="ui-chart-tooltip__content">
      <slot v-if="shown" v-bind="shown.datum">
        <strong class="ui-chart-tooltip__title">{{ shown.datum.title }}</strong>
        <div v-for="item in shown.datum.items" :key="item.colorIndex" class="ui-chart-tooltip__value">
          <span class="ui-chart-tooltip__series">
            <span class="ui-chart-legend__swatch" :style="{ backgroundColor: `var(${chartSeriesColor(item.colorIndex)})` }" aria-hidden="true" />
            {{ item.series }}
          </span>
          <strong>{{ item.description }}</strong>
        </div>
        <div v-if="!shown.datum.items && shown.datum.description !== null" class="ui-chart-tooltip__value">
          <span v-if="shown.datum.series">{{ shown.datum.series }}</span>
          <strong>{{ shown.datum.description }}</strong>
        </div>
      </slot>
    </div>
  </div>
</template>
