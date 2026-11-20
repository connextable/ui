<script setup lang="ts">
import CheckboxExample from "~/components/examples/CheckboxExample.vue";
import source from "~/components/examples/CheckboxExample.vue?example-code&raw";
import CheckboxSelectAllExample from "~/components/examples/CheckboxSelectAllExample.vue";
import selectAllSource from "~/components/examples/CheckboxSelectAllExample.vue?example-code&raw";
import CheckboxIndeterminateExample from "~/components/examples/CheckboxIndeterminateExample.vue";
import indeterminateSource from "~/components/examples/CheckboxIndeterminateExample.vue?example-code&raw";
import CheckboxDisabledExample from "~/components/examples/CheckboxDisabledExample.vue";
import disabledSource from "~/components/examples/CheckboxDisabledExample.vue?example-code&raw";

definePageMeta({
  title: "UICheckbox",
  category: "입력",
  description: "독립 항목을 선택하거나, 일부만 선택된 상태를 표시합니다.",
});
</script>

<template>
  <div>
    <PlaygroundExample
      id="checkbox-example"
      title="기본 선택"
      description="v-model로 선택 여부를 연결합니다."
      :source="source"
    >
      <CheckboxExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="checkbox-select-all"
      title="전체 선택"
      description="모두 선택을 누르면 두 검사 항목의 선택이 함께 바뀝니다."
      :source="selectAllSource"
    >
      <CheckboxSelectAllExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="checkbox-indeterminate"
      title="혼합 상태"
      description="indeterminate를 전달하면 체크 대신 가로선이 표시됩니다."
      :source="indeterminateSource"
    >
      <CheckboxIndeterminateExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="checkbox-disabled"
      title="비활성"
      description="disabled를 지정하면 사용자가 체크 상태를 바꿀 수 없습니다."
      :source="disabledSource"
    >
      <CheckboxDisabledExample />
    </PlaygroundExample>
  </div>
</template>
