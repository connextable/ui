<script setup lang="ts">
import { AccordionContent, type AccordionContentProps } from "@sectile/vue/accordion";

const { forcePresent = true, ...props } = defineProps<AccordionContentProps>();
</script>

<template>
  <AccordionContent v-if="props.asChild" v-bind="props" :force-present="forcePresent" v-slot="state">
    <slot v-bind="state" />
  </AccordionContent>
  <AccordionContent v-else v-bind="props" :force-present="forcePresent" v-slot="state" class="ui-expandable-content">
    <div class="ui-expandable-clip">
      <div class="ui-expandable-body"><slot v-bind="state" /></div>
    </div>
  </AccordionContent>
</template>

<style>
[data-scope="accordion"][data-part="root"] {
  display: grid;
  gap: var(--ui-space-xs);
  inline-size: 28rem;
  max-inline-size: 100%;
  min-inline-size: 0;
}

[data-scope="accordion"][data-part="item"] {
  --ui-expandable-radius: var(--ui-radius-md);

  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-expandable-radius);
}

[data-scope="accordion"][data-part="header"] {
  margin: 0;
  font-size: inherit;
}

[data-scope="accordion"] .ui-expandable-content {
  padding: 0;
}
</style>
