<script setup lang="ts">
import { UIButton, UIFullscreen } from "@connextable/ui";
import { ref } from "vue";

const feedback = ref("");

async function toggle(active: boolean, enter: () => Promise<{ ok: boolean }>, exit: () => Promise<{ ok: boolean }>) {
  const result = await (active ? exit() : enter());
  feedback.value = result.ok ? "" : "전체 화면 상태를 바꿀 수 없습니다.";
}
</script>

<template>
  <UIFullscreen as-child v-slot="{ snapshot, enter, exit }">
    <section class="presentation" aria-label="발표 미리보기">
      <strong>11월 점검 결과</strong>
      <p>다음 정기 점검은 11월 16일입니다.</p>
      <UIButton size="sm" variant="outline" :disabled="!snapshot?.available" :loading="Boolean(snapshot?.pending)"
        @click="toggle(snapshot?.active ?? false, enter, exit)">
        {{ snapshot?.active ? '전체 화면 닫기' : '전체 화면으로 보기' }}
      </UIButton>
      <small role="status">{{ snapshot && !snapshot.available ? '현재 환경에서는 전체 화면을 사용할 수 없습니다.' : feedback }}</small>
    </section>
  </UIFullscreen>
</template>

<style scoped>
.presentation { padding: var(--ui-space-lg); color: var(--ui-color-text); background: var(--ui-color-surface); }
.presentation:fullscreen { display: grid; align-content: center; justify-items: center; }
.presentation small { display: block; margin-block-start: var(--ui-space-sm); }
</style>
