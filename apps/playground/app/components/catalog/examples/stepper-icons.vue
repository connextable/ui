<script setup lang="ts">
import { UIStepper } from "@connextable/ui";
import { CreditCard, Truck } from "@lucide/vue";
import { ref } from "vue";

const steps = [
  { value: "delivery", label: "배송", description: "배송지를 확인합니다.", icon: Truck },
  { value: "payment", label: "결제", description: "결제 수단을 고릅니다.", icon: CreditCard },
];
const current = ref("delivery");
</script>

<template>
  <UIStepper v-model="current" :items="steps" label="주문 진행" />
</template>
