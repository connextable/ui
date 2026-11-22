<script setup lang="ts">
import { UIDisclosure, UIDisclosureContent, UIDisclosureTrigger } from "@connextable/ui";
import { Keyboard } from "@lucide/vue";
</script>

<template>
  <UIDisclosure>
    <UIDisclosureTrigger size="sm" variant="outline" :icon="Keyboard">키보드 단축키</UIDisclosureTrigger>
    <UIDisclosureContent><kbd>Tab</kbd>으로 다음 항목으로 이동합니다.</UIDisclosureContent>
  </UIDisclosure>
</template>
