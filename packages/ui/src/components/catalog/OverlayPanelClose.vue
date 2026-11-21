<script setup lang="ts">
import { X } from "@lucide/vue";
import type { Component } from "vue";
import UIButton from "../button/UIButton.vue";

defineProps<{ part: Component; label: string }>();
</script>

<template>
  <component :is="part" as-child>
    <UIButton class="ui-dialog__close" size="sm" variant="ghost" icon-only :aria-label="label">
      <template #leading><X /></template>
    </UIButton>
  </component>
</template>
