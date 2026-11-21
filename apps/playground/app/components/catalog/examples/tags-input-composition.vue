<script setup lang="ts">
import { Check, X } from "@lucide/vue";
import { UITagsInput, UITagsInputInput, UITagsInputItem, UITagsInputItemDelete, UITagsInputItemText } from "@connextable/ui";
</script>

<template>
  <UITagsInput :default-value="['승인', '검토']" label="워크플로 태그" size="sm" variant="soft" v-slot="{ value }">
    <UITagsInputItem v-for="(tag, index) in value" :key="tag" :index="index">
      <Check v-if="tag === '승인'" :size="14" aria-hidden="true" />
      <UITagsInputItemText />
      <UITagsInputItemDelete :aria-label="`${tag} 삭제`"><X aria-hidden="true" /></UITagsInputItemDelete>
    </UITagsInputItem>
    <UITagsInputInput placeholder="상태 추가" />
  </UITagsInput>
</template>
