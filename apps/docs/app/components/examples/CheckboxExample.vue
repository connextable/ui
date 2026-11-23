<script setup lang="ts">
import { UICheckbox, UISwitch, type UICheckboxValue } from "@connextable/ui";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const checked = ref<UICheckboxValue>(false);
const card = ref(false);
const disabled = ref(false);
const readonly = ref(false);
const attributes = computed(() => ({
  label: "배포 알림",
  variant: card.value ? "card" as const : undefined,
  disabled: disabled.value || undefined,
  readonly: readonly.value || undefined,
}));
const code = computed(() => vueExampleCode("UICheckbox", {
  script: [
    'import { UICheckbox, type UICheckboxValue } from "@connextable/ui";',
    'import { ref } from "vue";',
    "",
    "const checked = ref<UICheckboxValue>(false);",
  ],
  attributes: { "v-model": "checked", ...attributes.value },
}));
</script>

<template>
  <PlaygroundExample
    id="checkbox-example"
    title="기본 선택"
    description="v-model로 선택 상태를 연결하고, 모양이나 수정 가능 여부를 바꿀 수 있습니다."
    :code="code"
  >
    <template #header>
      <UISwitch variant="outline" v-model="card" size="sm" label="카드 모양" />
      <UISwitch variant="outline" v-model="disabled" size="sm" label="disabled" />
      <UISwitch variant="outline" v-model="readonly" size="sm" label="readonly" />
    </template>
    <UICheckbox v-model="checked" v-bind="attributes" />
    <template #footer><output>{{ checked ? "알림 켜짐" : "알림 꺼짐" }}</output></template>
  </PlaygroundExample>
</template>
