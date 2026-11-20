<script setup lang="ts">
import { UISwitch } from "@connextable/ui";
import { ref } from "vue";

const showDescription = ref(true);
</script>

<template>
  <div class="switch-example">
    <UISwitch v-model="showDescription" label="설명 표시" />
    <div class="switch-example__preview">
      <strong>미리보기</strong>
      <p v-if="showDescription">설명 표시를 끄면 이 문장이 접힙니다.</p>
    </div>
  </div>
</template>

<style scoped>
.switch-example {
  display: grid;
  justify-items: start;
  gap: 0.75rem;
}

.switch-example__preview {
  min-block-size: 4.5rem;
}

.switch-example p {
  margin: 0.375rem 0 0;
}
</style>
