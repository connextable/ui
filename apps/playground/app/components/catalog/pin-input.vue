<script setup lang="ts">
import {
  UIPinInput,
  UIPinInputInput,
} from "@connextable/ui";

</script>

<template>
  <UIPinInput :length="6" label="인증 코드">
    <UIPinInputInput v-for="index in 6" :key="index" :index="index - 1" />
  </UIPinInput>
</template>
