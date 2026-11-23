<script setup lang="ts">
import { UIImage } from "@connextable/ui";
import { ImageOff } from "@lucide/vue";

const invalidImage = "data:image/png;base64,AA==";
</script>

<template>
  <UIImage :src="invalidImage" alt="프로젝트 이미지">
    <template #fallback>
      <ImageOff aria-hidden="true" />
      프로젝트 이미지를 불러올 수 없습니다
    </template>
  </UIImage>
</template>
