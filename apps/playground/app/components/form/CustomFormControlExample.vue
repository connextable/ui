<script setup lang="ts">
import { UIForm, UIFormActions, UIFormControl, UIFormField, UIFormReset, UIFormSubmit, UISwitch, type UIFormSubmitEvent } from "@connextable/ui";
import { ref } from "vue";

const initial = "OPS-2026";
const reference = ref(initial);
const readonly = ref(false);
const disabled = ref(false);
const message = ref("");

function submit({ values }: UIFormSubmitEvent) {
  message.value = typeof values.reference === "string" ? `제출한 참조 번호 · ${values.reference}` : "제출된 참조 번호 없음";
}
</script>

<template>
  <div>
    <div class="ui-data-actions">
      <UISwitch v-model="readonly" label="읽기 전용" variant="outline" />
      <UISwitch v-model="disabled" label="비활성" variant="outline" />
    </div>
    <UIForm @submit="submit" @reset="message = ''">
      <UIFormField name="reference" label="정산 참조 번호" description="예시 OPS-2026" required :readonly="readonly" :disabled="disabled">
        <UIFormControl :get-value="() => reference" :reset="() => { reference = initial }">
          <input v-model="reference" class="reference-input" placeholder="OPS-2026" />
        </UIFormControl>
      </UIFormField>
      <UIFormActions>
        <UIFormReset size="sm">초기화</UIFormReset>
        <UIFormSubmit size="sm">참조 번호 제출</UIFormSubmit>
      </UIFormActions>
      <template #output>{{ message }}</template>
    </UIForm>
  </div>
</template>

<style scoped>
.reference-input { max-inline-size: 100%; font: inherit; padding: var(--ui-space-sm); }
</style>
