<script setup lang="ts">
import { UINumberField, UISelect, UISwitch } from "@connextable/ui";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const units = ["cm", "mm"].map(value => ({ value, label: value }));
const length = ref<string | null>("12.5");
const unit = ref<string | null>("cm");
const clearable = ref(true);
const readonly = ref(false);
const attributes = computed(() => ({
  label: "부품 길이",
  placeholder: "예: 12.5",
  unit: unit.value ?? "cm",
  clearable: clearable.value || undefined,
  readonly: readonly.value || undefined,
}));
const code = computed(() => vueExampleCode("UINumberField", {
  script: [
    'import { UINumberField } from "@connextable/ui";',
    'import { ref } from "vue";',
    "",
    'const length = ref<string | null>("12.5");',
  ],
  attributes: { "v-model": "length", ...attributes.value },
}));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }" :code="code">
    <template #header>
      <PlaygroundExampleControl v-slot="{ labelId }" label="unit">
        <UISelect v-model="unit" :options="units" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <UISwitch variant="outline" v-model="clearable" size="sm" label="clearable" />
      <UISwitch variant="outline" v-model="readonly" size="sm" label="readonly" />
    </template>
    <UINumberField v-model="length" v-bind="attributes" />
    <template #footer><output>확정한 숫자 <strong>{{ length ?? "없음" }}</strong></output></template>
  </PlaygroundExample>
</template>
