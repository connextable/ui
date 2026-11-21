<script setup lang="ts">
import { UIInput, UITagsInput } from "@connextable/ui";
import { shallowRef } from "vue";

const tags = shallowRef<readonly string[]>(["디자인"]);
const sample = "디자인, 접근성, 성능";
</script>

<template>
  <div class="ui-field">
    <label class="ui-field">복사할 태그 <UIInput :model-value="sample" readonly /></label>
    <div class="ui-field">
      <span class="ui-field-label">태그 붙여넣기</span>
      <UITagsInput v-model="tags" label="태그 붙여넣기" split-paste placeholder="복사한 태그 붙여넣기" />
    </div>
  </div>
</template>
