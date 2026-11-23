<script setup lang="ts">
import { UIAlertDialog, UIButton, UIConfirmProvider, type UIConfirmOptions } from "@connextable/ui";
import { ref } from "vue";

const rows = ref(["8월 정산 초안", "9월 정산 초안"]);

async function remove(row: string, confirm: (options: UIConfirmOptions) => Promise<boolean>, event: MouseEvent) {
  const trigger = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
  if (await confirm({ title: "초안을 삭제할까요?", description: `${row} 항목이 목록에서 사라집니다.`, trigger })) {
    rows.value = rows.value.filter(item => item !== row);
  }
}
</script>

<template>
  <UIConfirmProvider>
    <template #default="{ confirm }">
      <ul v-if="rows.length">
        <li v-for="row in rows" :key="row" class="ui-data-actions">
          {{ row }}
          <UIButton size="sm" variant="outline" :aria-label="`${row} 삭제`" @click="remove(row, confirm, $event)">삭제</UIButton>
        </li>
      </ul>
      <p v-else role="status">남은 초안이 없습니다.</p>
    </template>
    <template #dialog="{ open, request, accept, cancel }">
      <UIAlertDialog :open="open" :title="request.title" :description="request.description"
        :restore-focus-target="request.trigger" @update:open="!$event && cancel()">
        <template #actions>
          <UIButton variant="outline" @click="cancel()">취소</UIButton>
          <UIButton @click="accept()">삭제 확정</UIButton>
        </template>
      </UIAlertDialog>
    </template>
  </UIConfirmProvider>
</template>
