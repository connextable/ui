<template>
  <div class="playground-code-block">
    <slot />
  </div>
</template>

<style scoped>
.playground-code-block :deep(pre) {
  box-sizing: border-box;
  max-block-size: 20rem;
  margin: 0;
  overflow: auto;
  padding: 0.875rem 1rem;
  color: var(--ui-color-text);
  font: var(--ui-font-size-metadata)/1.65 var(--ui-font-mono);
}

.playground-code-block :deep(pre:focus-visible) {
  outline: 2px solid var(--ui-color-focus);
  outline-offset: -2px;
}
</style>
