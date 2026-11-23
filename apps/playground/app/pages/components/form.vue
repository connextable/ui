<script setup lang="ts">
import CompositeFieldsExample from "~/components/form/CompositeFieldsExample.vue";
import compositeFieldsSource from "~/components/form/CompositeFieldsExample.vue?example-code&raw";
import FormServerErrorExample from "~/components/form/FormServerErrorExample.vue";
import FormServerErrorExampleSource from "~/components/form/FormServerErrorExample.vue?example-code&raw";
import FormRevalidationExample from "~/components/form/FormRevalidationExample.vue";
import FormRevalidationExampleSource from "~/components/form/FormRevalidationExample.vue?example-code&raw";
import FormFieldSelectorExample from "~/components/form/FormFieldSelectorExample.vue";
import FormFieldSelectorExampleSource from "~/components/form/FormFieldSelectorExample.vue?example-code&raw";
import FormSelectorExample from "~/components/form/FormSelectorExample.vue";
import FormSelectorExampleSource from "~/components/form/FormSelectorExample.vue?example-code&raw";
import FormSubmitExample from "~/components/form/FormSubmitExample.vue";
import FormSchemaExample from "~/components/form/FormSchemaExample.vue";
import schemaSource from "~/components/form/FormSchemaExample.vue?example-code&raw";
import DynamicFieldsExample from "~/components/form/DynamicFieldsExample.vue";
import dynamicFieldsSource from "~/components/form/DynamicFieldsExample.vue?example-code&raw";
import FormFieldExample from "~/components/form/FormFieldExample.vue";
import fieldSource from "~/components/form/FormFieldExample.vue?example-code&raw";
import FormFieldGroupExample from "~/components/form/FormFieldGroupExample.vue";
import fieldGroupSource from "~/components/form/FormFieldGroupExample.vue?example-code&raw";
import FormFieldGroupModelsExample from "~/components/form/FormFieldGroupModelsExample.vue";
import fieldGroupModelsSource from "~/components/form/FormFieldGroupModelsExample.vue?example-code&raw";
import FormFieldGroupSelectExample from "~/components/form/FormFieldGroupSelectExample.vue";
import fieldGroupSelectSource from "~/components/form/FormFieldGroupSelectExample.vue?example-code&raw";
import RequiredFieldExample from "~/components/form/RequiredFieldExample.vue";
import requiredSource from "~/components/form/RequiredFieldExample.vue?example-code&raw";
import FormActionsExample from "~/components/form/FormActionsExample.vue";
import actionsSource from "~/components/form/FormActionsExample.vue?example-code&raw";
import FormSubmitStateExample from "~/components/form/FormSubmitStateExample.vue";
import submitStateSource from "~/components/form/FormSubmitStateExample.vue?example-code&raw";
import FormResetExample from "~/components/form/FormResetExample.vue";
import resetSource from "~/components/form/FormResetExample.vue?example-code&raw";
import FormSummaryExample from "~/components/form/FormSummaryExample.vue";
import summarySource from "~/components/form/FormSummaryExample.vue?example-code&raw";

definePageMeta({
  title: "UIForm",
  description: "입력과 동작을 묶어 유효성을 검사하고 값을 제출합니다.",
  componentParts: ["UIFormField", "UIFormLabel", "UIFormDescription", "UIFormMessage", "UIFormFieldGroup", "UIFormActions", "UIFormSubmit", "UIFormReset", "UIFormSummary", "UIFormSelector", "UIFormFieldSelector"],
});
</script>

