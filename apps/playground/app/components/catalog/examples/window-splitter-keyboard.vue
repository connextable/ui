<script setup lang="ts">
import {
  UIWindowSplitter,
  UIWindowSplitterHandle,
  UIWindowSplitterPane,
} from "@connextable/ui";

import { ref } from 'vue'
import { FileCode2, Folder, Search } from '@lucide/vue'
const size = ref('34')
const editorSource = `<script setup lang="ts">
const release = 'stable'
<\/script>

<template>
  <ReleaseCard :channel="release" />
</template>`
</script>

<template>
  <UIWindowSplitter :page-step="5" v-model="size" orientation="horizontal" :min="22" :max="72" :step="1"
    label="프로젝트와 편집기 너비 조정">
    <UIWindowSplitterPane side="before">
      <header><strong>Project</strong><Search :size="16" aria-hidden="true" /></header>
      <nav aria-label="Project files">
        <span><Folder :size="16" aria-hidden="true" /> src</span>
        <span><FileCode2 :size="16" aria-hidden="true" /> App.vue</span>
        <span><FileCode2 :size="16" aria-hidden="true" /> tokens.ts</span>
      </nav>
    </UIWindowSplitterPane>
    <UIWindowSplitterHandle />
    <UIWindowSplitterPane side="after">
      <header><strong>App.vue</strong><span>Saved</span></header>
      <pre tabindex="0" aria-label="App.vue 소스"><code>{{ editorSource }}</code></pre>
    </UIWindowSplitterPane>
  </UIWindowSplitter>
</template>
