<script setup lang="ts">
import { UITreeSelect, UITreeSelectContent, UITreeSelectGroup, UITreeSelectInput, UITreeSelectItem } from "@connextable/ui";

const nodes = [
  { id: "design", parentID: null },
  { id: "ui", parentID: "design" },
  { id: "development", parentID: null },
  { id: "web", parentID: "development" },
] as const;
</script>

<template>
  <UITreeSelect :nodes="nodes" :disabled-items="['design', 'ui']" :default-expanded-values="['development']">
    <UITreeSelectInput aria-label="이동할 팀 선택" placeholder="이동할 팀" />
    <UITreeSelectContent>
      <UITreeSelectItem value="design">디자인 (잠김)</UITreeSelectItem>
      <UITreeSelectGroup for="design"><UITreeSelectItem value="ui">화면</UITreeSelectItem></UITreeSelectGroup>
      <UITreeSelectItem value="development">개발</UITreeSelectItem>
      <UITreeSelectGroup for="development"><UITreeSelectItem value="web">웹</UITreeSelectItem></UITreeSelectGroup>
    </UITreeSelectContent>
  </UITreeSelect>
</template>
