<script setup lang="ts">
import { Check, X } from "@lucide/vue";
import { UITagsInput, UITagsInputClear, UITagsInputInput, UITagsInputItem, UITagsInputItemDelete, UITagsInputItemText } from "@connextable/ui";
import { ref } from "vue";

const tags = ref<readonly string[]>(['승인', '검토']);
</script>

<template>
  <UITagsInput v-model="tags" label="워크플로 태그" size="sm" variant="soft" v-slot="{ value }">
    <UITagsInputItem v-for="(tag, index) in value" :key="tag" :index="index">
      <Check v-if="tag === '승인'" :size="14" aria-hidden="true" />
      <UITagsInputItemText />
      <UITagsInputItemDelete :aria-label="`${tag} 삭제`"><X aria-hidden="true" /></UITagsInputItemDelete>
    </UITagsInputItem>
    <UITagsInputInput placeholder="상태 추가" />
    <UITagsInputClear />
  </UITagsInput>
</template>
