<script setup lang="ts">
import { createUIAsyncAction, UIButton, UIInfiniteScroll, type UIInfiniteScrollRequest } from "@connextable/ui";
import { ref, useTemplateRef } from "vue";

const viewport = useTemplateRef<HTMLElement>("viewport");
const total = 36;
const shown = ref(8);
const failOnce = ref(true);

const loadMore = createUIAsyncAction(async ({ signal }: UIInfiniteScrollRequest) => {
  await new Promise(resolve => setTimeout(resolve, 350));
  signal.throwIfAborted();
  if (failOnce.value) {
    failOnce.value = false;
    throw new Error("기록을 불러오지 못했습니다.");
  }
  shown.value = Math.min(shown.value + 8, total);
});
</script>

<template>
  <UIInfiniteScroll :target="viewport" :has-more="shown < total" :load-more="loadMore"
    v-slot="{ loading, failure, loadMore: next, canLoadMore }">
    <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
      <div class="activity-log">
        <ol ref="viewport" tabindex="0" aria-label="활동 기록" :aria-busy="loading">
          <li v-for="item in shown" :key="item">검토 기록 {{ item }}번</li>
        </ol>
        <div class="ui-data-actions">
          <UIButton variant="outline" :loading="loading" :disabled="!canLoadMore" @click="next()">
            더 보기
          </UIButton>
        </div>
      </div>
      <template #footer>
        <output>{{ failure ? "불러오지 못했습니다. 다시 시도해 주세요." : `${shown} / ${total}건` }}</output>
      </template>
    </PlaygroundExample>
  </UIInfiniteScroll>
</template>

<style scoped>
.activity-log { inline-size: min(100%, 25rem); }
.activity-log ol { max-block-size: 10rem; overflow: auto; }
.activity-log li { padding-block: var(--ui-space-xs); }
</style>
