<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UIFormFieldGroup, UIInput, UISelect } from "@connextable/ui";
import { object, picklist, string } from "valibot";
import { ref } from "vue";

const schema = object({ contact: object({ address: string(), channel: picklist(["email", "chat"]) }) });
const contact = ref({ address: "", channel: "email" as string | null });
const channels = [
  { value: "email", label: "이메일" },
  { value: "chat", label: "채팅" },
];
const submitted = ref("");
</script>

<template>
  <UIForm
    :schema="schema"
    @submit="({ values }) => { submitted = `${values.contact.address} · ${values.contact.channel}` }"
  >
    <UIFormFieldGroup v-model="contact" name="contact" label="연락처" v-slot="{ field, bindModel }">
      <label>연락처 주소 <UIInput v-bind="field('address')" /></label>
      <UIFormField :name="field('channel').name" label="연락 방법">
        <UISelect v-bind="bindModel('channel')" :options="channels" />
      </UIFormField>
    </UIFormFieldGroup>
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submitted">제출한 연락처 {{ submitted }}</span>
    </template>
  </UIForm>
</template>
