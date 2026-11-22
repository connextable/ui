<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import source from "./ButtonFullWidthExample.vue?example-code&raw";
</script>

<template>
  <PlaygroundExample
    id="button-full-width"
    title="좁은 화면에서 너비 채우기"
    description="푸터의 주요 버튼이 한 줄을 채우게 하려면 class로 inline-size를 지정합니다."
    :source="source"
    :heading-level="3"
    wide
  >
    <UIButton class="checkout-button">결제 단계로 이동</UIButton>
  </PlaygroundExample>
</template>

<style scoped>
.checkout-button {
  inline-size: 100%;
}
</style>
