<script setup lang="ts">
import { UIWindowSplitter, UIWindowSplitterPane, UIWindowSplitterHandle } from "@connextable/ui";
import { ref } from "vue";

const position = ref("45");
</script>

<template>
  <UIWindowSplitter class="example" v-model="position" orientation="vertical" :min="25" :max="70"
    label="위아래 패널의 높이 조정">
    <UIWindowSplitterPane side="before"><p>미리보기</p></UIWindowSplitterPane>
    <UIWindowSplitterHandle thumb />
    <UIWindowSplitterPane side="after"><p>변경 내역</p></UIWindowSplitterPane>
  </UIWindowSplitter>
</template>

<style scoped>
.example {
  block-size: 14rem;
}
</style>
