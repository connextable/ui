<script setup lang="ts">
import { UIButton, UIFormActions, UITagsInput } from "@connextable/ui";
import { ref } from "vue";

const draft = ref("");
</script>

<template>
  <div class="ui-field">
    <UITagsInput v-model:input-value="draft" label="작업 태그" placeholder="새 태그" />
    <UIFormActions><UIButton size="sm" variant="outline" @click="draft = '접근성'">입력란에 ‘접근성’ 넣기</UIButton></UIFormActions>
  </div>
</template>
