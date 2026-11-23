<script setup lang="ts">
import { UIButton, UISheet, UISheetClose, UISheetContent, UISheetDescription, UISheetOverlay, UISheetTitle, UISheetTrigger } from "@connextable/ui";
import { Archive, ArchiveRestore, Copy } from "@lucide/vue";
import { ref } from "vue";

const copies = ref(0);
const archived = ref(false);
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div class="document-example">
      <UISheet>
        <UISheetTrigger as-child><UIButton variant="outline">보고서 작업</UIButton></UISheetTrigger>
        <UISheetOverlay />
        <UISheetContent size="sm">
          <UISheetTitle>11월 정산 보고서</UISheetTitle>
          <UISheetDescription>보고서를 복제하거나 보관합니다.</UISheetDescription>
          <div class="ui-field-layout">
            <UISheetClose as-child>
              <UIButton align="start" variant="ghost" @click="copies++">
                <template #leading><Copy /></template>
                사본 만들기
              </UIButton>
            </UISheetClose>
            <UISheetClose as-child>
              <UIButton align="start" variant="ghost" @click="archived = !archived">
                <template #leading><ArchiveRestore v-if="archived" /><Archive v-else /></template>
                {{ archived ? "보관함에서 복원" : "보관함으로 이동" }}
              </UIButton>
            </UISheetClose>
          </div>
        </UISheetContent>
      </UISheet>
    </div>
    <template #footer>
      <output>{{ archived ? "보관함" : "작업 목록" }} (사본 {{ copies }}개)</output>
    </template>
  </PlaygroundExample>
</template>

<style scoped>
.document-example { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ui-space-md); }
</style>
