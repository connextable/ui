<template>
  <div class="ui-dashboard-navbar">
    <div v-if="$slots.leading" class="ui-dashboard-navbar__leading">
      <slot name="leading" />
    </div>
    <div v-if="$slots.default" class="ui-dashboard-navbar__content">
      <slot />
    </div>
    <div v-if="$slots.trailing" class="ui-dashboard-navbar__trailing">
      <slot name="trailing" />
    </div>
  </div>
</template>

<style scoped>
.ui-dashboard-navbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.875rem;
  min-block-size: var(--ui-dashboard-navbar-height, 3.5rem);
  box-sizing: border-box;
  padding: 0.5rem var(--ui-dashboard-bar-padding-inline, 1.25rem);
}

.ui-dashboard-navbar__content {
  flex: 1 1 10rem;
  min-inline-size: 0;
  overflow-wrap: anywhere;
}

.ui-dashboard-navbar__leading,
.ui-dashboard-navbar__trailing {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  min-inline-size: 0;
}

.ui-dashboard-navbar__trailing {
  margin-inline-start: auto;
}
</style>
