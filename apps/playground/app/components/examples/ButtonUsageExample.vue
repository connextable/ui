<script setup lang="ts">
import { UIButton, UIInput, UISelect, UISwitch } from "@connextable/ui";
import { ArrowRight, Check, Plus, Search, UserRound } from "@lucide/vue";
import { computed, ref } from "vue";
import { buttonExampleCode } from "~/utils/button-example-code";

const topics = {
  label: {
    id: "button-label",
    title: "라벨",
    description: "기본 슬롯에 동작을 설명하는 텍스트를 넣습니다.",
  },
  appearance: {
    id: "button-variant",
    title: "모양과 색상",
    description: "variant로 강조 수준을 바꾸고, CSS 변수로 버튼의 강조색을 조정합니다.",
  },
  size: {
    id: "button-size",
    title: "크기",
    description: "size로 높이와 내부 여백을 조절합니다. 기본값은 md입니다.",
  },
  icons: {
    id: "button-leading-icon",
    title: "앞·뒤 아이콘",
    description: "leading과 trailing 슬롯에 아이콘을 넣습니다. 두 위치를 함께 사용할 수도 있습니다.",
  },
  loading: {
    id: "button-loading",
    title: "로딩",
    description: "loading을 켜면 버튼 크기를 유지하면서 라벨과 아이콘 자리에 가운데 진행 표시를 띄웁니다.",
  },
  disabled: {
    id: "button-disabled",
    title: "비활성",
    description: "disabled는 버튼이 활성화되지 않도록 하고 키보드 탭 순서에서도 제외합니다.",
  },
} as const;

const props = defineProps<{ topic: keyof typeof topics }>();
const topic = computed(() => topics[props.topic]);
const sizes = ["sm", "md", "lg"] as const;
const variants = ["solid", "soft", "outline", "ghost"] as const;
const sizeOptions = sizes.map(value => ({ value, label: value }));
const variantOptions = variants.map(value => ({ value, label: value }));
const colorOptions = [
  { value: "accent", label: "기본 강조색" },
  { value: "neutral", label: "중립색" },
  { value: "danger", label: "위험색" },
];
const icons = { Plus, ArrowRight, Check, Search, UserRound };
const iconOptions = [
  { value: "none", label: "없음" },
  { value: "Plus", label: "추가" },
  { value: "ArrowRight", label: "화살표" },
  { value: "Check", label: "완료" },
  { value: "Search", label: "검색" },
  { value: "UserRound", label: "사용자" },
];

const label = ref("문서 저장");
const size = ref<string | null>("md");
const variant = ref<string | null>("solid");
const color = ref<string | null>("accent");
const leading = ref<string | null>("Plus");
const trailing = ref<string | null>("none");
const loading = ref(true);
const disabled = ref(true);
const withIcon = ref(false);

function iconName(value: string | null) {
  return Object.keys(icons).find(name => name === value) as keyof typeof icons | undefined;
}

const leadingIcon = computed(() => props.topic === "icons"
  ? iconName(leading.value)
  : props.topic === "loading" && withIcon.value ? "Check" : undefined);
const trailingIcon = computed(() => props.topic === "icons" ? iconName(trailing.value)
  : props.topic === "loading" && withIcon.value ? "ArrowRight" : undefined);
const buttonLabel = computed(() => {
  if (props.topic === "label") return label.value.trim() || "문서 저장";
  if (props.topic === "icons") return "새 문서";
  return "저장";
});
const accentStyle = computed((): Record<string, string> | undefined => {
  const token = color.value === "neutral" ? "--ui-color-text" : color.value === "danger" ? "--ui-color-danger" : undefined;
  if (!token) return;
  const accent = `var(${token})`;
  if (variant.value === "outline" || variant.value === "ghost") {
    return {
      "--ui-button-ink": accent,
      ...(variant.value === "outline" ? { "--ui-button-border": accent } : {}),
    };
  }
  return {
    "--ui-color-accent": accent,
    "--ui-color-accent-hover": `color-mix(in srgb, ${accent} 90%, black)`,
    "--ui-color-accent-active": `color-mix(in srgb, ${accent} 80%, black)`,
    "--ui-color-accent-soft": `color-mix(in srgb, ${accent} 10%, var(--ui-color-surface))`,
  };
});
const attributes = computed(() => ({
  variant: props.topic === "appearance" ? variants.find(value => value === variant.value) : undefined,
  style: props.topic === "appearance" ? accentStyle.value : undefined,
  size: props.topic === "size" ? sizes.find(value => value === size.value) : undefined,
  loading: (props.topic === "loading" && loading.value) || undefined,
  disabled: (props.topic === "disabled" && disabled.value) || undefined,
}));
const code = computed(() => buttonExampleCode(attributes.value, {
  label: buttonLabel.value,
  leading: leadingIcon.value,
  trailing: trailingIcon.value,
  editableLabel: props.topic === "label",
}));
</script>

<template>
  <PlaygroundExample :id="topic.id" :title="topic.title" :description="topic.description" :code="code" :heading-level="3">
    <template #header>
      <PlaygroundExampleControl v-if="props.topic === 'label'" v-slot="{ labelId }" label="라벨">
        <UIInput v-model="label" size="sm" placeholder="문서 저장" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <template v-if="props.topic === 'appearance'">
        <PlaygroundExampleControl v-slot="{ labelId }" label="variant">
          <UISelect v-model="variant" :options="variantOptions" size="sm" :aria-labelledby="labelId" />
        </PlaygroundExampleControl>
        <PlaygroundExampleControl v-slot="{ labelId }" label="강조색">
          <UISelect v-model="color" :options="colorOptions" size="sm" :aria-labelledby="labelId" />
        </PlaygroundExampleControl>
      </template>
      <PlaygroundExampleControl v-if="props.topic === 'size'" v-slot="{ labelId }" label="size">
        <UISelect v-model="size" :options="sizeOptions" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <PlaygroundExampleControl v-if="props.topic === 'icons'" v-slot="{ labelId }" label="leading">
        <UISelect v-model="leading" :options="iconOptions" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <PlaygroundExampleControl v-if="props.topic === 'icons'" v-slot="{ labelId }" label="trailing">
        <UISelect v-model="trailing" :options="iconOptions" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <template v-if="props.topic === 'loading'">
        <UISwitch v-model="loading" label="loading" size="sm" />
        <UISwitch v-model="withIcon" label="앞·뒤 아이콘 사용" size="sm" />
      </template>
      <UISwitch v-if="props.topic === 'disabled'" v-model="disabled" label="disabled" size="sm" />
    </template>
    <UIButton v-bind="attributes">
      <template v-if="leadingIcon" #leading><component :is="icons[leadingIcon]" /></template>
      {{ buttonLabel }}
      <template v-if="trailingIcon" #trailing><component :is="icons[trailingIcon]" /></template>
    </UIButton>
  </PlaygroundExample>
</template>
