<script setup lang="ts">
import { X } from "@lucide/vue";
import UIButton from "../button/UIButton.vue";

defineProps<{ label?: string; disabled?: boolean }>();
const emit = defineEmits<{ click: [event: MouseEvent] }>();
</script>

<template>
  <UIButton
    class="ui-clear-button"
    type="button"
    size="sm"
    variant="ghost"
    icon-only
    :aria-label="label ?? '값 지우기'"
    :disabled="disabled"
    @mousedown.prevent
    @click.stop="emit('click', $event)"
  >
    <template #leading><X /></template>
  </UIButton>
</template>
