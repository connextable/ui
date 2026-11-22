<script setup lang="ts">
import { UIRadioGroup } from "@connextable/ui";
import { ref } from "vue";
const options = [
  { value: "all", label: "모든 메일", description: "업데이트와 이벤트를 함께 받습니다." },
  { value: "important", label: "중요 메일만", description: "계정과 보안 알림만 받습니다." },
];

const selected = ref("important");
</script>

<template>
  <UIRadioGroup :options="options" label="알림 범위" v-model="selected" />
</template>
