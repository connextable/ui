<script setup lang="ts">
import { UIPagination } from "@connextable/ui";
import { ref } from "vue";

const currentPage = ref(6);

</script>

<template>
  <UIPagination :sibling-count="1" v-model="currentPage" :total="240" :default-items-per-page="20" />
</template>
