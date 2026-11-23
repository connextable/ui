<script setup lang="ts">
import { UIButton, UIFileInput, UIFormActions } from "@connextable/ui";
import { useTemplateRef } from "vue";

const attachment = useTemplateRef("attachment");
const sample = new File(["신규 문서 검토"], "검토 메모.txt", { type: "text/plain" });
</script>

<template>
  <div class="ui-field">
    <UIFileInput ref="attachment" label="검토할 문서" />
    <UIFormActions><UIButton size="sm" variant="outline" @click="attachment?.selectFiles([sample])">검토 메모 선택</UIButton></UIFormActions>
  </div>
</template>
