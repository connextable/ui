<script setup lang="ts">
import {
  UIMeter,
  UIMeterIndicator,
  UIMeterTrack,
  UIMeterValueText,
} from "@connextable/ui";

</script>

<template>
  <UIMeter value="82" min="0" max="100" label="저장소 사용률" :format-value="value => `${value}%`">
    <div class="meter-example__header">
      <span>저장소 사용률</span>
      <UIMeterValueText />
    </div>
    <UIMeterTrack><UIMeterIndicator /></UIMeterTrack>
    <div class="meter-example__scale" aria-hidden="true"><span>0%</span><span>100%</span></div>
  </UIMeter>
</template>

<style scoped>
.meter-example__header,
.meter-example__scale {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--ui-space-sm);
}

.meter-example__header {
  font-size: var(--ui-font-size-body-sm);
  font-weight: 550;
}

.meter-example__header > [data-part="value-text"] {
  order: 0;
}

.meter-example__scale {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}
</style>
