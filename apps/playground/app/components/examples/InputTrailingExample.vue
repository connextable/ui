<script setup lang="ts">
import { UIInput } from "@connextable/ui";
import { ref, useId } from "vue";

const id = useId();
const query = ref("디자인 시스템");
</script>

<template>
  <div class="ui-field input-trailing">
    <label :for="id">검색어</label>
    <UIInput :id="id" v-model="query" placeholder="검색어를 입력하세요" clearable clear-label="검색어 지우기" />
  </div>
</template>

<style scoped>
.input-trailing {
  inline-size: min(100%, 26rem);
}
</style>
