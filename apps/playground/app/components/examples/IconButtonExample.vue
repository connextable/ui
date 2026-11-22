<script setup lang="ts">
import { UIIconButton, UISelect, UISpinner, UISwitch } from "@connextable/ui";
import { Plus, RefreshCw, Search } from "@lucide/vue";
import { computed, ref } from "vue";
import { buttonExampleCode } from "~/utils/button-example-code";

const icons = [
  { value: "RefreshCw", label: "새로고침", component: RefreshCw },
  { value: "Search", label: "검색", component: Search },
  { value: "Plus", label: "추가", component: Plus },
] as const;
const sizes = ["sm", "md", "lg"] as const;
const sizeOptions = sizes.map(value => ({ value, label: value }));
const spinners = [
  { value: "default", label: "기본" },
  { value: "arc", label: "원호" },
  { value: "spoke", label: "방사형" },
];

const iconValue = ref<string | null>("RefreshCw");
const sizeValue = ref<string | null>("md");
const spinnerValue = ref<string | null>("default");
const loading = ref(false);
const icon = computed(() => icons.find(option => option.value === iconValue.value) ?? icons[0]);
const size = computed(() => sizes.find(value => value === sizeValue.value));
const spinner = computed<"arc" | "spoke" | undefined>(() => {
  const value = spinnerValue.value;
  return value === "arc" || value === "spoke" ? value : undefined;
});
const code = computed(() => buttonExampleCode(
  { "aria-label": icon.value.label, size: size.value, loading: loading.value },
  { label: "", icon: icon.value.value, loadingSpinner: spinner.value },
));
</script>

<template>
  <PlaygroundExample
    id="UIIconButton"
    title="UIIconButton"
    description="기본 슬롯에 아이콘을 넣고 aria-label에 동작 이름을 지정합니다. loading으로 아이콘을 진행 표시로 바꾸고, loading 슬롯으로 표시 모양을 지정합니다."
    :code="code"
    :heading-level="3"
  >
    <template #header>
      <PlaygroundExampleControl v-slot="{ labelId }" label="아이콘">
        <UISelect v-model="iconValue" :options="icons" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <PlaygroundExampleControl v-slot="{ labelId }" label="size">
        <UISelect v-model="sizeValue" :options="sizeOptions" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <UISwitch v-model="loading" label="loading" size="sm" />
      <PlaygroundExampleControl v-slot="{ labelId }" label="진행 표시">
        <UISelect v-model="spinnerValue" :options="spinners" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
    </template>
    <UIIconButton :aria-label="icon.label" :size="size" :loading="loading">
      <component :is="icon.component" />
      <template v-if="spinner" #loading><UISpinner :variant="spinner" /></template>
    </UIIconButton>
  </PlaygroundExample>
</template>
