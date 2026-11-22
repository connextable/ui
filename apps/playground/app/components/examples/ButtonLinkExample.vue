<template>
  <div class="example">
    <UIButton :to="{ path: '/components/anchor' }" variant="outline">링크 컴포넌트 보기</UIButton>
    <UIButton href="https://nuxt.com/docs" target="_blank" variant="outline">Nuxt 문서 새 탭에서 열기</UIButton>
    <UIButton to="/components/anchor" variant="outline" disabled>이동할 수 없는 링크</UIButton>
  </div>
</template>

<style scoped>
.example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ui-space-sm);
}
</style>
