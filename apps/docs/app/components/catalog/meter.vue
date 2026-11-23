<script setup lang="ts">
import { UIMeter } from "@connextable/ui";
</script>

<template>
  <UIMeter
    :value="82"
    :max="100"
    label="저장소 사용률"
    :format-value="value => `${value}%`"
  />
</template>
