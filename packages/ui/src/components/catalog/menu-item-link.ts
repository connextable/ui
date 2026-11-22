import { MenuItem, type MenuItemSlotProps } from "@sectile/vue/menu";
import { defineComponent, h, mergeProps, type Component, type PropType, type SlotsType, type VNodeChild } from "vue";
import { linkProps, useLinkRenderer } from "../link-component";
import UIItemIcon from "../UIItemIcon.vue";

export const MenuItemLink = defineComponent({
  name: "UIMenuItemLink",
  inheritAttrs: false,
  props: {
    ...linkProps,
    value: { type: String, required: true },
    disabled: Boolean,
    as: [String, Object, Function] as PropType<string | Component>,
    asChild: Boolean,
    icon: [Object, Function] as PropType<Component>,
  },
  slots: Object as SlotsType<{ default: (state: MenuItemSlotProps) => VNodeChild }>,
  setup(props, { attrs, slots }) {
    const renderLink = useLinkRenderer();
    return () => {
      const { value, disabled, as, asChild, href, to } = props;
      const part = { disabled, as, asChild, href };
      const renderItem = (attributes: Record<string, unknown>) => h(MenuItem, { ...attributes, value }, props.icon && !asChild ? {
        default: (state: MenuItemSlotProps) => [
          h(UIItemIcon, { icon: props.icon, class: "ui-menu-item__leading" }), slots.default?.(state),
        ],
      } : slots);
      if (asChild || (as && as !== "a") || (to == null && href == null)) {
        return renderItem(mergeProps(attrs, part));
      }

      return renderLink(props, attrs, link => renderItem(mergeProps({
        onClickCapture(event: MouseEvent) {
          if ((event.currentTarget as HTMLAnchorElement).getAttribute("aria-disabled") === "true") {
            event.preventDefault();
            event.stopImmediatePropagation();
          }
        },
      }, attrs, {
        ...part,
        as: "a",
        ...link,
        href: disabled ? undefined : link.href,
        onKeydown(event: KeyboardEvent) {
          if (event.defaultPrevented || (event.key !== "Enter" && event.key !== " ")
            || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
          const anchor = event.currentTarget as HTMLAnchorElement;
          if (!anchor.hasAttribute("href")) return;
          // Route all menu link activation through the click and its menu selection.
          event.preventDefault();
          if (!event.repeat) anchor.click();
        },
      })), disabled);
    };
  },
});
