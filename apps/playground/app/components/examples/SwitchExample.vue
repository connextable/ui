<script setup lang="ts">
import { UISwitch } from "@connextable/ui";
import { ref } from "vue";

const receiveCommentNotifications = ref(true);
</script>

<template>
  <UISwitch
    v-model="receiveCommentNotifications"
    class="notification-switch"
    label="댓글 알림"
    :description="receiveCommentNotifications ? '새 댓글 알림을 받습니다.' : '새 댓글 알림을 받지 않습니다.'"
  />
</template>

<style scoped>
.notification-switch {
  inline-size: 18rem;
}
</style>
