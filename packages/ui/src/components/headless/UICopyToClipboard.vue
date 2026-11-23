<script setup lang="ts">
import { onScopeDispose, ref, shallowRef, toValue, watch } from "vue";
import { createUICopyAction, type UICopySource } from "./actions";

const props = withDefaults(defineProps<{
  value: UICopySource;
  copiedDuration?: number;
}>(), { copiedDuration: 1500 });

type Status = "idle" | "pending" | "copied" | "failed";
const status = ref<Status>("idle");
const error = shallowRef<unknown>();
let revision = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
const write = createUICopyAction(() => toValue(props.value));

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
    await write();
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
