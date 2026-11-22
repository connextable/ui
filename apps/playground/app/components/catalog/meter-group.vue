<script setup lang="ts">
import { UIMeterGroup } from "@connextable/ui";

const items = [
  { id: "documents", label: "문서", value: 42 },
  { id: "media", label: "미디어", value: 31 },
  { id: "archives", label: "보관 파일", value: 7 },
];
</script>

<template>
  <UIMeterGroup
    :items="items"
    :max="100"
    label="팀 저장 공간"
    :format-value="value => `${value} GB`"
    :format-total="(total, max) => `${total} / ${max} GB`"
  />
</template>
