<script setup lang="ts">
import ButtonPendingExample from "~/components/examples/ButtonPendingExample.vue";
import ButtonPendingExampleSource from "~/components/examples/ButtonPendingExample.vue?example-code&raw";
import ButtonExample from "~/components/examples/ButtonExample.vue";
import buttonExampleSource from "~/components/examples/ButtonExample.vue?example-code&raw";
import ButtonVariantExample from "~/components/examples/ButtonVariantExample.vue";
import buttonVariantExampleSource from "~/components/examples/ButtonVariantExample.vue?example-code&raw";
import ButtonSizeExample from "~/components/examples/ButtonSizeExample.vue";
import buttonSizeExampleSource from "~/components/examples/ButtonSizeExample.vue?example-code&raw";
import ButtonDisabledExample from "~/components/examples/ButtonDisabledExample.vue";
import buttonDisabledExampleSource from "~/components/examples/ButtonDisabledExample.vue?example-code&raw";
import ButtonLeadingIconExample from "~/components/examples/ButtonLeadingIconExample.vue";
import leadingIconSource from "~/components/examples/ButtonLeadingIconExample.vue?example-code&raw";
import ButtonTrailingIconExample from "~/components/examples/ButtonTrailingIconExample.vue";
import trailingIconSource from "~/components/examples/ButtonTrailingIconExample.vue?example-code&raw";
import ButtonIconOnlyExample from "~/components/examples/ButtonIconOnlyExample.vue";
import iconOnlySource from "~/components/examples/ButtonIconOnlyExample.vue?example-code&raw";
import ButtonToggleExample from "~/components/examples/ButtonToggleExample.vue";
import toggleSource from "~/components/examples/ButtonToggleExample.vue?example-code&raw";
import ButtonLoadingExample from "~/components/examples/ButtonLoadingExample.vue";
import loadingSource from "~/components/examples/ButtonLoadingExample.vue?example-code&raw";
import ButtonAsyncExample from "~/components/examples/ButtonAsyncExample.vue";
import asyncSource from "~/components/examples/ButtonAsyncExample.vue?example-code&raw";
import ButtonFormExample from "~/components/examples/ButtonFormExample.vue";
import formSource from "~/components/examples/ButtonFormExample.vue?example-code&raw";

definePageMeta({
  title: "UIButton",
  componentParts: ["UIToggleButton"],
  category: "동작",
  description: "화면 동작을 실행하고, 아이콘과 선택 상태, 요청 진행 상태를 표시합니다.",
});
</script>

<template>
  <div>
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <PlaygroundExample :heading-level="3"
        id="button-example"
        title="기본 동작"
        description="click 이벤트로 버튼 동작을 연결합니다."
        :source="buttonExampleSource"
      >
        <ButtonExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="examples" title="동작별 예제">
      <PlaygroundExample :heading-level="3"
        id="button-leading-icon"
        title="앞쪽 아이콘"
        description="leading 슬롯에 버튼 텍스트 앞에 둘 아이콘을 넣습니다."
        :source="leadingIconSource"
      >
        <ButtonLeadingIconExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="button-trailing-icon"
        title="뒤쪽 아이콘"
        description="trailing 슬롯에 버튼 텍스트 뒤에 둘 아이콘을 넣습니다."
        :source="trailingIconSource"
      >
        <ButtonTrailingIconExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="button-icon-only"
        title="아이콘 전용 버튼"
        description="icon-only로 정사각형 크기를 적용하고 aria-label로 동작을 설명합니다."
        :source="iconOnlySource"
      >
        <ButtonIconOnlyExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="UIToggleButton"
        title="UIToggleButton"
        description="v-model로 켜짐 상태를 연결하면 aria-pressed가 함께 바뀝니다."
        :source="toggleSource"
      >
        <ButtonToggleExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="button-disabled"
        title="비활성"
        description="disabled를 지정하면 눌러도 동작하지 않습니다."
        :source="buttonDisabledExampleSource"
      >
        <ButtonDisabledExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="button-loading"
        title="로딩 표시"
        description="loading을 켜면 스피너를 표시하고 버튼의 실행을 막습니다. 상태를 바꿔 실행 횟수를 확인하세요."
        :source="loadingSource"
      >
        <ButtonLoadingExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="button-async"
        title="비동기 요청과 재시도"
        description="요청이 끝날 때까지 loading을 유지합니다. 이 예제는 첫 저장에 실패하고 재시도하면 성공합니다."
        :source="asyncSource"
      >
        <ButtonAsyncExample />
      </PlaygroundExample>
      <PlaygroundExample id="button-pending" title="요청 중 중복 실행 방지"
        description="저장을 연속으로 눌러 요청이 한 번만 처리되는지 확인하세요." :source="ButtonPendingExampleSource" :heading-level="3">
        <ButtonPendingExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="appearance" title="모양">
      <PlaygroundExample :heading-level="3"
        id="button-variant"
        title="스타일"
        description="variant만 바꿔 같은 크기의 버튼을 비교합니다."
        :source="buttonVariantExampleSource"
      >
        <ButtonVariantExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="button-size"
        title="크기"
        description="크기를 선택해 size에 따른 버튼 높이를 비교합니다."
        :source="buttonSizeExampleSource"
      >
        <ButtonSizeExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundFormSection>
      <PlaygroundExample
        id="button-submit"
        title="폼 밖에서 제출"
        description="type이 submit인 버튼은 form 속성으로 연결한 폼을 제출합니다."
        :source="formSource"
        :heading-level="3"
      >
        <ButtonFormExample />
      </PlaygroundExample>
    </PlaygroundFormSection>
  </div>
</template>
