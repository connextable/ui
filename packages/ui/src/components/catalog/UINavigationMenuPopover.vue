<script setup lang="ts">
import { ChevronDown, ChevronLeft, ChevronRight } from "@lucide/vue";
import { PopoverRoot, PopoverContent, PopoverPortal, PopoverTrigger } from "@sectile/vue/popover";
import { computed, nextTick, ref, useTemplateRef, watch } from "vue";
import UIButton from "../button/UIButton.vue";

export interface UINavigationMenuEntry {
  id: string;
  label: string;
  href?: string;
  description?: string;
  disabled?: boolean;
  children?: readonly UINavigationMenuEntry[];
}

const props = defineProps<{
  items: readonly UINavigationMenuEntry[];
  label: string;
  current?: string;
}>();
const open = defineModel<boolean>("open", { default: false });
const path = ref<UINavigationMenuEntry[]>([]);
const menu = useTemplateRef<HTMLElement>("menu");
const parent = computed(() => path.value.at(-1));
const entries = computed(() => parent.value?.children ?? props.items);

defineSlots<{ trigger?(state: { open: boolean }): unknown }>();

async function changeLevel(entry?: UINavigationMenuEntry) {
  const previous = entry ? undefined : path.value.pop();
  if (entry) path.value.push(entry);
  await nextTick();
  const branch = previous && Array.from(menu.value?.querySelectorAll<HTMLButtonElement>("[data-branch]") ?? [])
    .find(button => button.dataset.branch === previous.id);
  (branch || menu.value)?.focus({ preventScroll: true });
}

watch(open, value => {
  if (value) path.value = [];
}, { flush: "sync" });
watch(() => props.items, () => { open.value = false; });
</script>

<template>
  <PopoverRoot v-model:open="open" :label="label" side="bottom" align="start">
    <PopoverTrigger as-child>
      <slot name="trigger" :open="open">
        <UIButton size="sm" variant="outline">
          {{ label }}
          <template #trailing><ChevronDown /></template>
        </UIButton>
      </slot>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent class="ui-navigation-popover" :aria-label="label">
        <nav ref="menu" :aria-label="parent?.label ?? label" tabindex="-1">
          <header v-if="parent" class="ui-navigation-popover__heading">
            <UIButton size="sm" variant="ghost" icon-only aria-label="상위 메뉴로" @click="changeLevel()">
              <template #leading><ChevronLeft /></template>
            </UIButton>
            <strong>{{ parent.label }}</strong>
          </header>
          <ul class="ui-navigation-popover__links">
            <li v-for="entry in entries" :key="entry.id">
              <button
                v-if="entry.children?.length"
                type="button"
                class="ui-navigation-popover__row"
                :data-branch="entry.id"
                :disabled="entry.disabled"
                @click="changeLevel(entry)"
              >
                <span>{{ entry.label }}<small v-if="entry.description">{{ entry.description }}</small></span>
                <ChevronRight :size="16" aria-hidden="true" />
              </button>
              <a
                v-else
                class="ui-navigation-popover__row"
                :href="entry.disabled ? undefined : entry.href"
                :role="entry.disabled ? 'link' : undefined"
                :aria-disabled="entry.disabled || undefined"
                :aria-current="current === entry.id ? 'page' : undefined"
                @click="!entry.disabled && (open = false)"
              >{{ entry.label }}<small v-if="entry.description">{{ entry.description }}</small></a>
            </li>
          </ul>
        </nav>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
