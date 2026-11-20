<script setup lang="ts">
import { UIInput } from "@connextable/ui";
import { ref, useId } from "vue";

const id = useId();
const name = ref("");
</script>

<template>
  <div class="input-example">
    <label :for="id">이름</label>
    <UIInput :id="id" v-model="name" placeholder="이름을 입력하세요" />
  </div>
</template>

<style scoped>
.input-example {
  display: grid;
  inline-size: min(100%, 26rem);
  gap: var(--ui-space-sm);
}

.input-example label {
  font-size: var(--ui-font-size-body-sm);
  font-weight: 600;
}
</style>
