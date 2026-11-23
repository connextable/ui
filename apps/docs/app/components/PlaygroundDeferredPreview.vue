<script setup lang="ts">
import { UIButton, UIInView, UISpinner } from "@connextable/ui";
import { ref, shallowRef, type Component } from "vue";

const props = defineProps<{ load: () => Promise<Component> }>();

const component = shallowRef<Component>();
const loading = ref(false);
const failed = ref(false);

async function loadPreview() {
  loading.value = true;
  try {
    component.value = await props.load();
  } catch {
    failed.value = true;
  } finally {
    loading.value = false;
  }
}

function reloadPage() {
  window.location.reload();
}
</script>

<template>
  <UIInView class="playground-deferred-preview" :aria-busy="loading || undefined" once fallback root-margin="160px 0px" @enter="loadPreview">
    <component :is="component" v-if="component" />
    <div v-else-if="loading" class="playground-deferred-preview__status" role="status">
      <UISpinner />
      <span>예제를 불러오는 중</span>
    </div>
    <div v-else-if="failed" class="playground-deferred-preview__status">
      <span role="status">예제를 불러오지 못했습니다.</span>
      <UIButton variant="outline" size="sm" @click="reloadPage">페이지 새로고침</UIButton>
    </div>
  </UIInView>
</template>

<style scoped>
.playground-deferred-preview {
  min-block-size: var(--ui-chart-plot-height, 17rem);
  min-inline-size: 0;
}

.playground-deferred-preview__status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  min-block-size: inherit;
  gap: var(--ui-space-sm);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}
</style>
