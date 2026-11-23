<script setup lang="ts">
import { UICheckboxTree, UICheckboxTreeDisclosure, UICheckboxTreeGroup, UICheckboxTreeIndicator, UICheckboxTreeItem } from "@connextable/ui";
import { ChevronRight } from "@lucide/vue";
import { ref } from "vue";

const nodes = [
  { id: "notifications", parentID: null },
  { id: "email", parentID: "notifications" },
  { id: "mobile", parentID: "notifications" },
] as const;

const selected = ref<readonly string[]>(['email']);
</script>

<template>
  <UICheckboxTree v-model="selected" :nodes="nodes" :default-expanded-values="['notifications']" label="알림 채널">
    <UICheckboxTreeItem value="notifications">
      <UICheckboxTreeDisclosure for="notifications" as="button" aria-label="알림 채널 펼치기">
        <ChevronRight />
      </UICheckboxTreeDisclosure>
      <UICheckboxTreeIndicator />
      알림 채널
    </UICheckboxTreeItem>
    <UICheckboxTreeGroup for="notifications">
      <UICheckboxTreeItem value="email">
        <UICheckboxTreeIndicator /> 이메일
      </UICheckboxTreeItem>
      <UICheckboxTreeItem value="mobile">
        <UICheckboxTreeIndicator /> 모바일
      </UICheckboxTreeItem>
    </UICheckboxTreeGroup>
  </UICheckboxTree>
</template>
