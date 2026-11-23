<script setup lang="ts">
import {
  UIButton, UIContextMenu, UIInput,
} from "@connextable/ui";
import { nextTick, ref, useId } from "vue";

const initialFiles = [
  { id: 1, name: "배포 체크리스트.md", size: "4 KB" },
  { id: 2, name: "업데이트 안내.txt", size: "12 KB" },
];
const commands = [
  { id: "rename", parentID: null, label: "이름 변경" },
  { id: "duplicate", parentID: null, label: "복제" },
  { id: "delete", parentID: null, label: "삭제", tone: "danger", separatorBefore: true },
] as const;
const files = ref([...initialFiles]);
const nameInputID = useId();
const editing = ref<number>();
const draft = ref("");
const status = ref("");
let nextID = 3;

function invoke(command: string, file: typeof initialFiles[number]) {
  if (command === "rename") {
    editing.value = file.id;
    draft.value = file.name;
    void nextTick(() => document.getElementById(nameInputID)?.focus());
  } else if (command === "duplicate") {
    const extension = file.name.lastIndexOf(".");
    const name = extension > 0
      ? `${file.name.slice(0, extension)} 사본${file.name.slice(extension)}`
      : `${file.name} 사본`;
    files.value.push({ ...file, id: nextID++, name });
    status.value = `${name}을 추가했습니다.`;
  } else if (command === "delete") {
    files.value = files.value.filter(entry => entry.id !== file.id);
    if (editing.value === file.id) editing.value = undefined;
    status.value = `${file.name}을 제거했습니다.`;
  }
}

function rename() {
  const name = draft.value.trim();
  if (!name) return;
  files.value = files.value.map(file => file.id === editing.value ? { ...file, name } : file);
  editing.value = undefined;
  status.value = `${name}으로 변경했습니다.`;
}
</script>

<template>
  <div class="file-example">
    <ul class="file-example__list" aria-label="예제 파일">
      <li v-for="file in files" :key="file.id">
        <UIContextMenu :items="commands" :label="`${file.name} 작업`" @invoke="invoke($event, file)">
          <template #trigger>
            <div tabindex="0" aria-keyshortcuts="Shift+F10" class="file-example__row">
              <span>{{ file.name }}</span>
              <small>{{ file.size }}</small>
            </div>
          </template>
        </UIContextMenu>
      </li>
    </ul>
    <form v-if="editing !== undefined" class="file-example__actions" @submit.prevent="rename" @keydown.esc="editing = undefined">
      <UIInput :id="nameInputID" v-model="draft" aria-label="새 파일 이름" />
      <UIButton type="submit" size="sm" :disabled="!draft.trim()">저장</UIButton>
      <UIButton type="button" size="sm" variant="ghost" @click="editing = undefined">취소</UIButton>
    </form>
    <UIButton v-if="!files.length" size="sm" variant="outline" @click="files = [...initialFiles]; status = ''">예제 파일 복원</UIButton>
    <small v-if="status" role="status">{{ status }}</small>
  </div>
</template>

<style scoped>
.file-example {
  display: grid;
  gap: var(--ui-space-sm);
  inline-size: min(100%, 24rem);
  min-inline-size: 0;
}

.file-example__list {
  display: grid;
  gap: var(--ui-space-2xs);
  margin: 0;
  padding: 0;
  list-style: none;
}

.file-example__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  justify-items: start;
  gap: var(--ui-space-sm);
  padding: var(--ui-space-sm) var(--ui-space-md);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-sm);
  background: var(--ui-color-surface);
}

.file-example__row:hover {
  background: var(--ui-color-surface-hover);
}

.file-example__row span {
  min-inline-size: 0;
  overflow-wrap: anywhere;
}

.file-example small {
  color: var(--ui-color-text-muted);
}

.file-example__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ui-space-xs);
}
</style>
