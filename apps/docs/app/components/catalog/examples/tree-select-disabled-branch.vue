<script setup lang="ts">
import { UITreeSelect } from "@connextable/ui";
import { ref } from "vue";

const nodes = [
  { id: "design", parentID: null, label: "디자인 (잠김)" },
  { id: "ui", parentID: "design", label: "화면" },
  { id: "development", parentID: null, label: "개발" },
  { id: "web", parentID: "development", label: "웹" },
];
const disabledTeams = ["design", "ui"];
const teams = ref<readonly string[]>([]);
</script>

<template>
  <UITreeSelect
    v-model="teams"
    :nodes="nodes"
    :disabled-items="disabledTeams"
    :default-expanded-values="['development']"
    label="이동할 팀 선택"
    placeholder="이동할 팀"
  />
</template>
