<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import { CascadeSelectTrigger } from "@sectile/vue/cascade-select";
import type { MenuPartProps } from "@sectile/vue/menu";

defineOptions({ inheritAttrs: false });
const { as, asChild, size = "md", variant = "outline" } = defineProps<MenuPartProps & {
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "soft";
}>();
</script>

<template>
  <CascadeSelectTrigger
    v-bind="$attrs"
    v-slot="state"
    :as="as"
    :as-child="asChild"
    :class="asChild ? undefined : 'ui-field-control ui-popup-trigger'"
    :data-ui-control-size="asChild ? undefined : size"
    :data-variant="asChild ? undefined : variant"
  >
    <slot v-bind="state" />
    <span v-if="!asChild" class="ui-popup-trigger__indicator" aria-hidden="true">
      <slot name="trailing"><ChevronDown class="ui-popup-trigger__chevron" /></slot>
    </span>
  </CascadeSelectTrigger>
</template>
