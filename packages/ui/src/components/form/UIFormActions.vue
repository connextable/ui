<template>
  <div class="ui-form-actions">
    <slot />
  </div>
</template>

<style scoped>
.ui-form-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: var(--ui-space-sm) var(--ui-space-md);
}
</style>
