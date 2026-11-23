<script setup lang="ts">
import { UIInput, UISelect, UISwitch } from "@connextable/ui";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const { multiline = false } = defineProps<{ multiline?: boolean }>();
const sizes = ["sm", "md", "lg"] as const;
const variants = ["outline", "soft"] as const;
const sizeOptions = sizes.map(value => ({ value, label: value }));
const variantOptions = variants.map(value => ({ value, label: value }));
const selectedSize = ref<string | null>("md");
const selectedVariant = ref<string | null>("outline");
const clearable = ref(true);
const readonly = ref(false);
const disabled = ref(false);
const invalid = ref(false);
const initialValue = multiline ? "초안 검토\n금요일까지 피드백 정리" : "디자인 시스템";
const text = ref(initialValue);
const presentation = computed(() => ({
  size: sizes.find(value => value === selectedSize.value),
  variant: variants.find(value => value === selectedVariant.value),
  clearable: clearable.value || undefined,
  clearLabel: clearable.value ? (multiline ? "메모 지우기" : "이름 지우기") : undefined,
  readonly: readonly.value || undefined,
  disabled: disabled.value || undefined,
  multiline: multiline || undefined,
  rows: multiline ? 3 : undefined,
  "aria-invalid": invalid.value ? "true" as const : undefined,
  "aria-label": multiline ? "프로젝트 메모" : "프로젝트 이름",
  placeholder: multiline ? "메모를 입력하세요" : "이름을 입력하세요",
}));
const code = computed(() => vueExampleCode("UIInput", {
  script: [
    'import { UIInput } from "@connextable/ui";',
    'import { ref } from "vue";',
    "",
    `const text = ref(${JSON.stringify(initialValue)});`,
  ],
  attributes: { "v-model": "text", ...presentation.value },
}));
</script>

<template>
  <PlaygroundExample
    :id="multiline ? 'input-multiline' : 'input-example'"
    :title="multiline ? '여러 줄 입력' : '텍스트 입력'"
    :description="multiline
      ? 'multiline과 rows로 여러 줄 입력을 구성합니다. 테두리형과 배경형을 비교하고 읽기 전용·비활성·오류 상태를 바꿔 보세요.'
      : 'v-model로 입력값을 연결합니다. 크기, 모양, 지우기 버튼, 읽기 전용과 비활성 상태를 바꿔 볼 수 있습니다.'"
    :code="code"
  >
    <template #header>
      <PlaygroundExampleControl v-slot="{ labelId }" label="size">
        <UISelect v-model="selectedSize" :options="sizeOptions" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <PlaygroundExampleControl v-slot="{ labelId }" label="variant">
        <UISelect v-model="selectedVariant" :options="variantOptions" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <UISwitch variant="outline" v-model="clearable" size="sm" label="clearable" />
      <UISwitch variant="outline" v-model="readonly" size="sm" label="readonly" />
      <UISwitch variant="outline" v-model="disabled" size="sm" label="disabled" />
      <UISwitch variant="outline" v-if="multiline" v-model="invalid" size="sm" label="aria-invalid" />
    </template>
    <UIInput v-model="text" v-bind="presentation" />
    <template #footer><output aria-live="off">{{ text || "입력값 없음" }}</output></template>
  </PlaygroundExample>
</template>
