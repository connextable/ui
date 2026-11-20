<template>
  <span class="ui-spinner-spokes" aria-hidden="true">
    <span
      v-for="segment in 8"
      :key="segment"
      class="ui-spinner-spokes__segment"
      :style="{ '--ui-spinner-segment': segment - 1 }"
    />
  </span>
</template>

<style scoped>
.ui-spinner-spokes {
  position: relative;
}

.ui-spinner-spokes__segment {
  position: absolute;
  inset: 0;
  rotate: calc(var(--ui-spinner-segment) * 45deg);
}

.ui-spinner-spokes__segment::before {
  position: absolute;
  top: 0;
  left: 50%;
  inline-size: 10%;
  block-size: 30%;
  border-radius: var(--ui-radius-sm);
  background: currentColor;
  content: "";
  opacity: 0.55;
  translate: -50% 0;
  scale: 1 0.45;
  transform-origin: center bottom;
  animation: ui-spinner-spoke-pulse 960ms var(--ui-spinner-ease) infinite;
  animation-delay: calc((var(--ui-spinner-segment) - 7) * var(--ui-spinner-stagger));
}

@keyframes ui-spinner-spoke-pulse {
  50% {
    opacity: 1;
    scale: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-spinner-spokes__segment::before {
    opacity: 0.72;
    scale: 1 0.55;
    animation: none;
  }

  .ui-spinner-spokes__segment:nth-child(odd)::before {
    scale: 1 0.75;
  }

  .ui-spinner-spokes__segment:is(:nth-child(3), :nth-child(7))::before {
    scale: 1;
  }
}
</style>
