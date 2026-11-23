<script setup lang="ts">
import {
  UIButton,
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
import { computed, ref } from "vue";

const expanded = ref(false);
const items = computed(() => [
  { id: "docs", label: "문서", value: 25 },
  { id: "media", label: "미디어", value: expanded.value ? 52 : 12 },
]);
</script>

<template>
  <div class="usage-change">
    <UIMeterGroup :items="items" :max="100" :low="55" :high="75" :optimum="30" label="자료실 사용량" v-slot="{ zone }">
      <UIMeterGroupValueText />
      <UIMeterGroupTrack>
        <UIMeterGroupSegment v-for="item in items" :key="item.id" :id="item.id"><UIMeterGroupIndicator /></UIMeterGroupSegment>
      </UIMeterGroupTrack>
      <UIMeterGroupList>
        <UIMeterGroupItem v-for="item in items" :key="item.id" :id="item.id">
          <UIMeterGroupItemIndicator /><UIMeterGroupItemLabel /><UIMeterGroupItemValue />
        </UIMeterGroupItem>
      </UIMeterGroupList>
      <small role="status">{{ zone === "optimum" ? "여유 있음" : zone === "suboptimal" ? "용량 주의" : "용량 정리 필요" }}</small>
    </UIMeterGroup>
    <UIButton size="sm" variant="outline" @click="expanded = !expanded">미디어 사용량 변경</UIButton>
  </div>
</template>

<style scoped>
.usage-change {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  justify-items: start;
  gap: var(--ui-space-md);
  inline-size: 26rem;
  max-inline-size: 100%;
}
</style>
