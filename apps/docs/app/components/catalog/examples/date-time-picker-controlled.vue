<script setup lang="ts">
import { UIButton, UIDateTimePicker, type UIDateTimeValue } from "@connextable/ui";
import { ref } from "vue";

const open = ref(false);
const appointment = ref<UIDateTimeValue | null>({
  date: { year: 2026, month: 8, day: 22 },
  time: { hour: 9, minute: 30, second: 0, millisecond: 0 },
});
</script>

<template>
  <div class="ui-field-layout">
    <UIDateTimePicker v-model="appointment" v-model:open="open" input-layout="combined" label="업데이트 일시" />
    <UIButton size="sm" variant="outline" @click="open = true">별도 버튼에서 달력 열기</UIButton>
  </div>
</template>
