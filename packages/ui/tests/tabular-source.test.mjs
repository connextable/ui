import assert from "node:assert/strict";
import test from "node:test";
import { createUITabularSource } from "@connextable/ui";

const request = {
  protocolVersion: 1,
  requestID: 3,
  queryRevision: 2,
  sourceGeneration: 1,
  expansionRevision: 4,
  columnSchemaRevision: 5,
  access: { kind: "page", page: 1, itemsPerPage: 4 },
};
const columns = [{ id: "name" }];
const rows = [
  { kind: "group", id: "team", parentGroupID: null, depth: 0, expanded: true, cells: { name: "Team" } },
  { kind: "leaf", id: "person", parentGroupID: "team", depth: 1, cells: { name: "Ada" } },
];
const context = { signal: new AbortController().signal };

test("a synchronous source preserves request identity and counts group and leaf rows correctly", () => {
  const source = createUITabularSource({ columns, load: () => ({ rows }) });
  assert.deepEqual(source(request, context), {
    protocolVersion: 1,
    requestID: 3,
    queryRevision: 2,
    sourceGeneration: 1,
    expansionRevision: 4,
    viewRevision: 3,
    access: { kind: "page", page: 1, itemsPerPage: 4 },
    rows,
    columnSchema: { revision: 5, columns, headers: [] },
    matchingLeafCount: { kind: "known", value: 1 },
    visibleRowCount: { kind: "known", value: 2 },
    removedRowIDs: [],
  });
});

test("an asynchronous source forwards requests and supports counts larger than the loaded page", async () => {
  const source = createUITabularSource({
    columns,
    async load(input, { signal }) {
      assert.equal(input, request);
      assert.equal(signal, context.signal);
      return { rows, matchingLeafCount: "unknown", visibleRowCount: 16, removedRowIDs: ["former"] };
    },
  });
  const result = await source(request, context);
  assert.deepEqual(result.matchingLeafCount, { kind: "unknown" });
  assert.deepEqual(result.visibleRowCount, { kind: "known", value: 16 });
  assert.deepEqual(result.removedRowIDs, ["former"]);
});
