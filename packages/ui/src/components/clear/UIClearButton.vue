<script setup lang="ts">
import { X } from "@lucide/vue";
import UIButton from "../button/UIButton.vue";

defineProps<{ label?: string; disabled?: boolean; text?: boolean }>();
const emit = defineEmits<{ click: [event: MouseEvent] }>();
</script>

<template>
  <UIButton
    :class="{ 'ui-clear-button': !text }"
    type="button"
    size="sm"
    variant="ghost"
    :icon-only="!text"
    :aria-label="text ? undefined : label ?? '값 지우기'"
    :disabled="disabled"
    @mousedown.prevent
    @keydown.enter.stop
    @keydown.space.stop
    @click.stop="emit('click', $event)"
  >
    <template #leading><X /></template>
    <template v-if="text" #default>{{ label ?? '값 지우기' }}</template>
  </UIButton>
</template>
