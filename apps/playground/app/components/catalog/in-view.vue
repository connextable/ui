<script setup lang="ts">
import { UIInView } from "@connextable/ui";
import { useTemplateRef } from "vue";

const viewport = useTemplateRef<HTMLElement>("viewport");
</script>

<template>
  <div ref="viewport" class="inspection-log" role="region" aria-label="점검 기록" tabindex="0">
    <ol>
      <li v-for="day in 8" :key="day">11월 {{ day }}일 점검 완료</li>
      <UIInView :root="viewport" :threshold="0.5" once fallback as-child v-slot="{ hasEntered }">
        <li>
          <strong>11월 9일 첨부 기록</strong>
          <p v-if="hasEntered">공용 장비 3대를 확인했습니다. 다음 점검은 11월 16일입니다.</p>
          <p v-else>스크롤하여 첨부 기록을 확인하세요.</p>
        </li>
      </UIInView>
    </ol>
  </div>
</template>

<style scoped>
.inspection-log { max-block-size: 11rem; overflow: auto; inline-size: min(100%, 24rem); }
.inspection-log li { padding-block: var(--ui-space-sm); }
</style>
