<script setup lang="ts">
import { ClipboardCheck, CreditCard, Truck, UserRound } from "@lucide/vue";
import { UIStepper } from "@connextable/ui";
import { ref } from "vue";

const steps = [
  { value: "account", label: "계정", description: "주문 연락처를 확인합니다.", icon: UserRound },
  { value: "delivery", label: "배송", description: "배송 주소와 수령 방법을 확인합니다.", icon: Truck },
  { value: "payment", label: "결제", description: "결제 방법을 선택합니다.", icon: CreditCard },
  { value: "review", label: "확인", description: "주문 내용을 확인합니다.", icon: ClipboardCheck },
];
const current = ref("delivery");
</script>

<template>
  <UIStepper v-model="current" :items="steps" label="주문 진행" />
</template>
