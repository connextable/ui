<script setup lang="ts">
import { UIInput } from "@connextable/ui";
</script>

<template>
  <div class="ui-field input-readonly">
    <label for="workspace-name">워크스페이스 이름</label>
    <UIInput id="workspace-name" model-value="Connextable UI" readonly />
  </div>
</template>

<style scoped>
.input-readonly {
  inline-size: min(100%, 26rem);
}
</style>
