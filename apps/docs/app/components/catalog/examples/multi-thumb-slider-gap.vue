<script setup lang="ts">
import { UIMultiThumbSlider } from "@connextable/ui";
import { ref } from "vue";

const thumbs = ["최소 가격", "최대 가격"];
const values = ref(["120", "340"]);
const policies = { minGap: 3 };
</script>

<template>
  <UIMultiThumbSlider v-model="values" :thumbs="thumbs" :policies="policies" :get-thumb-label="thumb => thumb" label="가격 범위" min="50" max="500" step="10" />
</template>
