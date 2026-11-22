<script setup lang="ts">
import { UINumberField } from "@connextable/ui";
import { ref, useId } from "vue";

const lengthId = useId();

const length = ref<string | null>("12.5");
</script>

<template>
  <div class="ui-field">
    <label :for="lengthId">부품 길이</label>
    <UINumberField :id="lengthId" v-model="length" unit="cm" />
  </div>
</template>
