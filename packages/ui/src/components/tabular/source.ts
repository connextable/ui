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

export function createUITabularSource<Row extends TabularRow>({ columns, headers = [], load }: UITabularSourceOptions<Row>) {
  return (request: TabularRequest, context: { readonly signal: AbortSignal }) => {
    function respond(result: UITabularSourceResult<Row>): TabularViewResponse<Row> {
      const { rows, matchingLeafCount, visibleRowCount = rows.length, removedRowIDs = [] } = result;
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

    const result = load(request, context);
    return "then" in result ? Promise.resolve(result).then(respond) : respond(result);
  };
}
