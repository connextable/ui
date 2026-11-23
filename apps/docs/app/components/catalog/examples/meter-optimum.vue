<script setup lang="ts">
import { UIButton, UIMeter, UIMeterIndicator, UIMeterTrack, UIMeterValueText } from "@connextable/ui";
import { ref } from "vue";

const value = ref(25);
</script>

<template>
  <div class="measurement-change">
    <UIMeter :value="value" :min="0" :max="100" :optimum="25" :low="40" :high="70" label="요청 대기 시간" v-slot="{ zone }">
      <UIMeterTrack><UIMeterIndicator /></UIMeterTrack>
      <UIMeterValueText />
      <output>{{ zone === "optimum" ? "권장 구간" : zone === "suboptimal" ? "주의 구간" : "권장 범위 밖" }}</output>
    </UIMeter>
    <UIButton size="sm" variant="outline" @click="value = value === 25 ? 80 : 25">다른 측정값 보기</UIButton>
  </div>
</template>

<style scoped>
.measurement-change {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  justify-items: start;
  gap: var(--ui-space-md);
  inline-size: 26rem;
  max-inline-size: 100%;
}
</style>
