<script setup lang="ts">
import { Folder } from "@lucide/vue";
import { UIInput, UISelect, UISwitch } from "@connextable/ui";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const sizes = ["sm", "md", "lg"] as const;
const variants = ["outline", "soft"] as const;
const sizeOptions = sizes.map(value => ({ value, label: value }));
const variantOptions = variants.map(value => ({ value, label: value }));
const selectedSize = ref<string | null>("md");
const selectedVariant = ref<string | null>("outline");
const clearable = ref(true);
const disabled = ref(false);
const initialValue = "디자인 시스템";
const name = ref(initialValue);
const presentation = computed(() => ({
  size: sizes.find(value => value === selectedSize.value),
  variant: variants.find(value => value === selectedVariant.value),
  clearable: clearable.value || undefined,
  clearLabel: clearable.value ? "이름 지우기" : undefined,
  disabled: disabled.value || undefined,
  "aria-label": "프로젝트 이름",
  placeholder: "이름을 입력하세요",
}));
const code = computed(() => vueExampleCode("UIInput", {
  script: [
    'import { UIInput } from "@connextable/ui";',
    'import { Folder } from "@lucide/vue";',
    'import { ref } from "vue";',
    "",
    `const name = ref(${JSON.stringify(initialValue)});`,
  ],
  attributes: { "v-model": "name", ...presentation.value, icon: { expression: "Folder" } },
}));
</script>

<template>
  <PlaygroundExample
    id="input-example"
    title="텍스트 입력"
    description="v-model로 입력값을 연결합니다. 크기와 모양, 지우기 버튼 표시, 비활성 상태를 설정할 수 있습니다."
    :code="code"
    :heading-level="3"
  >
    <template #header>
      <PlaygroundExampleControl v-slot="{ labelId }" label="size">
        <UISelect v-model="selectedSize" :options="sizeOptions" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <PlaygroundExampleControl v-slot="{ labelId }" label="variant">
        <UISelect v-model="selectedVariant" :options="variantOptions" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <UISwitch v-model="clearable" size="sm" label="clearable" />
      <UISwitch v-model="disabled" size="sm" label="disabled" />
    </template>
    <UIInput v-model="name" v-bind="presentation" :icon="Folder" />
    <template #footer><output aria-live="off">{{ name || "입력값 없음" }}</output></template>
  </PlaygroundExample>
</template>
