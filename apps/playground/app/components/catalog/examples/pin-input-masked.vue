<script setup lang="ts">
import { UIPinInput } from "@connextable/ui";
import { ref } from "vue";

const code = ref("");
</script>

<template>
  <UIPinInput v-model="code" :length="4" mask label="확인 코드" />
</template>
