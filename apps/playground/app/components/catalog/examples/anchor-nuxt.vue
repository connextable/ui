<script setup lang="ts">
import { UIAnchor } from "@connextable/ui";
</script>

<template>
  <NuxtLink to="/#design-colors" custom v-slot="{ href, navigate }">
    <UIAnchor as-child><a :href="href ?? undefined" @click="navigate">색상 토큰 보기</a></UIAnchor>
  </NuxtLink>
</template>
