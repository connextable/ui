<script setup lang="ts">
import { UISelect, UISwitch } from "@connextable/ui";
import { AlignJustify, List } from "@lucide/vue";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const icons = { AlignJustify, List };
const choices = [
  { value: "comfortable", label: "여백 넓게", icon: "List" },
  { value: "compact", label: "촘촘하게", icon: "AlignJustify" },
] as const;
const options = choices.map(choice => ({ ...choice, icon: icons[choice.icon] }));
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
    'import { AlignJustify, List } from "@lucide/vue";',
    'import { ref } from "vue";',
    "",
    "const options = [",
    ...choices.map(({ value, label, icon }) => `  { value: "${value}", label: "${label}", icon: ${icon} },`),
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
    description="options에 지정한 아이콘은 목록과 선택값에 함께 표시됩니다. clearable을 켜면 선택을 지울 수 있습니다."
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
