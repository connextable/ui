import { defineComponent, h, nextTick, type Component } from "vue";
import UIClearButton from "./UIClearButton.vue";
import { controlFlag } from "./clearable";
import { resolveClearFocus } from "./clear-focus";

export function withClearButton<Part extends Component>(part: Part, defaultLabel: string): Part {
  return defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () => {
        if (attrs.as || controlFlag(attrs.asChild ?? attrs["as-child"]) || slots.default) {
          return h(part, attrs, slots);
        }
        const { "aria-label": label, ...rest } = attrs;
        return h(part, { ...rest, asChild: true }, {
          default: () => h(UIClearButton, {
            label: typeof label === "string" ? label : defaultLabel,
            class: "ui-clear-button--when-available",
            onClick: (event: MouseEvent) => {
              void nextTick(resolveClearFocus(event));
            },
          }),
        });
      };
    },
  }) as Part;
}
