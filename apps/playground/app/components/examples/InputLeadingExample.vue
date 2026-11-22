<script setup lang="ts">
import { UIInput } from "@connextable/ui";
import { ref, useId } from "vue";

const domain = ref("");
const id = useId();
</script>

<template>
  <div class="ui-field">
    <label :for="id">웹사이트 주소</label>
    <UIInput :id="id" v-model="domain" :aria-describedby="`${id}-description`" inputmode="url" placeholder="example.com">
      <template #leading>https://</template>
    </UIInput>
    <small :id="`${id}-description`">도메인만 입력하세요.</small>
  </div>
</template>

<style scoped>
small {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}
</style>
