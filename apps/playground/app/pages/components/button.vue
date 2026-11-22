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

const api = {
  props: {
    variant: "solid는 주요 동작, soft는 보조 강조, outline은 경계선, ghost는 배경 없이 표시합니다. 기본값은 solid입니다.",
    size: "sm, md, lg 가운데 선택합니다. 기본값은 md입니다.",
    block: "버튼과 링크 버튼이 부모 너비를 채웁니다. 기본값은 false입니다. 아이콘 전용 버튼은 원형 크기를 유지합니다.",
    "icon-only": "원형 크기를 지정하는 기존 속성입니다. 아이콘만 표시할 때는 UIIconButton을 사용할 수 있습니다.",
    loading: "버튼 크기를 유지하며 가운데 진행 표시를 띄우고, aria-busy를 설정해 실행을 막습니다.",
    disabled: "버튼 실행과 키보드 탭 진입을 막습니다.",
    type: "기본값인 button은 클릭 동작에 사용합니다. submit은 폼을 제출하고 reset은 초기화합니다.",
    form: "폼 밖에 있는 버튼을 폼의 id와 연결하는 HTML 속성입니다.",
  },
  link: {
    to: "Nuxt 내부 이동에 사용하는 경로 문자열 또는 라우트 객체입니다. to와 href가 모두 있으면 to가 우선합니다.",
    href: "일반 URL 또는 파일 경로를 전달합니다. Nuxt 모듈 없이도 문자열 주소는 링크로 동작합니다.",
    target: "_blank를 지정하면 새 탭에서 엽니다.",
    rel: "noopener, noreferrer 같은 링크 관계를 지정합니다.",
    external: "NuxtLink에 외부 이동을 명시합니다.",
    download: "파일을 저장하는 링크에 사용합니다. 파일명을 지정하거나 불리언 속성으로 사용할 수 있습니다.",
    "prefetch / no-prefetch": "Nuxt의 프리패치를 재정의합니다. 생략하면 Nuxt 설정을 따릅니다.",
    "prefetch-on": "visibility, interaction 또는 두 트리거의 사용 여부를 담은 객체를 전달합니다.",
  },
  slotsAndEvents: {
    default: "버튼에 표시할 라벨을 넣습니다.",
    "leading / trailing": "라벨 앞이나 뒤에 아이콘 등 보조 콘텐츠를 넣습니다.",
    loading: "로딩 중 가운데 표시할 진행 아이콘을 지정합니다.",
    click: "활성 버튼을 실행할 때 MouseEvent를 전달합니다.",
  },
};

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
      <ButtonUsageExample topic="appearance" />
      <ButtonUsageExample topic="size" />
      <ButtonFullWidthExample />
      <ButtonUsageExample topic="icons" />
      <ButtonUsageExample topic="loading" />
      <IconButtonExample />
      <ButtonUsageExample topic="disabled" />
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
      <ButtonAsyncExample />
      <ButtonPendingExample />
      <div id="form"><ButtonFormExample /></div>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="api" title="API">
      <template v-for="group in [
        { id: 'button-props', title: '버튼 속성', entries: api.props },
        { id: 'button-link-props', title: '링크 속성', entries: api.link },
        { id: 'button-slots-events', title: '슬롯과 이벤트', entries: api.slotsAndEvents },
      ]" :key="group.id">
        <h3 :id="group.id" class="button-page__reference-heading" data-playground-heading tabindex="-1">{{ group.title }}</h3>
        <dl class="button-page__reference">
          <div v-for="(description, name) in group.entries" :key="name">
            <dt><code>{{ name }}</code></dt>
            <dd>{{ description }}</dd>
          </div>
        </dl>
      </template>
    </PlaygroundExampleSection>
  </div>
</template>

<style scoped>
.button-page__intro {
  margin: 0 0 calc(var(--ui-space-md) * 2);
  color: var(--ui-color-text-muted);
  word-break: keep-all;
}

.button-page__reference-heading {
  margin: calc(var(--ui-space-md) * 2) 0 var(--ui-space-md);
  font-size: var(--ui-font-size-body);
}

.button-page__reference {
  margin: 0;
  border-block-start: 1px solid var(--ui-color-divider);
}

.button-page__reference > div {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: var(--ui-space-xs) var(--ui-space-md);
  padding-block: var(--ui-space-sm);
  border-block-end: 1px solid var(--ui-color-divider);
  overflow-wrap: anywhere;
}

.button-page__reference code {
  font-family: var(--ui-font-mono);
  font-weight: 600;
}

.button-page__reference dd {
  margin: 0;
  color: var(--ui-color-text-muted);
  word-break: keep-all;
}

@media (width < 42rem) {
  .button-page__reference > div {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
