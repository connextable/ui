<script setup lang="ts">
import { UIButton, UIInput } from "@connextable/ui";
import { ref } from "vue";

definePageMeta({
  title: "UIInput",
  category: "폼",
});

const name = ref("");
const submittedName = ref("");

function submit(event: SubmitEvent) {
  if (!(event.currentTarget instanceof HTMLFormElement)) return;
  const value = new FormData(event.currentTarget).get("name");
  if (typeof value === "string") submittedName.value = value;
}
</script>

<template>
  <section class="playground-example" aria-labelledby="input-example">
    <h2 id="input-example">필수 입력과 제출</h2>
    <div class="playground-example__preview">
      <form class="input-example__form" @submit.prevent="submit">
        <label for="name">이름</label>
        <UIInput id="name" v-model="name" name="name" required />
        <UIButton type="submit">제출</UIButton>
      </form>
      <p v-if="submittedName" class="input-example__status" role="status">
        제출한 이름은 {{ submittedName }}입니다.
      </p>
    </div>
  </section>
</template>

<style scoped>
.input-example__form {
  display: grid;
  gap: 0.75rem;
  max-inline-size: 26rem;
}

.input-example__form button {
  justify-self: start;
}

.input-example__status {
  margin-block-end: 0;
  overflow-wrap: anywhere;
}
</style>
