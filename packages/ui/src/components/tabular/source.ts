import type {
  TabularColumnSchema,
  TabularCount,
  TabularRequest,
  TabularRow,
  TabularViewResponse,
} from "@sectile/tabular";

export interface UITabularSourceResult<Row extends TabularRow = TabularRow> {
  readonly rows: readonly Row[];
  readonly matchingLeafCount?: number | "unknown";
  readonly visibleRowCount?: number | "unknown";
  readonly removedRowIDs?: TabularViewResponse["removedRowIDs"];
}

export interface UITabularSourceOptions<Row extends TabularRow = TabularRow> {
  readonly columns: TabularColumnSchema["columns"];
  readonly headers?: TabularColumnSchema["headers"];
  readonly load: (request: TabularRequest, context: { readonly signal: AbortSignal }) =>
    UITabularSourceResult<Row> | PromiseLike<UITabularSourceResult<Row>>;
}

function count(value: number | "unknown"): TabularCount {
  return value === "unknown" ? { kind: "unknown" } : { kind: "known", value };
}

type ResponseIdentity = Pick<TabularRequest, "protocolVersion" | "requestID" | "sourceGeneration" | "queryRevision" | "expansionRevision" | "access" | "columnSchemaRevision">;
type SourceColumns = Pick<UITabularSourceOptions, "columns" | "headers">;

function tabularResponse<Row extends TabularRow>(
  request: ResponseIdentity,
  { columns, headers = [] }: SourceColumns,
  { rows, matchingLeafCount, visibleRowCount = rows.length, removedRowIDs = [] }: UITabularSourceResult<Row>,
): TabularViewResponse<Row> {
  return {
    protocolVersion: request.protocolVersion,
    requestID: request.requestID,
    sourceGeneration: request.sourceGeneration,
    queryRevision: request.queryRevision,
    expansionRevision: request.expansionRevision,
    viewRevision: request.requestID,
    access: request.access,
    rows,
    matchingLeafCount: count(matchingLeafCount ?? rows.filter(row => row.kind === "leaf").length),
    visibleRowCount: count(visibleRowCount),
    columnSchema: { revision: request.columnSchemaRevision, columns, headers },
    removedRowIDs,
  };
}

/** Build the response to the controller's first request from an already available projection. */
export function createInitialTabularView<Row extends TabularRow>(
  access: TabularRequest["access"],
  schema: SourceColumns,
  result: UITabularSourceResult<Row>,
): TabularViewResponse<Row> {
  return tabularResponse({
    protocolVersion: 1,
    requestID: 1,
    sourceGeneration: 0,
    queryRevision: 0,
    expansionRevision: 0,
    columnSchemaRevision: 0,
    access,
  }, schema, result);
}

export function createUITabularSource<Row extends TabularRow>({ columns, headers = [], load }: UITabularSourceOptions<Row>) {
  const schema = { columns, headers };
  return (request: TabularRequest, context: { readonly signal: AbortSignal }) => {
    const result = load(request, context);
    return "then" in result ? Promise.resolve(result).then(result => tabularResponse(request, schema, result))
      : tabularResponse(request, schema, result);
  };
}
