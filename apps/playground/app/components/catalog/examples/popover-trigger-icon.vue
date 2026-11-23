<script setup lang="ts">
import { UIPopover } from "@connextable/ui";
import { Truck } from "@lucide/vue";

</script>

<template>
  <UIPopover
    trigger-label="배송 일정 보기"
    :trigger-icon="Truck"
    title="배송 일정"
    description="평일 오후 2시 전에 접수한 주문은 당일에 출고합니다."
  />
</template>
