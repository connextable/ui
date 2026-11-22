<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import { PopoverRoot, PopoverContent, PopoverPortal } from "@sectile/vue/popover";
import { computed, nextTick, onBeforeUnmount, shallowRef, useId, useTemplateRef, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { UIAnchor } from "./anchor";
import { useNavigationPanelMotion } from "./useNavigationPanelMotion";

export interface UINavigationMenuEntry {
  id: string;
  label: string;
  href?: string;
  to?: RouteLocationRaw;
  external?: boolean;
  description?: string;
  disabled?: boolean;
  children?: readonly UINavigationMenuEntry[];
}

interface LinkGroup {
  id: string;
  label?: string;
  links: readonly UINavigationMenuEntry[];
}

const props = defineProps<{
  items: readonly UINavigationMenuEntry[];
  label: string;
  current?: string;
}>();
const open = defineModel<boolean>("open", { default: false });
defineSlots<{
  label?(state: { entry: UINavigationMenuEntry; open: boolean }): unknown;
}>();

const rail = useTemplateRef<HTMLElement>("rail");
const panel = useTemplateRef<HTMLElement>("panel");
const panelID = useId();
const activeID = shallowRef<string>();
const anchor = shallowRef<HTMLElement | null>(null);
let hoverTimer: ReturnType<typeof setTimeout> | undefined;
let pendingFocus: MutationObserver | undefined;

const branches = computed(() => props.items.filter(entry => entry.children?.length && !entry.disabled));
const active = computed(() => branches.value.find(entry => entry.id === activeID.value) ?? branches.value[0]);
const displayed = computed(() => open.value && !!active.value);

function collectGroups(entry: UINavigationMenuEntry, label?: string): LinkGroup[] {
  const children = entry.children ?? [];
  const links = children.filter(child => !child.children?.length);
  const groups: LinkGroup[] = links.length ? [{ id: entry.id, label, links }] : [];
  for (const child of children) {
    if (child.children?.length && !child.disabled) {
      groups.push(...collectGroups(child, label ? `${label} / ${child.label}` : child.label));
    }
  }
  return groups;
}

const groups = computed(() => active.value ? collectGroups(active.value) : []);
const widePanel = computed(() =>
  groups.value.length > 1 ||
  groups.value.some(group => group.links.length > 1 && group.links.some(link => link.description)),
);

const resetPanelMotion = useNavigationPanelMotion(panel, displayed, () => [anchor.value, groups.value]);

function cancelHover() {
  clearTimeout(hoverTimer);
}

function scrollRail(event: Event) {
  cancelHover();
  if (!displayed.value || !anchor.value) return;
  const railBounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const triggerBounds = anchor.value.getBoundingClientRect();
  if (triggerBounds.right <= railBounds.left || triggerBounds.left >= railBounds.right) {
    open.value = false;
  }
}

function activate(entry: UINavigationMenuEntry, target: HTMLElement, keyboard = false) {
  if (!target.isConnected) return;
  pendingFocus?.disconnect();
  activeID.value = entry.id;
  anchor.value = target;
  open.value = true;
  if (keyboard) {
    void nextTick(() => {
      const links = panel.value;
      const surface = links?.parentElement;
      if (!links || !surface || !displayed.value || active.value?.id !== entry.id) return;

      // The positioner keeps the surface invisible until it has placed the panel.
      const focusWhenVisible = () => {
        if (surface.hidden || surface.inert || getComputedStyle(surface).visibility === "hidden") return;
        observer.disconnect();
        (links.querySelector<HTMLElement>("a[href]") ?? surface).focus({ preventScroll: true });
      };
      const observer = new MutationObserver(focusWhenVisible);
      pendingFocus = observer;
      observer.observe(surface, { attributeFilter: ["style", "hidden", "inert"] });
      focusWhenVisible();
    });
  }
}

function hover(entry: UINavigationMenuEntry, event: PointerEvent) {
  if (event.pointerType !== "mouse") return;
  cancelHover();
  if (panel.value?.matches(":focus-within")) return;
  if (!entry.children?.length || entry.disabled) {
    open.value = false;
    return;
  }
  const target = event.currentTarget as HTMLElement;
  if (displayed.value) {
    if (active.value?.id !== entry.id) activate(entry, target);
  }
  else hoverTimer = setTimeout(() => activate(entry, target), 140);
}

function leave(event: PointerEvent) {
  if (event.pointerType !== "mouse") return;
  cancelHover();
  hoverTimer = setTimeout(() => {
    if (!panel.value?.matches(":focus-within")) open.value = false;
  }, 180);
}

function click(entry: UINavigationMenuEntry, event: MouseEvent) {
  cancelHover();
  const keyboard = event.detail === 0;
  const mouse = !keyboard && (!("pointerType" in event) || event.pointerType === "mouse");
  if (!mouse && !keyboard && displayed.value && entry.id === active.value?.id) {
    open.value = false;
    return;
  }
  activate(entry, event.currentTarget as HTMLElement, keyboard);
}

function focusPanel(entry: UINavigationMenuEntry, event: KeyboardEvent) {
  cancelHover();
  activate(entry, event.currentTarget as HTMLElement, true);
}

function dismiss(reason: string) {
  cancelHover();
  if (reason === "escape") {
    const trigger = anchor.value;
    void nextTick(() => {
      if (!displayed.value) trigger?.focus({ preventScroll: true });
    });
  }
}

function leaveFocus(event: FocusEvent) {
  if (event.relatedTarget instanceof Node && !panel.value?.contains(event.relatedTarget)) {
    open.value = false;
  }
}

watch(
  () => branches.value.some(entry => entry.id === activeID.value),
  (available) => {
    if (available) return;
    anchor.value = null;
    activeID.value = undefined;
    open.value = false;
  },
);
watch(displayed, visible => {
  if (!visible) pendingFocus?.disconnect();
});
onBeforeUnmount(() => {
  cancelHover();
  pendingFocus?.disconnect();
});
</script>

<template>
  <PopoverRoot
    :open="displayed"
    :anchor="anchor ?? rail"
    :label="active?.label ?? label"
    :described-by="null"
    :auto-focus="false"
    :restore-focus="false"
    :interact-outside-exclusions="rail ? [rail] : []"
    side="bottom"
    align="start"
    strategy="fixed"
    :side-offset="6"
    close-on-interact-outside
    @update:open="open = $event"
    @close-request="dismiss"
    @after-close="resetPanelMotion"
  >
    <nav ref="rail" class="ui-navigation-rail" :aria-label="label" @pointerenter="cancelHover" @pointerleave="leave">
      <ul class="ui-navigation-rail__items ui-scrollbar" @scroll="scrollRail">
        <li v-for="entry in items" :key="entry.id">
          <button
            v-if="entry.children?.length"
            class="ui-navigation-popover__row"
            type="button"
            :disabled="entry.disabled"
            :aria-expanded="displayed && active?.id === entry.id"
            :aria-controls="panelID"
            @pointerenter="hover(entry, $event)"
            @pointerleave="cancelHover"
            @click="click(entry, $event)"
            @keydown.down.prevent="focusPanel(entry, $event)"
          >
            <slot name="label" :entry="entry" :open="displayed && active?.id === entry.id">{{ entry.label }}</slot>
            <ChevronDown class="ui-navigation-rail__chevron" aria-hidden="true" />
          </button>
          <UIAnchor
            v-else
            class="ui-navigation-popover__row"
            :href="entry.href"
            :to="entry.to"
            :external="entry.external"
            :disabled="entry.disabled"
            :current="current === entry.id ? 'page' : undefined"
            @pointerenter="hover(entry, $event)"
            @click="open = false"
          >{{ entry.label }}</UIAnchor>
        </li>
      </ul>
    </nav>
    <PopoverPortal>
      <PopoverContent
        class="ui-navigation-popover"
        :data-wide="widePanel || undefined"
        tabindex="-1"
        @pointerenter="cancelHover"
        @pointerleave="leave"
      >
        <div :id="panelID" ref="panel" class="ui-navigation-popover__surface" @focusout="leaveFocus">
          <div :key="active?.id" class="ui-navigation-popover__groups">
            <div v-for="group in groups" :key="group.id">
              <b v-if="group.label" class="ui-navigation-popover__group-label">{{ group.label }}</b>
              <ul class="ui-navigation-popover__links">
                <li v-for="entry in group.links" :key="entry.id">
                  <UIAnchor
                    class="ui-navigation-popover__row"
                    :href="entry.href"
                    :to="entry.to"
                    :external="entry.external"
                    :disabled="entry.disabled"
                    :current="current === entry.id ? 'page' : undefined"
                    @click="open = false"
                  >
                    <span>{{ entry.label }}<small v-if="entry.description">{{ entry.description }}</small></span>
                  </UIAnchor>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
