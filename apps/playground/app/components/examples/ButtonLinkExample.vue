<script setup lang="ts">
import { UIButton, UISelect, UISwitch } from "@connextable/ui";
import { computed, ref } from "vue";
import { buttonExampleCode } from "~/utils/button-example-code";

const destinations = [
  { value: "route", label: "내부 경로" },
  { value: "routeObject", label: "라우트 객체" },
  { value: "external", label: "외부 사이트" },
  { value: "download", label: "파일 다운로드" },
];
const prefetchOptions = [
  { value: "default", label: "Nuxt 기본값" },
  { value: "on", label: "사용" },
  { value: "visibility", label: "화면에 보일 때" },
  { value: "interaction", label: "포인터·포커스 진입" },
  { value: "off", label: "사용 안 함" },
];
const destination = ref<string | null>("route");
const prefetch = ref<string | null>("default");
const newTab = ref(false);
const disabled = ref(false);
const isRoute = computed(() => destination.value === "route" || destination.value === "routeObject");
const isDownload = computed(() => destination.value === "download");
const prefetchOn = computed<"visibility" | "interaction" | undefined>(() => {
  const trigger = prefetch.value;
  return isRoute.value && (trigger === "visibility" || trigger === "interaction") ? trigger : undefined;
});
const label = computed(() => isRoute.value ? "UIAnchor 문서"
  : isDownload.value ? "자막 파일 다운로드" : "Nuxt 문서");
const attributes = computed(() => ({
  to: destination.value === "routeObject" ? { path: "/components/anchor" }
    : isRoute.value ? "/components/anchor" : undefined,
  href: isDownload.value ? "/lightbox/bunny.ko.vtt"
    : isRoute.value ? undefined : "https://nuxt.com/docs",
  target: newTab.value && !isDownload.value ? "_blank" : undefined,
  download: isDownload.value ? "bunny.ko.vtt" : undefined,
  external: destination.value === "external" || undefined,
  prefetch: (isRoute.value && prefetch.value === "on") || undefined,
  prefetchOn: prefetchOn.value,
  noPrefetch: (isRoute.value && prefetch.value === "off") || undefined,
  disabled: disabled.value || undefined,
  variant: "outline" as const,
}));
const code = computed(() => buttonExampleCode(attributes.value, { label: label.value }));
</script>

<template>
  <PlaygroundExample
    id="button-link"
    title="내부 경로, 외부 URL, 파일 다운로드"
    description="Nuxt 내부 이동에는 to, 직접 연결하는 주소에는 href를 사용합니다. download를 지정하면 브라우저의 다운로드 링크로 동작합니다."
    :code="code"
    :heading-level="3"
  >
    <template #header>
      <PlaygroundExampleControl v-slot="{ labelId }" label="목적지">
        <UISelect v-model="destination" :options="destinations" :aria-labelledby="labelId" size="sm" />
      </PlaygroundExampleControl>
      <PlaygroundExampleControl v-if="isRoute" v-slot="{ labelId }" label="프리패치">
        <UISelect v-model="prefetch" :options="prefetchOptions" :aria-labelledby="labelId" size="sm" />
      </PlaygroundExampleControl>
      <UISwitch v-if="!isDownload" v-model="newTab" label="새 탭" size="sm" />
      <UISwitch v-model="disabled" label="disabled" size="sm" />
    </template>
    <UIButton v-bind="attributes">{{ label }}</UIButton>
  </PlaygroundExample>
</template>
