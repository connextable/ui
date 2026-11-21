<script setup lang="ts">
import { UIPagination, UIPaginationFirst, UIPaginationLast } from "@connextable/ui";
</script>

<template>
  <UIPagination :total="140" :default-value="3" :default-items-per-page="20" show-edges v-slot="{ page, pageCount }">
    <UIPaginationFirst />
    <span aria-live="polite">{{ page }} / {{ pageCount }}</span>
    <UIPaginationLast />
  </UIPagination>
</template>
