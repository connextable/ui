<script setup lang="ts">
import { UIListbox, UIListboxItem, UIListboxItemIndicator, UIListboxItemText } from "@connextable/ui";
import { Check } from "@lucide/vue";
import { ref } from "vue";

const channels = ["이메일", "문자", "푸시"];
const selected = ref<string | readonly string[]>([]);
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div>
      <UIListbox v-model="selected" :items="channels" selection-mode="multiple" aria-label="알림 수단" clearable>
        <UIListboxItem v-for="channel in channels" :key="channel" :value="channel">
          <UIListboxItemText>{{ channel }}</UIListboxItemText>
          <UIListboxItemIndicator><Check aria-hidden="true" /></UIListboxItemIndicator>
        </UIListboxItem>
      </UIListbox>
    </div>
    <template #footer>
      <output>선택 {{ (typeof selected === "string" ? selected : selected.join(", ")) || "없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
