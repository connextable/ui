<script setup lang="ts">
import { UIButton, UIProgress, useUIFileUploadGroup, type UIFileUploadAdapter } from "@connextable/ui";
import { FileText } from "@lucide/vue";
import { computed } from "vue";

const adapter: UIFileUploadAdapter<File, string> = ({ file, reportProgress }) => {
  let timer: ReturnType<typeof setInterval>;
  let step = 0;
  const result = new Promise<string>(resolve => {
    timer = setInterval(() => {
      step++;
      reportProgress({ loaded: Math.floor(file.size * step / 20), total: file.size });
      if (step < 20) return;
      clearInterval(timer);
      resolve(file.name);
    }, 80);
  });
  return { result, dispose: () => clearInterval(timer) };
};

const entries = ["요구사항.txt", "작업 안내.txt", "점검 목록.txt"].map(name => ({
  id: name,
  file: new File(["로컬 예제"], name, { type: "text/plain" }),
}));
const { ready, snapshot, start, reset, useItem } = useUIFileUploadGroup({
  items: entries,
  adapter,
  concurrency: 1,
});
const states = entries.map(({ id }) => ({ id, item: useItem(id) }));
const rows = computed(() => states.map(({ id, item }) => ({ id, state: item.value?.state })));
const completed = computed(() => snapshot.value?.state.counts.succeeded ?? 0);
const busy = computed(() => !!snapshot.value?.state.counts.uploading);
const labels = { queued: "대기", uploading: "전송 중", succeeded: "완료", failed: "실패", canceled: "취소됨" };
</script>

<template>
  <div class="queue">
    <ul aria-label="전송 대기열" class="queue__list">
      <li v-for="{ id, state } in rows" :key="id" class="ui-field-control queue__item" data-ui-control-size="md">
        <FileText :size="18" aria-hidden="true" />
        <span class="queue__name" :title="id">{{ id }}</span>
        <span class="queue__status" :data-status="state?.status">{{ labels[state?.status ?? 'queued'] }}</span>
        <UIProgress
          v-if="state?.status === 'uploading'"
          class="queue__progress"
          :value="state.total ? 100 * state.loaded / state.total : null"
          :label="`${id} 업로드 진행률`"
        />
      </li>
    </ul>
    <div class="queue__footer">
      <span role="status">{{ completed }} / {{ entries.length }} 완료</span>
      <UIButton size="sm" :disabled="!ready || busy" @click="completed === entries.length ? reset() : start()">
        {{ completed === entries.length ? '대기열 초기화' : '차례로 전송' }}
      </UIButton>
    </div>
  </div>
</template>

<style scoped>
.queue {
  display: grid;
  gap: var(--ui-space-sm);
  inline-size: 22rem;
  max-inline-size: 100%;
}

.queue__list {
  display: grid;
  gap: var(--ui-space-xs);
  margin: 0;
  padding: 0;
  list-style: none;
}

.queue__item {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: var(--ui-space-sm);
  align-items: center;
  padding-inline: var(--ui-space-sm);
}

.queue__item > svg,
.queue__status,
.queue__footer {
  color: var(--ui-color-text-muted);
}

.queue__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.queue__status,
.queue__footer {
  font-size: var(--ui-font-size-metadata);
}

.queue__status[data-status="uploading"],
.queue__status[data-status="succeeded"] {
  color: var(--ui-color-accent);
}

.queue__progress {
  --ui-progress-height: 2px;
  position: absolute;
  inset-inline: var(--ui-space-sm);
  inset-block-end: 2px;
}

.queue__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--ui-space-sm);
}
</style>
