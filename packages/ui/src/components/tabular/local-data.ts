import { createClientTabularSource } from "@sectile/tabular/source";
import type { TabularAccessState, TabularCellRecord, TabularRequest, TabularWireValue } from "@sectile/tabular";
import { useDataGrid } from "@sectile/vue/data-grid";
import { useDataTable } from "@sectile/vue/data-table";
import { computed, defineComponent, h, ref, watch, type Component, type PropType, type SlotsType, type VNodeChild } from "vue";
import UIPagination from "../catalog/UIPagination.vue";
import { createUIDataGridComponents, createUIDataTableComponents } from "./selection-checkbox";

export interface UIDataColumn {
  id: string;
  label: string;
  align?: "start" | "center" | "end";
}

export interface UIDataRow {
  id: string;
  cells: TabularCellRecord;
}

function formatValue(value: TabularWireValue) {
  if (value === null) return "";
  return typeof value === "object" ? JSON.stringify(value) : String(value);
}

function createLocalDataView(mode: "table" | "grid") {
  return defineComponent({
    name: mode === "table" ? "UIDataTable" : "UIDataGrid",
    inheritAttrs: false,
    props: {
      label: { type: String, required: true },
      rows: { type: Array as PropType<readonly UIDataRow[]>, required: true },
      columns: { type: Array as PropType<readonly UIDataColumn[]>, required: true },
      pageSize: { type: Number, default: 20 },
    },
    slots: Object as SlotsType<{
      cell?: (scope: { column: UIDataColumn; row: UIDataRow; value: TabularWireValue }) => VNodeChild;
    }>,
    setup(props, { attrs, slots }) {
      const currentPage = ref(1);
      const pageSize = computed(() => Number.isFinite(props.pageSize) ? Math.max(1, Math.trunc(props.pageSize)) : 20);
      const pageCount = computed(() => Math.max(1, Math.ceil(props.rows.length / pageSize.value)));
      const pageAccess = (page: number): TabularAccessState => ({
        kind: "page", page, itemsPerPage: pageSize.value, visibleRowCount: null, pagination: null,
      });
      function source(request: TabularRequest) {
        const result = createClientTabularSource({
          records: props.rows,
          columnSchema: { revision: request.columnSchemaRevision, columns: props.columns, headers: [] },
          getRowID: row => row.id,
          getValue: (row, column) => row.cells[column] ?? null,
        }).resolve(request);
        if (!result.ok) throw new Error(`Tabular source: ${result.error.code}`);
        return { ...result.value, viewRevision: request.requestID };
      }
      const options = { source, defaultAccessState: pageAccess(1) };
      const view = mode === "table" ? useDataTable(options) : useDataGrid(options);
      const parts = mode === "table"
        ? createUIDataTableComponents(view as ReturnType<typeof useDataTable>)
        : createUIDataGridComponents(view as ReturnType<typeof useDataGrid>);
      function changePage(next: number) {
        const result = view.dispatch({ type: "set-access", accessState: pageAccess(next) });
        if (result.ok) currentPage.value = next;
      }
      watch(() => [props.columns, props.rows, pageSize.value] as const, (_, previous) => {
        const next = Math.min(currentPage.value, pageCount.value);
        if (next !== currentPage.value || pageSize.value !== previous[2]) changePage(next);
        else view.reload();
      }, { deep: true });

      return () => h(parts.Provider as Component, null, () => [
        h(parts.Root as Component, { ...attrs, "aria-label": props.label }, () => [
          h(parts.Header as Component, null, () => h(parts.HeaderRow as Component, null, () => props.columns.map(column =>
            h(parts.ColumnHeader as Component, { key: column.id, column: column.id, "data-ui-tabular-align": column.align }, () => column.label)))),
          h(parts.Body as Component, null, {
            default: ({ row }: { row: UIDataRow }) => props.columns.map(column => {
              const value = row.cells[column.id] ?? null;
              return h(parts.Cell as Component, { key: column.id, column: column.id, "data-ui-tabular-align": column.align },
                () => slots.cell?.({ row, column, value }) ?? formatValue(value));
            }),
          }),
        ]),
        pageCount.value > 1 && h(UIPagination, {
          total: props.rows.length,
          itemsPerPage: pageSize.value,
          modelValue: currentPage.value,
          "onUpdate:modelValue": changePage,
        }),
      ]);
    },
  });
}

export const UIDataTable = createLocalDataView("table");
export const UIDataGrid = createLocalDataView("grid");
