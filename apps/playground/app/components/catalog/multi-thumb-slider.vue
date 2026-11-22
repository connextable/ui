<script setup lang="ts">
import { UIMultiThumbSlider } from "@connextable/ui";

import { ref } from 'vue'
const thumbs = ['minimum', 'maximum']
const values = ref(['120', '340'])
</script>

<template>
  <UIMultiThumbSlider v-model="values" :thumbs="thumbs" min="50" max="500" step="10"
    label="선택 범위" :get-thumb-label="thumb => thumb === 'minimum' ? '시작값' : '끝값'" />
</template>
