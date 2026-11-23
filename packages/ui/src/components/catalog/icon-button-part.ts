import { defineComponent, h, type Component } from "vue";
import UIButton, { type UIButtonProps } from "../button/UIButton.vue";

export function iconButtonPart<Part extends Component>(
  Part: Part,
  Icon: Component,
  label: string,
  variant: UIButtonProps["variant"] = "outline",
): Part {
  return defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () => {
        if (attrs.as || attrs.asChild || attrs["as-child"] === "" || attrs["as-child"] || slots.default) {
          return h(Part, attrs, slots);
        }
        return h(Part, { "aria-label": label, ...attrs, asChild: true }, {
          default: () => h(UIButton, { variant, size: "sm", iconOnly: true }, {
            default: () => h(Icon, { "aria-hidden": "true" }),
          }),
        });
      };
    },
  }) as Part;
}
