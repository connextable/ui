import { createClientTabularSource } from "@sectile/tabular/source";
import type { TabularAccessState, TabularCellRecord, TabularRequest, TabularWireValue } from "@sectile/tabular";
import { useDataGrid } from "@sectile/vue/data-grid";
import { useDataTable } from "@sectile/vue/data-table";
import { computed, defineComponent, h, ref, watch, type Component, type PropType, type VNodeChild } from "vue";
import UIPagination from "../catalog/UIPagination.vue";
import { createUIDataGridComponents, createUIDataTableComponents } from "./selection-checkbox";
import { createUITabularSource } from "./source";

export interface TableColumn<ID extends string = string> {
  id: ID;
  label: string;
  align?: "start" | "center" | "end";
}

export type WireCells<Cells> = object & { [Key in keyof Cells]: TabularWireValue | undefined };

export interface TableRow<Cells extends WireCells<Cells> = TabularCellRecord> {
  id: string;
  cells: Cells;
}

export type ColumnID<Cells> = [Cells] extends [never] ? string : Cells extends object ? Extract<keyof Cells, string> : never;

type CellValue<Cells, ID extends string> = [Cells] extends [never] ? TabularWireValue :
  Cells extends object ? ID extends keyof Cells
    ? Exclude<Cells[ID], undefined> | (undefined extends Cells[ID] ? null : string extends keyof Cells ? null : never)
    : null : never;

export type TableCell<Cells extends WireCells<Cells> = TabularCellRecord, ID extends string = ColumnID<Cells>> = {
  [Key in ID]: {
    columnID: Key;
    column: TableColumn<Key>;
    row: TableRow<Cells>;
    value: CellValue<Cells, Key>;
  };
}[ID];

export interface TableData<Cells extends WireCells<Cells> = TabularCellRecord, ID extends string = ColumnID<Cells>> {
  readonly rows: readonly TableRow<Cells>[];
  readonly columns: readonly TableColumn<ID>[];
}

export function createTableData<
  const Cells extends WireCells<Cells> = TabularCellRecord,
  const ID extends ColumnID<NoInfer<Cells>> = ColumnID<Cells>,
>(data: TableData<Cells, ID>): TableData<Cells, ID> {
  return data;
}

export interface LocalDataProps<Cells extends WireCells<Cells>, ID extends ColumnID<Cells>> {
  label: string;
  data: TableData<Cells, ID>;
  pageSize?: number;
}

function formatValue(value: TabularWireValue) {
  if (value === null) return "";
  return typeof value === "object" ? JSON.stringify(value) : String(value);
}

function readCell(cells: WireCells<TabularCellRecord>, id: string): TabularWireValue {
  return Object.hasOwn(cells, id) ? cells[id] ?? null : null;
}

function stableIDs(ids: string[], previous?: string[]) {
  return previous?.length === ids.length && ids.every((id, index) => id === previous[index]) ? previous : ids;
}

