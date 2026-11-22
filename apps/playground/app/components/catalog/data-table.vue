<script setup lang="ts">
import { UIDataTable, type UIDataColumn } from "@connextable/ui";

const columns: readonly UIDataColumn[] = [
  { id: "name", label: "이름" },
  { id: "team", label: "팀" },
  { id: "status", label: "상태" },
  { id: "memberSince", label: "합류일", align: "end" },
];
const members = [
  { id: "1", cells: { name: "김민지", team: "제품 디자인", status: "활성", memberSince: "2024. 03." } },
  { id: "2", cells: { name: "이서준", team: "플랫폼", status: "활성", memberSince: "2024. 11." } },
  { id: "3", cells: { name: "박다현", team: "제품 디자인", status: "초대 대기", memberSince: "—" } },
  { id: "4", cells: { name: "정지우", team: "운영", status: "활성", memberSince: "2025. 09." } },
];
</script>

<template>
  <UIDataTable :columns="columns" :rows="members" label="팀 구성원" />
</template>
