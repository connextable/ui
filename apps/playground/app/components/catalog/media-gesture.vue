<script setup lang="ts">
import { UIMediaGesture, type UIMediaGestureInput } from "@connextable/ui";
import { ref } from "vue";

const position = ref(50);
function nudge(distance: number) {
  position.value = Math.round(Math.min(100, Math.max(0, position.value + distance)));
}
function move(input: UIMediaGestureInput) {
  if (input.kind === "drag") nudge((input.after.x - input.before.x) / 2);
}
</script>

<template>
  <div class="crop-position">
    <UIMediaGesture as-child :start="() => true" :admit-pointer="() => true" @move="move">
      <div class="crop-position__surface" role="slider" tabindex="0" aria-label="이미지 자르기 위치"
        :aria-valuenow="position" aria-valuemin="0" aria-valuemax="100"
        @keydown.left.prevent="nudge(-5)" @keydown.right.prevent="nudge(5)"
        @keydown.home.prevent="position = 0" @keydown.end.prevent="position = 100"
        @keydown.up.prevent="nudge(5)" @keydown.down.prevent="nudge(-5)">
        <div class="crop-position__marker" aria-hidden="true" :style="{ left: `${position}%` }" />
      </div>
    </UIMediaGesture>
    <output>가로 위치 {{ position }}%</output>
  </div>
</template>

<style scoped>
.crop-position { inline-size: min(100%, 21rem); }
.crop-position__surface {
  position: relative;
  height: 6rem;
  margin-block-end: var(--ui-space-sm);
  overflow: hidden;
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-md);
  background: repeating-linear-gradient(90deg, var(--ui-color-surface), var(--ui-color-surface) calc(25% - 1px), var(--ui-color-border) 25%);
  touch-action: pan-y;
  cursor: ew-resize;
}
.crop-position__marker { position: absolute; inset-block: 0; border-inline-start: 3px solid var(--ui-color-accent); }
</style>
