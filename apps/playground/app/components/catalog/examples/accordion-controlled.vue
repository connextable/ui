<script setup lang="ts">
import {
  UIButton,
  UIAccordion,
  UIAccordionContent,
  UIAccordionHeader,
  UIAccordionItem,
  UIAccordionTrigger,
} from "@connextable/ui";

import { ref } from "vue";

const open = ref<string | readonly string[]>("general");
const items = [
  { id: "general", title: "기본 설정", description: "프로젝트 이름과 기본 언어를 관리합니다." },
  { id: "deployments", title: "배포 설정", description: "기본 브랜치와 검토 후 배포 규칙을 설정합니다." },
  { id: "danger", title: "프로젝트 삭제", description: "프로젝트와 연결된 배포 기록을 삭제합니다." },
];
</script>

<template>
  <div class="ui-field-layout">
    <UIButton size="sm" @click="open = 'deployments'">배포 설정 열기</UIButton>
    <UIAccordion v-model="open"
      :items="items.map(({ id }) => id)"
      type="single"
      :collapsible="true"
    >
      <UIAccordionItem v-for="item in items" :key="item.id" :value="item.id">
        <UIAccordionHeader><UIAccordionTrigger>{{ item.title }}</UIAccordionTrigger></UIAccordionHeader>
        <UIAccordionContent>{{ item.description }}</UIAccordionContent>
      </UIAccordionItem>
    </UIAccordion>
  </div>
</template>
