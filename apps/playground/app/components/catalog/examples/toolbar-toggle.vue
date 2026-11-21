<script setup lang="ts">
import { UIToggleButton, UIToolbar, UIToolbarItem, UIToolbarSeparator } from "@connextable/ui";
import { Bold, Copy } from "@lucide/vue";
import { ref } from "vue";

const items = ["bold", "copy"];
const bold = ref(false);
const copied = ref(false);
</script>

<template>
  <div>
    <UIToolbar :items="items" label="문단 도구" @invoke="value => { if (value === 'copy') copied = true }">
      <UIToolbarItem value="bold" as-child>
        <UIToggleButton v-model:pressed="bold" aria-label="굵게">
          <Bold :size="16" aria-hidden="true" />
        </UIToggleButton>
      </UIToolbarItem>
      <UIToolbarSeparator />
      <UIToolbarItem value="copy" aria-label="복제"><Copy :size="16" aria-hidden="true" /></UIToolbarItem>
    </UIToolbar>
    <p :style="{ fontWeight: bold ? 700 : 400 }">회의 메모</p>
    <p v-if="copied">회의 메모 복제본</p>
  </div>
</template>
