<script setup lang="ts">
import { UIPagination } from "@connextable/ui";

</script>

<template>
  <UIPagination :sibling-count="1" :default-value="6" :total="240" :default-items-per-page="20" />
</template>
