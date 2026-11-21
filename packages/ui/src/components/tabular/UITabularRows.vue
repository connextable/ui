<template>
  <TransitionGroup name="ui-tabular-rows">
    <slot />
  </TransitionGroup>
</template>

<style>
@layer ui.sectile {
  .ui-tabular-rows-move {
    transition: transform var(--ui-motion-standard) var(--ui-ease-out);
  }

  .ui-tabular-rows-enter-active {
    transition: opacity var(--ui-motion-fast) var(--ui-ease-out);
  }

  .ui-tabular-rows-enter-from {
    opacity: 0;
  }

  /* Remove outgoing rows before measuring the new table layout. */
  .ui-tabular-rows-leave-active {
    display: none;
  }
}
</style>
