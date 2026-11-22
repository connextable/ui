<script setup lang="ts">
import { UIRadioGroup, UISwitch } from "@connextable/ui";
import { AlignJustify, List } from "@lucide/vue";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const icons = { AlignJustify, List };
const choices = [
  { value: "compact", label: "간결하게", icon: "AlignJustify" },
  { value: "comfortable", label: "여유 있게", icon: "List" },
] as const;
const options = choices.map(choice => ({ ...choice, icon: icons[choice.icon] }));
const density = ref("compact");
const horizontal = ref(false);
const clearable = ref(false);
const readonly = ref(false);
const disabled = ref(false);
const attributes = computed(() => ({
  label: "화면 밀도",
  orientation: horizontal.value ? "horizontal" as const : undefined,
  clearable: clearable.value || undefined,
  readonly: readonly.value || undefined,
  disabled: disabled.value || undefined,
}));
const code = computed(() => vueExampleCode("UIRadioGroup", {
  script: [
    'import { UIRadioGroup } from "@connextable/ui";',
    'import { AlignJustify, List } from "@lucide/vue";',
    'import { ref } from "vue";',
    "",
    "const options = [",
    ...choices.map(({ value, label, icon }) => `  { value: "${value}", label: "${label}", icon: ${icon} },`),
    "];",
    'const density = ref("compact");',
  ],
  attributes: { "v-model": "density", options: { expression: "options" }, ...attributes.value },
}));
</script>

<template>
  <PlaygroundExample
    id="radio-example"
    title="한 항목 선택"
    description="options에 선택할 값과 이름을 넣고, icon으로 항목을 구분합니다. 읽기 전용과 비활성 상태에서도 현재 값을 확인할 수 있습니다."
    :code="code"
    :heading-level="3"
    wide
  >
    <template #header>
      <UISwitch v-model="horizontal" size="sm" label="가로 배치" />
      <UISwitch v-model="clearable" size="sm" label="clearable" />
      <UISwitch v-model="readonly" size="sm" label="readonly" />
      <UISwitch v-model="disabled" size="sm" label="disabled" />
    </template>
    <UIRadioGroup v-model="density" :options="options" v-bind="attributes" />
    <template #footer><output>{{ options.find(option => option.value === density)?.label ?? "선택 없음" }}</output></template>
  </PlaygroundExample>
</template>
