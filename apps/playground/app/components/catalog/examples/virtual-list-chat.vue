<script setup lang="ts">
import { nextTick, ref, shallowRef, useTemplateRef } from "vue";
import { ArrowDown, MessageSquare } from "@lucide/vue";
import { UIButton, UIDataLabel, UIDataSurface, UIVirtualList } from "@connextable/ui";

const replies = ["요청을 접수했습니다.", "첨부 파일을 확인했습니다.", "담당 팀에 전달했습니다.", "수정한 문서를 올렸습니다."];
const messages = shallowRef(Array.from({ length: 120 }, (_, index) => index + 1));
const list = useTemplateRef("list");
const atLatest = ref(false);
const unread = ref(0);

function showLatest() {
  list.value?.scrollToID(messages.value.length, "end");
}

async function receive() {
  const follow = atLatest.value;
  messages.value = [...messages.value, messages.value.length + 1];
  if (!follow) {
    unread.value++;
    return;
  }
  await nextTick();
  showLatest();
}
</script>

<template>
  <UIDataSurface>
    <template #toolbar>
      <strong>지원 대화</strong>
      <UIButton size="sm" variant="outline" @click="receive">가상 메시지 받기</UIButton>
    </template>
    <UIVirtualList ref="list" :items="messages" :get-i-d="id => id" :size-policy="{ kind: 'fixed', extent: 58 }"
      aria-label="지원 대화 메시지"
      @plan-change="plan => {
        atLatest = plan.placements.findLast(item => item.visible)?.id === messages.length;
        if (atLatest) unread = 0;
      }">
      <template #item="{ value }">
        <UIDataLabel :label="replies[(value - 1) % replies.length]!" :detail="`메시지 #${value}`">
          <template #icon><MessageSquare :size="15" aria-hidden="true" /></template>
        </UIDataLabel>
      </template>
    </UIVirtualList>
    <template #footer>
      <output aria-live="polite">{{ unread ? `새 메시지 ${unread}개` : atLatest ? '최신 메시지를 보고 있음' : '이전 메시지를 보고 있음' }}</output>
      <UIButton size="sm" variant="ghost" @click="showLatest">
        <template #leading><ArrowDown :size="16" /></template>최신 메시지
      </UIButton>
    </template>
  </UIDataSurface>
</template>
