<script setup lang="ts">
import { ArrowDown, ArrowUp, ArrowUpDown, ListFilter } from "@lucide/vue";
import UIButton from "../button/UIButton.vue";

defineProps<{
  kind: "sort" | "filter";
  label: string;
  active?: boolean;
}>();
</script>

<template>
  <UIButton
    class="ui-tabular-column-action"
    size="sm"
    variant="ghost"
    icon-only
    :aria-label="label"
    :title="label"
    :data-active="active || undefined"
  >
    <template #leading>
      <template v-if="kind === 'sort'">
        <ArrowUpDown class="ui-tabular-column-action__unsorted" />
        <ArrowUp class="ui-tabular-column-action__ascending" />
        <ArrowDown class="ui-tabular-column-action__descending" />
      </template>
      <ListFilter v-else />
    </template>
  </UIButton>
</template>

<style>
.ui-tabular-column-action {
  --ui-control-size-height: var(--ui-tabular-action-size, var(--ui-control-height-small));
  --ui-control-size-padding-block: 0px;
  --ui-control-size-radius: var(--ui-radius-sm);

  flex: none;
  min-inline-size: var(--ui-control-size-height);
  color: var(--ui-color-text-muted);
}

.ui-tabular-column-action:is([data-active], [aria-expanded="true"], [aria-pressed="true"]) {
  background: var(--ui-color-accent-soft);
  color: var(--ui-color-accent);
}
</style>
