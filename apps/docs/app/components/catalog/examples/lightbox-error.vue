<script setup lang="ts">
import { UILightbox, type UILightboxItem } from "@connextable/ui";
import { pinkFlower, purpleFlowers } from "~/data/lightbox-media";

const items: readonly UILightboxItem[] = [
  {
    ...pinkFlower,
    label: "원본이 사라진 사진",
    description: "미리보기는 남아 있지만 원본을 열 수 없는 경우입니다.",
    thumbnail: pinkFlower.src,
    src: "data:image/jpeg;base64,AA==",
  },
  purpleFlowers,
];
</script>

<template>
  <UILightbox :items="items" label="사진 복구 목록" class="lightbox-error-example" />
</template>

<style scoped>
.lightbox-error-example {
  max-inline-size: 32rem;
  margin-inline: auto;
}
</style>
