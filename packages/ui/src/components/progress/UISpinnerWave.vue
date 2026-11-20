<template>
  <span class="ui-spinner-wave" aria-hidden="true">
    <span
      v-for="bar in 5"
      :key="bar"
      class="ui-spinner-wave__bar"
      :style="{ '--ui-spinner-bar': bar - 1 }"
    />
  </span>
</template>

<style scoped>
.ui-spinner-wave {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ui-spinner-wave__bar {
  inline-size: 10%;
  block-size: 80%;
  border-radius: var(--ui-radius-sm);
  background: currentColor;
  opacity: 0.55;
  scale: 1 0.35;
  animation: ui-spinner-wave-pulse 900ms var(--ui-spinner-ease) infinite;
  animation-delay: calc((var(--ui-spinner-bar) - 4) * var(--ui-spinner-stagger));
}

@keyframes ui-spinner-wave-pulse {
  50% {
    opacity: 1;
    scale: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-spinner-wave__bar {
    opacity: 0.72;
    animation: none;
  }

  .ui-spinner-wave__bar:nth-child(even) {
    scale: 1 0.65;
  }

  .ui-spinner-wave__bar:nth-child(3) {
    scale: 1;
  }
}
</style>
