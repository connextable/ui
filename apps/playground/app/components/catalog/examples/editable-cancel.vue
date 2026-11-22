<script setup lang="ts">
import { UIEditable } from "@connextable/ui";
import { ref } from "vue";

const text = ref("회의 제목");
</script>

<template>
  <UIEditable v-model="text" label="회의 제목" />
</template>
