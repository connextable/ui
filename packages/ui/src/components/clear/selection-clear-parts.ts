import { FileInputClear } from "@sectile/vue/form/file-input";
import { Primitive, type PrimitiveAs } from "@sectile/vue/primitive";
import { TagsInputClear, type TagsInputRootSlotProps } from "@sectile/vue/tags-input";
import { defineComponent, h, inject, mergeProps, provide, type InjectionKey, type PropType } from "vue";
import { withClearButton } from "./clear-button-part";

export const UIFileInputClear: typeof FileInputClear = withClearButton(FileInputClear, "파일 모두 지우기");

type ClearTags = (event: MouseEvent) => Promise<void>;
const tagsClearScope: InjectionKey<{
  readonly state: TagsInputRootSlotProps;
  readonly clear: ClearTags | undefined;
}> = Symbol("UITagsInputClear");

export const TagsInputClearScope = defineComponent({
  props: {
    state: { type: Object as PropType<TagsInputRootSlotProps>, required: true },
    clear: Function as PropType<ClearTags>,
  },
  setup(props, { slots }) {
    provide(tagsClearScope, props);
    return () => slots.default?.();
  },
});

const TagsClearPart = defineComponent({
  inheritAttrs: false,
  props: {
    as: { type: [String, Object, Function] as PropType<PrimitiveAs>, default: "button" },
    asChild: Boolean,
  },
  setup(props, { attrs, slots }) {
    const scope = inject(tagsClearScope, undefined);
    return () => {
      if (!scope?.clear) return h(TagsInputClear, { ...attrs, ...props }, slots);
      const { state, clear } = scope;
      const disabled = state.disabled || state.readonly || state.value.length === 0;
      return h(Primitive, mergeProps(attrs, {
        ...props,
        type: props.as === "button" ? "button" : undefined,
        disabled,
        "data-scope": "tags-input",
        "data-part": "clear",
        onClick: (event: MouseEvent) => {
          if (!disabled && !event.defaultPrevented) void clear(event);
        },
      }), { default: () => slots.default?.(state) });
    };
  },
}) as typeof TagsInputClear;

export const UITagsInputClear = withClearButton(TagsClearPart, "태그 모두 지우기");
