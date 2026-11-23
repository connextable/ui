import assert from "node:assert/strict";
import test from "node:test";
import { createUIAsyncAction, createUIConfirmAction, createUICopyAction } from "@connextable/ui";

test("async actions skip an already canceled request and reject a late result", async () => {
  const controller = new AbortController();
  let release;
  let executions = 0;
  const action = createUIAsyncAction(({ requestID }) => {
    executions++;
    return new Promise(resolve => { release = () => resolve(requestID); });
  });
  const request = { signal: controller.signal, requestID: "export" };
  const pending = action(request);
  controller.abort();
  release();
  await assert.rejects(pending, { name: "AbortError" });
  await assert.rejects(action(request), { name: "AbortError" });
  assert.equal(executions, 1);
});

test("clipboard actions read the value when invoked and reject missing text", async () => {
  const original = Object.getOwnPropertyDescriptor(navigator, "clipboard");
  const writes = [];
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { async writeText(value) { writes.push(value); } },
  });
  try {
    let current = "first";
    const copy = createUICopyAction(() => current);
    await copy();
    current = "second";
    await copy();
    current = null;
    await assert.rejects(copy(), /No text/);
    assert.deepEqual(writes, ["first", "second"]);
  } finally {
    if (original) Object.defineProperty(navigator, "clipboard", original);
    else delete navigator.clipboard;
  }
});

test("confirmed actions run only for accepted requests", async () => {
  const seen = [];
  const action = createUIConfirmAction(
    row => ({ title: "Delete draft?", description: row }),
    row => { seen.push(row); },
  );
  assert.equal(await action(async () => false, "first"), false);
  assert.equal(await action(async request => request.description === "second", "second"), true);
  assert.deepEqual(seen, ["second"]);
});
