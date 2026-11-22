<script setup lang="ts">
import { UIInput } from "@connextable/ui";
import { ref } from "vue";

const text = ref("Connextable UI");
</script>

<template>
  <div class="ui-field">
    <label for="workspace-name">워크스페이스 이름</label>
    <UIInput id="workspace-name" v-model="text" readonly />
  </div>
</template>
