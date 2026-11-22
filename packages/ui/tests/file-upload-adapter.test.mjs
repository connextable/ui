import assert from "node:assert/strict";
import test from "node:test";
import { createUIFileUploadAdapter } from "@connextable/ui";

function request(controller = new AbortController(), reportProgress = () => {}) {
  return { file: new File(["report"], "report.txt"), attempt: 1, signal: controller.signal, reportProgress };
}

test("callback upload forwards progress and observes the attempt's abort signal", async () => {
  const updates = [];
  const upload = createUIFileUploadAdapter(({ file, reportProgress }) => {
    reportProgress({ loaded: file.size, total: file.size });
    return file.name;
  });
  assert.equal(await upload(request(undefined, update => updates.push(update))).result, "report.txt");
  assert.deepEqual(updates, [{ loaded: 6, total: 6 }]);

  const controller = new AbortController();
  const pending = upload(request(controller));
  controller.abort();
  await assert.rejects(pending.result, { name: "AbortError" });
  await assert.rejects(createUIFileUploadAdapter(() => { throw new Error("SDK unavailable"); })(request()).result, /SDK unavailable/);
});

test("HTTP upload sends multipart data and handles progress, receipts, errors, and cancellation", async t => {
  let xhr;
  class Transport extends EventTarget {
    upload = new EventTarget();
    headers = new Headers();
    open(method, url) { Object.assign(this, { method, url }); }
    setRequestHeader(name, value) { this.headers.set(name, value); }
    send(body) { this.body = body; xhr = this; }
    abort() { this.dispatchEvent(new Event("abort")); }
    finish(status, responseText) {
      Object.assign(this, { status, responseText });
      this.dispatchEvent(new Event("load"));
    }
  }
  const original = Object.getOwnPropertyDescriptor(globalThis, "XMLHttpRequest");
  Object.defineProperty(globalThis, "XMLHttpRequest", { configurable: true, value: Transport });
  t.after(() => {
    if (original) Object.defineProperty(globalThis, "XMLHttpRequest", original);
    else delete globalThis.XMLHttpRequest;
  });

  const updates = [];
  const upload = createUIFileUploadAdapter({ url: "/api/uploads" });
  const task = upload(request(undefined, update => updates.push(update)));
  assert.equal(xhr.method, "POST");
  assert.equal(xhr.url, "/api/uploads");
  assert.equal(xhr.body.get("file").name, "report.txt");
  assert.equal(xhr.headers.has("content-type"), false);
  xhr.upload.dispatchEvent(Object.assign(new Event("progress"), { loaded: 60, total: 120, lengthComputable: true }));
  xhr.finish(201, "ok");
  assert.deepEqual(updates, [{ loaded: 60, total: 120 }]);
  assert.equal(await task.result, "ok");

  const parse = createUIFileUploadAdapter({
    url: "/api/uploads/42", method: "PUT", fieldName: "attachment", withCredentials: true,
    headers: { "X-Upload-Token": "test" },
    readReceipt: response => JSON.parse(response.responseText),
  });
  const custom = parse(request());
  assert.equal(xhr.method, "PUT");
  assert.equal(xhr.body.get("attachment").name, "report.txt");
  assert.equal(xhr.headers.get("x-upload-token"), "test");
  assert.equal(xhr.withCredentials, true);
  xhr.finish(200, '{"id":42}');
  assert.deepEqual(await custom.result, { id: 42 });

  const failed = upload(request());
  xhr.finish(413, "too large");
  await assert.rejects(failed.result, /413/);

  const controller = new AbortController();
  const canceled = upload(request(controller));
  controller.abort();
  await assert.rejects(canceled.result, { name: "AbortError" });
  const lastRequest = xhr;
  await assert.rejects(upload(request(controller)).result, { name: "AbortError" });
  assert.equal(xhr, lastRequest);
});
