<script setup lang="ts">
import { UIForm, UIFormField, UIFormFieldSelector, UIInput } from "@connextable/ui";
import { ref, useId } from "vue";

const id = useId();

const text = ref("안내문");
</script>

<template>
  <UIForm>
    <UIFormField :id="id" label="문서 제목" name="title">
      <UIInput v-model="text" />
    </UIFormField>
    <UIFormFieldSelector :id="id" :select="(field) => field?.touched ?? false" v-slot="{ selected }">
      <output>{{ selected ? "필드를 방문했습니다." : "아직 입력을 시작하지 않았습니다." }}</output>
    </UIFormFieldSelector>
  </UIForm>
</template>
