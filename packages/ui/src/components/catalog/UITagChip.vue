<script setup lang="ts">
import { X } from "@lucide/vue";
import { TagsInputItem, TagsInputItemDelete, TagsInputItemText } from "@sectile/vue/tags-input";

defineProps<{ index: number; text: string; readonly: boolean }>();
</script>

<template>
  <TagsInputItem :index="index">
    <slot name="leading" />
    <TagsInputItemText class="ui-tags-input__text" />
    <TagsInputItemDelete v-if="!readonly" :aria-label="`${text} 삭제`">
      <X aria-hidden="true" />
    </TagsInputItemDelete>
  </TagsInputItem>
</template>
