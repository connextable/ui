<script setup lang="ts">
import { useUIScrollSpy, type UIScrollSpySection, type UIScrollToSectionOptions } from "./useUIScrollSpy";

const props = defineProps<{
  sections: readonly UIScrollSpySection[];
  root?: HTMLElement | null;
  content?: Element | null;
  trackHash?: boolean;
}>();
defineSlots<{
  default(state: { activeId: string | null; refresh(): void; markTarget(id: string): void;
    scrollToSection(id: string, options?: UIScrollToSectionOptions): boolean }): unknown;
}>();

const { activeId, refresh, markTarget, scrollToSection } = useUIScrollSpy(() => props.sections, {
  root: () => props.root,
  content: () => props.content,
  trackHash: () => props.trackHash,
});
</script>

<template>
  <slot :active-id="activeId" :refresh="refresh" :mark-target="markTarget" :scroll-to-section="scrollToSection" />
</template>
