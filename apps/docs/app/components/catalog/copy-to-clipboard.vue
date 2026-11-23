<script setup lang="ts">
import { UICopyToClipboard, UIIconButton } from "@connextable/ui";
import { Check, Copy } from "@lucide/vue";

const orderNumber = "ORD-2026-0148";
</script>

<template>
  <UICopyToClipboard :value="orderNumber" v-slot="{ copy, pending, copied, status }">
    <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
      <div class="ui-data-actions">
        <code>{{ orderNumber }}</code>
        <UIIconButton aria-label="주문번호 복사" variant="ghost" :loading="pending" @click="copy()">
          <Check v-if="copied" aria-hidden="true" />
          <Copy v-else aria-hidden="true" />
        </UIIconButton>
      </div>
      <template #footer>
        <output>
          {{ copied ? "주문번호를 복사했습니다." : status === "failed" ? "복사 실패 · 번호를 직접 복사해 주세요." : "복사 대기 중" }}
        </output>
      </template>
    </PlaygroundExample>
  </UICopyToClipboard>
</template>
