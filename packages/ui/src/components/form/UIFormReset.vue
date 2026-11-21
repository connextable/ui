<script setup lang="ts">
import { FormReset } from "@sectile/vue/form";
import UIButton, { type UIButtonProps } from "../button/UIButton.vue";

const props = withDefaults(defineProps<Omit<UIButtonProps, "type" | "loading">>(), { variant: "outline" });
</script>

<template>
  <FormReset as-child>
    <UIButton v-bind="props" type="reset">
      <template v-if="$slots.leading" #leading><slot name="leading" /></template>
      <slot />
      <template v-if="$slots.trailing" #trailing><slot name="trailing" /></template>
    </UIButton>
  </FormReset>
</template>
