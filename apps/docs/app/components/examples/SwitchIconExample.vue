<script setup lang="ts">
import { UISwitch } from "@connextable/ui";
import { Bell } from "@lucide/vue";
import { ref } from "vue";

const alerts = ref(true);
</script>

<template>
  <UISwitch variant="outline" v-model="alerts" :icon="Bell" label="배포 알림" />
</template>
