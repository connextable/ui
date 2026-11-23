<script setup lang="ts">
import { UIMultiThumbSlider, UISelect } from "@connextable/ui";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const thumbs = ["시작값", "끝값"];
const values = ref(["120", "340"]);
const orientations = ["horizontal", "vertical"] as const;
const options = orientations.map(value => ({ value, label: value }));
const orientation = ref<string | null>("horizontal");
const attributes = computed(() => ({
  min: "50",
  max: "500",
  step: "10",
  label: "선택 범위",
  orientation: orientations.find(value => value === orientation.value),
}));
const code = computed(() => vueExampleCode("UIMultiThumbSlider", {
  script: [
    'import { UIMultiThumbSlider } from "@connextable/ui";',
    'import { ref } from "vue";',
    "",
    'const thumbs = ["시작값", "끝값"];',
    'const values = ref(["120", "340"]);',
  ],
  attributes: {
    "v-model": "values",
    thumbs: { expression: "thumbs" },
    getThumbLabel: { expression: "thumb => thumb" },
    ...attributes.value,
  },
}));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }" :code="code">
    <template #header>
      <PlaygroundExampleControl v-slot="{ labelId }" label="orientation">
        <UISelect v-model="orientation" :options="options" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
    </template>
    <UIMultiThumbSlider v-model="values" :thumbs="thumbs" :get-thumb-label="thumb => thumb" v-bind="attributes" />
  </PlaygroundExample>
</template>
