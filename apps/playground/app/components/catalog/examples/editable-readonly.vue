<script setup lang="ts">
import { UIEditable } from "@connextable/ui";
import { ref } from "vue";

const text = ref("11월 정산 배포");
</script>

<template>
  <UIEditable v-model="text" label="배포 이름" readonly />
</template>
