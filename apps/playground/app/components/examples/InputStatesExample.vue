<script setup lang="ts">
import { UIInput } from "@connextable/ui";
import { computed, ref } from "vue";

const email = ref("team");
const hasEmailError = computed(
  () => email.value !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value),
);
</script>

<template>
  <div class="ui-field input-error">
    <label for="workspace-email">팀 이메일</label>
    <UIInput
      id="workspace-email"
      v-model="email"
      :aria-invalid="hasEmailError"
      aria-describedby="workspace-email-hint"
    />
    <span id="workspace-email-hint" class="input-error__hint">
      <template v-if="hasEmailError">이메일 형식으로 입력하세요. </template>
      예시 team@example.com
    </span>
  </div>
</template>

<style scoped>
.input-error {
  inline-size: min(100%, 26rem);
}

.input-error__hint {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}
</style>
