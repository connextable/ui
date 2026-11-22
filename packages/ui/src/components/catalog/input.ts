import { ComboboxEditor } from "@sectile/vue/combobox";
import { EditableArea, EditableInput, EditablePreview, EditableRoot, type EditableRootSlotProps } from "@sectile/vue/editable";
import { defineComponent, h } from "vue";
import { controlFlag } from "../clear/clearable";
import { withClearableControl, withClearableModel, type ClearableComponent } from "../clear/with-clearable";
import { definedControlAttrs, type FormControlProps } from "../control-attrs";
import { CascadeListComposition } from "./cascade-composition";
import { ComboboxComposition } from "./combobox-composition";
import QuantityFieldComposition from "./QuantityFieldComposition.vue";
import { CheckboxGroupComposition, ListboxComposition, ToggleGroupComposition } from "./selection-composition";
import { CheckboxTreeComposition } from "./tree-choice-composition";

const group = { placement: "beside" } as const;
export const UICascadeList: ClearableComponent<typeof CascadeListComposition> = withClearableModel(CascadeListComposition, null, group);
export const UICombobox: ClearableComponent<typeof ComboboxComposition> = withClearableModel(ComboboxComposition, null, { clearInput: true });
export { UIComboboxInput } from "./combobox-composition";
export const UIComboboxEditor: typeof ComboboxEditor = withClearableControl(ComboboxEditor, "input");
type EditableInstance = InstanceType<typeof EditableRoot>;
type EditableWithPlaceholder = new () => Omit<EditableInstance, "$props"> & {
  $props: EditableInstance["$props"] & FormControlProps & { placeholder?: string; id?: string; autocomplete?: string };
};

const EditableComposition = defineComponent({
  inheritAttrs: false,
  props: { placeholder: String, id: String, name: String, form: String, required: { type: Boolean, default: undefined }, autocomplete: String },
  setup(props, { attrs, slots }) {
    return () => {
      if (slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])) return h(EditableRoot, { ...attrs, ...definedControlAttrs(props) }, slots);
      return h(EditableRoot, { ...attrs, ...definedControlAttrs({ name: props.name, required: props.required }) }, {
        default: (state: EditableRootSlotProps) => h(EditableArea, null, () => [
          h(EditablePreview, {
            as: "button", type: "button", disabled: state.disabled,
            "data-placeholder": !state.value && !!props.placeholder || undefined,
            "aria-description": state.readonly && !state.disabled ? "읽기 전용" : undefined,
          }, () => state.value || props.placeholder || "편집"),
          h(EditableInput, {
            ...definedControlAttrs(props),
            onInvalid(event: Event) {
              const input = event.target;
              if (!(input instanceof HTMLInputElement) || !input.hidden) return;
              event.preventDefault();
              input.parentElement?.querySelector<HTMLElement>('[data-part="preview"]')?.focus();
            },
          }),
        ]),
      });
    };
  },
}) as unknown as EditableWithPlaceholder;

export const UIEditable: ClearableComponent<typeof EditableComposition> = withClearableModel(EditableComposition, "", { ...group, label: "값 지우기" });
export const UIListbox: ClearableComponent<typeof ListboxComposition> = withClearableModel(ListboxComposition,
  attrs => (attrs.selectionMode ?? attrs["selection-mode"]) === "multiple" ? [] : "", group);
export const UICheckboxGroup: ClearableComponent<typeof CheckboxGroupComposition> = withClearableModel(CheckboxGroupComposition, [], group);
export const UICheckboxTree: ClearableComponent<typeof CheckboxTreeComposition> = withClearableModel(CheckboxTreeComposition, [], {
  ...group, expose: ["element", "focus"],
});
export const UIToggleGroup: ClearableComponent<typeof ToggleGroupComposition> = withClearableModel(ToggleGroupComposition, [], group);
export const UIQuantityField: ClearableComponent<typeof QuantityFieldComposition> = withClearableModel(QuantityFieldComposition, null, {
  ...group, label: "수량 지우기",
});

