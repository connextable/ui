<script setup lang="ts">
import { provide, shallowRef } from "vue";
import { playgroundPrimaryExampleKey } from "~/utils/playground-primary-example";

const props = defineProps<{ visualStates: boolean }>();
const id = shallowRef<string>();
const examples = new Set<string>();

provide(playgroundPrimaryExampleKey, {
  id,
  get visualStates() {
    return props.visualStates;
  },
  register(exampleId) {
    examples.add(exampleId);
    id.value ??= exampleId;
    return () => {
      examples.delete(exampleId);
      if (id.value === exampleId) id.value = examples.values().next().value;
    };
  },
});
</script>

<template>
  <slot />
</template>
