import assert from "node:assert/strict";
import test from "node:test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { UIMultiThumbSlider, UISlider } from "@connextable/ui";

function render(component, props, content) {
  return renderToString(createSSRApp({ render: () => h(component, props, content) }));
}

test("slider roots supply default handles and allow a custom composition", async () => {
  const single = await render(UISlider, { label: "밝기", defaultValue: "40" });
  assert.match(single, /role="slider"[^>]+aria-valuenow="40"/);
  const range = await render(UIMultiThumbSlider, { thumbs: ["low", "high"], defaultValue: ["20", "80"] });
  assert.equal([...range.matchAll(/role="slider"/g)].length, 2);
  assert.match(range, /<output>20 – 80<\/output>/);
  const composed = await render(UISlider, {}, () => h("span", "custom slider"));
  assert.match(composed, /custom slider/);
  assert.doesNotMatch(composed, /role="slider"/);
});
