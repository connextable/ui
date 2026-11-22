<script setup lang="ts">
import UIFieldClear from "./UIFieldClear.vue";
import { useFieldClear } from "./clearable";

withDefaults(defineProps<{ active?: boolean; indicator?: boolean; size?: "sm" | "md" | "lg" }>(), { active: true });
const enabled = useFieldClear()?.enabled;
</script>

<template>
  <span
    v-if="enabled && active !== false"
    class="ui-clearable-control"
    :class="{ 'ui-clearable-control--trigger': indicator }"
    :data-ui-control-size="size ?? 'md'"
  >
    <slot />
    <UIFieldClear />
  </span>
  <slot v-else />
</template>
