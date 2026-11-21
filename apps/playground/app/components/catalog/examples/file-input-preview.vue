<script setup lang="ts">
import { UIFileInput } from "@connextable/ui";

const policy = { accept: "image/*", multiple: true };
</script>

<template>
  <UIFileInput
    label="스크린샷 첨부"
    variant="dropzone"
    :policy="policy"
    hint="카드에 포커스한 뒤 스크린샷을 붙여넣으세요."
    preview
  />
</template>
