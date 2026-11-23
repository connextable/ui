<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { shallowRef, useId, useTemplateRef, watch } from "vue";

const props = defineProps<{
  label: string;
  parts: Readonly<Record<string, string>>;
}>();

const selected = defineModel<string>({ required: true });
const diagram = useTemplateRef<HTMLElement>("diagram");
const descriptionId = useId();
const preferredTarget = shallowRef<HTMLElement>();
const indicator = shallowRef<{
  x: number;
  y: number;
  width: number;
  height: number;
  alignEnd: boolean;
  labelWidth: number;
}>();

function selectTarget(event: Event) {
  const target = event.target instanceof Element
    ? event.target.closest<HTMLElement>("[data-ui-anatomy-part]")
    : null;
  const part = target?.dataset.uiAnatomyPart;
  if (target && part && Object.hasOwn(props.parts, part) && diagram.value?.contains(target)) {
    preferredTarget.value = target;
    selected.value = part;
  }
}

function onPointerOver(event: PointerEvent) {
  if (event.pointerType !== "touch") selectTarget(event);
}

function selectPart(name: string) {
  preferredTarget.value = undefined;
  selected.value = name;
}

function measure() {
  const canvas = diagram.value;
  const preferred = preferredTarget.value;
  const target = preferred?.dataset.uiAnatomyPart === selected.value && canvas?.contains(preferred)
    ? preferred
    : canvas?.querySelector(`[data-ui-anatomy-part="${CSS.escape(selected.value)}"]`);
  if (!canvas || !target?.getClientRects().length) {
    indicator.value = undefined;
    return;
  }

  const area = canvas.getBoundingClientRect();
  const box = target.getBoundingClientRect();
  const spaceFromStart = area.right - box.left;
  const spaceFromEnd = box.right - area.left;
  indicator.value = {
    x: box.left - area.left,
    y: box.top - area.top,
    width: box.width,
    height: box.height,
    alignEnd: spaceFromEnd > spaceFromStart,
    labelWidth: Math.max(spaceFromStart, spaceFromEnd),
  };
}

watch([selected, preferredTarget], measure, { flush: "post" });
watch(diagram, (canvas, _previous, onCleanup) => {
  if (!canvas) return;
  const resizeObserver = new ResizeObserver(measure);
  const observeTargets = () => {
    resizeObserver.disconnect();
    resizeObserver.observe(canvas);
    for (const target of canvas.querySelectorAll("[data-ui-anatomy-part]")) {
      resizeObserver.observe(target);
    }
    measure();
  };
  const mutationObserver = new MutationObserver(observeTargets);
  mutationObserver.observe(canvas, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["data-ui-anatomy-part"],
  });
  observeTargets();
  onCleanup(() => {
    mutationObserver.disconnect();
    resizeObserver.disconnect();
  });
}, { flush: "post" });
</script>

<template>
  <figure class="ui-anatomy">
    <div class="ui-anatomy__stage">
      <div
        ref="diagram"
        class="ui-anatomy__diagram"
        @pointerover="onPointerOver"
        @focusin="selectTarget"
        @click="selectTarget"
      >
        <slot />
      </div>
      <div
        class="ui-anatomy__indicator"
        aria-hidden="true"
        :data-visible="Boolean(indicator)"
        :style="indicator && {
          width: `${indicator.width}px`,
          height: `${indicator.height}px`,
          transform: `translate(${indicator.x}px, ${indicator.y}px)`,
        }"
      >
        <span
          class="ui-anatomy__label"
          :data-align-end="indicator?.alignEnd"
          :style="indicator && { maxWidth: `${indicator.labelWidth}px` }"
        >{{ selected }}</span>
      </div>
    </div>
    <figcaption>
      <div class="ui-anatomy__parts" role="group" :aria-label="label">
        <template v-for="(description, name, index) in parts" :key="name">
          <UIButton
            size="sm"
            :variant="selected === name ? 'soft' : 'ghost'"
            :aria-pressed="selected === name"
            :aria-describedby="`${descriptionId}-${index}`"
            @pointerenter="(event: PointerEvent) => { if (event.pointerType !== 'touch') selectPart(name); }"
            @focus="selectPart(name)"
            @click="selectPart(name)"
          >{{ name }}</UIButton>
          <span :id="`${descriptionId}-${index}`" hidden>{{ description }}</span>
        </template>
      </div>
      <p class="ui-anatomy__description">{{ parts[selected] }}</p>
    </figcaption>
  </figure>
</template>

<style scoped>
.ui-anatomy {
  min-inline-size: 0;
  margin: 0;
}

.ui-anatomy__stage {
  position: relative;
  isolation: isolate;
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-panel-radius);
  background: var(--ui-color-surface-muted);
}

.ui-anatomy__diagram {
  padding: 1rem;
}

.ui-anatomy__indicator {
  position: absolute;
  inset: 0 auto auto 0;
  z-index: 1;
  box-sizing: border-box;
  border: 2px dashed var(--ui-color-accent);
  border-radius: var(--ui-control-radius);
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--ui-motion-standard) var(--ui-ease-out),
    width var(--ui-motion-standard) var(--ui-ease-out),
    height var(--ui-motion-standard) var(--ui-ease-out),
    opacity var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-anatomy__indicator[data-visible="true"] {
  opacity: 1;
}

.ui-anatomy__label {
  position: absolute;
  inset-block-start: -2px;
  left: -2px;
  width: max-content;
  box-sizing: border-box;
  padding: 0.125rem 0.5rem;
  border-radius: var(--ui-control-radius);
  background: var(--ui-color-accent);
  color: var(--ui-color-on-accent);
  font-size: 0.75rem;
  font-weight: 650;
  line-height: 1.25;
  overflow-wrap: anywhere;
  transform: translateY(-50%);
  transition:
    left var(--ui-motion-standard) var(--ui-ease-out),
    transform var(--ui-motion-standard) var(--ui-ease-out);
}

.ui-anatomy__label[data-align-end="true"] {
  left: calc(100% + 2px);
  transform: translate(-100%, -50%);
}

.ui-anatomy__parts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-block-start: 0.75rem;
}

.ui-anatomy__description {
  min-block-size: 2lh;
  margin: 0.5rem 0 0;
  color: var(--ui-color-text-muted);
  font-size: 0.9375rem;
  overflow-wrap: anywhere;
}
</style>
