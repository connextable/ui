<script setup lang="ts">
import { UIDisclosure, UIDisclosureContent, UIDisclosureTrigger } from "@connextable/ui";
import { ref } from "vue";
import PlaygroundCodeBlock from "./PlaygroundCodeBlock.vue";

defineProps<{
  id: string;
  title: string;
  description?: string;
  source: string;
  wide?: boolean;
  headingLevel?: 2 | 3;
}>();

const hasOpenedCode = ref(false);
</script>

<template>
  <section class="playground-example" :aria-labelledby="id">
    <component
      :is="headingLevel === 3 ? 'h3' : 'h2'"
      :id="id"
      data-playground-heading
      tabindex="-1"
    >{{ title }}</component>
    <p v-if="description" class="playground-example__description">{{ description }}</p>
    <UIDisclosure
      class="playground-example__frame"
      variant="outline"
      :content-id="`${id}-source`"
      @update:model-value="hasOpenedCode ||= $event"
      v-slot="{ open }"
    >
      <div class="playground-example__demo" :class="{ 'playground-example__demo--wide': wide }">
        <slot />
        <UIDisclosureTrigger
          class="playground-example__toggle"
          size="sm"
          variant="ghost"
          :aria-label="`${title} 코드 ${open ? '접기' : '보기'}`"
        >
          {{ open ? "코드 접기" : "코드 보기" }}
        </UIDisclosureTrigger>
      </div>
      <UIDisclosureContent divided role="region" :aria-label="`${title} Vue 코드`">
        <PlaygroundCodeBlock v-if="hasOpenedCode">
          <div v-html="source" />
        </PlaygroundCodeBlock>
      </UIDisclosureContent>
    </UIDisclosure>
  </section>
</template>

<style scoped>
.playground-example {
  min-inline-size: 0;
  margin-block-end: 3rem;
}

.playground-example :is(h2, h3, p) {
  margin: 0;
}

.playground-example :is(h2, h3) {
  font-size: clamp(1.25rem, 2.5vw, 1.625rem);
  font-weight: 680;
  letter-spacing: -0.025em;
  overflow-wrap: anywhere;
}

.playground-example h3 {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
}

.playground-example .playground-example__description {
  margin-block-start: 0.625rem;
  color: var(--ui-color-text-muted);
  word-break: keep-all;
  overflow-wrap: anywhere;
}

.playground-example__frame {
  margin-block-start: 1rem;
}

.playground-example__demo {
  position: relative;
  display: grid;
  justify-items: center;
  padding: clamp(1rem, 4vw, 2rem) clamp(0.75rem, 2vw, 1.25rem);
  padding-block-end: calc(var(--ui-control-height-small) + 0.75rem);
}

.playground-example__demo--wide {
  justify-items: stretch;
}

.playground-example__toggle {
  position: absolute;
  inset-block-end: 0.375rem;
  inset-inline-end: 0.5rem;
  white-space: nowrap;
}
</style>
