<script setup lang="ts">
import { UIInput } from "@connextable/ui";
import { ref, useId } from "vue";

const id = useId();
const name = ref("");
</script>

<template>
  <div class="ui-field input-example">
    <label :for="id">이름</label>
    <UIInput :id="id" v-model="name" placeholder="이름을 입력하세요" />
  </div>
</template>

<style scoped>
.input-example {
  inline-size: min(100%, 26rem);
}
</style>
