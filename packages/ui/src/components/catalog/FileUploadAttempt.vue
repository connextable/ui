<script setup lang="ts" generic="Receipt = unknown">
import { useFileUpload, type FileUploadAdapter } from "@sectile/vue/form/file-upload";
import { computed, toRef, watch } from "vue";

const props = defineProps<{
  file: File;
  adapter: FileUploadAdapter<File, Receipt>;
  autoStart?: boolean;
}>();

const { snapshot, error, ready, start, cancel } = useFileUpload({
  file: toRef(props, "file"),
  adapter: toRef(props, "adapter"),
});

const autoReady = computed(() => props.autoStart && ready.value
  && snapshot.value?.state?.status === "queued" && snapshot.value.state.file === props.file);
watch(autoReady, (available) => { if (available) start(); }, { immediate: true, flush: "post" });

defineExpose({ snapshot, error, ready, start, cancel });
</script>

<template><!-- The upload lifecycle is mounted only while a file is attached. --></template>
