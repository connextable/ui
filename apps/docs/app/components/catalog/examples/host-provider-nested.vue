<script setup lang="ts">
import { UIHostProvider, UIHostPortal } from "@connextable/ui";
import { useId } from "vue";

const outer = useId();
const inner = useId();
</script>

<template>
  <div class="example">
    <div :id="outer">바깥 수신 영역</div>
    <div :id="inner">안쪽 수신 영역</div>
    <ClientOnly>
      <UIHostProvider :portal-target="`#${outer}`">
        <UIHostPortal><p>바깥 포털</p></UIHostPortal>
        <UIHostProvider :portal-target="`#${inner}`">
          <UIHostPortal><p>안쪽 포털</p></UIHostPortal>
        </UIHostProvider>
      </UIHostProvider>
    </ClientOnly>
  </div>
</template>

<style scoped>
.example {
  display: grid;
  gap: var(--ui-space-sm);
  min-inline-size: 0;
}
</style>