export function useLocalDataView<Cells extends WireCells<Cells>, ID extends ColumnID<Cells>>(
  mode: "table" | "grid",
  props: LocalDataProps<Cells, ID>,
  attrs: Record<string, unknown>,
  slots: { cell?: (scope: TableCell<Cells, ID>) => VNodeChild },
) {
  const currentPage = ref(1);
  const pageSize = computed(() => {
    const size = props.pageSize ?? 20;
    return Number.isFinite(size) ? Math.max(1, Math.trunc(size)) : 20;
  });
  const pageCount = computed(() => Math.max(1, Math.ceil(props.data.rows.length / pageSize.value)));
  const page = computed(() => Math.min(currentPage.value, pageCount.value));
  const rowIDs = computed<string[]>(previous => stableIDs(props.data.rows.map(row => row.id), previous));
  const columnIDs = computed<string[]>(previous => stableIDs(props.data.columns.map(column => column.id), previous));
  const rowsByID = computed(() => new Map(props.data.rows.map(row => [row.id, row])));
  const queried = ref(false);
  const pageAccess = (): TabularAccessState => ({
    kind: "page", page: page.value, itemsPerPage: pageSize.value, visibleRowCount: null, pagination: null,
  });

  function source(request: TabularRequest, context: { signal: AbortSignal }) {
    queried.value = Object.values(request.query).some(descriptors => descriptors.length > 0);
    if (!queried.value) {
      const ids = rowIDs.value;
      if (rowsByID.value.size !== ids.length) throw new Error("Tabular source: duplicate row ID");
      const { access } = request;
      const start = access.kind === "page" ? (access.page - 1) * access.itemsPerPage : access.start;
      const count = access.kind === "page" ? access.itemsPerPage : access.count;
      // The local cells read reactive values directly. The controller only needs the page's structure.
      const columns = columnIDs.value.map(id => ({ id }));
      const cells = Object.fromEntries(columns.map(({ id }) => [id, null]));
      return createUITabularSource({
        columns,
        load: () => ({
          rows: ids.slice(start, start + count).map(id => ({ kind: "leaf" as const, id, cells })),
          matchingLeafCount: ids.length,
          visibleRowCount: ids.length,
        }),
      })(request, context);
    }

    const result = createClientTabularSource({
      records: props.data.rows,
      columnSchema: { revision: request.columnSchemaRevision, columns: props.data.columns, headers: [] },
      getRowID: row => row.id,
      getValue: (row, column) => readCell(row.cells, column),
    }).resolve(request);
    if (!result.ok) throw new Error(`Tabular source: ${result.error.code}`);
    return { ...result.value, viewRevision: request.requestID };
  }
  const options = { source, defaultAccessState: pageAccess() };
  const view = mode === "table" ? useDataTable(options) : useDataGrid(options);
  const parts = mode === "table"
    ? createUIDataTableComponents(view as ReturnType<typeof useDataTable>)
    : createUIDataGridComponents(view as ReturnType<typeof useDataGrid>);
  watch([page, pageSize, rowIDs, columnIDs], ([next, size], [previousPage, previousSize]) => {
    currentPage.value = next;
    if (next !== previousPage || size !== previousSize) view.dispatch({ type: "set-access", accessState: pageAccess() });
    else view.reload();
  });
  watch(() => queried.value ? props.data.rows : undefined, (rows, previous) => {
    if (rows && previous) view.reload();
  }, { deep: true });

  const CellContent = defineComponent({
    props: {
      row: { type: Object as PropType<TableRow<Cells>>, required: true },
      column: { type: Object as PropType<TableColumn<ID>>, required: true },
      renderCell: Function as PropType<(scope: TableCell<Cells, ID>) => VNodeChild>,
    },
    setup(cell) {
      return () => {
        const { row, column, renderCell } = cell;
        const value = readCell(row.cells, column.id);
        return renderCell?.({ row, column, columnID: column.id, value } as TableCell<Cells, ID>) ?? formatValue(value);
      };
    },
  });

  return () => h(parts.Provider as Component, null, () => [
    h(parts.Root as Component, { ...attrs, "aria-label": props.label }, () => [
      h(parts.Header as Component, null, () => h(parts.HeaderRow as Component, null, () => props.data.columns.map(column =>
        h(parts.ColumnHeader as Component, { key: column.id, column: column.id, "data-ui-tabular-align": column.align }, () => column.label)))),
      h(parts.Body as Component, null, {
        default: ({ row: projected }: { row: TableRow }) => {
          const row = rowsByID.value.get(projected.id);
          if (!row) return [];
          return props.data.columns.map(column => h(parts.Cell as Component, {
            key: column.id,
            column: column.id,
            "data-ui-tabular-align": column.align,
          }, () => h(CellContent, { column, row, renderCell: slots.cell })));
        },
      }),
    ]),
    pageCount.value > 1 && h(UIPagination, {
      total: props.data.rows.length,
      itemsPerPage: pageSize.value,
      modelValue: page.value,
      "onUpdate:modelValue": (next: number) => currentPage.value = next,
    }),
  ]);
}
