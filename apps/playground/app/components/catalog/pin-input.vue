<script setup lang="ts">
import { UIPinInput, UISelect, UISwitch } from "@connextable/ui";
import { computed, ref, watch } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const lengths = [
  { value: "4", label: "4자리" },
  { value: "6", label: "6자리" },
];
const code = ref("");
const completed = ref(false);
const selectedLength = ref<string | null>("6");
const length = computed(() => selectedLength.value === "4" ? 4 : 6);
const mask = ref(false);
const clearable = ref(false);
const readonly = ref(false);
const disabled = ref(false);
watch(length, count => { code.value = code.value.slice(0, count); });

const attributes = computed(() => ({
  label: "인증 코드",
  length: length.value,
  mask: mask.value || undefined,
  clearable: clearable.value || undefined,
  readonly: readonly.value || undefined,
  disabled: disabled.value || undefined,
}));
const source = computed(() => vueExampleCode("UIPinInput", {
  script: [
    'import { UIPinInput } from "@connextable/ui";',
    'import { ref } from "vue";',
    "",
    'const code = ref("");',
    "const completed = ref(false);",
  ],
  attributes: { "v-model": "code", "@completion": "completed = $event", ...attributes.value },
}));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }" :code="source">
    <template #header>
      <PlaygroundExampleControl v-slot="{ labelId }" label="length">
        <UISelect v-model="selectedLength" :options="lengths" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <UISwitch variant="outline" v-model="mask" size="sm" label="mask" />
      <UISwitch variant="outline" v-model="clearable" size="sm" label="clearable" />
      <UISwitch variant="outline" v-model="readonly" size="sm" label="readonly" />
      <UISwitch variant="outline" v-model="disabled" size="sm" label="disabled" />
    </template>
    <UIPinInput v-model="code" v-bind="attributes" @completion="completed = $event" />
    <template #footer><output>{{ completed ? "입력 완료" : `${code.length} / ${length}자리 입력` }}</output></template>
  </PlaygroundExample>
</template>
