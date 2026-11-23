<script setup lang="ts">
import { UINumberField } from "@connextable/ui";
import { ref } from "vue";

const length = ref<string | null>("12");
</script>

<template>
  <label class="ui-field">
    확정된 수량
    <UINumberField v-model="length" readonly />
  </label>
</template>
