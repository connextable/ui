<script setup lang="ts">
import { MessageSquare } from "@lucide/vue";
import { UISelect, UISwitch } from "@connextable/ui";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const receiveCommentNotifications = ref(true);
const sizes = ["sm", "md", "lg"] as const;
const options = sizes.map(value => ({ value, label: value }));
const size = ref<string | null>("md");
const readonly = ref(false);
const disabled = ref(false);
const attributes = computed(() => ({
  label: "댓글 알림",
  size: sizes.find(value => value === size.value),
  readonly: readonly.value || undefined,
  disabled: disabled.value || undefined,
}));
const code = computed(() => vueExampleCode("UISwitch", {
  script: [
    'import { UISwitch } from "@connextable/ui";',
    'import { MessageSquare } from "@lucide/vue";',
    'import { ref } from "vue";',
    "",
    "const receiveCommentNotifications = ref(true);",
  ],
  attributes: { "v-model": "receiveCommentNotifications", ...attributes.value, icon: { expression: "MessageSquare" } },
}));
</script>

<template>
  <PlaygroundExample
    id="switch-example"
    title="댓글 알림 설정"
    description="v-model에 불리언을 연결합니다. 크기와 수정 가능 여부를 바꿔 볼 수 있습니다."
    :code="code"
    :heading-level="3"
  >
    <template #header>
      <PlaygroundExampleControl v-slot="{ labelId }" label="size">
        <UISelect v-model="size" :options="options" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <UISwitch v-model="readonly" size="sm" label="readonly" />
      <UISwitch v-model="disabled" size="sm" label="disabled" />
    </template>
    <UISwitch v-model="receiveCommentNotifications" v-bind="attributes" :icon="MessageSquare" />
    <template #footer>
      <output>{{ receiveCommentNotifications ? '새 댓글 알림을 받습니다.' : '새 댓글 알림을 받지 않습니다.' }}</output>
    </template>
  </PlaygroundExample>
</template>
