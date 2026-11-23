<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UISequenceReorder, UISequenceReorderItem } from "@connextable/ui";
import { computed, nextTick, onScopeDispose, ref, useTemplateRef } from "vue";

const items = ref<readonly string[]>(["표지", "요약", "참고 자료"]);
const example = useTemplateRef<HTMLElement>("example");
const state = ref<"ready" | "saving" | "failed" | "saved">("ready");
const messages = {
  ready: "처음 저장은 실패하도록 설정되어 있습니다.",
  saving: "변경한 순서를 저장하는 중입니다.",
  failed: "저장에 실패해 이전 순서로 되돌렸습니다. 다시 옮겨 보세요.",
  saved: "변경한 순서를 저장했습니다.",
};
const status = computed(() => messages[state.value]);
let timer: ReturnType<typeof setTimeout> | undefined;

function save(nextOrder: readonly string[]) {
  if (state.value === "saving") return;

  const previous = items.value;
  const reject = state.value === "ready";
  const focused = example.value?.ownerDocument.activeElement;
  items.value = nextOrder;
  state.value = "saving";

  timer = setTimeout(() => {
    if (reject) items.value = previous;
    state.value = reject ? "failed" : "saved";
    void nextTick(() => {
      if (focused instanceof HTMLElement && example.value?.contains(focused) && focused.ownerDocument.activeElement === focused.ownerDocument.body) {
        focused.focus({ preventScroll: true });
      }
    });
  }, 1000);
}

onScopeDispose(() => clearTimeout(timer));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div ref="example" class="reorder-save">
      <UISequenceReorder
        :items="items" controlled :disabled="state === 'saving'" label="문서 페이지 순서" keyboard-mode="preview"
        @update:items="save" v-slot="{ interaction, getPreviewState }"
      >
        <UIReorderGroup as="ul" framed :interaction="interaction" :get-preview-state="getPreviewState">
          <UISequenceReorderItem v-for="id in items" :key="id" :value="id" as="li">
            {{ id }}
          </UISequenceReorderItem>
        </UIReorderGroup>
        <UIReorderFeedback :interaction="interaction" />
      </UISequenceReorder>
    </div>
    <template #footer>
      <output :data-failed="state === 'failed' || undefined">{{ status }}</output>
    </template>
  </PlaygroundExample>
</template>

<style scoped>
.reorder-save {
  display: grid;
  gap: var(--ui-space-sm);
}

.reorder-save p {
  min-block-size: 2lh;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}

.reorder-save p[data-failed] {
  color: var(--ui-color-danger);
}
</style>
