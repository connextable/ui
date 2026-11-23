import assert from "node:assert/strict";
import test from "node:test";
import { moveSequenceBatch, moveTreeBatch, treeBatchRoots } from "../src/components/reorder/reorder-batch.ts";

test("selected items move as one block while the relative order of all other items stays intact", () => {
  const order = ["a", "b", "c", "d", "e"];
  assert.deepEqual(moveSequenceBatch(order, ["b", "d"], { parentID: null, beforeID: "a" }), ["b", "d", "a", "c", "e"]);
  assert.deepEqual(moveSequenceBatch(order, ["b", "d"], { parentID: null, beforeID: "d" }), ["a", "c", "b", "d", "e"]);
  assert.deepEqual(moveSequenceBatch(order, ["b", "d"], { parentID: null }), ["a", "c", "e", "b", "d"]);
});

const nodes = [
  { id: "inbox", parentID: null },
  { id: "folder", parentID: "inbox" },
  { id: "image", parentID: "folder" },
  { id: "notes", parentID: "inbox" },
  { id: "ready", parentID: null },
  { id: "report", parentID: "ready" },
];

test("a batch of subtrees is inserted in tree order and preserves each subtree", () => {
  const roots = treeBatchRoots(nodes, new Set(["notes", "image", "folder"]));
  assert.deepEqual(roots, ["folder", "notes"]);
  const moved = moveTreeBatch(nodes, roots, { parentID: "ready", beforeID: "report" });
  assert.deepEqual(moved.filter(node => node.parentID === "ready").map(node => node.id), ["folder", "notes", "report"]);
  assert.equal(moved.find(node => node.id === "image")?.parentID, "folder");
});

test("capacity, cycles and denied items reject the entire tree batch", () => {
  const roots = ["folder", "notes"];
  assert.equal(moveTreeBatch(nodes, roots, { parentID: "ready" }, { capacity: () => 2 }), undefined);
  assert.equal(moveTreeBatch(nodes, roots, { parentID: "ready" }, { canMove: ({ id }) => id !== "notes" }), undefined);
  assert.equal(moveTreeBatch(nodes, roots, { parentID: "image" }), undefined);
  assert.equal(nodes.find(node => node.id === "folder")?.parentID, "inbox");
});
