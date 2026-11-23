<script setup lang="ts">
import { Primitive, type PrimitiveAs } from "@sectile/vue/primitive";
import { onMounted, ref, shallowRef, watch } from "vue";

const props = withDefaults(defineProps<{
  as?: PrimitiveAs;
  asChild?: boolean;
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
  disabled?: boolean;
  fallback?: boolean;
}>(), { threshold: 0 });

const emit = defineEmits<{
  enter: [entry: IntersectionObserverEntry | null];
  leave: [entry: IntersectionObserverEntry | null];
}>();
defineSlots<{ default(state: { inView: boolean; hasEntered: boolean }): unknown }>();

const element = shallowRef<Element | null>(null);
const inView = ref(false);
const hasEntered = ref(false);
const mounted = ref(false);
onMounted(() => { mounted.value = true; });

function setElement(value: unknown) {
  element.value = value instanceof Element ? value : null;
}

function update(visible: boolean, entry: IntersectionObserverEntry | null) {
  if (inView.value === visible) return;
  inView.value = visible;
  if (visible) {
    hasEntered.value = true;
    emit("enter", entry);
  } else {
    emit("leave", entry);
  }
}

watch(element, () => {
  inView.value = false;
  hasEntered.value = false;
}, { flush: "sync" });

watch(() => [mounted.value, element.value, props.disabled, props.root, props.rootMargin, props.threshold, props.once, props.fallback] as const,
  ([ready, target, disabled, root, rootMargin, threshold, once, fallback], _, onCleanup) => {
    if (!ready || !target || disabled || (once && hasEntered.value)) return;
    if (typeof IntersectionObserver === "undefined") {
      update(fallback, null);
      return;
    }
    let active = true;
    const observer = new IntersectionObserver(entries => {
      if (!active || (once && hasEntered.value)) return;
      const entry = entries.at(-1);
      if (!entry) return;
      update(entry.isIntersecting && entry.intersectionRatio >= threshold, entry);
      if (once && hasEntered.value) observer.disconnect();
    }, { root, rootMargin, threshold });
    observer.observe(target);
    onCleanup(() => { active = false; observer.disconnect(); });
  }, { flush: "post", immediate: true });
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :element-ref="setElement">
    <slot :in-view="inView" :has-entered="hasEntered" />
  </Primitive>
</template>
