<script setup lang="ts">
import { UINumberField } from "@connextable/ui";
import { computed, reactive, useId } from "vue";

const id = useId();
const states = [
  { key: "default", label: "기본" },
  { key: "readonly", label: "읽기 전용", readonly: true },
  { key: "disabled", label: "비활성", disabled: true },
  { key: "limited", label: "최대 10 cm", limited: true },
];
const values = reactive<Record<string, string | null>>({
  default: "12.5",
  readonly: "12.5",
  disabled: "12.5",
  limited: "12.5",
});
const aboveLimit = computed(() => Number(values.limited) > 10);
</script>

<template>
  <div class="number-states">
    <div v-for="state in states" :key="state.key" class="ui-field">
      <label :for="`${id}-${state.key}`">{{ state.label }}</label>
      <UINumberField
        :id="`${id}-${state.key}`"
        v-model="values[state.key]"
        unit="cm"
        :readonly="state.readonly"
        :disabled="state.disabled"
        :aria-invalid="state.limited ? aboveLimit : undefined"
        :aria-describedby="state.limited && aboveLimit ? `${id}-limit` : undefined"
      />
      <small v-if="state.limited && aboveLimit" :id="`${id}-limit`">10 cm 이하로 입력해 주세요.</small>
    </div>
  </div>
</template>

<style scoped>
.number-states {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: var(--ui-space-md);
  inline-size: 30rem;
  max-inline-size: 100%;
}

.number-states small {
  color: var(--ui-color-danger);
}
</style>
