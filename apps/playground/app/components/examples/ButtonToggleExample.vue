<script setup lang="ts">
import { UISwitch, UIToggleButton } from "@connextable/ui";
import { Pin } from "@lucide/vue";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const pinned = ref(false);
const readonly = ref(false);
const disabled = ref(false);
const attributes = computed(() => ({ variant: "outline" as const, readonly: readonly.value || undefined, disabled: disabled.value || undefined }));
const source = computed(() => vueExampleCode("UIToggleButton", {
  script: ['import { UIToggleButton } from "@connextable/ui";', 'import { Pin } from "@lucide/vue";', 'import { ref } from "vue";', "", `const pinned = ref(${pinned.value});`],
  attributes: { "v-model": "pinned", ...attributes.value, icon: { expression: "Pin" } },
  children: ["상단에 고정"],
}));
</script>

<template>
  <PlaygroundExample
    id="UIToggleButton"
    title="UIToggleButton"
    description="v-model로 켜짐 상태를 연결하면 aria-pressed가 함께 바뀝니다."
    :code="source"
    :heading-level="3"
  >
    <template #header>
      <UISwitch v-model="readonly" size="sm" label="readonly" />
      <UISwitch v-model="disabled" size="sm" label="disabled" />
    </template>
    <UIToggleButton v-model="pinned" v-bind="attributes" :icon="Pin">상단에 고정</UIToggleButton>
  </PlaygroundExample>
</template>
