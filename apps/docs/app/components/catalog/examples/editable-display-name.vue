<script setup lang="ts">
import { UIEditable } from "@connextable/ui";
import { ref } from "vue";

const title = ref("11월 정산 배포");
</script>

<template>
  <p>
    배포 목록 /
    <strong><UIEditable v-model="title" label="배포 이름" /></strong>
  </p>
</template>
