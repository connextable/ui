<script setup lang="ts">
import { UIInput, UISelect } from "@connextable/ui";
import { computed, ref } from "vue";

const normal = ref("");
const requiredText = ref("");
const hasError = computed(() => requiredText.value.trim() === "");
const statuses = [
  { value: "planned", label: "예정" },
  { value: "active", label: "진행 중" },
  { value: "complete", label: "완료" },
];

const readonlyText = ref("이름");
const disabledText = ref("이름");
const selected = ref<string | null>("active");
</script>

<template>
  <section aria-labelledby="design-states">
    <h2 id="design-states" data-playground-heading tabindex="-1">상태와 레이어</h2>
    <div class="design-states">
      <div>
        <h3>입력 상태</h3>
        <div class="design-states__samples">
          <div class="ui-field design-states__field">
            <label for="design-state-focus">기본과 포커스</label>
            <UIInput id="design-state-focus" v-model="normal" size="sm" placeholder="Tab 키로 포커스" />
          </div>
          <div class="ui-field design-states__field">
            <label for="design-state-readonly">읽기 전용</label>
            <UIInput id="design-state-readonly" v-model="readonlyText" size="sm" readonly />
          </div>
          <div class="ui-field design-states__field">
            <label for="design-state-disabled">비활성</label>
            <UIInput id="design-state-disabled" v-model="disabledText" size="sm" disabled />
          </div>
          <div class="ui-field design-states__field">
            <label for="design-state-invalid">오류</label>
            <UIInput
              id="design-state-invalid"
              v-model="requiredText"
              size="sm"
              required
              placeholder="이름"
              :aria-invalid="hasError"
              :aria-describedby="hasError ? 'design-state-message' : undefined"
            />
            <p v-if="hasError" id="design-state-message">필수 항목을 입력하세요.</p>
          </div>
        </div>
      </div>
      <div>
        <h3>떠 있는 목록</h3>
        <p class="design-states__note">목록을 열면 그림자와 레이어가 적용된 표면을 볼 수 있습니다.</p>
        <UISelect aria-label="진행 상태" :options="statuses" v-model="selected" size="sm" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.design-states {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  gap: 1.25rem 2rem;
}

.design-states > div {
  padding-block-start: var(--ui-space-md);
  border-block-start: 1px solid var(--ui-color-divider);
}

.design-states h3 {
  margin: 0 0 var(--ui-space-md);
  font-size: var(--ui-font-size-body);
}

.design-states__samples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 8.5rem), 1fr));
  gap: var(--ui-space-md) var(--ui-space-sm);
}

.design-states__field p,
.design-states__note {
  margin: 0;
  font-size: var(--ui-font-size-metadata);
  overflow-wrap: anywhere;
}

.design-states__field p {
  color: var(--ui-color-danger);
}

.design-states__note {
  margin-block-end: var(--ui-space-md);
  color: var(--ui-color-text-muted);
}
</style>