<template>
  <div>
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <FormSubmitExample />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="settings-and-behavior" title="설정과 동작">
      <div id="form-fields" data-playground-anchor tabindex="-1">
        <PlaygroundExample
          id="UIFormField"
          title="UIFormField"
          description="필드 안의 입력에 라벨과 도움말이 자동으로 연결됩니다."
          :source="fieldSource"
        >
          <FormFieldExample />
        </PlaygroundExample>
        <PlaygroundExample
          id="required-field"
          title="필수 필드"
          description="UIFormField에 required를 지정합니다. 값을 비워 두고 제출하면 해당 필드에 오류가 표시됩니다."
          :source="requiredSource"
        >
          <RequiredFieldExample />
        </PlaygroundExample>
        <PlaygroundExample
          id="UIFormFieldGroup"
          title="UIFormFieldGroup"
          description="입력마다 field에 그룹 값의 키를 전달합니다. 이름과 성을 바꾸면 작성자 객체 하나가 갱신되고, 제출할 때는 같은 이름 아래 두 값이 묶입니다."
          :source="fieldGroupSource"
        >
          <FormFieldGroupExample />
        </PlaygroundExample>
        <PlaygroundExample
          id="field-group-models"
          title="개별 입력의 v-model"
          description="입력은 각각의 ref에 연결하고, 두 ref를 읽고 쓰는 computed를 그룹의 v-model에 연결합니다."
          :source="fieldGroupModelsSource"
        >
          <FormFieldGroupModelsExample />
        </PlaygroundExample>
        <PlaygroundExample
          id="field-group-select"
          title="복합 입력과 함께 사용"
          description="UISelect는 하위 UIFormField에 이름을 연결하고 bindModel로 같은 그룹 객체에 값을 반영합니다."
          :source="fieldGroupSelectSource"
        >
          <FormFieldGroupSelectExample />
        </PlaygroundExample>
      </div>
      <div id="form-actions" data-playground-anchor tabindex="-1">
        <PlaygroundExample
          id="UIFormActions"
          title="UIFormActions"
          description="초기화와 제출 버튼을 오른쪽에 묶습니다. 제출 결과는 UIForm의 output 슬롯에 표시합니다."
          :source="actionsSource"
        >
          <FormActionsExample />
        </PlaygroundExample>
        <PlaygroundExample
          id="UIFormSubmit"
          title="UIFormSubmit"
          description="제출 함수가 완료될 때까지 로딩 상태를 표시하고 추가 제출을 막습니다."
          :source="submitStateSource"
        >
          <FormSubmitStateExample />
        </PlaygroundExample>
        <PlaygroundExample
          id="UIFormReset"
          title="UIFormReset"
          description="값을 바꾼 다음 초기화하면 폼의 처음 값으로 돌아갑니다."
          :source="resetSource"
        >
          <FormResetExample />
        </PlaygroundExample>
      </div>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="examples" title="실전 예제">
      <PlaygroundExample
        id="composite-fields"
        title="복합 입력 검증과 제출"
        description="빈 폼을 확정하면 입력별 필수 조건을 확인할 수 있습니다. 값을 채우고 확정하면 실제 제출값을 확인합니다. 초기화를 누르면 입력 상태가 기본값으로 돌아갑니다."
        :source="compositeFieldsSource"
      >
        <CompositeFieldsExample />
      </PlaygroundExample>
      <PlaygroundExample
        id="form-schema"
        title="스키마 검증"
        description="Standard Schema를 schema에 전달합니다. 수량이 유효하면 숫자로 변환된 값이 submit의 values에 들어갑니다."
        :source="schemaSource"
      >
        <FormSchemaExample />
      </PlaygroundExample>
      <PlaygroundExample
        id="dynamic-fields"
        title="동적 필드"
        description="각 입력에 items와 현재 인덱스를 이름으로 지정합니다. 화면에 남은 항목만 검증하고, 제출값은 values.items 배열에서 순서대로 읽습니다."
        :source="dynamicFieldsSource"
      >
        <DynamicFieldsExample />
      </PlaygroundExample>
      <PlaygroundExample
        id="UIFormSummary"
        title="UIFormSummary"
        description="폼 전체의 검증 오류나 제출 실패 메시지를 표시합니다."
        :source="summarySource"
      >
        <FormSummaryExample />
      </PlaygroundExample>
      <PlaygroundExample id="form-server-error" title="저장 실패 후 재시도" description="첫 저장에서 오류 요약을 확인합니다. 같은 값을 다시 제출하면 저장합니다." :source="FormServerErrorExampleSource">
        <FormServerErrorExample />
      </PlaygroundExample>
      <PlaygroundExample id="form-revalidate" title="검증 시점" description="validate에 검증 함수를 전달합니다. 짧은 제목을 입력하고 Tab을 누르면 오류가 나타납니다. 세 글자 이상으로 늘리면 오류가 사라집니다." :source="FormRevalidationExampleSource">
        <FormRevalidationExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="composition-and-extension" title="조합과 확장">
      <div id="form-state" data-playground-anchor tabindex="-1">
        <PlaygroundExample id="UIFormFieldSelector" title="UIFormFieldSelector" description="필드 하나가 방문된 상태를 구독해 표시합니다." :source="FormFieldSelectorExampleSource">
          <FormFieldSelectorExample />
        </PlaygroundExample>
        <PlaygroundExample id="UIFormSelector" title="UIFormSelector" description="폼 전체에 수정된 필드가 있는지 구독합니다." :source="FormSelectorExampleSource">
          <FormSelectorExample />
        </PlaygroundExample>
      </div>
    </PlaygroundExampleSection>
  </div>
</template>
