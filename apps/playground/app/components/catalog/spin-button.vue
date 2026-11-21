<script setup lang="ts">
import {
  UISpinButton,
  UISpinButtonDecrement,
  UISpinButtonIncrement,
  UISpinButtonInput,
} from "@connextable/ui";
import { ChevronDown, ChevronUp, Minus, Plus } from "@lucide/vue";
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
      <UISpinButton v-model="count" min="1" max="999" step="1" label="주문 수량" data-ui-control-size="sm" style="justify-self: start">
        <UISpinButtonDecrement label="주문 수량 줄이기"><Minus :size="16" aria-hidden="true" /></UISpinButtonDecrement>
        <span class="ui-numeric-value">
          <UISpinButtonInput :id="countId" />
          <span class="ui-numeric-unit" aria-hidden="true">개</span>
        </span>
        <UISpinButtonIncrement label="주문 수량 늘리기"><Plus :size="16" aria-hidden="true" /></UISpinButtonIncrement>
      </UISpinButton>
    </div>
    <div class="ui-field">
      <label :for="widthId">제작 가로 길이 (mm)</label>
      <UISpinButton v-model="width" min="12" max="84" step="0.5" label="제작 가로 길이 (mm)" data-ui-control-size="sm" data-layout="field">
        <span class="ui-numeric-value">
          <UISpinButtonInput :id="widthId" />
          <span class="ui-numeric-unit" aria-hidden="true">mm</span>
        </span>
        <UISpinButtonIncrement label="가로 길이 늘리기"><ChevronUp :size="15" aria-hidden="true" /></UISpinButtonIncrement>
        <UISpinButtonDecrement label="가로 길이 줄이기"><ChevronDown :size="15" aria-hidden="true" /></UISpinButtonDecrement>
      </UISpinButton>
    </div>
  </div>
</template>
