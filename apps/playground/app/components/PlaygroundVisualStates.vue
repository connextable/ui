<script lang="ts">
const scopedAttribute = /data-v-[\da-f]{8}/g;
let stylesheet: Promise<{ sheet: CSSStyleSheet; scopes: Set<string> }> | undefined;

function getStylesheet() {
  return stylesheet ??= import("virtual:playground-interaction-styles").then(({ default: css }) => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`${css}\n:host > * { box-sizing: border-box; min-inline-size: 0; max-inline-size: 100%; }
      :host([data-fill]) > * { inline-size: 100%; }
      :host > :is([role="progressbar"], [data-scope][data-part="content"]) { inline-size: min(100%, 20rem); }
      :host > [data-ui-chart-themed] > svg:has(> [data-chart-overlay]) { inline-size: 100% !important; block-size: auto !important; }`);
    return { sheet, scopes: new Set(css.match(scopedAttribute)) };
  });
}

function getExampleStyles(root: Element, libraryScopes: Set<string>) {
  const scopes = new Set(
    [root, ...root.querySelectorAll("*")].flatMap(element => element.getAttributeNames())
      .filter(name => name.startsWith("data-v-") && !libraryScopes.has(name)),
  );
  const css: string[] = [];
  for (const sheet of root.ownerDocument.styleSheets) {
    if (sheet.href && new URL(sheet.href).origin !== location.origin) continue;
    for (const rule of sheet.cssRules) {
      if (rule instanceof CSSStyleRule && rule.selectorText.match(scopedAttribute)?.some(scope => scopes.has(scope))) {
        css.push(rule.cssText);
      }
    }
  }
  if (!css.length) return [];
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css.join("\n"));
  return [sheet];
}
</script>

<script setup lang="ts">
import { computed, onMounted, shallowRef, useTemplateRef, watch } from "vue";

const { source } = defineProps<{ source: HTMLElement | null }>();
const board = useTemplateRef<HTMLElement>("board");
const styles = shallowRef<Awaited<ReturnType<typeof getStylesheet>>>();
const specimen = shallowRef<{
  root: Element;
  target?: Element;
  pointer?: Element;
  keyboardScroll?: boolean;
  states: readonly Variant[];
}>();
const equivalentStates = shallowRef(new Map<Variant, Variant>());

const variants = [
  { key: "default", label: "기본" },
  { key: "hover", label: "호버" },
  { key: "active", label: "누르는 중" },
  { key: "focus", label: "키보드 포커스" },
] as const;
type Variant = typeof variants[number]["key"];

const displayedVariants = computed(() => {
  const cards = new Map<Variant, string[]>();
  for (const variant of variants) {
    if (specimen.value && !specimen.value.states.includes(variant.key)) continue;
    const key = equivalentStates.value.get(variant.key) ?? variant.key;
    const labels = cards.get(key) ?? [];
    labels.push(variant.label);
    cards.set(key, labels);
  }
  return Array.from(cards, ([key, labels]) => ({ key, label: labels.join(" · ") }));
});

