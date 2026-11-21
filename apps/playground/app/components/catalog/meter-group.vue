<script setup lang="ts">
import {
  UIMeterGroup,
  UIMeterGroupIndicator,
  UIMeterGroupItem,
  UIMeterGroupItemIndicator,
  UIMeterGroupItemLabel,
  UIMeterGroupItemValue,
  UIMeterGroupList,
  UIMeterGroupSegment,
  UIMeterGroupTrack,
  UIMeterGroupValueText,
} from "@connextable/ui";

const items = [
  { id: "documents", label: "문서", value: 42 },
  { id: "media", label: "미디어", value: 31 },
  { id: "archives", label: "보관 파일", value: 7 },
] as const;

</script>

<template>
  <UIMeterGroup
    :items="items"
    max="100"
    label="팀 저장 공간"
    :format-value="value => `${value} GB`"
    :format-total="(total, max) => `${total} / ${max} GB`"
    v-slot="{ remaining }"
  >
    <div class="storage-example__header">
      <span>팀 저장 공간</span>
      <UIMeterGroupValueText />
    </div>
    <UIMeterGroupTrack>
      <UIMeterGroupSegment v-for="item in items" :key="item.id" :id="item.id">
        <UIMeterGroupIndicator />
      </UIMeterGroupSegment>
    </UIMeterGroupTrack>
    <UIMeterGroupList>
      <UIMeterGroupItem v-for="item in items" :key="item.id" :id="item.id">
        <UIMeterGroupItemIndicator />
        <UIMeterGroupItemLabel />
        <UIMeterGroupItemValue />
      </UIMeterGroupItem>
    </UIMeterGroupList>
    <small class="storage-example__remaining">{{ remaining }} GB 사용 가능</small>
  </UIMeterGroup>
</template>

<style scoped>
.storage-example__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--ui-space-xs) var(--ui-space-sm);
  font-size: var(--ui-font-size-body-sm);
  font-weight: 550;
}

.storage-example__header > [data-part="value-text"] {
  order: 0;
}

.storage-example__remaining {
  padding-block-start: var(--ui-space-xs);
  border-block-start: 1px solid var(--ui-color-divider);
  color: var(--ui-color-text-muted);
}
</style>
