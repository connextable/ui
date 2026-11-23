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
  { value: "default", label: "기본 스피너" },
  { value: "arc", label: "원호" },
  { value: "wave", label: "물결" },
];

const iconValue = ref<string | null>("RefreshCw");
const sizeValue = ref<string | null>("md");
const spinnerValue = ref<string | null>("default");
const loading = ref(false);
const icon = computed(() => icons.find(option => option.value === iconValue.value) ?? icons[0]);
const size = computed(() => sizes.find(value => value === sizeValue.value));
const spinner = computed<"arc" | "wave" | undefined>(() => {
  const value = spinnerValue.value;
  return value === "arc" || value === "wave" ? value : undefined;
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
    description="icon으로 아이콘을 지정하고 aria-label에 동작 이름을 붙입니다. loading을 켜면 기본 UISpinner가 표시되며, loading 슬롯으로 바꿀 수 있습니다."
    :code="code"
  >
    <template #header>
      <PlaygroundExampleControl v-slot="{ labelId }" label="아이콘">
        <UISelect v-model="iconValue" :options="icons" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <PlaygroundExampleControl v-slot="{ labelId }" label="size">
        <UISelect v-model="sizeValue" :options="sizeOptions" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <UISwitch variant="outline" v-model="loading" label="loading" size="sm" />
      <PlaygroundExampleControl v-slot="{ labelId }" label="진행 표시">
        <UISelect v-model="spinnerValue" :options="spinners" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
    </template>
    <UIIconButton :aria-label="icon.label" :size="size" :loading="loading" :icon="icon.component">
      <template v-if="spinner" #loading><UISpinner :variant="spinner" /></template>
    </UIIconButton>
  </PlaygroundExample>
</template>