const focusable = "button, input:not([type=hidden]), select, textarea, a[href], [tabindex], [contenteditable=true]";
const virtualScrollport = '[data-ui-virtual-scrollport], [data-scope="virtualizer"][data-part="root"]';
const pickerAnchor = ':is([data-part="anchor"]:is([data-scope^="date"], [data-scope$="-picker"]), [data-scope="time-picker"][data-part="root"])';
const calendarContent = ':is([data-scope="calendar"], [data-scope="range-calendar"])[data-part="content"]';
const collectionItem = ':is([role="option"], [role="treeitem"], [role="gridcell"]):not([aria-selected="true"], [aria-disabled="true"], [hidden])';
const groupedControl = [
  ".ui-number-control", ".ui-quantity-control", ".ui-input--with-slots",
  ".ui-choice", ".ui-checkbox", ".ui-file-input__picker", ".ui-file-row", ".ui-navigation-rail", "[role=tablist]",
  pickerAnchor, calendarContent, '[data-scope="feed"][data-part="item"]',
  "[data-scope][data-part=root]", "[data-ui-tabular-scroll]",
].join(",");
const fillCard = ':is([data-scope="chart"], [data-scope="grid"], [data-scope="tree-grid"], [data-scope="tree-reorder"], [data-scope^="data-"], [data-scope="virtualizer"], [data-scope="window-splitter"])[data-part="root"]';
const roomyControl = [
  fillCard, calendarContent, ".ui-file-row[data-pickable]", ".ui-navigation-rail",
  '[data-scope="toggle-group"][data-part="root"]',
  ':is([data-scope="checkbox-tree"], [data-scope="cascade-list"], [data-scope="stepper"])[data-part="root"]',
  '[data-part="anchor"]:is([data-scope="date-range"], [data-scope^="date-time"], [data-scope*="-range-picker"])',
  ':is([data-scope="transfer"], [data-scope="tree-view"], [data-scope="carousel"], [data-scope="navigation-menu"], [data-scope="tree-reorder"], [data-scope="color-picker"])[data-part="root"]',
].join(",");

function findSpecimen(source: HTMLElement) {
  const first = [...source.children].find(element => element.getClientRects().length > 0);
  if (!first) return;
  const progress = source.querySelector('[role="progressbar"]');
  if (progress) return { root: progress, states: ["default"] } as const;

  const targets = Array.from(source.querySelectorAll<HTMLElement | SVGElement>(focusable)).filter(element =>
    !element.closest("[hidden], [inert], [aria-hidden=true], [aria-disabled=true]")
      && !element.matches(":disabled")
      && !element.matches(virtualScrollport)
      && element.getBoundingClientRect().width > 1,
  );
  const uploader = source.querySelector(".ui-file-row");
  const target = (uploader && targets.find(element => uploader.contains(element)))
    || targets.find(element => element.tabIndex >= 0 && element.matches('[data-part="cell"]') && element.closest(calendarContent))
    || targets.find(element => element.matches('[data-part="trigger"]') && element.closest(pickerAnchor))
    || targets.find(element => element.matches(".ui-navigation-rail button[aria-controls]"))
    || targets.find(element => element.tabIndex >= 0) || targets[0];
  if (target) {
    const frame = target.closest(groupedControl) ?? target.closest("svg");
    const root = frame && source.contains(frame) ? frame : target;
    if (target.matches('[data-scope="chart"][data-part="root"]')) {
      return { root, target, states: ["default", "focus"] } as const;
    }
    const collection = target.matches('[role="listbox"], [role="tree"], [role="grid"], [role="treegrid"]');
    const pointer = collection ? target.querySelector(collectionItem) ?? target : target;
    return { root, target, pointer, states: ["default", "hover", "active", "focus"] } as const;
  }

  const table = source.querySelector('[data-scope="data-table"][data-part="root"]');
  const row = table?.querySelector('[data-part="row"]');
  if (table && row) return { root: table, target: row, states: ["default", "hover"] } as const;

  const scrollport = source.querySelector(virtualScrollport);
  if (scrollport && (scrollport.scrollHeight > scrollport.clientHeight || scrollport.scrollWidth > scrollport.clientWidth)) {
    return { root: scrollport, keyboardScroll: true, states: [] } as const;
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
      const stage = bitmap.closest<HTMLElement>(".ui-chart-plot__stage");
      if (stage) {
        stage.style.blockSize = "auto";
        stage.style.aspectRatio = `${original.width} / ${original.height}`;
      }
    }
  }
  return clone;
}

const paintProperties = [
  "backgroundColor", "backgroundImage", "boxShadow", "color", "opacity", "filter",
  "transform", "translate", "rotate", "scale", "fontWeight", "fontSize", "textDecorationLine",
  "textDecorationColor", "fill", "stroke", "strokeWidth", "clipPath",
] as const;
const borderSides = ["top", "right", "bottom", "left"] as const;

