<script setup lang="ts">
import { UIEditable } from "@connextable/ui";
import { ref } from "vue";

const text = ref("알림에 표시할 이름");
</script>

<template>
  <UIEditable v-model="text" label="알림 표시 이름" />
</template>
