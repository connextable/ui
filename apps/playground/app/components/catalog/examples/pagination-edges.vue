<script setup lang="ts">
import { UIPagination, UIPaginationFirst, UIPaginationLast } from "@connextable/ui";
import { ref } from "vue";

const currentPage = ref(3);
</script>

<template>
  <UIPagination :total="140" v-model="currentPage" :items-per-page="20" show-edges v-slot="{ page, pageCount }">
    <UIPaginationFirst />
    <span aria-live="polite">{{ page }} / {{ pageCount }}</span>
    <UIPaginationLast />
  </UIPagination>
</template>
