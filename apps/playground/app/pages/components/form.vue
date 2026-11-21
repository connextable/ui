<script setup lang="ts">
import FormServerErrorExample from "~/components/form/FormServerErrorExample.vue";
import FormServerErrorExampleSource from "~/components/form/FormServerErrorExample.vue?example-code&raw";
import FormRevalidationExample from "~/components/form/FormRevalidationExample.vue";
import FormRevalidationExampleSource from "~/components/form/FormRevalidationExample.vue?example-code&raw";
import FormFieldSelectorExample from "~/components/form/FormFieldSelectorExample.vue";
import FormFieldSelectorExampleSource from "~/components/form/FormFieldSelectorExample.vue?example-code&raw";
import FormSelectorExample from "~/components/form/FormSelectorExample.vue";
import FormSelectorExampleSource from "~/components/form/FormSelectorExample.vue?example-code&raw";
import FormSubmitExample from "~/components/form/FormSubmitExample.vue";
import submitSource from "~/components/form/FormSubmitExample.vue?example-code&raw";
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
  category: "입력·폼",
  description: "입력과 동작을 묶어 유효성을 검사하고 값을 제출합니다.",
  componentParts: ["UIFormField", "UIFormFieldGroup", "UIFormActions", "UIFormSubmit", "UIFormReset", "UIFormSummary", "UIFormSelector", "UIFormFieldSelector"],
});
</script>

<template>
  <div>
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <PlaygroundExample :heading-level="3"
        id="form-submit"
        title="기본 제출"
        description="UIForm에서 submit 이벤트를 받아 제출을 처리합니다."
        :source="submitSource"
      >
        <FormSubmitExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="examples" title="동작별 예제">
      <PlaygroundExample :heading-level="3"
        id="form-schema"
        title="스키마 검증"
        description="Standard Schema를 schema에 전달합니다. 수량이 유효하면 숫자로 변환된 값이 submit의 values에 들어갑니다."
        :source="schemaSource"
      >
        <FormSchemaExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="dynamic-fields"
        title="동적 필드"
        description="목록에서 입력 필드를 추가하거나 삭제합니다. 화면에 있는 필드만 필수값을 검사하며, 같은 name의 값은 FormData.getAll()로 읽습니다."
        :source="dynamicFieldsSource"
      >
        <DynamicFieldsExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="UIFormField"
        title="UIFormField"
        description="필드 안의 입력에 라벨과 도움말이 자동으로 연결됩니다."
        :source="fieldSource"
      >
        <FormFieldExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="required-field"
        title="필수 필드"
        description="UIFormField에 required를 지정합니다. 값을 비워 두고 제출하면 해당 필드에 오류가 표시됩니다."
        :source="requiredSource"
      >
        <RequiredFieldExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="UIFormFieldGroup"
        title="UIFormFieldGroup"
        description="입력마다 field에 그룹 값의 키를 전달합니다. 이름과 성을 바꾸면 작성자 객체 하나가 갱신되고, 제출할 때는 같은 이름 아래 두 값이 묶입니다."
        :source="fieldGroupSource"
      >
        <FormFieldGroupExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="field-group-models"
        title="개별 입력의 v-model"
        description="입력은 각각의 ref에 연결하고, 두 ref를 읽고 쓰는 computed를 그룹의 v-model에 연결합니다."
        :source="fieldGroupModelsSource"
      >
        <FormFieldGroupModelsExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="field-group-select"
        title="복합 입력과 함께 사용"
        description="UISelect는 하위 UIFormField에 이름을 연결하고 bindModel로 같은 그룹 객체에 값을 반영합니다."
        :source="fieldGroupSelectSource"
      >
        <FormFieldGroupSelectExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="UIFormActions"
        title="UIFormActions"
        description="초기화와 제출 버튼을 오른쪽에 묶습니다. 제출 결과는 UIForm의 output 슬롯에 표시합니다."
        :source="actionsSource"
      >
        <FormActionsExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="UIFormSubmit"
        title="UIFormSubmit"
        description="제출 함수가 완료될 때까지 로딩 상태를 표시하고 추가 제출을 막습니다."
        :source="submitStateSource"
      >
        <FormSubmitStateExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="UIFormReset"
        title="UIFormReset"
        description="값을 바꾼 다음 초기화하면 폼의 처음 값으로 돌아갑니다."
        :source="resetSource"
      >
        <FormResetExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="UIFormSummary"
        title="UIFormSummary"
        description="폼 전체의 검증 오류나 제출 실패 메시지를 표시합니다."
        :source="summarySource"
      >
        <FormSummaryExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3" id="form-server-error" title="저장 실패 후 재시도" description="첫 저장에서 오류 요약을 확인합니다. 같은 값을 다시 제출하면 저장합니다." :source="FormServerErrorExampleSource">
        <FormServerErrorExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3" id="form-revalidate" title="검증 시점" description="세 글자보다 짧은 제목을 쓴 뒤 Tab을 누르고, 다시 입력하며 오류가 사라지는지 확인합니다." :source="FormRevalidationExampleSource">
        <FormRevalidationExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3" id="UIFormFieldSelector" title="UIFormFieldSelector" description="필드 하나가 방문된 상태를 구독해 표시합니다." :source="FormFieldSelectorExampleSource">
        <FormFieldSelectorExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3" id="UIFormSelector" title="UIFormSelector" description="폼 전체에 수정된 필드가 있는지 구독합니다." :source="FormSelectorExampleSource">
        <FormSelectorExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
  </div>
</template>
