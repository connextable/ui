<script setup lang="ts">
import { UIButton, useUIFileUploadGroup, type UIFileUploadAdapter } from "@connextable/ui";
import { shallowRef } from "vue";

const entries = shallowRef<readonly { id: string; file: File }[]>([]);

function prepare() {
  entries.value = ["notes.txt", "guide.txt", "checklist.txt"].map((name) => ({
    id: name,
    file: new File(["로컬 예제"], name, { type: "text/plain" }),
  }));
}

const adapter: UIFileUploadAdapter<File, string> = ({ file }) => {
  let timer: ReturnType<typeof setTimeout>;
  const result = new Promise<string>((resolve) => {
    timer = setTimeout(() => resolve(file.name), 850);
  });
  return { result, dispose: () => clearTimeout(timer) };
};

const { ready, snapshot, start } = useUIFileUploadGroup({
  items: entries,
  adapter,
  concurrency: 1,
});
</script>

<template>
  <div class="example">
    <UIButton v-if="entries.length === 0" @click="prepare">파일 세 개 준비</UIButton>
    <UIButton v-else :disabled="!ready || !!snapshot?.state.counts.uploading || snapshot?.state.counts.succeeded === entries.length" @click="start()">
      차례로 전송
    </UIButton>
    <output v-if="entries.length">{{ snapshot?.state.counts.succeeded ?? 0 }} / {{ entries.length }} 완료</output>
  </div>
</template>

<style scoped>
.example {
  display: grid;
  gap: var(--ui-space-sm);
}
</style>
