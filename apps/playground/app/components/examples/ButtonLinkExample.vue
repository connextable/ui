<script setup lang="ts">
import source from "./ButtonLinkExample.vue?example-code&raw";
</script>

<template>
  <PlaygroundExample
    id="button-link"
    title="링크 버튼"
    description="href 또는 to로 이동할 곳을 지정합니다. Nuxt 모듈을 사용하면 내부 경로가 NuxtLink로 연결됩니다."
    :source="source"
    :heading-level="3"
    inline
  >
    <UIButton :to="{ path: '/components/anchor' }" variant="outline">링크 컴포넌트 보기</UIButton>
    <UIButton href="https://nuxt.com/docs" target="_blank" variant="outline">Nuxt 문서 새 탭에서 열기</UIButton>
    <UIButton to="/components/anchor" variant="outline" disabled>이동할 수 없는 링크</UIButton>
  </PlaygroundExample>
</template>
