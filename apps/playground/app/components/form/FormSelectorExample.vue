<script setup lang="ts">
import { UIForm, UIFormField, UIFormSelector, UIInput } from "@connextable/ui";
</script>

<template>
  <UIForm>
    <UIFormField label="공개 이름" name="name">
      <UIInput default-value="기획팀" />
    </UIFormField>
    <UIFormSelector :select="(state) => state.dirty" v-slot="{ selected }">
      <output>{{ selected ? "변경 사항이 있습니다." : "변경 사항이 없습니다." }}</output>
    </UIFormSelector>
  </UIForm>
</template>
