<script setup lang="ts">
import { UIButton, UILightbox } from "@connextable/ui";
import { ref } from "vue";
import { observationMedia } from "~/data/lightbox-media";

const open = ref(false);
const index = ref(1);
</script>

<template>
  <div class="lightbox-controlled-example">
    <UILightbox v-model:open="open" v-model:index="index" :items="observationMedia" label="검토 중인 관찰 자료"
      loop :thumbnails="false" :close-on-interact-outside="false">
      <template #default="{ openAt }">
        <UIButton variant="outline" aria-haspopup="dialog" @click="openAt(index, $event)">
          마지막으로 본 자료 열기
        </UIButton>
      </template>
      <template #caption="{ item, index: position, total }">
        <strong>{{ position + 1 }}번째 관찰 자료 · {{ item.label }}</strong>
        <p>{{ item.description }} 총 {{ total }}개입니다.</p>
      </template>
    </UILightbox>
    <output>마지막으로 본 자료 · {{ observationMedia[index]?.label }}</output>
  </div>
</template>

<style scoped>
.lightbox-controlled-example {
  display: grid;
  justify-items: center;
  gap: var(--ui-space-md);
}

.lightbox-controlled-example output {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}
</style>
