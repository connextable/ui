<script setup lang="ts">
import { UIFeed } from "@connextable/ui";
import { CircleCheck, Rocket } from "@lucide/vue";

const entries = [
  { id: "deploy", title: "운영 배포 완료", time: "14:32", icon: Rocket },
  { id: "checks", title: "자동 검사 통과", time: "14:19", icon: CircleCheck },
];
</script>

<template>
  <UIFeed :items="entries" label="배포 활동" />
</template>
