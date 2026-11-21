<script setup lang="ts">
import { UIButton, UIFormActions, UINumberField } from "@connextable/ui";
import { ref, useId } from "vue";

const result = ref("");
const quantityId = useId();

function submit(event: SubmitEvent) {
  if (!(event.currentTarget instanceof HTMLFormElement)) return;
  result.value = String(new FormData(event.currentTarget).get("quantity") ?? "");
}
</script>

<template>
  <form class="ui-field-layout" @submit.prevent="submit">
    <div class="ui-field">
      <label :for="quantityId">수량</label>
      <UINumberField :id="quantityId" name="quantity" unit="개" required />
    </div>
    <UIFormActions><UIButton type="submit" size="sm">제출</UIButton></UIFormActions>
    <output>{{ result }}</output>
  </form>
</template>
