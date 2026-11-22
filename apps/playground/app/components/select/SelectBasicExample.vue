<script setup lang="ts">
import { UISelect, UISwitch } from "@connextable/ui";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const options = [
  { value: "comfortable", label: "여백 넓게" },
  { value: "compact", label: "촘촘하게" },
];
const density = ref<string | null>("comfortable");
const clearable = ref(true);
const readonly = ref(false);
const attributes = computed(() => ({
  "aria-label": "화면 밀도",
  placeholder: "밀도 선택",
  clearable: clearable.value || undefined,
  readonly: readonly.value || undefined,
}));
const code = computed(() => vueExampleCode("UISelect", {
  script: [
    'import { UISelect } from "@connextable/ui";',
    'import { ref } from "vue";',
    "",
    "const options = [",
    ...options.map(({ value, label }) => `  { value: "${value}", label: "${label}" },`),
    "];",
    'const density = ref<string | null>("comfortable");',
  ],
  attributes: { "v-model": "density", options: { expression: "options" }, ...attributes.value },
}));
</script>

<template>
  <PlaygroundExample
    id="select-example"
    title="항목 선택과 해제"
    description="options로 선택지를 전달합니다. clearable을 켜면 선택을 지워 미선택 상태로 돌아갈 수 있습니다."
    :code="code"
    :heading-level="3"
  >
    <template #header>
      <UISwitch v-model="clearable" size="sm" label="clearable" />
      <UISwitch v-model="readonly" size="sm" label="readonly" />
    </template>
    <UISelect v-model="density" :options="options" v-bind="attributes" />
    <template #footer><output>{{ options.find(option => option.value === density)?.label ?? "선택 없음" }}</output></template>
  </PlaygroundExample>
</template>
