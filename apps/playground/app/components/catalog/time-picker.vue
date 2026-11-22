<script setup lang="ts">
import { UITimePicker } from "@connextable/ui";
import { ref } from "vue";

const time = ref({ hour: 9, minute: 30, second: 0, millisecond: 0 });
</script>

<template>
  <UITimePicker label="시간 선택" v-model="time" />
</template>
