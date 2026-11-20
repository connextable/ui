<template>
  <form class="ui-form">
    <slot />
    <output v-if="$slots.output" class="ui-form__output">
      <slot name="output" />
    </output>
  </form>
</template>

<style scoped>
.ui-form {
  display: grid;
  align-content: start;
  gap: var(--ui-space-md);
  inline-size: 100%;
  max-inline-size: var(--ui-form-max-inline-size, none);
  min-inline-size: 0;
  margin: 0;
}

.ui-form__output {
  min-block-size: 1lh;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
  line-height: var(--ui-line-height-body);
  overflow-wrap: anywhere;
}
</style>
