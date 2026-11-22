import { CircleCheck, X } from "@lucide/vue";
import { ToastClose, ToastDescription, ToastRoot, ToastTitle, type ToastRootSlotProps } from "@sectile/vue/toast";
import { defineComponent, h, type Component, type PropType } from "vue";
import UIIconButton from "../button/UIIconButton.vue";
import UIItemIcon from "../UIItemIcon.vue";
import { controlFlag } from "../clear/clearable";

export const UIToast = defineComponent({
  name: "UIToast",
  inheritAttrs: false,
  props: { icon: [Object, Function] as PropType<Component> },
  setup(props, { attrs, slots }) {
    return () => h(ToastRoot as Component, attrs, slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])
      ? slots
      : { default: ({ toast }: ToastRootSlotProps) => [
        (props.icon || toast?.kind === "success") &&
          h(UIItemIcon, { icon: props.icon ?? CircleCheck, class: "ui-toast__status-icon" }),
        h(ToastTitle),
        toast?.description && h(ToastDescription),
        h(ToastClose as Component, { asChild: true }, () => h(UIIconButton, { size: "sm", variant: "ghost", icon: X })),
      ] });
  },
}) as unknown as { new(): InstanceType<typeof ToastRoot> & { $props: { icon?: Component } } };
