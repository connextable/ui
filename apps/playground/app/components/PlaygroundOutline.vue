<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from "vue";

const props = defineProps<{ content: HTMLElement | null }>();
const headings = shallowRef<HTMLElement[]>([]);
const activeId = ref("");
const links = computed(() => headings.value.map((heading) => ({
  id: heading.id,
  text: heading.textContent?.trim() ?? "",
  nested: heading.tagName === "H3",
})));

let frame = 0;

function updateActive() {
  frame = 0;
  const first = headings.value[0];
  if (!first) {
    activeId.value = "";
    return;
  }
  const offset = Number.parseFloat(getComputedStyle(first).scrollMarginTop) || 0;
  const atBottom = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  const current = atBottom
    ? headings.value.at(-1)
    : headings.value.findLast((heading) => heading.getBoundingClientRect().top <= offset + 4);
  activeId.value = (current ?? first).id;
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(updateActive);
}

watch(() => props.content, (content, _previous, onCleanup) => {
  if (!content) return;
  const collectHeadings = () => {
    headings.value = Array.from(content.querySelectorAll<HTMLElement>("[data-playground-heading][id]"));
    onScroll();
  };
  collectHeadings();
  const observer = new MutationObserver(collectHeadings);
  observer.observe(content, { childList: true, subtree: true, characterData: true });
  onCleanup(() => observer.disconnect());
}, { flush: "post" });

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  if (frame) cancelAnimationFrame(frame);
});
</script>

<template>
  <div class="playground-outline">
    <nav v-if="links.length" aria-labelledby="playground-outline-title">
      <h2 id="playground-outline-title">이 페이지</h2>
      <ul>
        <li v-for="link in links" :key="link.id" :data-nested="link.nested || undefined">
          <a
            :href="`#${link.id}`"
            :aria-current="activeId === link.id ? 'location' : undefined"
          >{{ link.text }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.playground-outline {
  min-inline-size: 0;
}

.playground-outline h2 {
  margin: 0 0 0.625rem;
  font-size: 0.8125rem;
  font-weight: 700;
}

.playground-outline ul {
  margin: 0;
  padding: 0;
  border-inline-start: 1px solid var(--ui-color-divider);
  list-style: none;
}

.playground-outline a {
  display: block;
  margin-inline-start: -1px;
  padding: 0.3125rem 0.25rem 0.3125rem 0.75rem;
  border-inline-start: 2px solid transparent;
  color: var(--ui-color-text-muted);
  font-size: 0.8125rem;
  text-decoration: none;
  overflow-wrap: anywhere;
}

.playground-outline [data-nested] a {
  padding-inline-start: 1.375rem;
}

.playground-outline a:is(:hover, [aria-current]) {
  color: var(--ui-color-accent);
}

.playground-outline a[aria-current] {
  border-inline-start-color: currentColor;
  font-weight: 650;
}

.playground-outline a:focus-visible {
  outline: 2px solid var(--ui-color-focus);
  outline-offset: 1px;
}

@media (width < 68rem) {
  .playground-outline ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0 0.875rem;
    border-inline-start: 0;
  }

  .playground-outline a,
  .playground-outline [data-nested] a {
    margin: 0;
    padding-inline: 0.125rem;
    border-inline-start: 0;
    border-block-end: 2px solid transparent;
  }

  .playground-outline a[aria-current] {
    border-block-end-color: currentColor;
  }
}
</style>
