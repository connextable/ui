import assert from "node:assert/strict";
import test from "node:test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import {
  UICalendar, UICheckboxGroup, UICheckboxTree, UIEditable, UIForm, UIFormControl, UIFormField, UIGridEditor,
  UIInput, UIPinInput, UIRangeCalendar, UISelect, UITagsInput, UIToggleButton, UIToggleGroup, UITreeSelect,
} from "@connextable/ui";

const nodes = [{ id: "design", parentID: null, label: "Design" }];
const options = [{ value: "design", label: "Design" }, { value: "ops", label: "Operations" }];
const date = { year: 2026, month: 8, day: 22 };

function render(control, props, children, field = {}) {
  const app = createSSRApp({ render: () => h(UIForm, null, () => h(UIFormField, {
    id: "audit", name: "selection", label: "Selection", description: "Pick a value", required: true, ...field,
  }, () => h(control, props, children))) });
  return renderToString(app);
}

function encodedInputs(html, name) {
  return [...html.matchAll(/<input\b[^>]*>/g)].map(([tag]) => tag).filter(tag => tag.includes(`name="${name}"`));
}

test("an adopted native form control inherits its accessible name and input state before hydration", async () => {
  const html = await render(UIFormControl, {}, () => h("input", { value: "OPS-2026" }), { readonly: true });
  const [input] = encodedInputs(html, "selection");
  assert.match(html, /<label[^>]+for="audit-control"/);
  assert.match(input, /id="audit-control"/);
  assert.match(input, /aria-describedby="audit-description audit-message"/);
  assert.match(input, /\sreadonly\b/);
  assert.doesNotMatch(input, /\sdisabled\b/);
  const standalone = await renderToString(createSSRApp({
    render: () => h(UIFormControl, null, () => h("input", { disabled: true })),
  }));
  assert.match(standalone, /<input[^>]*\sdisabled\b/);
});

test("required composite controls validate the whole value and serialize only their accepted values", async () => {
  for (const [component, props] of [
    [UICheckboxGroup, { options, modelValue: ["design"] }],
    [UIToggleGroup, { options, modelValue: ["design"] }],
    [UICheckboxTree, { nodes, modelValue: ["design"] }],
    [UITagsInput, { modelValue: ["design"] }],
  ]) {
    const html = await render(component, props);
    assert.match(html, /<select[^>]+ui-form-constraint[^>]+\srequired\b[^>]*>/, "whole-field native constraint");
    assert.match(html, /<option value="1" selected>/);
    const encoded = encodedInputs(html, "selection");
    assert.equal(encoded.length, 1);
    assert.match(encoded[0], /\bvalue="design"/);
  }

  const partialPin = await render(UIPinInput, { length: 4, modelValue: "12" });
  assert.match(partialPin, /<option value(?:="")? selected>/);
  assert.match(encodedInputs(partialPin, "selection")[0], /value="12"/);
  const completePin = await render(UIPinInput, { length: 4, modelValue: "1234" });
  assert.match(completePin, /<option value="1" selected>/);
});

test("readonly composite values remain successful controls and disabled values are omitted", async () => {
  const props = { nodes, defaultValue: ["design"] };
  const readonly = await render(UICheckboxTree, props, undefined, { readonly: true, form: "outer" });
  assert.match(readonly, /role="tree"[^>]*aria-readonly="true"/);
  assert.match(encodedInputs(readonly, "selection")[0], /form="outer" value="design"/);
  assert.doesNotMatch(encodedInputs(readonly, "selection")[0], /\sdisabled\b/);
  const disabled = await render(UICheckboxTree, props, undefined, { disabled: true, readonly: true });
  assert.match(encodedInputs(disabled, "selection")[0], /\sdisabled\b/);
  const off = await render(UIToggleButton, { value: "notify" }, () => "Notify");
  assert.equal(encodedInputs(off, "selection").length, 0);
  const on = await render(UIToggleButton, { defaultValue: true, value: "notify" }, () => "Notify");
  assert.match(encodedInputs(on, "selection")[0], /value="notify"/);
});

test("search, inline and cell editors connect the visible or native control to field metadata", async () => {
  const tree = await render(UITreeSelect, { nodes, defaultValue: ["design"] });
  assert.match(tree, /<label[^>]+for="audit-control"[^>]*>/);
  assert.match(tree, /<input[^>]+id="audit-control"[^>]+aria-describedby="audit-description audit-message"/);
  assert.match(tree, /<select[^>]+name="selection"[^>]+required/);
  for (const [component, controlProps] of [[UIEditable, { defaultValue: "Alpha" }], [UIGridEditor, { modelValue: "Alpha" }], [UIInput, { defaultValue: "Alpha" }]]) {
    const html = await render(component, { ...controlProps, form: "external" });
    const [input] = encodedInputs(html, "selection");
    assert.match(input, /\srequired\b/);
    assert.match(input, /form="external"/);
    assert.match(input, /aria-describedby="audit-description audit-message"/);
  }
  const select = await render(UISelect, { options, label: "Environment", "aria-errormessage": "external-error" });
  assert.match(select, /<button[^>]+aria-errormessage="external-error"/);
});

test("the default inline calendars submit single and range values with form names", async () => {
  const calendar = await render(UICalendar, { defaultValue: date });
  assert.match(encodedInputs(calendar, "selection")[0], /value="2026-08-22"/);
  const range = await render(UIRangeCalendar, { defaultValue: { start: date, end: { ...date, day: 25 } } });
  assert.match(encodedInputs(range, "selection.start")[0], /value="2026-08-22"/);
  assert.match(encodedInputs(range, "selection.end")[0], /value="2026-08-25"/);
});
