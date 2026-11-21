<script setup lang="ts">
import { UINumberField } from "@connextable/ui";
import { useId } from "vue";

const lengthId = useId();
</script>

<template>
  <div class="ui-field">
    <label :for="lengthId">부품 길이</label>
    <UINumberField :id="lengthId" default-value="12.5" unit="cm" />
  </div>
</template>
