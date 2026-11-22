<script setup lang="ts">
import { UISelect, UISlider, UISwitch } from "@connextable/ui";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const value = ref("40");
const orientations = ["horizontal", "vertical"] as const;
const options = orientations.map(value => ({ value, label: value }));
const orientation = ref<string | null>("horizontal");
const readonly = ref(false);
const attributes = computed(() => ({
  min: "0",
  max: "100",
  step: "1",
  label: "밝기",
  orientation: orientations.find(value => value === orientation.value),
  readonly: readonly.value || undefined,
}));
const code = computed(() => vueExampleCode("UISlider", {
  script: [
    'import { UISlider } from "@connextable/ui";',
    'import { ref } from "vue";',
    "",
    'const value = ref("40");',
  ],
  attributes: { "v-model": "value", ...attributes.value },
}));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }" :code="code">
    <template #header>
      <PlaygroundExampleControl v-slot="{ labelId }" label="orientation">
        <UISelect v-model="orientation" :options="options" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <UISwitch v-model="readonly" size="sm" label="readonly" />
    </template>
    <UISlider v-model="value" v-bind="attributes" />
    <template #footer><output>밝기 · {{ value }}%</output></template>
  </PlaygroundExample>
</template>
