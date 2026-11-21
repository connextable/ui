<script setup lang="ts">
import { UIDisclosure, UIDisclosureContent, UIDisclosureTrigger } from "@connextable/ui";
</script>

<template>
  <UIDisclosure default-value variant="outline">
    <UIDisclosureTrigger variant="ghost">보기 권한</UIDisclosureTrigger>
    <UIDisclosureContent divided>모든 구성원이 볼 수 있습니다.</UIDisclosureContent>
  </UIDisclosure>
</template>
