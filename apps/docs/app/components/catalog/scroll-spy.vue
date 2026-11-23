<script setup lang="ts">
import { UIButton, UIScrollSpy } from "@connextable/ui";
import { computed, useTemplateRef } from "vue";

const chapters = [
  { id: "request", title: "요청 접수", text: "변경 요청과 검토 기한을 기록합니다." },
  { id: "review", title: "담당자 검토", text: "변경 범위와 필요한 검증을 확인합니다." },
  { id: "approval", title: "승인과 반영", text: "승인 후 변경사항을 반영하고 결과를 공유합니다." },
];
const viewport = useTemplateRef<HTMLElement>("viewport");
const headings = useTemplateRef<HTMLElement[]>("heading");
const sections = computed(() => chapters.flatMap(chapter => {
  const element = headings.value?.find(heading => heading.dataset.chapter === chapter.id);
  return element ? [{ id: chapter.id, element }] : [];
}));
</script>

<template>
  <UIScrollSpy :root="viewport" :sections="sections" v-slot="{ activeId, scrollToSection }">
    <div class="review-guide">
      <nav class="ui-data-actions" aria-label="변경 절차 목차">
        <UIButton v-for="chapter in chapters" :key="chapter.id" size="sm"
          :variant="activeId === chapter.id ? 'soft' : 'ghost'" :aria-current="activeId === chapter.id ? 'location' : undefined"
          @click="scrollToSection(chapter.id, { focus: true })">{{ chapter.title }}</UIButton>
      </nav>
      <div ref="viewport" class="review-guide__content" role="region" aria-label="변경 절차" tabindex="0">
        <section v-for="chapter in chapters" :key="chapter.id">
          <strong ref="heading" :data-chapter="chapter.id" tabindex="-1">{{ chapter.title }}</strong>
          <p>{{ chapter.text }}</p>
        </section>
      </div>
    </div>
  </UIScrollSpy>
</template>

<style scoped>
.review-guide { inline-size: min(100%, 30rem); }
.review-guide__content { block-size: 12rem; overflow: auto; scroll-padding-top: 1rem; }
.review-guide__content section { min-block-size: 9rem; padding: var(--ui-space-md); }
</style>
