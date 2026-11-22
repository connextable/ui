<script setup lang="ts">
import { UIPinInput } from "@connextable/ui";
import { ref } from "vue";

const code = ref("2846");
</script>

<template>
  <UIPinInput :length="4" v-model="code" label="검토 코드" />
</template>
