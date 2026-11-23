<script setup lang="ts">
import { UIDisclosure, UIDisclosureContent, UIDisclosureTrigger } from "@connextable/ui";
</script>

<template>
  <UIDisclosure variant="outline">
    <UIDisclosureTrigger variant="ghost">상세 정보</UIDisclosureTrigger>
    <UIDisclosureContent divided>
      <dl class="release-details">
        <div><dt>환경</dt><dd>스테이징</dd></div>
        <div><dt>브랜치</dt><dd><code>release/2026.08</code></dd></div>
      </dl>
    </UIDisclosureContent>
  </UIDisclosure>
</template>

<style scoped>
.release-details {
  display: grid;
  gap: var(--ui-space-sm);
  margin: 0;
  font-size: var(--ui-font-size-body-sm);
}

.release-details > div {
  display: grid;
  grid-template-columns: minmax(4rem, auto) 1fr;
  align-items: baseline;
  gap: var(--ui-space-sm);
}

.release-details dd {
  min-inline-size: 0;
  margin: 0;
  color: var(--ui-color-text);
}
</style>
