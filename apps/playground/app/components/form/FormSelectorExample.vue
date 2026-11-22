<script setup lang="ts">
import { UIForm, UIFormField, UIFormSelector, UIInput } from "@connextable/ui";
import { ref } from "vue";

const text = ref("기획팀");
</script>

<template>
  <UIForm>
    <UIFormField label="공개 이름" name="name">
      <UIInput v-model="text" />
    </UIFormField>
    <UIFormSelector :select="(state) => state.dirty" v-slot="{ selected }">
      <output>{{ selected ? "변경 사항이 있습니다." : "변경 사항이 없습니다." }}</output>
    </UIFormSelector>
  </UIForm>
</template>
