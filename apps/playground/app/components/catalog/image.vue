<script setup lang="ts">
import { UIImage } from "@connextable/ui";
const source = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABACAIAAABqVuVZAAABAElEQVR42u3YwQnCMBSA4beGozhCJ3AGZ/DidJ6cwaveBXtVKLRiSxKbl6R5+eGHnJLDB4G8yOP5IkcCAUAAAQQQQAABBFDN9dfzPIBcOlpGYlhHxUhs68QbiXmdSCOAAAIIIIAAAoh3EC9pZjGmef6D+A8CCCCAAAKIAAIIIICKtz+ePsnldqfvBpcxgJZdAPK4tA7kdWkUKNylLaAVLk0AxbhYBlJxmYCGBRcP0BguHqBapBJx7LrDT+LdY89lruBIws+ty+UvBR2g/FLZFJSBUkvlV0gFpChVViE5UKDUZhXyARW/EVsBMqawEqgdBRcQBAABBBBAAAEEEEC01BszH0E52bUkvAAAAABJRU5ErkJggg==";
</script>

<template>
  <UIImage :src="source" alt="호수 위로 해가 뜨는 풍경" style="inline-size: 12rem" />
</template>
