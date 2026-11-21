<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import { AccordionTrigger, type AccordionPartProps } from "@sectile/vue/accordion";
import UIButton from "../button/UIButton.vue";

defineOptions({ inheritAttrs: false });
const props = defineProps<AccordionPartProps>();
</script>

<template>
  <AccordionTrigger v-if="props.as || props.asChild" v-bind="{ ...$attrs, ...props }" v-slot="state">
    <slot v-bind="state" />
  </AccordionTrigger>
  <AccordionTrigger v-else as-child v-slot="state">
    <UIButton v-bind="$attrs" class="ui-expandable-heading" variant="ghost">
      <slot v-bind="state" />
      <template #trailing><ChevronDown class="ui-expandable-chevron" /></template>
    </UIButton>
  </AccordionTrigger>
</template>
