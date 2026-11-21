<script setup lang="ts">
import { FormSubmit, type FormSubmitSlotProps } from "@sectile/vue/form";
import UIButton, { type UIButtonProps } from "../button/UIButton.vue";

const props = defineProps<Omit<UIButtonProps, "type" | "loading">>();
defineSlots<{
  default?(state: FormSubmitSlotProps): unknown;
  leading?(state: FormSubmitSlotProps): unknown;
  trailing?(state: FormSubmitSlotProps): unknown;
}>();
</script>

<template>
  <FormSubmit as-child v-slot="state">
    <UIButton v-bind="props" type="submit" :loading="state.submitting">
      <template v-if="$slots.leading" #leading><slot name="leading" v-bind="state" /></template>
      <slot v-bind="state" />
      <template v-if="$slots.trailing" #trailing><slot name="trailing" v-bind="state" /></template>
    </UIButton>
  </FormSubmit>
</template>
