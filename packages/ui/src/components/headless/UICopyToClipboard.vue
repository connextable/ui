<script setup lang="ts">
import { onScopeDispose, ref, shallowRef, toValue, watch } from "vue";

const props = withDefaults(defineProps<{
  value: string | (() => string | null | undefined);
  copiedDuration?: number;
}>(), { copiedDuration: 1500 });

type Status = "idle" | "pending" | "copied" | "failed";
const status = ref<Status>("idle");
const error = shallowRef<unknown>();
let revision = 0;
let timer: ReturnType<typeof setTimeout> | undefined;

defineSlots<{
  default(state: { copy(): Promise<boolean>; status: Status; pending: boolean; copied: boolean; error: unknown }): unknown;
}>();

function reset() {
  revision++;
  clearTimeout(timer);
  status.value = "idle";
  error.value = undefined;
}

async function copy() {
  if (status.value === "pending") return false;
  reset();
  const attempt = revision;
  status.value = "pending";
  try {
    const value = toValue(props.value);
    if (value == null) throw new Error("No text is available to copy.");
    const clipboard = globalThis.navigator?.clipboard;
    if (!clipboard?.writeText) throw new Error("Clipboard writing is unavailable.");
    await clipboard.writeText(value);
    if (attempt !== revision) return false;
    status.value = "copied";
    timer = setTimeout(reset, props.copiedDuration);
    return true;
  } catch (cause) {
    if (attempt === revision) {
      error.value = cause;
      status.value = "failed";
    }
    return false;
  }
}

watch(() => props.value, reset, { flush: "sync" });
onScopeDispose(reset);
</script>

<template>
  <slot :copy="copy" :status="status" :pending="status === 'pending'" :copied="status === 'copied'" :error="error" />
</template>
