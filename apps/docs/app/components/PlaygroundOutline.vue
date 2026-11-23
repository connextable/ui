<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import { useScrollArea, useScrollSpy } from "@connextable/ui";
import { computed, onMounted, onUnmounted, ref, shallowRef, useTemplateRef, watch } from "vue";

const props = defineProps<{ content: HTMLElement | null }>();
const headingSelector = "[data-playground-heading][id]";
const headings = shallowRef<{ element: HTMLElement; id: string; text: string; level: number }[]>([]);
const scroller = useTemplateRef<HTMLDivElement>("scroller");
const { scrollToElement } = useScrollArea(scroller);
const list = useTemplateRef<HTMLUListElement>("list");
const narrow = ref(false);
const expanded = ref(false);
const route = useRoute();
const rail = shallowRef<{ path: string; length: number; segments: Map<string, { start: number; length: number }> }>();
const { activeId, markTarget } = useScrollSpy(headings, { content: () => props.content, trackHash: true });
const indicator = computed(() => activeId.value ? rail.value?.segments.get(activeId.value) : undefined);

let narrowLayout: MediaQueryList | undefined;

function updateLayout() {
  narrow.value = narrowLayout?.matches ?? false;
}

function onOutlineToggle(event: Event) {
  if (narrow.value && event.currentTarget instanceof HTMLDetailsElement) expanded.value = event.currentTarget.open;
}

watch(() => route.path, () => { expanded.value = false; });

function onOutlineClick(event: MouseEvent, id: string) {
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  markTarget(id);
}

watch(() => props.content, (content, _previous, onCleanup) => {
  if (!content) {
    headings.value = [];
    return;
  }
  const collectHeadings = () => {
    headings.value = Array.from(content.querySelectorAll<HTMLElement>(headingSelector), element => ({
      element,
      id: element.id,
      text: element.textContent?.trim() ?? "",
      level: Number(element.tagName.slice(1)),
    }));
  };
  collectHeadings();
  const containsHeading = (node: Node) => node instanceof Element
    && (node.matches(headingSelector) || node.querySelector(headingSelector));
  const observer = new MutationObserver(records => {
    if (records.some(record => {
      const target = record.target instanceof Element ? record.target : record.target.parentElement;
      return target?.closest(headingSelector)
        || [...record.addedNodes, ...record.removedNodes].some(containsHeading);
    })) collectHeadings();
  });
  observer.observe(content, { childList: true, subtree: true, characterData: true });
  onCleanup(() => observer.disconnect());
}, { flush: "post", immediate: true });

function measureRail() {
  if (!list.value) {
    rail.value = undefined;
    return;
  }
  const rows = Array.from(list.value.querySelectorAll<HTMLAnchorElement>("a"), link => ({
    id: link.getAttribute("href")!.slice(1),
    x: link.offsetLeft + 1,
    top: link.offsetTop,
    bottom: link.offsetTop + link.offsetHeight,
  }));
  if (!rows.length) return;

  const segments = new Map<string, { start: number; length: number }>();
  let { x, top: y } = rows[0]!;
  let length = 0;
  const path = [`M ${x} ${y}`];
  const lineTo = (nextX: number, nextY: number) => {
    if (nextX === x && nextY === y) return;
    length += Math.hypot(nextX - x, nextY - y);
    path.push(`L ${nextX} ${nextY}`);
    x = nextX;
    y = nextY;
  };
  for (const [index, row] of rows.entries()) {
    const previous = rows[index - 1];
    const next = rows[index + 1];
    const start = length;
    const entry = previous ? Math.min(Math.abs(row.x - previous.x) / 2, (row.bottom - row.top) / 4) : 0;
    const exit = next ? Math.min(Math.abs(row.x - next.x) / 2, (row.bottom - row.top) / 4) : 0;
    lineTo(row.x, row.top + entry);
    lineTo(row.x, row.bottom - exit);
    // Split each bend at the row boundary so the highlight follows the same track.
    if (next && exit) lineTo((row.x + next.x) / 2, row.bottom);
    segments.set(row.id, { start, length: length - start });
  }
  rail.value = { path: path.join(" "), length, segments };
}

watch(list, (element, _previous, onCleanup) => {
  measureRail();
  if (!element) return;
  const resize = new ResizeObserver(measureRail);
  resize.observe(element);
  onCleanup(() => resize.disconnect());
}, { flush: "post" });
watch(headings, measureRail, { flush: "post" });

