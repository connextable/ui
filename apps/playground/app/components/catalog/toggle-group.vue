<script setup lang="ts">
import {
  UIToggleGroup,
  UIToggleGroupItem,
} from "@connextable/ui";
import { ref } from "vue";

const items = ["left", "center", "right"];
const value = ref(["left"]);
</script>

<template>
  <UIToggleGroup :items="items" v-model="value" label="텍스트 정렬">
    <UIToggleGroupItem value="left">왼쪽</UIToggleGroupItem>
    <UIToggleGroupItem value="center">가운데</UIToggleGroupItem>
    <UIToggleGroupItem value="right">오른쪽</UIToggleGroupItem>
  </UIToggleGroup>
</template>
