<script setup lang="ts">
import { UIPinInput, UIPinInputInput } from "@connextable/ui";
import { ref } from "vue";

const complete = ref(false);
</script>

<template>
  <div class="example">
    <UIPinInput :length="4" @complete="complete = true" @update:model-value="complete = false" label="확인 코드">
      <UIPinInputInput v-for="index in 4" :key="index" :index="index - 1" :aria-label="`${index}번째 자리`" />
    </UIPinInput>
    <output>{{ complete ? "확인 코드 입력 완료" : "네 자리를 입력하세요." }}</output>
  </div>
</template>

<style scoped>
.example {
  display: grid;
  gap: var(--ui-space-sm);
}
</style>
