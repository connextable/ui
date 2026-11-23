<script setup lang="ts">
import { UISelect, UISelectContent, UISelectTrigger, UISwitch } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "seoul", label: "서울" },
  { value: "los-angeles", label: "로스앤젤레스" },
  { value: "buenos-aires", label: "부에노스아이레스" },
];
const city = ref<string | null>("seoul");
const matchTrigger = ref(false);
</script>

<template>
  <div class="select-content-example">
    <UISelect v-model="city" aria-label="기준 도시" :options="options">
      <UISelectTrigger />
      <UISelectContent :width="matchTrigger ? 'trigger' : 'fit'" />
    </UISelect>
    <UISwitch variant="outline" v-model="matchTrigger" label="트리거와 같은 폭" />
  </div>
</template>

<style scoped>
.select-content-example {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 0.5rem 1rem;
}
</style>
