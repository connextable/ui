<script setup lang="ts">
import { UIMenuButton, UIMenuButtonContent, UIMenuButtonTrigger, UIMenuItem } from "@connextable/ui";
import { ref } from "vue";

const items = [{ id: "duplicate", parentID: null }, { id: "archive", parentID: null }];
const selected = ref("");
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div>
      <UIMenuButton :items="items" @invoke="selected = $event">
        <UIMenuButtonTrigger>템플릿 동작</UIMenuButtonTrigger>
        <UIMenuButtonContent>
          <UIMenuItem value="duplicate">복제</UIMenuItem>
          <UIMenuItem value="archive">보관</UIMenuItem>
        </UIMenuButtonContent>
      </UIMenuButton>
    </div>
    <template #footer v-if="selected">
      <output>{{ selected === "duplicate" ? "복제" : "보관" }} 선택</output>
    </template>
  </PlaygroundExample>
</template>
