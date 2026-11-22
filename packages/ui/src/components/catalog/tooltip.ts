import { TooltipArrow, TooltipContent, TooltipRoot, TooltipTrigger, type TooltipGroup, type TooltipRootSlotProps } from "@sectile/vue/tooltip";
import { defineComponent, h, shallowRef, watch, type PropType, type VNodeChild } from "vue";

type TooltipInstance = InstanceType<typeof TooltipRoot>;
type TooltipWithText = new () => Omit<TooltipInstance, "$props" | "$slots"> & {
  $props: TooltipInstance["$props"] & { text?: string };
  $slots: TooltipInstance["$slots"] & { trigger?: (state: TooltipRootSlotProps) => VNodeChild };
};

const openMembers = new WeakMap<TooltipGroup, () => void>();

const TooltipGroupMember = defineComponent({
  props: {
    group: { type: Object as PropType<TooltipGroup>, required: true },
    open: Boolean,
    close: { type: Function as PropType<() => void>, required: true },
  },
  setup(props) {
    watch(() => props.open ? props.group : undefined, (group, _, onCleanup) => {
      if (!group) return;
      const { close } = props;
      const previous = openMembers.get(group);
      openMembers.set(group, close);
      previous?.();
      onCleanup(() => {
        if (openMembers.get(group) === close) openMembers.delete(group);
      });
    }, { flush: "post", immediate: true });

    return () => null;
  },
});

export const UITooltip = defineComponent({
  name: "UITooltip",
  inheritAttrs: false,
  props: { group: Object as PropType<TooltipGroup>, text: String },
  setup(props, { attrs, expose, slots }) {
    const root = shallowRef<InstanceType<typeof TooltipRoot> | null>(null);
    const requestClose = () => root.value?.requestClose();
    expose({ requestClose });

    return () => h(TooltipRoot, { ...attrs, group: props.group, ref: root }, {
      default: (state: TooltipRootSlotProps) => [
        props.group && h(TooltipGroupMember, { group: props.group, open: state.open, close: requestClose }),
        slots.default ? slots.default(state) : slots.trigger && [
          h(TooltipTrigger, { asChild: true }, () => slots.trigger?.(state)),
          h(TooltipContent, null, () => [h(TooltipArrow), props.text]),
        ],
      ],
    });
  },
}) as unknown as TooltipWithText;
