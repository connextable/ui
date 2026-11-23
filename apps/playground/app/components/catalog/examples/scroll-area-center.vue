<script setup lang="ts">
import { UIButton, UIScrollArea } from "@connextable/ui";
import { ref, useTemplateRef } from "vue";

const selected = ref(12);
const rows = useTemplateRef<HTMLElement[]>("row");
</script>

<template>
  <UIScrollArea label="월별 점검 목록" style="--ui-scroll-area-max-height: 12rem">
    <template #default="{ scrollToElement }">
      <ol>
        <li v-for="month in 12" :key="month" ref="row">
          <UIButton size="sm" :variant="month === selected ? 'soft' : 'ghost'" :aria-pressed="month === selected"
            @click="selected = month; scrollToElement(rows?.[month - 1] ?? null, { axis: 'vertical', align: 'center' })">
            {{ month }}월 점검
          </UIButton>
        </li>
      </ol>
    </template>
    <template #controls="{ scrollToElement }">
      <UIButton size="sm" variant="outline"
        @click="scrollToElement(rows?.[selected - 1] ?? null, { axis: 'vertical', align: 'center' })">선택한 달로 이동</UIButton>
    </template>
  </UIScrollArea>
</template>
