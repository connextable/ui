<script setup lang="ts">
import { UIButton, UISheet, UISheetClose, UISheetContent, UISheetDescription, UISheetHandle, UISheetOverlay, UISheetPortal, UISheetTitle, UISheetTrigger } from "@connextable/ui";

const sizes = [
  { width: "18rem", title: "좁게", detail: "짧은 작업 메뉴에 맞는 너비입니다." },
  { width: "30rem", title: "기본", detail: "간단한 설정과 설명을 함께 표시할 수 있습니다." },
  { width: "42rem", title: "넓게", detail: "한 줄에 비교할 정보가 많은 목록에 적합합니다." },
];
</script>

<template>
  <div class="ui-form-actions" role="group" aria-label="시트 너비">
    <UISheet v-for="size in sizes" :key="size.width">
      <UISheetTrigger as-child><UIButton variant="outline">{{ size.title }} · {{ size.width }}</UIButton></UISheetTrigger>
      <UISheetPortal>
        <UISheetOverlay />
        <UISheetContent :width="size.width">
          <UISheetHandle />
          <UISheetTitle>{{ size.title }} 시트</UISheetTitle>
          <UISheetDescription>{{ size.detail }} 좁은 화면에서는 화면 폭에 맞춰 줄어듭니다.</UISheetDescription>
          <UISheetClose as-child><UIButton size="sm" variant="outline">닫기</UIButton></UISheetClose>
        </UISheetContent>
      </UISheetPortal>
    </UISheet>
  </div>
</template>
