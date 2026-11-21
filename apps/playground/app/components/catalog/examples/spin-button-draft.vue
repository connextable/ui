<script setup lang="ts">
import { UISpinButton, UISpinButtonInput } from "@connextable/ui";
import { ref } from "vue";

const amount = ref("24");
</script>

<template>
  <div>
    <UISpinButton v-model="amount" :min="0" :max="120" label="예상 처리 시간">
      <UISpinButtonInput />
    </UISpinButton>
    <output>확정 시간 {{ amount }}분</output>
  </div>
</template>
