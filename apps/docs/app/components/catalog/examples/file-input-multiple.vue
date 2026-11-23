<script setup lang="ts">
import { UIFileInput } from "@connextable/ui";

const policy = { multiple: true };
</script>

<template>
  <UIFileInput label="프로젝트 첨부 파일" :policy="policy" variant="dropzone" />
</template>
