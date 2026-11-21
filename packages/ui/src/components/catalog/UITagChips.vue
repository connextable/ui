<script setup lang="ts">
import { GripVertical, X } from "@lucide/vue";
import { computed, nextTick } from "vue";
import {
  UIReorderFeedback,
  UIReorderGroup,
  UISequenceReorder,
  UISequenceReorderHandle,
  UISequenceReorderItem,
} from "../reorder";
import UITagChip from "./UITagChip.vue";

const props = defineProps<{
  value: readonly string[];
  readonly: boolean;
  reorderable: boolean;
}>();
const emit = defineEmits<{ reorder: [value: readonly string[]] }>();

const tags = computed(() => {
  const occurrences = new Map<string, number>();
  return props.value.map((text, index) => {
    const occurrence = occurrences.get(text) ?? 0;
    occurrences.set(text, occurrence + 1);
    return { id: JSON.stringify([text, occurrence]), text, index };
  });
});
const ids = computed(() => tags.value.map(({ id }) => id));
const textById = computed(() => new Map(tags.value.map(({ id, text }) => [id, text])));

function isolateReorderArrows(event: KeyboardEvent) {
  const target = event.target;
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  // The tags input also owns horizontal arrows for navigating its delete buttons.
  if (target instanceof Element && (target.matches(".ui-tags-input__chip") || target.closest(".ui-tags-input__handle"))) {
    event.stopPropagation();
  }
}

async function reorder(order: readonly string[]) {
  const next = order.map((id) => textById.value.get(id));
  if (!next.every((tag) => tag !== undefined)) return;

  const activeElement = document.activeElement;
  const handle = activeElement?.matches(".ui-tags-input__chip")
    ? activeElement.querySelector(".ui-tags-input__handle")
    : activeElement;
  const sorter = handle?.closest(".ui-tags-input__sorter");
  emit("reorder", next);
  if (!(handle instanceof HTMLElement) || !sorter || !handle.matches(".ui-tags-input__handle")) return;

  // Updating the tag indexes also refreshes Sectile's delete-button focus.
  await nextTick();
  const active = handle.ownerDocument.activeElement;
  if (handle.isConnected && (active === handle.ownerDocument.body || sorter.contains(active))) {
    handle.focus({ preventScroll: true });
  }
}
</script>

<template>
  <UISequenceReorder
    v-if="reorderable && tags.length"
    v-slot="{ interaction, getPreviewState }"
    :items="ids"
    controlled
    handle-only
    keyboard-mode="preview"
    orientation="horizontal"
    label="태그 순서"
    class="ui-tags-input__sorter"
    @keydown="isolateReorderArrows"
    @update:items="reorder"
  >
    <UIReorderGroup
      layout="wrap"
      :interaction="interaction"
      :get-preview-state="getPreviewState"
      preview-item-class="ui-tags-input__chip"
      class="ui-tags-input__chips"
    >
      <UISequenceReorderItem v-for="tag in tags" :key="tag.id" :value="tag.id" class="ui-tags-input__chip">
        <UITagChip :index="tag.index" :text="tag.text" :readonly="readonly" class="ui-tags-input__chip-content">
          <template #leading>
            <UISequenceReorderHandle :label="`${tag.text} 이동`" class="ui-tags-input__handle">
              <GripVertical aria-hidden="true" />
            </UISequenceReorderHandle>
          </template>
        </UITagChip>
      </UISequenceReorderItem>
      <template #preview-handle><GripVertical class="ui-tags-input__icon" /></template>
      <template #preview="{ id }">
        <span class="ui-tags-input__text">{{ textById.get(id) }}</span>
        <span class="ui-tags-input__delete-visual"><X class="ui-tags-input__icon" /></span>
      </template>
    </UIReorderGroup>
    <UIReorderFeedback :interaction="interaction" lift-class="ui-tags-input__chip">
      <template #lift-handle><GripVertical class="ui-tags-input__icon" /></template>
      <template #lift="{ id }">
        <span class="ui-tags-input__text">{{ textById.get(id) }}</span>
        <span class="ui-tags-input__delete-visual"><X class="ui-tags-input__icon" /></span>
      </template>
    </UIReorderFeedback>
  </UISequenceReorder>
  <TransitionGroup v-else-if="tags.length" tag="div" name="ui-tag" class="ui-tags-input__chips">
    <UITagChip
      v-for="tag in tags"
      :key="tag.id"
      :index="tag.index"
      :text="tag.text"
      :readonly="readonly"
      class="ui-tags-input__chip"
    />
  </TransitionGroup>
</template>
