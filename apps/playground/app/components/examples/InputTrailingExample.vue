<script setup lang="ts">
import { UIButton, UIInput } from "@connextable/ui";
import { X } from "@lucide/vue";
import { ref, useId, useTemplateRef } from "vue";

const id = useId();
const query = ref("디자인 시스템");
const input = useTemplateRef("input");

function clearQuery() {
  input.value?.control?.clear();
  input.value?.focus();
}
</script>

<template>
  <div class="ui-field input-trailing">
    <label :for="id">검색어</label>
    <UIInput :id="id" ref="input" v-model="query" placeholder="검색어를 입력하세요">
      <template #trailing>
        <UIButton size="sm" variant="ghost" icon-only :disabled="!query" aria-label="검색어 지우기" @click="clearQuery">
          <template #leading><X /></template>
        </UIButton>
      </template>
    </UIInput>
  </div>
</template>

<style scoped>
.input-trailing {
  inline-size: min(100%, 26rem);
}
</style>
