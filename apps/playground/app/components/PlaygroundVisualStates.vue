<script lang="ts">
let stylesheet: Promise<CSSStyleSheet> | undefined;

function getStylesheet() {
  return stylesheet ??= import("virtual:playground-interaction-styles").then(({ default: css }) => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    return sheet;
  });
}
</script>

<script setup lang="ts">
import { computed, onMounted, shallowRef, useTemplateRef, watch } from "vue";

const { source } = defineProps<{ source: HTMLElement | null }>();
const board = useTemplateRef<HTMLElement>("board");
const sheet = shallowRef<CSSStyleSheet>();
const specimen = shallowRef<{ root: Element; target?: Element; states: readonly Variant[] }>();

const variants = [
  { key: "default", label: "기본" },
  { key: "hover", label: "호버" },
  { key: "active", label: "누르는 중" },
  { key: "focus", label: "키보드 포커스" },
] as const;
type Variant = typeof variants[number]["key"];

const displayedVariants = computed(() => variants.filter(variant => !specimen.value || specimen.value.states.includes(variant.key)));

const focusable = "button, input:not([type=hidden]), select, textarea, a[href], [tabindex], [contenteditable=true]";
const groupedControl = [
  ".ui-number-control", ".ui-quantity-control", ".ui-input--with-slots",
  ".ui-choice", ".ui-checkbox", ".ui-file-input__picker", "[role=tablist]",
  "[data-scope][data-part=root]", "[data-ui-tabular-scroll]",
].join(",");

function findSpecimen(source: HTMLElement) {
  const first = [...source.children].find(element => element.getClientRects().length > 0);
  if (!first) return;
  const targets = Array.from(source.querySelectorAll<HTMLElement | SVGElement>(focusable)).filter(element =>
    !element.closest("[hidden], [inert], [aria-hidden=true], [aria-disabled=true]")
      && !element.matches(":disabled")
      && element.getBoundingClientRect().width > 1,
  );
  const target = targets.find(element => element.tabIndex >= 0) ?? targets[0];
  if (target) {
    const frame = target.closest(groupedControl) ?? target.closest("svg");
    const root = frame && source.contains(frame) ? frame : target;
    return { root, target, states: ["default", "hover", "active", "focus"] } as const;
  }

  const table = source.querySelector('[data-scope="data-table"][data-part="root"]');
  const row = table?.querySelector('[data-part="row"]');
  if (table && row) return { root: table, target: row, states: ["default", "hover"] } as const;

  const scrollport = source.querySelector('[data-ui-virtual-scrollport], [data-scope="virtualizer"][data-part="root"]');
  if (scrollport && (scrollport.scrollHeight > scrollport.clientHeight || scrollport.scrollWidth > scrollport.clientWidth)) {
    return { root: scrollport, target: scrollport, states: ["default", "focus"] } as const;
  }

  return { root: first, states: ["default"] } as const;
}

function markInteraction(target: Element, root: Element, state: Variant) {
  if (state === "focus") target.classList.add("pg-focus", "pg-focus-visible");
  for (let element: Element | null = target; element; element = element.parentElement) {
    if (state === "hover" || state === "active") element.classList.add("pg-hover");
    if (state === "active") element.classList.add("pg-active");
    if (state === "focus") {
      element.classList.add("pg-focus-within");
      element.removeAttribute("data-pointer-focus");
    }
    if (element === root) break;
  }
}

function copySpecimen(root: Element, target: Element | undefined, state: Variant) {
  const clone = root.cloneNode(true) as Element;
  const originalNodes = [root, ...root.querySelectorAll("*")];
  const clonedNodes = [clone, ...clone.querySelectorAll("*")];
  const marker = target && clonedNodes[originalNodes.indexOf(target)];
  if (marker) markInteraction(marker, clone, state);
  for (const [index, original] of originalNodes.entries()) {
    if (original instanceof HTMLCanvasElement && original.width && original.height) {
      const bitmap = clonedNodes[index] as HTMLCanvasElement;
      bitmap.getContext("2d")?.drawImage(original, 0, 0);
    }
  }
  return clone;
}

onMounted(() => {
  void getStylesheet().then(value => { sheet.value = value; });
});

watch(() => source, (element, _, onCleanup) => {
  if (!element) return;
  let frame = 0;
  const observer = new MutationObserver(schedule);
  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const match = findSpecimen(element!);
      if (!match) return;
      specimen.value = match;
      observer.disconnect();
    });
  }
  observer.observe(element, { childList: true, subtree: true });
  schedule();
  onCleanup(() => {
    observer.disconnect();
    cancelAnimationFrame(frame);
  });
}, { immediate: true, flush: "post" });

watch([board, sheet, specimen], ([container, styles, sample]) => {
  if (!container || !styles || !sample) return;
  for (const host of container.querySelectorAll<HTMLElement>("[data-interaction]")) {
    const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = [styles];
    root.replaceChildren(copySpecimen(sample.root, sample.target, host.dataset.interaction as Variant));
  }
}, { flush: "post" });
</script>

<template>
  <section class="playground-visual-states" aria-labelledby="visual-states">
    <h3 id="visual-states" data-playground-heading tabindex="-1">인터랙션 스타일</h3>
    <div ref="board" class="playground-visual-states__grid">
      <figure v-for="variant in displayedVariants" :key="variant.key" class="playground-visual-states__card">
        <div class="playground-visual-states__sample" :data-interaction="variant.key" inert aria-hidden="true" />
        <figcaption>{{ variant.label }}</figcaption>
      </figure>
    </div>
    <p v-if="specimen && !specimen.target">기본 예제에는 비교할 인터랙션 스타일이 없습니다.</p>
  </section>
</template>

<style scoped>
.playground-visual-states {
  container-type: inline-size;
  min-inline-size: 0;
}

.playground-visual-states h3 {
  margin: 0 0 var(--ui-space-md);
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  font-weight: 680;
  letter-spacing: -0.025em;
}

.playground-visual-states__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  gap: var(--ui-space-sm);
}

.playground-visual-states__grid:has(> :nth-child(2):last-child) {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.playground-visual-states__grid:has(> :only-child) {
  grid-template-columns: minmax(0, 1fr);
}

@container (width < 42rem) {
  .playground-visual-states__grid:has(> :nth-child(4)) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .playground-visual-states__grid:has(> :nth-child(2):last-child) {
    grid-template-columns: minmax(0, 1fr);
  }
}

@container (width < 19rem) {
  .playground-visual-states__grid:has(> :nth-child(4)) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.playground-visual-states__card {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  min-inline-size: 0;
  margin: 0;
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-md);
}

.playground-visual-states__sample {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  place-items: center;
  box-sizing: border-box;
  min-block-size: 5.5rem;
  max-block-size: 13rem;
  padding: var(--ui-space-md);
  overflow: clip;
}

.playground-visual-states figcaption {
  padding: var(--ui-space-xs) var(--ui-space-sm);
  border-block-start: 1px solid var(--ui-color-divider);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
  text-align: center;
}

.playground-visual-states p {
  margin: var(--ui-space-sm) 0 0;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}
</style>
