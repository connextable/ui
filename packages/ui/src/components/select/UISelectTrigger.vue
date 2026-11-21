<script setup lang="ts">
import { SelectTrigger, type SelectRootSlotProps } from "@sectile/vue/select";
import UIPopupTriggerContent from "../catalog/UIPopupTriggerContent.vue";
import { definedControlAttrs } from "../control-attrs";
import UISelectValue from "./UISelectValue.vue";
import { useSelectContext, type UISelectOption } from "./select-context";

defineOptions({ inheritAttrs: false });
defineProps<{ variant?: "outline" | "soft" }>();
defineSlots<{
  default?(state: SelectRootSlotProps): unknown;
  leading?(): unknown;
  trailing?(): unknown;
  value?(scope: { value: string | null; option: UISelectOption | undefined }): unknown;
}>();

const { uid, triggerId, readonly, size, aria } = useSelectContext();
const valueId = `${uid}-value`;

function triggerBindings(attrs: Record<string, unknown>) {
  return definedControlAttrs({
    ...attrs,
    id: triggerId.value ?? attrs.id,
    "aria-labelledby": aria.value.labelledby ? `${aria.value.labelledby} ${valueId}` : attrs["aria-labelledby"],
    "aria-describedby": [
      aria.value.describedby,
      attrs["aria-describedby"],
      aria.value.label && !aria.value.labelledby && valueId,
    ].filter(Boolean).join(" ") || undefined,
    "aria-invalid": aria.value.invalid ?? attrs["aria-invalid"],
  });
}
</script>

<template>
  <SelectTrigger
    v-bind="triggerBindings($attrs)"
    v-slot="state"
    class="ui-field-control ui-popup-trigger ui-select-trigger"
    :data-size="size"
    :data-ui-control-size="size"
    :data-ui-readonly="readonly || undefined"
    :data-variant="variant ?? 'outline'"
  >
    <UIPopupTriggerContent :hide-indicator="readonly">
      <template v-if="$slots.leading" #leading><slot name="leading" /></template>
      <slot v-bind="state">
        <UISelectValue>
          <template v-if="$slots.value" #default="scope">
            <slot name="value" v-bind="scope" />
          </template>
        </UISelectValue>
      </slot>
      <template v-if="$slots.trailing" #trailing><slot name="trailing" /></template>
    </UIPopupTriggerContent>
  </SelectTrigger>
</template>

<style scoped>
.ui-select-trigger {
  inline-size: 100%;
  min-inline-size: 4.75rem;
}
</style>
