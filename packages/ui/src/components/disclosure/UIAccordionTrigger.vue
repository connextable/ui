<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import { AccordionTrigger, type AccordionPartProps } from "@sectile/vue/accordion";
import type { Component } from "vue";
import UIButton from "../button/UIButton.vue";
import UIItemIcon from "../UIItemIcon.vue";

defineOptions({ inheritAttrs: false });
const { as, asChild, icon } = defineProps<AccordionPartProps & { icon?: Component }>();
</script>

<template>
  <AccordionTrigger v-if="as || asChild" v-bind="$attrs" :as="as" :as-child="asChild" v-slot="state">
    <UIItemIcon v-if="icon && !asChild" :icon="icon" />
    <slot v-bind="state" />
  </AccordionTrigger>
  <AccordionTrigger v-else as-child v-slot="state">
    <UIButton v-bind="$attrs" class="ui-expandable-heading" variant="ghost" :icon="icon">
      <slot v-bind="state" />
      <template #trailing><ChevronDown class="ui-expandable-chevron" /></template>
    </UIButton>
  </AccordionTrigger>
</template>
