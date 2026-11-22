<script setup lang="ts">
import { UIPinInput } from "@connextable/ui";
import { ref } from "vue";

const code = ref("");
</script>

<template>
  <UIPinInput v-model="code" :length="6" label="인증 코드" />
</template>
