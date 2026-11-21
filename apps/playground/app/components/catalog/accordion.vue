<script setup lang="ts">
import {
  UIAccordion,
  UIAccordionContent,
  UIAccordionHeader,
  UIAccordionItem,
  UIAccordionTrigger,
} from "@connextable/ui";

const items = [
  { id: "general", title: "기본 설정", label: "기본 언어", value: "한국어" },
  { id: "deployments", title: "배포 설정", label: "배포 브랜치", value: "main" },
  { id: "retention", title: "보관 설정", label: "활동 기록 보관 기간", value: "90일" },
];
</script>

<template>
  <UIAccordion
    :items="items.map(({ id }) => id)"
    type="single"
    :collapsible="true"
  >
    <UIAccordionItem v-for="item in items" :key="item.id" :value="item.id">
      <UIAccordionHeader><UIAccordionTrigger>{{ item.title }}</UIAccordionTrigger></UIAccordionHeader>
      <UIAccordionContent>
        <dl class="settings-preview"><dt>{{ item.label }}</dt><dd>{{ item.value }}</dd></dl>
      </UIAccordionContent>
    </UIAccordionItem>
  </UIAccordion>
</template>

<style scoped>
.settings-preview {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--ui-space-sm);
  margin: 0;
  font-size: var(--ui-font-size-body-sm);
}

.settings-preview dd {
  margin: 0;
  color: var(--ui-color-text);
  font-weight: 550;
}
</style>
