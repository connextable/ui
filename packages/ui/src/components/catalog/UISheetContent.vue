<script setup lang="ts">
import { DrawerContent, type DrawerPartProps } from "@sectile/vue/drawer";

const { as, asChild, size = "md", block } = defineProps<DrawerPartProps & {
  as?: DrawerPartProps["as"];
  asChild?: boolean;
  size?: "sm" | "md" | "lg";
  block?: boolean;
}>();
</script>

<template>
  <DrawerContent
    :as="as" :as-child="asChild" class="ui-sheet-panel"
    :data-size="size" :data-block="block || undefined"
  >
    <slot />
  </DrawerContent>
</template>
