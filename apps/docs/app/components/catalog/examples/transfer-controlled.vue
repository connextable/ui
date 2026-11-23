<script setup lang="ts">
import { UIButton, UIDataActions, UITransfer } from "@connextable/ui";

import { shallowRef } from "vue";

const nodes = shallowRef<readonly { id: string; parentID: string | null }[]>([
  { id: "available", parentID: null },
  { id: "chosen", parentID: null },
  { id: "이메일", parentID: "available" },
  { id: "메시지", parentID: "available" },
  { id: "모바일", parentID: "chosen" },
]);
const proposal = shallowRef<typeof nodes.value>();

function approve() {
  if (proposal.value) nodes.value = proposal.value;
  proposal.value = undefined;
}
</script>

<template>
  <div class="ui-field">
    <UITransfer
      controlled
      :nodes="nodes"
      source-id="available"
      target-id="chosen"
      source-label="사용 가능한 채널"
      target-label="선택한 채널"
      @update:nodes="proposal = $event"
    />
    <UIDataActions>
      <UIButton size="sm" :disabled="!proposal" @click="approve">이동 승인</UIButton>
    </UIDataActions>
  </div>
</template>
