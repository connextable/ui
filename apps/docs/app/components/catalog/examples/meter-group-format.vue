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
  { id: 'documents', label: '문서', value: '42' },
  { id: 'media', label: '미디어', value: '31' },
  { id: 'archives', label: '보관 파일', value: '7' },
] as const

</script>

<template>
  <UIMeterGroup :format-value="(value) => `${value} GB`" :format-total="(total, max) => `${total} / ${max} GB`" :items="items" max="100" label="저장 용량">
    <UIMeterGroupValueText />
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
  </UIMeterGroup>
</template>
