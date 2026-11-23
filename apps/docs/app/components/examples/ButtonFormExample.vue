<script setup lang="ts">
import { UIButton, UIForm, UIFormField, UIInput } from "@connextable/ui";
import { ref, useId } from "vue";
import source from "./ButtonFormExample.vue?example-code&raw";

const formId = useId();
const initialName = "민지";
const name = ref(initialName);
const submitted = ref<string | null>(null);

function submit() {
  submitted.value = name.value;
}

function reset() {
  name.value = initialName;
  submitted.value = null;
}
</script>

<template>
  <PlaygroundExample
    id="button-submit"
    title="입력 폼 밖에서 제출하고 초기화하기"
    description="폼과 버튼이 떨어져 있을 때 form에 폼의 id를 전달합니다. type은 저장 버튼에 submit, 초기화 버튼에 reset을 지정합니다."
    :source="source"
  >
    <UIForm :id="formId" @submit="submit" @reset="reset">
      <UIFormField label="표시 이름">
        <UIInput v-model="name" />
      </UIFormField>
    </UIForm>
    <div class="profile-actions">
      <UIButton type="reset" :form="formId" variant="outline">초기화</UIButton>
      <UIButton type="submit" :form="formId">저장</UIButton>
    </div>
    <template v-if="submitted !== null" #footer>
      <output>저장한 이름 {{ submitted || "없음" }}</output>
    </template>
  </PlaygroundExample>
</template>

<style scoped>
.profile-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  gap: var(--ui-space-sm);
  inline-size: min(100%, 26rem);
}
</style>
