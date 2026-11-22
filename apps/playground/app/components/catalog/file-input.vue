<script setup lang="ts">
import { UIFileInput, UISelect, UISwitch } from "@connextable/ui";
import { computed, shallowRef, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const variants = ["compact", "dropzone"] as const;
const options = variants.map(value => ({ value, label: value }));
const variant = ref<string | null>("compact");
const files = shallowRef<readonly File[]>([]);
const preview = ref(false);
const clearable = ref(true);
const attributes = computed(() => ({
  label: "첨부 파일",
  variant: variants.find(value => value === variant.value),
  preview: preview.value || undefined,
  clearable: clearable.value ? undefined : false,
}));
const code = computed(() => vueExampleCode("UIFileInput", {
  script: [
    'import { UIFileInput } from "@connextable/ui";',
    'import { shallowRef } from "vue";',
    "",
    'const files = shallowRef<readonly File[]>([]);',
  ],
  attributes: { "v-model": "files", ...attributes.value },
}));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }" :code="code">
    <template #header>
      <PlaygroundExampleControl v-slot="{ labelId }" label="variant">
        <UISelect v-model="variant" :options="options" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <UISwitch v-model="preview" size="sm" label="preview" />
      <UISwitch v-model="clearable" size="sm" label="clearable" />
    </template>
    <UIFileInput v-model="files" v-bind="attributes" />
    <template #footer><output>{{ files.length ? files.map(file => file.name).join(", ") : "선택한 파일 없음" }}</output></template>
  </PlaygroundExample>
</template>
