<script setup lang="ts">
import { TreeSelectInput } from "@sectile/vue/tree-select";
import { nextTick, type VNode } from "vue";
import UIFieldClear from "../clear/UIFieldClear.vue";
import UIOpeningIcon from "../UIOpeningIcon.vue";

defineOptions({ inheritAttrs: false });
const props = defineProps<{
  selected?: boolean;
  displayValue?: string;
  query?: string;
  asChild?: boolean;
}>();

let displayedSelection: string | undefined;
let previousDisplayValue = props.displayValue;
let wasOpen = false;
let editing = false;
let composing = false;
let observedInput: HTMLInputElement | undefined;
let observer: MutationObserver | undefined;

function projectValue(input: HTMLInputElement) {
  if (props.displayValue === undefined || composing) return;

  const open = input.getAttribute("aria-expanded") === "true";
  if ((wasOpen && !open) || previousDisplayValue !== props.displayValue) editing = false;
  wasOpen = open;
  previousDisplayValue = props.displayValue;

  const query = props.query ?? (input.value === displayedSelection ? "" : input.value);
  const searching = editing || (open && query !== "");
  const selection = props.displayValue && !searching
    ? props.displayValue
    : undefined;
  if (selection === undefined) {
    if (input.value === displayedSelection && input.value !== query) input.value = query;
  } else if (input.value !== selection || selection !== displayedSelection) {
    if (input.value !== selection) input.value = selection;
    if (input.matches(":focus")) input.setSelectionRange(selection.length, selection.length);
  }
  displayedSelection = selection;
}

function stopObserving() {
  observer?.disconnect();
  observer = undefined;
  observedInput = undefined;
}

function syncValue({ el }: VNode) {
  if (!(el instanceof HTMLInputElement) || props.displayValue === undefined) return;
  if (observedInput !== el) {
    stopObserving();
    observedInput = el;
    // The primitive can rewrite the query and ARIA state without triggering a Vue update.
    observer = new MutationObserver(() => {
      void nextTick(() => {
        if (observedInput === el) projectValue(el);
      });
    });
    observer.observe(el, { attributeFilter: ["aria-expanded"] });
  }
  projectValue(el);
}

function markEditing(event: Event) {
  if (!composing && !event.defaultPrevented) editing = true;
}

function startComposition() {
  composing = true;
}

function endComposition(event: CompositionEvent) {
  composing = false;
  if (event.data) markEditing(event);
}
</script>

<template>
  <div class="ui-tree-select-field" :data-has-selection="selected || undefined">
    <TreeSelectInput
      v-bind="$attrs"
      :as-child="asChild"
      @vue:mounted="syncValue"
      @vue:updated="syncValue"
      @vue:before-unmount="stopObserving"
      @input="markEditing"
      @compositionstart="startComposition"
      @compositionend="endComposition"
    ><slot /></TreeSelectInput>
    <UIFieldClear v-if="!asChild" />
    <UIOpeningIcon class="ui-tree-select-field__indicator" />
  </div>
</template>
