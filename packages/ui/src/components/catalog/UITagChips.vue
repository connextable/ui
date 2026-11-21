<script setup lang="ts">
import { GripVertical, X } from "@lucide/vue";
import { SequenceReorderHandle, SequenceReorderItem, SequenceReorderRoot } from "@sectile/vue/reorder";
import { TagsInputItem, TagsInputItemDelete, TagsInputItemText } from "@sectile/vue/tags-input";
import { computed } from "vue";

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

function reorder(order: readonly string[]) {
  const byId = new Map(tags.value.map(({ id, text }) => [id, text]));
  const next = order.map((id) => byId.get(id));
  if (next.every((tag) => tag !== undefined)) emit("reorder", next);
}
</script>

<template>
  <component
    :is="reorderable ? SequenceReorderRoot : 'div'"
    v-if="tags.length"
    v-bind="reorderable ? { items: ids, controlled: true, handleOnly: true, orientation: 'horizontal', label: '태그 순서', 'onUpdate:items': reorder } : {}"
    class="ui-tags-input__chips"
  >
    <TransitionGroup name="ui-tag">
      <component
        :is="reorderable ? SequenceReorderItem : 'span'"
        v-for="tag in tags"
        :key="tag.id"
        v-bind="reorderable ? { value: tag.id, as: 'span' } : {}"
        class="ui-tags-input__chip"
      >
        <TagsInputItem :index="tag.index">
          <SequenceReorderHandle v-if="reorderable" :label="`${tag.text} 이동`" class="ui-tags-input__handle">
            <GripVertical aria-hidden="true" />
          </SequenceReorderHandle>
          <TagsInputItemText />
          <TagsInputItemDelete v-if="!readonly" :aria-label="`${tag.text} 삭제`">
            <X aria-hidden="true" />
          </TagsInputItemDelete>
        </TagsInputItem>
      </component>
    </TransitionGroup>
  </component>
</template>
