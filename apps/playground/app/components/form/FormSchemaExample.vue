<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UIInput } from "@connextable/ui";
import { maxValue, object, pipe, regex, string, transform } from "valibot";
import { ref } from "vue";

const schema = object({
  quantity: pipe(
    string(),
    regex(/^[1-9]\d*$/, "1 이상의 정수를 입력하세요."),
    transform(Number),
    maxValue(99, "99 이하의 값을 입력하세요."),
  ),
});
const quantity = ref("");
const submitted = ref<number>();
</script>

<template>
  <UIForm :schema="schema" @submit="({ values }) => { submitted = values.quantity }">
    <UIFormField label="수량" name="quantity">
      <UIInput v-model="quantity" inputmode="numeric" placeholder="1–99" />
    </UIFormField>
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submitted !== undefined">제출한 수량 {{ submitted }}개</span>
    </template>
  </UIForm>
</template>
