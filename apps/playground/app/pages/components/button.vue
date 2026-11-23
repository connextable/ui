<script setup lang="ts">
import ButtonToggleIconExample from "~/components/examples/ButtonToggleIconExample.vue";
import iconSource from "~/components/examples/ButtonToggleIconExample.vue?example-code&raw";
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
  description: "화면 동작을 실행하거나 다른 페이지로 이동합니다.",
});
</script>

<template>
  <div>
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <ButtonExample />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="settings-and-behavior" title="설정과 동작">
      <div id="button-content" data-playground-anchor tabindex="-1">
        <ButtonUsageExample topic="label" />
        <ButtonUsageExample topic="icons" />
      </div>
      <div id="button-appearance" data-playground-anchor tabindex="-1">
        <ButtonUsageExample topic="appearance" />
        <ButtonUsageExample topic="size" />
        <ButtonFullWidthExample />
      </div>
      <div id="button-states" data-playground-anchor tabindex="-1">
        <ButtonUsageExample topic="disabled" />
        <ButtonUsageExample topic="loading" />
      </div>
      <div id="button-types" data-playground-anchor tabindex="-1">
        <IconButtonExample />
        <ButtonToggleExample />
        <PlaygroundExample
          id="button-toggle-icon"
          title="토글 버튼에 아이콘 표시"
          description="icon으로 고정 동작의 아이콘을 지정하고 v-model로 눌림 상태를 연결합니다."
          :source="iconSource"
        >
          <ButtonToggleIconExample />
        </PlaygroundExample>
      </div>
      <div id="link" data-playground-anchor tabindex="-1">
        <p class="button-page__intro">
          이동에 버튼 스타일이 필요하면 UIButton에 주소를 전달합니다.
          본문에 넣는 텍스트 링크는 <UIAnchor to="/components/anchor">UIAnchor</UIAnchor>로 표시합니다.
        </p>
        <ButtonLinkExample />
      </div>
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
