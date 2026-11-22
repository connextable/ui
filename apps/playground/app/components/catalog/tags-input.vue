<script setup lang="ts">
import { UISwitch, UITagsInput } from "@connextable/ui";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const initialTags = ["Vue", "DOM", "접근성"];
const tags = ref<readonly string[]>(initialTags);
const clearable = ref(false);
const splitPaste = ref(false);
const reorderable = ref(false);
const attributes = computed(() => ({
  label: "프로젝트 기술",
  placeholder: "기술 추가",
  clearable: clearable.value || undefined,
  splitPaste: splitPaste.value || undefined,
  reorderable: reorderable.value || undefined,
}));
const code = computed(() => vueExampleCode("UITagsInput", {
  script: [
    'import { UITagsInput } from "@connextable/ui";',
    'import { ref } from "vue";',
    "",
    `const tags = ref<readonly string[]>([${initialTags.map(tag => JSON.stringify(tag)).join(", ")}]);`,
  ],
  attributes: { "v-model": "tags", ...attributes.value },
}));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }" :code="code">
    <template #header>
      <UISwitch v-model="clearable" size="sm" label="clearable" />
      <UISwitch v-model="splitPaste" size="sm" label="split-paste" />
      <UISwitch v-model="reorderable" size="sm" label="reorderable" />
    </template>
    <UITagsInput v-model="tags" v-bind="attributes" />
    <template #footer><output>{{ tags.length }}개 · {{ tags.join(", ") || "등록한 태그 없음" }}</output></template>
  </PlaygroundExample>
</template>
