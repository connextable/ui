import { ContextMenuContent, ContextMenuRoot, ContextMenuTrigger, MenuButtonContent, MenuButtonRoot, MenuRoot, MenuSeparator, MenuSubContent, MenubarRoot, type MenuRootProps, type MenuRootSlotProps } from "@sectile/vue/menu";
import { ContextMenuSeparator, ContextMenuSubContent } from "@sectile/vue/context-menu";
import { MenubarContent, MenubarSeparator } from "@sectile/vue/menubar";
import { defineComponent, h, type Component, type PropType, type VNode, type VNodeChild } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { controlFlag } from "../clear/clearable";
import UIMenuButtonTrigger from "./UIMenuButtonTrigger.vue";
import UIMenuItem from "./UIMenuItem.vue";

type Command = MenuRootProps["items"][number] & {
  readonly label?: string;
  readonly shortcut?: string;
  readonly icon?: Component;
  readonly tone?: "danger";
  readonly to?: RouteLocationRaw;
  readonly href?: string;
  readonly separatorBefore?: boolean;
};
type MenuRootComponent = typeof MenuRoot | typeof MenuButtonRoot | typeof ContextMenuRoot | typeof MenubarRoot;
type ComposedMenu<Root extends MenuRootComponent> = new () => Omit<InstanceType<Root>, "$props" | "$slots"> & {
  $props: Omit<InstanceType<Root>["$props"], "items"> & { items: readonly Command[]; triggerLabel?: string };
  $slots: InstanceType<Root>["$slots"] & { trigger?: (state: MenuRootSlotProps) => VNodeChild };
};

function withCommands<Root extends MenuRootComponent>(root: Root, parts: {
  separator: Component;
  submenu: Component;
  trigger?: Component;
  content?: Component;
  menubar?: boolean;
}): ComposedMenu<Root> {
  return defineComponent({
    inheritAttrs: false,
    props: {
      items: { type: Array as PropType<readonly Command[]>, required: true },
      triggerLabel: String,
    },
    setup(props, { attrs, slots }) {
      return () => {
        if (slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])) return h(root as Component, { ...attrs, items: props.items }, slots);

        const children = new Map<string | null, Command[]>();
        const labels = new Map<string, string>();
        for (const item of props.items) {
          labels.set(item.id, item.label ?? item.id);
          const siblings = children.get(item.parentID);
          if (siblings) siblings.push(item);
          else children.set(item.parentID, [item]);
        }
        const display = (id: string) => labels.get(id) ?? id;

        function renderRows(parent: string | null): VNode[] {
          return (children.get(parent) ?? []).flatMap(item => {
            const nodes = [h(UIMenuItem, {
              key: `item:${item.id}`, value: item.id, icon: item.icon, tone: item.tone, to: item.to, href: item.href,
              as: parts.menubar && !item.to && !item.href ? "button" : undefined,
            }, () => [display(item.id), item.shortcut && h("kbd", item.shortcut)])];
            if (item.separatorBefore) nodes.unshift(h(parts.separator, { key: `separator:${item.id}` }));
            if (children.has(item.id)) nodes.push(h(parts.submenu, { key: `submenu:${item.id}`, for: item.id }, () => renderRows(item.id)));
            return nodes;
          });
        }

        const textValue = attrs.textValue ?? attrs["text-value"] ?? display;
        const { "text-value": _textValue, ...bindings } = attrs;
        return h(root as Component, { ...bindings, items: props.items, textValue }, {
          default: (state: MenuRootSlotProps) => parts.trigger && parts.content ? [
            h(parts.trigger, { asChild: Boolean(slots.trigger) }, () => slots.trigger?.(state) ?? props.triggerLabel ?? String(attrs.label ?? "메뉴")),
            h(parts.content, null, () => renderRows(null)),
          ] : renderRows(null),
        });
      };
    },
  }) as unknown as ComposedMenu<Root>;
}

export const UIMenu = withCommands(MenuRoot, { separator: MenuSeparator, submenu: MenuSubContent });
export const UIMenuButton: ComposedMenu<typeof MenuButtonRoot> = withCommands(MenuButtonRoot, {
  separator: MenuSeparator, submenu: MenuSubContent, trigger: UIMenuButtonTrigger, content: MenuButtonContent,
});
export const UIContextMenu: ComposedMenu<typeof ContextMenuRoot> = withCommands(ContextMenuRoot, {
  separator: ContextMenuSeparator, submenu: ContextMenuSubContent, trigger: ContextMenuTrigger, content: ContextMenuContent,
});
export const UIMenubar = withCommands(MenubarRoot, { separator: MenubarSeparator, submenu: MenubarContent, menubar: true });
