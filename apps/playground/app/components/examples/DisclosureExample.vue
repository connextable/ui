<script setup lang="ts">
import { UIDisclosure, UIDisclosureContent, UIDisclosureTrigger } from "@connextable/ui";
</script>

<template>
  <UIDisclosure variant="outline">
    <UIDisclosureTrigger variant="ghost">상세 정보</UIDisclosureTrigger>
    <UIDisclosureContent divided>변경 사항은 저장 후에 적용됩니다.</UIDisclosureContent>
  </UIDisclosure>
</template>
