<script setup lang="ts">
import { UIForm, UIFormField, UIFormFieldSelector, UIInput } from "@connextable/ui";
import { useId } from "vue";

const id = useId();
</script>

<template>
  <UIForm>
    <UIFormField :id="id" label="문서 제목" name="title">
      <UIInput default-value="안내문" />
    </UIFormField>
    <UIFormFieldSelector :id="id" :select="(field) => field?.touched ?? false" v-slot="{ selected }">
      <output>{{ selected ? "필드를 방문했습니다." : "아직 입력을 시작하지 않았습니다." }}</output>
    </UIFormFieldSelector>
  </UIForm>
</template>
