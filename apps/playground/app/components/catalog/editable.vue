<script setup lang="ts">
import { UIEditable, UISwitch } from "@connextable/ui";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const initialValue = "11월 정산 배포";
const text = ref(initialValue);
const readonly = ref(false);
const submitOnBlur = ref(false);
const attributes = computed(() => ({
  label: "배포 이름",
  placeholder: "예: 11월 정산 배포",
  readonly: readonly.value || undefined,
  submitOnBlur: submitOnBlur.value || undefined,
}));
const code = computed(() => vueExampleCode("UIEditable", {
  script: [
    'import { UIEditable } from "@connextable/ui";',
    'import { ref } from "vue";',
    "",
    `const text = ref(${JSON.stringify(initialValue)});`,
  ],
  attributes: { "v-model": "text", ...attributes.value },
}));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }" :code="code">
    <template #header>
      <UISwitch v-model="submitOnBlur" size="sm" label="submit-on-blur" />
      <UISwitch v-model="readonly" size="sm" label="readonly" />
    </template>
    <UIEditable v-model="text" v-bind="attributes" />
    <template #footer><output>확정한 이름 · {{ text || "없음" }}</output></template>
  </PlaygroundExample>
</template>
