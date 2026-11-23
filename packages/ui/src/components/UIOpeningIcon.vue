<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
</script>

<template>
  <span class="ui-inset-icon" aria-hidden="true">
    <slot><ChevronDown class="ui-opening-chevron" /></slot>
  </span>
</template>
