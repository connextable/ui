<script setup lang="ts">
import { UIPagination, UIPaginationNext, UIPaginationPrevious } from "@connextable/ui";
import { ref } from "vue";

const page = ref(1);
</script>

<template>
  <UIPagination v-model="page" :total="55" :items-per-page="10" label="주문 목록 페이지">
    <UIPaginationPrevious />
    <UIPaginationNext />
  </UIPagination>
  <p>현재 <output>{{ page }}</output> 페이지</p>
</template>
