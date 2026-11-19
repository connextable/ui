<script setup lang="ts">
import { UIButton, UIInput } from "@connextable/ui";
import { ref } from "vue";

useHead({
  title: "Connextable UI",
  htmlAttrs: { lang: "ko" },
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
  <main class="playground">
    <h1>Connextable UI</h1>
    <form class="form" @submit.prevent="submit">
      <label for="name">이름</label>
      <UIInput id="name" v-model="name" name="name" required />
      <UIButton type="submit">제출</UIButton>
    </form>
    <p v-if="submittedName" role="status">제출한 이름은 {{ submittedName }}입니다.</p>
  </main>
</template>

<style>
body {
  margin: 0;
  background: #f4f7f7;
  color: var(--ui-color-text);
  font-family: system-ui, sans-serif;
}

.playground {
  max-inline-size: 28rem;
  margin: 3rem auto;
  padding: 1.5rem;
}

.playground h1 {
  margin-block: 0 1.5rem;
}

.form {
  display: grid;
  gap: 0.75rem;
}

.form button {
  justify-self: start;
}
</style>
