import { createDataGridComponents } from "@sectile/vue/data-grid";
import { createDataTableComponents } from "@sectile/vue/data-table";
import { createDataTreeGridComponents, type DataTreeGridBulkSelectionControlProps, type DataTreeGridComponents, type DataTreeGridController } from "@sectile/vue/data-tree-grid";
import { defineComponent, h, mergeProps, type Component } from "vue";
import UICheckboxBox from "../selection/UICheckboxBox.vue";
import { createGroupSelectionControl, type UIDataTreeGridComponentOptions } from "./tree-grid-selection";

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

export function createUIDataTreeGridComponents<LeafCells extends object, GroupCells extends object>(
  controller: DataTreeGridController<LeafCells, GroupCells>,
  { loadGroupLeafIDs, onGroupSelectionError }: UIDataTreeGridComponentOptions = {},
): DataTreeGridComponents<LeafCells, GroupCells> {
  const parts = createDataTreeGridComponents(controller);
  const bulk = styleSelectionControl(parts.BulkSelectionControl, "button");
  const group = loadGroupLeafIDs && createGroupSelectionControl(controller, loadGroupLeafIDs, onGroupSelectionError);
  return {
    ...parts,
    RowSelectionControl: styleSelectionControl(parts.RowSelectionControl, "input"),
    BulkSelectionControl: group ? defineComponent({
      inheritAttrs: false,
      setup(_, { attrs, slots }) {
        return () => {
          const target = attrs.target as DataTreeGridBulkSelectionControlProps["target"] | undefined;
          return h((target?.kind === "group-leaves" ? group : bulk) as Component, attrs, slots);
        };
      },
    }) as typeof parts.BulkSelectionControl : bulk,
  };
}
