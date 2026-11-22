<script setup lang="ts">
import { UICheckbox } from "@connextable/ui";
import { ref } from "vue";

const checked = ref(true);
</script>

<template>
  <UICheckbox label="보안 알림" description="관리자가 켠 설정입니다." v-model="checked" readonly />
</template>
