<script setup lang="ts">
import { UIRating, UISwitch } from "@connextable/ui";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const items = ["1", "2", "3", "4", "5"];
const rating = ref("4");
const clearable = ref(false);
const readonly = ref(false);
const attributes = computed(() => ({
  "aria-label": "만족도",
  clearable: clearable.value || undefined,
  readonly: readonly.value || undefined,
}));
const code = computed(() => vueExampleCode("UIRating", {
  script: [
    'import { UIRating } from "@connextable/ui";',
    'import { ref } from "vue";',
    "",
    'const items = ["1", "2", "3", "4", "5"];',
    'const rating = ref("4");',
  ],
  attributes: { "v-model": "rating", items: { expression: "items" }, ...attributes.value },
}));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }" :code="code">
    <template #header>
      <UISwitch v-model="clearable" size="sm" label="clearable" />
      <UISwitch v-model="readonly" size="sm" label="readonly" />
    </template>
    <UIRating v-model="rating" :items="items" v-bind="attributes" />
    <template #footer><output>{{ rating ? `${rating}점` : "미평가" }}</output></template>
  </PlaygroundExample>
</template>
