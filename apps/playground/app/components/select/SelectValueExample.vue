<script setup lang="ts">
import { UIButton, UISelect, UISelectContent, UISelectTrigger, UISelectValue } from "@connextable/ui";
import { ref, useId } from "vue";

const options = [
  { value: "15", label: "15분" },
  { value: "30", label: "30분" },
  { value: "60", label: "1시간" },
];
const interval = ref<string | null>("30");
const triggerId = useId();

function clearSelection() {
  interval.value = null;
  document.getElementById(triggerId)?.focus();
}
</script>

<template>
  <div class="select-value-example">
    <UISelect :id="triggerId" v-model="interval" aria-label="새로고침 주기" :options="options">
      <UISelectTrigger>
        <UISelectValue v-slot="{ option }">
          <span v-if="option">매 <strong>{{ option.label }}</strong>마다</span>
          <span v-else>주기를 선택하세요</span>
        </UISelectValue>
      </UISelectTrigger>
      <UISelectContent />
    </UISelect>
    <UIButton
      size="sm"
      variant="outline"
      :disabled="interval === null"
      @click="clearSelection"
    >선택 지우기</UIButton>
  </div>
</template>

<style scoped>
.select-value-example {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 0.5rem 1rem;
}
</style>
