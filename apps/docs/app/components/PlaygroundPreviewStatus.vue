<script setup lang="ts">
defineProps<{ loading: boolean; failed: boolean; tall?: boolean }>();
defineEmits<{ retry: [] }>();
</script>

<template>
  <div class="playground-preview-status" :class="{ 'playground-preview-status--tall': tall }">
    <template v-if="loading">
      <UISpinner aria-hidden="true" />
      <span role="status">예제를 불러오는 중입니다.</span>
    </template>
    <template v-else-if="failed">
      <span role="status">예제를 불러오지 못했습니다.</span>
      <UIButton variant="outline" size="sm" @click="$emit('retry')">다시 시도</UIButton>
    </template>
  </div>
</template>

<style scoped>
.playground-preview-status {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--ui-space-sm);
  min-block-size: 3rem;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}

.playground-preview-status--tall {
  min-block-size: var(--ui-chart-plot-height, 17rem);
}
</style>
