<script setup lang="ts">
import ButtonPendingExample from "~/components/examples/ButtonPendingExample.vue";
import ButtonExample from "~/components/examples/ButtonExample.vue";
import ButtonVariantExample from "~/components/examples/ButtonVariantExample.vue";
import ButtonSizeExample from "~/components/examples/ButtonSizeExample.vue";
import ButtonDisabledExample from "~/components/examples/ButtonDisabledExample.vue";
import ButtonLeadingIconExample from "~/components/examples/ButtonLeadingIconExample.vue";
import ButtonTrailingIconExample from "~/components/examples/ButtonTrailingIconExample.vue";
import ButtonIconOnlyExample from "~/components/examples/ButtonIconOnlyExample.vue";
import ButtonLinkExample from "~/components/examples/ButtonLinkExample.vue";
import ButtonToggleExample from "~/components/examples/ButtonToggleExample.vue";
import ButtonLoadingExample from "~/components/examples/ButtonLoadingExample.vue";
import ButtonAsyncExample from "~/components/examples/ButtonAsyncExample.vue";
import ButtonFormExample from "~/components/examples/ButtonFormExample.vue";

definePageMeta({
  title: "UIButton",
  componentParts: ["UIToggleButton"],
  category: "동작",
  description: "화면 동작을 실행하거나 다른 페이지로 이동합니다.",
});
</script>

<template>
  <div>
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <ButtonExample />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="examples" title="동작별 예제">
      <ButtonLeadingIconExample />
      <ButtonTrailingIconExample />
      <ButtonIconOnlyExample />
      <ButtonLinkExample />
      <ButtonToggleExample />
      <ButtonDisabledExample />
      <ButtonLoadingExample />
      <ButtonAsyncExample />
      <ButtonPendingExample />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="appearance" title="모양">
      <ButtonVariantExample />
      <ButtonSizeExample />
    </PlaygroundExampleSection>
    <PlaygroundFormSection>
      <ButtonFormExample />
    </PlaygroundFormSection>
  </div>
</template>
