<script setup lang="ts">
import { UIEditable } from "@connextable/ui";
import { ref } from "vue";

const text = ref("정리할 메모");
</script>

<template>
  <UIEditable v-model="text" label="메모" submit-on-blur />
</template>
