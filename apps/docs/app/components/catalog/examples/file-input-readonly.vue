<script setup lang="ts">
import { UIFileInput } from "@connextable/ui";
import { ref } from "vue";

const contract = new File(["확정한 납품 일정"], "확정된 납품 일정.txt", { type: "text/plain" });

const files = ref([contract]);
</script>

<template>
  <UIFileInput label="확정된 첨부 파일" v-model="files" hint="문서가 확정되어 첨부 파일을 변경할 수 없습니다." readonly />
</template>
