<script setup lang="ts">
import { UIAnchor } from "@connextable/ui";
import ButtonAsyncExample from "~/components/examples/ButtonAsyncExample.vue";
import ButtonExample from "~/components/examples/ButtonExample.vue";
import ButtonFormExample from "~/components/examples/ButtonFormExample.vue";
import ButtonFullWidthExample from "~/components/examples/ButtonFullWidthExample.vue";
import ButtonLinkExample from "~/components/examples/ButtonLinkExample.vue";
import ButtonPendingExample from "~/components/examples/ButtonPendingExample.vue";
import ButtonToggleExample from "~/components/examples/ButtonToggleExample.vue";
import ButtonUsageExample from "~/components/examples/ButtonUsageExample.vue";
import IconButtonExample from "~/components/examples/IconButtonExample.vue";

definePageMeta({
  title: "UIButton",
  componentParts: ["UIIconButton", "UIToggleButton"],
  category: "동작",
  description: "화면 동작을 실행하거나 다른 페이지로 이동합니다.",
});
</script>

<template>
  <div>
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <ButtonExample />
      <ButtonUsageExample topic="label" />
      <ButtonUsageExample topic="icons" />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="button-appearance" title="모양과 크기">
      <ButtonUsageExample topic="appearance" />
      <ButtonUsageExample topic="size" />
      <ButtonFullWidthExample />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="button-states" title="비활성과 로딩">
      <ButtonUsageExample topic="disabled" />
      <ButtonUsageExample topic="loading" />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="button-types" title="버튼 종류">
      <IconButtonExample />
      <ButtonToggleExample />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="link" title="링크">
      <p class="button-page__intro">
        이동에 버튼 스타일이 필요하면 UIButton에 주소를 전달합니다.
        본문에 넣는 텍스트 링크는 <UIAnchor to="/components/anchor">UIAnchor</UIAnchor>로 표시합니다.
      </p>
      <ButtonLinkExample />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="examples" title="실전 예제">
      <ButtonPendingExample />
      <ButtonAsyncExample />
      <div id="form"><ButtonFormExample /></div>
    </PlaygroundExampleSection>
  </div>
</template>

<style scoped>
.button-page__intro {
  margin: 0 0 calc(var(--ui-space-md) * 2);
  color: var(--ui-color-text-muted);
  word-break: keep-all;
}

</style>
