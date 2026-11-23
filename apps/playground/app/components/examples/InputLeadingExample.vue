<script setup lang="ts">
import { UIInput } from "@connextable/ui";
import { ref, useId } from "vue";

const subdomain = ref("");
const id = useId();
</script>

<template>
  <div class="ui-field">
    <label :for="id">워크스페이스 주소</label>
    <UIInput :id="id" v-model="subdomain" :aria-describedby="`${id}-description`" inputmode="url" placeholder="my-team">
      <template #leading>https://</template>
      <template #trailing>.example.com</template>
    </UIInput>
    <small :id="`${id}-description`">example.com 앞에 붙일 팀 주소를 입력하세요.</small>
  </div>
</template>

<style scoped>
small {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}
</style>
