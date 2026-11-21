<script setup lang="ts">
import { UITagsInput } from "@connextable/ui";
</script>

<template>
  <UITagsInput :default-value="['기획', '디자인', '개발']" label="선택한 필터" placeholder="필터 추가" clearable />
</template>
