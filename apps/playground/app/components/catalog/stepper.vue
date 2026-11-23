<script setup lang="ts">
import { UIStepper } from "@connextable/ui";
import { ref } from "vue";

const steps = [
  { value: "account", label: "계정", description: "주문 연락처를 확인합니다." },
  { value: "delivery", label: "배송", description: "배송 주소와 수령 방법을 확인합니다." },
  { value: "payment", label: "결제", description: "결제 방법을 선택합니다." },
  { value: "review", label: "확인", description: "주문 내용을 확인합니다." },
];
const current = ref("delivery");
</script>

<template>
  <UIStepper v-model="current" :items="steps" label="주문 진행" />
</template>
