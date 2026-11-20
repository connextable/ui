<template>
  <span class="ui-spinner-arc" aria-hidden="true" />
</template>

<style scoped>
@property --ui-spinner-arc-start {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

@property --ui-spinner-arc-sweep {
  syntax: "<angle>";
  inherits: false;
  initial-value: 52deg;
}

.ui-spinner-arc {
  --ui-spinner-arc-start: 0deg;
  --ui-spinner-arc-sweep: 52deg;

  border-radius: 50%;
  background: conic-gradient(
    from calc(-90deg + var(--ui-spinner-arc-start)),
    currentColor var(--ui-spinner-arc-sweep),
    transparent 0
  );
  mask: radial-gradient(farthest-side, transparent 80%, #000 89%);
  animation:
    ui-spinner-arc-spin 1.1s linear infinite,
    ui-spinner-arc-trim 1.8s var(--ui-spinner-ease) infinite;
}

@keyframes ui-spinner-arc-spin {
  to {
    transform: rotate(1turn);
  }
}

@keyframes ui-spinner-arc-trim {
  50% {
    --ui-spinner-arc-start: 82deg;
    --ui-spinner-arc-sweep: 278deg;
  }

  to {
    --ui-spinner-arc-start: 360deg;
    --ui-spinner-arc-sweep: 52deg;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-spinner-arc {
    --ui-spinner-arc-start: 35deg;
    --ui-spinner-arc-sweep: 112deg;

    animation: none;
  }
}

@media (forced-colors: active) {
  .ui-spinner-arc {
    forced-color-adjust: preserve-parent-color;
  }
}
</style>
