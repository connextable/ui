<script setup lang="ts">
import { createUITooltipGroup, UIButton, UITooltip, UITooltipContent, UITooltipTrigger } from "@connextable/ui";
import { Copy, Download, Link } from "@lucide/vue";

const group = createUITooltipGroup({ skipDelay: 300 });
const tools = [
  { label: "복사", icon: Copy, description: "선택한 텍스트를 복사합니다." },
  { label: "다운로드", icon: Download, description: "문서를 PDF로 저장합니다." },
  { label: "링크", icon: Link, description: "이 문서를 열 수 있는 링크입니다." },
];
</script>

<template>
  <div class="tool-row">
    <UITooltip v-for="tool in tools" :key="tool.label" :group="group" :open-delay="650" side="top">
      <UITooltipTrigger as-child>
        <UIButton variant="outline" icon-only :aria-label="tool.label">
          <template #leading><component :is="tool.icon" /></template>
        </UIButton>
      </UITooltipTrigger>
      <UITooltipContent>{{ tool.description }}</UITooltipContent>
    </UITooltip>
  </div>
</template>

<style scoped>
.tool-row {
  display: flex;
  gap: var(--ui-space-xs);
}
</style>
