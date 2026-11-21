<script setup lang="ts" generic="Input extends object = Record<string, unknown>, Output extends object = Input">
import { FormRoot, type FormRootProps, type FormRootSlotProps } from "@sectile/vue/form";
import { useTemplateRef } from "vue";

const props = defineProps<FormRootProps<Input, Output>>();
const root = useTemplateRef<InstanceType<typeof FormRoot>>("root");
defineExpose({ root });
defineSlots<{
  default?(state: FormRootSlotProps): unknown;
  output?(state: FormRootSlotProps): unknown;
}>();
</script>

<template>
  <FormRoot ref="root" v-bind="props" v-slot="state" class="ui-form">
    <slot v-bind="state" />
    <output v-if="$slots.output" class="ui-form__output">
      <slot name="output" v-bind="state" />
    </output>
  </FormRoot>
</template>

<style scoped>
.ui-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  gap: var(--ui-space-md);
  inline-size: var(--ui-form-max-inline-size, 100%);
  max-inline-size: 100%;
  min-inline-size: 0;
  margin: 0;
}

.ui-form__output {
  box-sizing: content-box;
  min-block-size: 1lh;
}
</style>
