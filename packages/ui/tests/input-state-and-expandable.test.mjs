import assert from "node:assert/strict";
import test from "node:test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { UICalendar, UICheckboxTree, UIDisclosure, UIDisclosureContent, UIFileInput, UIFileUploadQueue, UISelect } from "@connextable/ui";

const render = (component, props, children) => renderToString(createSSRApp({ render: () => h(component, props, children) }));

test("read-only file controls keep names and focus while disabled actions cannot be triggered", async () => {
  const file = new File(["memo"], "memo.txt");
  const input = await render(UIFileInput, { defaultValue: [file], readonly: true });
  assert.match(input, /aria-description="읽기 전용" tabindex="0"/);
  assert.match(input, /memo\.txt/);
  assert.doesNotMatch(input, /<button/);

  const queue = await render(UIFileUploadQueue, {
    items: [{ id: "memo", file }], adapter: () => ({ result: Promise.resolve() }), readonly: true,
  });
  assert.match(queue, /aria-description="읽기 전용" tabindex="0"/);
  assert.match(queue, /memo\.txt/);
  assert.doesNotMatch(queue, /<button/);

  const disabled = await render(UIFileUploadQueue, {
    items: [{ id: "memo", file }], adapter: () => ({ result: Promise.resolve() }), disabled: true, readonly: true,
  });
  assert.match(disabled, /role="group"[^>]*aria-disabled="true"/);
  assert.match(disabled, /<button[^>]*\sdisabled[ >]/);
  assert.doesNotMatch(disabled, /tabindex="0"/);
});

test("read-only calendars expose a readable grid and keep the month navigation usable", async () => {
  const readonly = await render(UICalendar, { readonly: true });
  assert.match(readonly, /aria-readonly="true"[^>]*role="grid"/);
  assert.match(readonly, /<button(?![^>]*\sdisabled[ >])[^>]*data-part="next-month"/);

  const disabled = await render(UICalendar, { disabled: true, readonly: true });
  assert.match(disabled, /aria-disabled="true"[^>]*role="grid"/);
  assert.match(disabled, /<button[^>]*\sdisabled[^>]*data-part="next-month"/);
});

test("initially open disclosures and checkbox branches are present in server output", async () => {
  const disclosure = await render(UIDisclosure, { modelValue: true }, () => h(UIDisclosureContent, null, () => "Notes"));
  assert.match(disclosure, /<div(?![^>]*\shidden[ >])[^>]*class="ui-expandable-content"[^>]*data-state="open"/);
  assert.match(disclosure, /Notes/);

  const tree = await render(UICheckboxTree, {
    nodes: [{ id: "root", parentID: null, label: "Root" }, { id: "child", parentID: "root", label: "Child" }],
    defaultExpandedValues: ["root"],
  });
  assert.match(tree, /role="group"[^>]*data-part="group"[^>]*data-state="open"/);
  assert.match(tree, /role="treeitem"[^>]*aria-level="2"/);
});

test("a disabled Select keeps the trigger disabled and its popup closed", async () => {
  const html = await render(UISelect, {
    options: [{ value: "draft", label: "Draft" }], open: true, disabled: true,
  });
  assert.match(html, /<button[^>]*\sdisabled[^>]*aria-expanded="false"/);
  assert.match(html, /role="listbox"[^>]*hidden/);
});
