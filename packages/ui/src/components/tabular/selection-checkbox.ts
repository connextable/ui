import { createDataGridComponents } from "@sectile/vue/data-grid";
import { createDataTableComponents } from "@sectile/vue/data-table";
import { createDataTreeGridComponents } from "@sectile/vue/data-tree-grid";
import { defineComponent, h, mergeProps, type Component } from "vue";
import UICheckboxBox from "../selection/UICheckboxBox.vue";

function styleSelectionControl<Part extends Component>(Control: Part, tag: "input" | "button"): Part {
  return defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () => {
        const asChild = attrs.asChild ?? attrs["as-child"];
        if (
          (asChild != null && asChild !== false) ||
          (attrs.as != null && attrs.as !== tag) ||
          (tag === "button" && slots.default)
        ) {
          return h(Control, attrs, slots);
        }

        // Sectile retains the original control for keyboard interaction and form submission.
        return h(UICheckboxBox, null, {
          control: () => h(Control, mergeProps(attrs, { class: "ui-checkbox__control" }), slots),
        });
      };
    },
  }) as Part;
}

export const createUIDataTableComponents: typeof createDataTableComponents = (controller) => {
  const parts = createDataTableComponents(controller);
  return {
    ...parts,
    SelectionControl: styleSelectionControl(parts.SelectionControl, "input"),
    BulkSelectionControl: styleSelectionControl(parts.BulkSelectionControl, "button"),
  };
};

export const createUIDataGridComponents: typeof createDataGridComponents = (controller) => {
  const parts = createDataGridComponents(controller);
  return {
    ...parts,
    RowSelectionControl: styleSelectionControl(parts.RowSelectionControl, "input"),
    BulkSelectionControl: styleSelectionControl(parts.BulkSelectionControl, "button"),
  };
};

export const createUIDataTreeGridComponents: typeof createDataTreeGridComponents = (controller) => {
  const parts = createDataTreeGridComponents(controller);
  return {
    ...parts,
    RowSelectionControl: styleSelectionControl(parts.RowSelectionControl, "input"),
    BulkSelectionControl: styleSelectionControl(parts.BulkSelectionControl, "button"),
  };
};
