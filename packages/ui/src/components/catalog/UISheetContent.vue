<script setup lang="ts">
import { DrawerContent, type DrawerPartProps } from "@sectile/vue/drawer";

const { as, asChild, width } = defineProps<DrawerPartProps & {
  as?: DrawerPartProps["as"];
  asChild?: boolean;
  width?: string | number;
}>();
</script>

<template>
  <DrawerContent
    :as="as" :as-child="asChild" class="ui-sheet-panel"
    :style="{ '--ui-sheet-width': typeof width === 'number' ? `${width}px` : width }"
  >
    <slot />
  </DrawerContent>
</template>