function paintStyle(style: CSSStyleDeclaration) {
  return [
    ...paintProperties.map(property => style[property]),
    ...borderSides.map(side => style.getPropertyValue(`border-${side}-style`) === "none"
      ? "" : style.getPropertyValue(`border-${side}`)),
    style.outlineStyle === "none" ? "" : `${style.outline} ${style.outlineOffset}`,
  ];
}

function appearance(root: Element) {
  const frame = root.getBoundingClientRect();
  return JSON.stringify([root, ...root.querySelectorAll("*")].flatMap((element, index) => {
    const style = getComputedStyle(element);
    if (style.visibility !== "visible" || style.opacity === "0" || !element.getClientRects().length) return [];
    const { x, y, width, height } = element.getBoundingClientRect();
    const geometry = [x - frame.x, y - frame.y, width, height].map(Math.round);
    const generated = ["::before", "::after"].map(pseudo => getComputedStyle(element, pseudo));
    return [[index, geometry, paintStyle(style), ...generated.map(pseudo =>
      pseudo.content === "none" || pseudo.content === "normal" ? "" : [pseudo.content, paintStyle(pseudo)],
    )]];
  }));
}

onMounted(() => {
  void getStylesheet().then(value => { styles.value = value; });
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

watch([board, styles, specimen], ([container, library, sample]) => {
  if (!container || !library || !sample) return;
  const sheets = [library.sheet, ...getExampleStyles(sample.root, library.scopes)];
  const clones = new Map<Variant, Element>();
  for (const host of container.querySelectorAll<HTMLElement>("[data-interaction]")) {
    const state = host.dataset.interaction as Variant;
    const target = state === "hover" || state === "active" ? sample.pointer ?? sample.target : sample.target;
    const clone = copySpecimen(sample.root, target, state);
    const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = sheets;
    root.replaceChildren(clone);
    clones.set(state, clone);
  }
  const measured = new Map<string, Variant>();
  const same = new Map<Variant, Variant>();
  if (clones.size > 1) {
    for (const [state, clone] of clones) {
      const signature = appearance(clone);
      const representative = measured.get(signature);
      if (representative) same.set(state, representative);
      else measured.set(signature, state);
    }
  }
  equivalentStates.value = same;
}, { flush: "post" });
</script>

<template>
  <section class="playground-visual-states" aria-labelledby="visual-states">
    <h3 id="visual-states" data-playground-heading tabindex="-1">{{ specimen?.keyboardScroll ? "키보드 스크롤" : "인터랙션 스타일" }}</h3>
    <p v-if="specimen?.keyboardScroll">Tab으로 위 예제의 스크롤 영역에 들어간 뒤 방향키로 내용을 탐색할 수 있습니다.</p>
    <div v-else ref="board" class="playground-visual-states__grid" :data-roomy="specimen?.root.matches(roomyControl) || undefined"
      :data-count="displayedVariants.length">
      <figure v-for="variant in displayedVariants" :key="variant.key" class="playground-visual-states__card">
        <div class="playground-visual-states__sample" :data-interaction="variant.key"
          :data-fill="specimen?.root.matches(fillCard) || undefined" inert aria-hidden="true" />
        <figcaption>{{ variant.label }}</figcaption>
      </figure>
    </div>
    <p v-if="specimen && !specimen.target && !specimen.keyboardScroll">기본 예제에는 비교할 인터랙션 스타일이 없습니다.</p>
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
  --columns: 4;
  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  grid-auto-rows: 1fr;
  gap: var(--ui-space-sm);
}

.playground-visual-states__grid:where([data-count="3"]) {
  --columns: 3;
}

.playground-visual-states__grid:where([data-roomy], [data-count="2"]) {
  --columns: 2;
}

.playground-visual-states__grid:where([data-count="1"]) {
  --columns: 1;
}

@container (width < 42rem) {
  .playground-visual-states__grid:where([data-count="3"], [data-count="4"]) {
    --columns: 2;
  }

  .playground-visual-states__grid:where([data-roomy], [data-count="2"]) {
    --columns: 1;
  }
}

@container (width < 19rem) {
  .playground-visual-states__grid {
    --columns: 1;
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
  padding: var(--ui-space-md);
  overflow: hidden;
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
