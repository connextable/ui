<script setup lang="ts">
import { UITagsInput } from "@connextable/ui";

const policies = { allowDuplicate: false };
</script>

<template>
  <UITagsInput :default-value="['Vue']" :policies="policies" label="기술 태그" placeholder="Vue 다시 입력" />
</template>
