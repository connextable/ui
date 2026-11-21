<script setup lang="ts">
import { UIAccordion, UIAccordionContent, UIAccordionHeader, UIAccordionItem, UIAccordionTrigger } from "@connextable/ui";

const questions = [
  { value: "delivery", title: "배송", text: "출고 후 영업일 기준 1~2일 소요됩니다." },
  { value: "returns", title: "반품", text: "미개봉 상품은 수령 후 7일 이내 반품할 수 있습니다." },
];
</script>

<template>
  <UIAccordion :items="questions.map(({ value }) => value)" type="multiple">
    <UIAccordionItem v-for="question in questions" :key="question.value" :value="question.value">
      <UIAccordionHeader><UIAccordionTrigger>{{ question.title }}</UIAccordionTrigger></UIAccordionHeader>
      <UIAccordionContent>{{ question.text }}</UIAccordionContent>
    </UIAccordionItem>
  </UIAccordion>
</template>
