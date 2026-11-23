<script setup lang="ts">
import {
  UIButton, UIContextMenu, UIContextMenuContent, UIContextMenuItem,
  UIContextMenuSeparator, UIContextMenuTrigger,
} from "@connextable/ui";
import { Archive, Mail, MailOpen, Star } from "@lucide/vue";
import { ref } from "vue";

const commands = [
  { id: "read", parentID: null },
  { id: "star", parentID: null },
  { id: "archive", parentID: null },
];
const read = ref(false);
const starred = ref(false);
const archived = ref(false);

function invoke(command: string) {
  if (command === "read") read.value = !read.value;
  if (command === "star") starred.value = !starred.value;
  if (command === "archive") archived.value = true;
}
</script>

<template>
  <div class="inbox-example">
    <UIContextMenu v-if="!archived" :items="commands" label="받은 메일 작업" @invoke="invoke">
      <UIContextMenuTrigger as="div" tabindex="0" class="inbox-example__message">
        <component :is="read ? MailOpen : Mail" aria-hidden="true" />
        <span>
          <b>디자인 검토 요청</b>
          <small>제품팀 ({{ read ? "읽음" : "읽지 않음" }})</small>
        </span>
        <Star v-if="starred" fill="currentColor" aria-label="중요 표시됨" role="img" />
      </UIContextMenuTrigger>
      <UIContextMenuContent>
        <UIContextMenuItem value="read" :icon="read ? Mail : MailOpen">{{ read ? "읽지 않음으로 표시" : "읽음으로 표시" }}</UIContextMenuItem>
        <UIContextMenuItem value="star">
          <template #leading><Star :fill="starred ? 'currentColor' : 'none'" /></template>
          {{ starred ? "중요 표시 해제" : "중요 표시" }}
        </UIContextMenuItem>
        <UIContextMenuSeparator />
        <UIContextMenuItem value="archive" :icon="Archive">보관처리</UIContextMenuItem>
      </UIContextMenuContent>
    </UIContextMenu>
    <template v-else>
      <span role="status">받은편지함이 비었습니다.</span>
      <UIButton variant="outline" size="sm" @click="archived = false">받은편지함으로 복원</UIButton>
    </template>
  </div>
</template>

<style scoped>
.inbox-example {
  display: grid;
  justify-items: start;
  gap: var(--ui-space-sm);
  inline-size: min(100%, 22rem);
}

.inbox-example__message {
  display: flex;
  align-items: center;
  gap: var(--ui-space-sm);
  inline-size: 100%;
  padding: var(--ui-space-sm) var(--ui-space-md);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-sm);
  background: var(--ui-color-surface);
}

.inbox-example__message span {
  flex: 1;
}

.inbox-example__message small {
  display: block;
  color: var(--ui-color-text-muted);
}
</style>
