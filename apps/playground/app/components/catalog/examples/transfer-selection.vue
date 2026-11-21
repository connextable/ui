<script setup lang="ts">
import { UIDataActions, UITransfer } from "@connextable/ui";

import { ref } from "vue";

const nodes = [
  { id: "available", parentID: null },
  { id: "chosen", parentID: null },
  { id: "이메일", parentID: "available" },
  { id: "메시지", parentID: "available" },
  { id: "웹 푸시", parentID: "available" },
  { id: "모바일", parentID: "chosen" },
] as const;
const sourceValue = ref<readonly (typeof nodes)[number]["id"][]>([]);
</script>

<template>
  <div class="ui-field">
    <UITransfer
      v-model:source-value="sourceValue"
      :nodes="nodes"
      source-id="available"
      target-id="chosen"
      source-label="사용 가능한 채널"
      target-label="선택한 채널"
    />
    <UIDataActions>
      <output>{{ sourceValue.length ? `이동할 채널 ${sourceValue.join(", ")}` : "선택한 이동 항목 없음" }}</output>
    </UIDataActions>
  </div>
</template>
