<script setup lang="ts">
import { UIButton, UIStepper, UIStepperContent, UIStepperList, UIStepperStep } from "@connextable/ui";
import { ref } from "vue";

const steps = ["설정", "미리보기"];
const current = ref("설정");
</script>

<template>
  <div>
    <UIButton size="sm" variant="outline" @click="current = '미리보기'">미리보기로 이동</UIButton>
    <UIStepper v-model="current" :items="steps">
      <UIStepperList>
        <UIStepperStep v-for="step in steps" :key="step" :value="step">{{ step }}</UIStepperStep>
      </UIStepperList>
      <UIStepperContent value="설정">기본값을 편집합니다.</UIStepperContent>
      <UIStepperContent value="미리보기">편집 결과를 확인합니다.</UIStepperContent>
    </UIStepper>
  </div>
</template>
