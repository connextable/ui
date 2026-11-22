<script setup lang="ts">
import { UIDataGrid } from "@connextable/ui";

const columns = [
  { id: "task", label: "작업" },
  { id: "owner", label: "담당자" },
  { id: "status", label: "상태" },
];
const tasks = [
  { id: "1", cells: { task: "시안 검토", owner: "민지", status: "완료" } },
  { id: "2", cells: { task: "접근성 검사", owner: "서준", status: "진행 중" } },
  { id: "3", cells: { task: "모바일 확인", owner: "다현", status: "대기" } },
];
</script>

<template>
  <UIDataGrid :columns="columns" :rows="tasks" label="작업 상태" />
</template>