export {
  CascadeListValue as UICascadeListValue,
  CascadeListColumn as UICascadeListColumn,
  CascadeListItem as UICascadeListItem,
  CascadeListItemIndicator as UICascadeListItemIndicator,
  CascadeListItemChevron as UICascadeListItemChevron,
} from "@sectile/vue/cascade-list";
export { UIColorPicker } from "./UIColorPicker";
export {
  ColorPickerLabel as UIColorPickerLabel,
  ColorPickerControl as UIColorPickerControl,
  ColorPickerNativeInput as UIColorPickerNativeInput,
  ColorPickerTextInput as UIColorPickerTextInput,
  ColorPickerChannelInput as UIColorPickerChannelInput,
  ColorPickerCoordinateInput as UIColorPickerCoordinateInput,
  ColorPickerCoordinateSlider as UIColorPickerCoordinateSlider,
  ColorPickerArea as UIColorPickerArea,
  ColorPickerAreaSurface as UIColorPickerAreaSurface,
  ColorPickerAreaThumb as UIColorPickerAreaThumb,
  ColorPickerHueSlider as UIColorPickerHueSlider,
  ColorPickerAlphaSlider as UIColorPickerAlphaSlider,
  ColorPickerSwatch as UIColorPickerSwatch,
  ColorPickerValueText as UIColorPickerValueText,
  ColorPickerFormatTrigger as UIColorPickerFormatTrigger,
} from "@sectile/vue/color-picker";
export { default as UINumberField } from "../text-input/UINumberField.vue";
export {
  EditableArea as UIEditableArea,
  EditablePreview as UIEditablePreview,
  EditableInput as UIEditableInput,
  EditableEditTrigger as UIEditableEditTrigger,
  EditableSubmitTrigger as UIEditableSubmitTrigger,
  EditableCancelTrigger as UIEditableCancelTrigger,
} from "@sectile/vue/editable";
export {
  ListboxItem as UIListboxItem,
  ListboxItemText as UIListboxItemText,
  ListboxItemIndicator as UIListboxItemIndicator,
} from "@sectile/vue/listbox";
export {
  RatingItem as UIRatingItem,
  RatingIndicator as UIRatingIndicator,
} from "@sectile/vue/rating";
export { UIRating, UIRatingClear } from "../selection/rating";
export {
  SliderRange as UISliderRange,
} from "@sectile/vue/slider";
export { UISlider, UISliderTrack, UISliderThumb } from "./slider";
export {
  SpinButtonInput as UISpinButtonInput,
  SpinButtonIncrement as UISpinButtonIncrement,
  SpinButtonDecrement as UISpinButtonDecrement,
} from "@sectile/vue/spin-button";
export { UISpinButton } from "./spin-button";
export { UIStepper } from "./tabbed-composition";
export {
  StepperList as UIStepperList,
  StepperStep as UIStepperStep,
  StepperContent as UIStepperContent,
  StepperIndicator as UIStepperIndicator,
  StepperPrevious as UIStepperPrevious,
  StepperNext as UIStepperNext,
} from "@sectile/vue/stepper";
export {
  ComboboxResults as UIComboboxResults,
  ComboboxContent as UIComboboxContent,
  ComboboxItem as UIComboboxItem,
  ComboboxEmpty as UIComboboxEmpty,
} from "@sectile/vue/combobox";
export {
  CheckboxTreeItem as UICheckboxTreeItem,
  CheckboxTreeDisclosure as UICheckboxTreeDisclosure,
} from "@sectile/vue/checkbox-tree";
export { default as UITreeSelect } from "./UITreeSelect.vue";
export { default as UITreeSelectField } from "./UITreeSelectField.vue";
export { default as UITreeSelectDisclosure } from "./UITreeSelectDisclosure.vue";
export {
  TreeSelectInput as UITreeSelectInput,
  TreeSelectContent as UITreeSelectContent,
  TreeSelectItem as UITreeSelectItem,
} from "@sectile/vue/tree-select";
export { UITreeView } from "./tree-choice-composition";
export {
  TreeViewItem as UITreeViewItem,
  TreeViewDisclosure as UITreeViewDisclosure,
} from "@sectile/vue/tree-view";
export { UICheckboxTreeGroup, UITreeSelectGroup, UITreeViewGroup } from "./tree-groups";
export {
  CheckboxGroupItem as UICheckboxGroupItem,
} from "@sectile/vue/checkbox-group";
export { default as UICheckboxGroupIndicator } from "../selection/UICheckboxGroupIndicator.vue";
export {
  MultiThumbSliderTrack as UIMultiThumbSliderTrack,
  MultiThumbSliderRange as UIMultiThumbSliderRange,
} from "@sectile/vue/multi-thumb-slider";
export { UIMultiThumbSlider } from "./multi-thumb-slider";
export { default as UIMultiThumbSliderThumb } from "./UIMultiThumbSliderThumb.vue";
export {
  PinInputInput as UIPinInputInput,
} from "@sectile/vue/pin-input";
export { UIPinInput } from "./pin-input";
export {
  QuantityFieldInput as UIQuantityFieldInput,
  QuantityFieldUnitSelect as UIQuantityFieldUnitSelect,
  QuantityFieldValue as UIQuantityFieldValue,
  createStandardQuantityPolicies as createUIStandardQuantityPolicies,
} from "@sectile/vue/quantity-field";
