<script setup lang="ts">
import { UIImage } from "@connextable/ui";
const invalid = "data:image/png;base64,AA==";
</script>

<template>
  <UIImage :src="invalid" alt="프로젝트 이미지" style="inline-size: 12rem; block-size: 8rem" />
</template>
