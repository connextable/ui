import { defineComponent, h, mergeProps, shallowRef, type Component, type Slots, type VNode, type VNodeChild } from "vue";
import UIFieldClear from "./UIFieldClear.vue";
import { controlFlag, hasClearableValue, provideClearable, useClearableValue, useFieldClear, type ClearableProps } from "./clearable";

export type ClearableComponent<Part> = Part extends abstract new (...args: never[]) => infer Instance
  ? Instance extends { $props: infer Props }
    ? new () => Instance & { $props: Props & ClearableProps }
    : Part
  : Part;

type ModelValue = string | readonly string[] | object | null;
type Attrs = Record<string, unknown>;
type ControlHandle = Record<string, unknown>;

const clearableProps = {
  clearable: Boolean,
  clearLabel: String,
};

export function withClearableModel<Part extends Component>(
  part: Part,
  empty: ModelValue | ((attrs: Attrs) => ModelValue),
  options: {
    label?: string;
    clearInput?: boolean;
    placement?: "inset" | "end" | "beside";
    expose?: readonly string[];
    defaultParts?: (attrs: Attrs) => VNode[];
  } = {},
): ClearableComponent<Part> {
  const metadata = part as Part & { __sectileFormLabelMode?: "for" | "labelledby" };
  return defineComponent({
    inheritAttrs: false,
    __sectileFormLabelMode: metadata.__sectileFormLabelMode,
    props: clearableProps,
    emits: options.clearInput ? ["update:modelValue", "update:inputValue"] : ["update:modelValue"],
    setup(props, { attrs, slots, emit, expose }) {
      const handle = options.expose ? shallowRef<ControlHandle>() : undefined;
      const emptyValue = () => typeof empty === "function" ? empty(attrs) : empty;
      const model = useClearableValue(
        () => readAttr<ModelValue>(attrs, "modelValue", "model-value"),
        readAttr<ModelValue>(attrs, "defaultValue", "default-value") ?? emptyValue(),
        value => emit("update:modelValue", value),
      );
      const input = options.clearInput ? useClearableValue(
        () => readAttr<string>(attrs, "inputValue", "input-value"),
        readAttr<string>(attrs, "defaultInputValue", "default-input-value") ?? "",
        value => emit("update:inputValue", value),
      ) : undefined;
      provideClearable({
        enabled: () => props.clearable,
        label: () => props.clearLabel ?? options.label,
        disabled: () => controlFlag(attrs.disabled),
        readonly: () => controlFlag(attrs.readonly),
        hasValue: () => hasClearableValue(model.value.value) || Boolean(input?.value.value),
        clear() {
          if (hasClearableValue(model.value.value)) model.set(emptyValue());
          if (input?.value.value) input.set("");
        },
        reset() {
          model.reset();
          input?.reset();
        },
      });
      if (options.expose && handle) {
        const exposed = Object.fromEntries(options.expose.filter(key => key !== "element").map(key => [key, (...args: unknown[]) => {
          const method = handle.value?.[key];
          if (typeof method === "function") return method(...args);
        }]));
        if (options.expose.includes("element")) {
          Object.defineProperty(exposed, "element", { enumerable: true, get: () => handle.value?.element ?? null });
        }
        expose(exposed);
      }
      const bindings = () => {
        const { "model-value": _model, ...rest } = attrs;
        if (input) delete rest["input-value"];
        return mergeProps(rest, {
          ...(handle ? { ref: handle } : {}),
          modelValue: model.value.value,
          "onUpdate:modelValue": model.set,
          ...(input ? { inputValue: input.value.value, "onUpdate:inputValue": input.set } : {}),
        });
      };
      return () => {
        const defaultParts = options.defaultParts;
        const asChild = isAsChild(attrs);
        const content = slots.default || asChild || !defaultParts ? slots : { ...slots, default: () => defaultParts(attrs) };
        if (!options.placement || !props.clearable || asChild) return h(part, bindings(), content);
        if (options.placement === "end") {
          return h(part, bindings(), appendClear(content));
        }
        const inset = options.placement === "inset";
        return h(inset ? "span" : "div", { class: inset ? "ui-clearable-control ui-clearable-control--temporal" : "ui-clearable-group" }, [
          h(part, bindings(), content),
          h(UIFieldClear),
        ]);
      };
    },
  }) as unknown as ClearableComponent<Part>;
}

function readAttr<Value>(attrs: Attrs, camel: string, kebab: string): Value | undefined {
  return (attrs[camel] === undefined ? attrs[kebab] : attrs[camel]) as Value | undefined;
}

function isAsChild(attrs: Attrs) {
  return controlFlag(readAttr(attrs, "asChild", "as-child"));
}

function appendClear(slots: Slots) {
  return {
    ...slots,
    default: (...args: unknown[]): VNodeChild => [
      slots.default?.(...args),
      h(UIFieldClear),
    ],
  };
}

export function withClearableControl<Part extends Component>(part: Part, placement: "anchor" | "input"): Part {
  const metadata = part as Part & { __sectileFormLabelMode?: "for" | "labelledby"; __sectileSubmissionPart?: number };
  return defineComponent({
    inheritAttrs: false,
    __sectileFormLabelMode: metadata.__sectileFormLabelMode,
    __sectileSubmissionPart: metadata.__sectileSubmissionPart,
    setup(_, { attrs, slots }) {
      const clear = useFieldClear();
      return () => {
        if (!clear?.enabled.value || isAsChild(attrs)) return h(part, attrs, slots);
        return placement === "anchor"
          ? h(part, attrs, appendClear(slots))
          : h("span", { class: "ui-clearable-control" }, [h(part, attrs, slots), h(UIFieldClear)]);
      };
    },
  }) as unknown as Part;
}
