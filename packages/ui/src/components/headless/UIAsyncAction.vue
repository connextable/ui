<script setup lang="ts" generic="Result">
import { onScopeDispose, ref, shallowRef } from "vue";
import type { UIAsyncActionHandler } from "./actions";

const props = defineProps<{
  action: UIAsyncActionHandler<Result>;
  disabled?: boolean;
}>();

type Status = "idle" | "pending" | "succeeded" | "failed";
const status = ref<Status>("idle");
const result = shallowRef<Result>();
const error = shallowRef<unknown>();
let attempt: AbortController | undefined;
let disposed = false;

defineSlots<{
  default(state: { status: Status; pending: boolean; result: Result | undefined; error: unknown;
    run(): Promise<boolean>; cancel(): void }): unknown;
}>();

function cancel() {
  if (!attempt) return;
  const current = attempt;
  attempt = undefined;
  status.value = "idle";
  current.abort();
}

async function run() {
  if (disposed || props.disabled || attempt) return false;
  const current = new AbortController();
  attempt = current;
  status.value = "pending";
  result.value = undefined;
  error.value = undefined;
  try {
    const value = await props.action({ signal: current.signal });
    if (attempt !== current) return false;
    result.value = value;
    status.value = "succeeded";
    return true;
  } catch (cause) {
    if (attempt === current) {
      error.value = cause;
      status.value = "failed";
    }
    return false;
  } finally {
    if (attempt === current) attempt = undefined;
  }
}

onScopeDispose(() => { disposed = true; cancel(); });
</script>

<template>
  <slot :status="status" :pending="status === 'pending'" :result="result" :error="error" :run="run" :cancel="cancel" />
</template>
