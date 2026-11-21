<script setup lang="ts">
import { UIHostPortal, UIHostProvider } from "@connextable/ui";
import { useId } from "vue";

const target = useId();
</script>

<template>
  <div>
    <p>포털 대상</p>
    <div :id="target" />
    <ClientOnly>
      <UIHostProvider :portal-target="`#${target}`">
        <UIHostPortal>
          <small>포털 대상으로 렌더링된 콘텐츠</small>
        </UIHostPortal>
      </UIHostProvider>
    </ClientOnly>
  </div>
</template>
