<script setup lang="ts">
import { UISpinButton } from "@connextable/ui";
import { ref, useId } from "vue";

const count = ref("4");
const width = ref("28.5");
const countId = useId();
const widthId = useId();
</script>

<template>
  <div class="ui-field ui-field-layout">
    <div class="ui-field">
      <label :for="countId">주문 수량 (개)</label>
      <UISpinButton :id="countId" v-model="count" min="1" max="999" step="1" label="주문 수량" unit="개" size="sm" />
    </div>
    <div class="ui-field">
      <label :for="widthId">제작 가로 길이 (mm)</label>
      <UISpinButton :id="widthId" v-model="width" min="12" max="84" step="0.5" label="제작 가로 길이 (mm)" unit="mm" size="sm" layout="field" />
    </div>
  </div>
</template>
