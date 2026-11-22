import { CircleCheck, X } from "@lucide/vue";
import { ToastClose, ToastDescription, ToastRoot, ToastTitle, type ToastRootSlotProps } from "@sectile/vue/toast";
import { defineComponent, h, type Component } from "vue";
import UIIconButton from "../button/UIIconButton.vue";
import { controlFlag } from "../clear/clearable";

export const UIToast = defineComponent({
  name: "UIToast",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(ToastRoot as Component, attrs, slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])
      ? slots
      : { default: ({ toast }: ToastRootSlotProps) => [
        toast?.kind === "success" && h(CircleCheck, { size: 16, "aria-hidden": "true", class: "ui-toast__status-icon" }),
        h(ToastTitle),
        toast?.description && h(ToastDescription),
        h(ToastClose as Component, { asChild: true }, () => h(UIIconButton, { size: "sm", variant: "ghost", icon: X })),
      ] });
  },
}) as unknown as typeof ToastRoot;
