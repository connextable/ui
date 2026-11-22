import assert from "node:assert/strict";
import test from "node:test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import {
  createUIStandardQuantityPolicies, UICheckboxGroup, UICombobox, UIEditable, UIListbox,
  UIPinInput, UIPinInputInput, UIQuantityField, UIQuantityFieldInput, UIRating, UISpinButton, UIToggleGroup,
} from "@connextable/ui";

function render(component, props, slots) {
  return renderToString(createSSRApp({ render: () => h(component, props, slots) }));
}

test("PIN length controls how many inputs render, including with clearing enabled", async () => {
  const standard = await render(UIPinInput, { label: "인증 코드" });
  assert.equal([...standard.matchAll(/<input[^>]*type="text"/g)].length, 6);
  const masked = await render(UIPinInput, { length: 4, defaultValue: "2846", mask: true, clearable: true });
  assert.equal([...masked.matchAll(/<input[^>]*type="password"/g)].length, 4);
  assert.match(masked, /aria-label="인증 코드 지우기"/);
  const custom = await render(UIPinInput, { length: 1 }, { default: () => h(UIPinInputInput, { index: 0, "aria-label": "보안 키" }) });
  assert.match(custom, /aria-label="보안 키"/);
});

test("quantity defaults render the input and unit, and allow custom unit presentation", async () => {
  const props = {
    policies: createUIStandardQuantityPolicies("metre", "metric"),
    defaultValue: { value: "1.25", unit: "metre" },
    label: "길이",
  };
  const standard = await render(UIQuantityField, {
    unit: "metre", unitSystem: "metric", modelValue: props.defaultValue, label: "길이", name: "length",
  });
  assert.match(standard, /<input[^>]+name="length"[^>]+value="1.25"/);
  assert.match(standard, />m<\/span>/);
  const convertible = await render(UIQuantityField, { ...props, defaultDisplayUnit: "centimetre", displayUnits: ["centimetre", "metre"] });
  assert.match(convertible, /<input[^>]+value="125"/);
  assert.match(convertible, /aria-label="길이 표시 단위"/);
  const custom = await render(UIQuantityField, props, { default: () => h(UIQuantityFieldInput, { "data-custom": "input" }) });
  assert.match(custom, /<input[^>]+data-custom="input"/);
  assert.doesNotMatch(custom, />m<\/span>/);
});

test("simple choice roots render their options and preserve disabled choices", async () => {
  const options = [{ value: "email", label: "이메일" }, { value: "sms", label: "문자", disabled: true }];
  for (const component of [UICheckboxGroup, UIListbox, UIToggleGroup]) {
    const html = await render(component, { options });
    assert.match(html, /이메일/);
    assert.match(html, /문자/);
    assert.match(html, /aria-disabled="true"| disabled/);
  }
  const combo = await render(UICombobox, { items: [{ id: "email", label: "이메일" }], defaultOpen: true, placeholder: "알림 검색" });
  assert.match(combo, /placeholder="알림 검색"/);
  assert.match(combo, /이메일/);
  const rating = await render(UIRating, { items: ["1", "2", "3"] });
  assert.equal([...rating.matchAll(/role="radio"/g)].length, 3);
});

test("editable and numeric roots supply the common input and actions", async () => {
  const editable = await render(UIEditable, { defaultValue: "배포 이름" });
  assert.match(editable, /<button[^>]*>배포 이름<\/button>/);
  assert.match(editable, /<input/);
  const spinButton = await render(UISpinButton, { min: 1, max: 9, defaultValue: 4, layout: "field", unit: "개" });
  assert.match(spinButton, /role="spinbutton"/);
  assert.match(spinButton, /aria-label="늘리기"/);
  assert.match(spinButton, /aria-label="줄이기"/);
});