watch(activeId, () => {
  const viewport = scroller.value;
  const link = list.value?.querySelector<HTMLAnchorElement>('[aria-current="location"]');
  if (!viewport || !link || viewport.scrollHeight <= viewport.clientHeight) return;
  const visible = viewport.getBoundingClientRect();
  const target = link.getBoundingClientRect();
  if (target.top >= visible.top && target.bottom <= visible.bottom) return;
  scrollToElement(link, { axis: "vertical", align: "center", behavior: "smooth" });
}, { flush: "post" });

onMounted(() => {
  narrowLayout = window.matchMedia("(width < 68rem)");
  updateLayout();
  narrowLayout.addEventListener("change", updateLayout);
});

onUnmounted(() => {
  narrowLayout?.removeEventListener("change", updateLayout);
});
</script>

<template>
  <div class="playground-outline">
    <nav v-if="headings.length" aria-label="이 페이지">
      <h2 id="playground-outline-title" class="playground-outline__title">이 페이지</h2>
      <details :open="!narrow || expanded" @toggle="onOutlineToggle">
        <summary class="ui-opening-trigger">
          이 페이지
          <span class="ui-inset-icon" aria-hidden="true"><ChevronDown class="ui-opening-chevron" /></span>
        </summary>
        <div ref="scroller" class="playground-outline__scroller">
          <div class="playground-outline__entries">
            <svg v-if="rail" class="playground-outline__rail" aria-hidden="true">
              <path :d="rail.path" class="playground-outline__track" />
              <path
                v-if="indicator"
                :d="rail.path"
                class="playground-outline__indicator"
                :style="{
                  strokeDasharray: `${indicator.length} ${rail.length}`,
                  strokeDashoffset: -indicator.start,
                }"
              />
            </svg>
            <ul ref="list">
              <li
                v-for="heading in headings"
                :key="heading.id"
                :style="{ '--outline-depth': heading.level - 2 }"
              >
                <a
                  :href="`#${heading.id}`"
                  :aria-current="activeId === heading.id ? 'location' : undefined"
                  @click="onOutlineClick($event, heading.id)"
                >{{ heading.text }}</a>
              </li>
            </ul>
          </div>
        </div>
      </details>
    </nav>
  </div>
</template>

<style scoped>
.playground-outline {
  display: flex;
  min-inline-size: 0;
}

.playground-outline nav {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-inline-size: 0;
}

.playground-outline__title {
  margin: 0 0 var(--ui-space-sm);
  font-size: 0.8125rem;
  font-weight: 700;
}

.playground-outline details {
  display: flex;
  flex-direction: column;
  min-block-size: 0;
}

.playground-outline summary {
  display: none;
}

.playground-outline__scroller {
  max-block-size: max(0px, calc(var(--playground-outline-height) - 2.25rem));
  overflow-y: auto;
  padding: var(--ui-space-xs);
}

.playground-outline__entries,
.playground-outline ul {
  position: relative;
}

.playground-outline__rail {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  fill: none;
  pointer-events: none;
}

.playground-outline__track {
  stroke: var(--ui-color-divider);
}

.playground-outline__indicator {
  stroke: var(--ui-color-accent);
  stroke-width: 2;
  stroke-linecap: round;
  transition:
    stroke-dasharray var(--ui-motion-standard) var(--ui-ease-out),
    stroke-dashoffset var(--ui-motion-standard) var(--ui-ease-out);
}

.playground-outline ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.playground-outline li {
  padding-inline-start: calc(var(--outline-depth) * var(--ui-space-md));
}

.playground-outline a {
  display: block;
  padding: 0.3125rem var(--ui-space-xs) 0.3125rem var(--ui-space-md);
  color: var(--ui-color-text-muted);
  font-size: 0.8125rem;
  text-decoration: none;
  word-break: keep-all;
  overflow-wrap: anywhere;
  transition: color var(--ui-motion-fast) var(--ui-ease-out);
}

.playground-outline a:is(:hover, [aria-current]) {
  color: var(--ui-color-accent);
}

.playground-outline a[aria-current] {
  font-weight: 650;
}

.playground-outline a:focus-visible {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}

@media (width < 68rem) {
  .playground-outline__title {
    display: none;
  }

  .playground-outline details {
    border: 1px solid var(--ui-color-divider);
    border-radius: var(--ui-radius-md);
  }

  .playground-outline summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline-start: var(--ui-space-md);
    font-size: var(--ui-font-size-body-sm);
    font-weight: 650;
    cursor: pointer;
  }

  .playground-outline details[open] summary .ui-opening-chevron {
    rotate: 180deg;
  }

  .playground-outline__scroller {
    max-block-size: min(40dvh, 16rem);
  }
}
</style>
