<script setup lang="ts">
import { UIButton, UICopyToClipboard } from "@connextable/ui";

const orderNumber = "ORD-2026-0148";
</script>

<template>
  <UICopyToClipboard :value="orderNumber" v-slot="{ copy, pending, copied, status }">
    <div class="ui-data-actions">
      <code>{{ orderNumber }}</code>
      <UIButton variant="outline" :loading="pending" @click="copy()">주문번호 복사</UIButton>
      <span role="status">{{ copied ? "복사됨" : status === "failed" ? "주문번호를 선택해 직접 복사해 주세요." : "" }}</span>
    </div>
  </UICopyToClipboard>
</template>
