<script setup lang="ts">
import {
  UIButton,
  UIStepper,
  UIStepperContent,
  UIStepperIndicator,
  UIStepperList,
  UIStepperNext,
  UIStepperPrevious,
  UIStepperStep,
} from "@connextable/ui";

import { ref } from 'vue'

const steps = [
  { id: 'account', label: '계정', detail: '주문 연락처를 확인합니다.' },
  { id: 'delivery', label: '배송', detail: '배송 주소와 수령 방법을 확인합니다.' },
  { id: 'payment', label: '결제', detail: '결제 방법을 선택합니다.' },
  { id: 'review', label: '확인', detail: '주문 내용을 확인합니다.' },
]
const stepIDs = steps.map(({ id }) => id)
const current = ref('delivery')
const stepLabel = (id: string) => steps.find(step => step.id === id)?.label ?? id

</script>

<template>
  <UIStepper v-model="current" :items="stepIDs">
    <UIStepperList>
      <UIStepperStep v-for="step in steps" :key="step.id" :value="step.id">
        <UIStepperIndicator />
        {{ step.label }}
      </UIStepperStep>
    </UIStepperList>
    <UIStepperContent v-for="step in steps" :key="step.id" :value="step.id">
      <strong>{{ step.label }}</strong>
      <p>{{ step.detail }}</p>
      <UIStepperPrevious as-child><UIButton size="sm" variant="ghost">이전</UIButton></UIStepperPrevious>
      <UIStepperNext v-slot="{ targetValue }" as-child>
        <UIButton size="sm">{{ targetValue === null ? '마지막 단계' : stepLabel(targetValue) + ' 단계로' }}</UIButton>
      </UIStepperNext>
    </UIStepperContent>
  </UIStepper>
</template>
