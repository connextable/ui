<script setup lang="ts">
import { UISelect } from "@connextable/ui";

const cities = [
  "서울", "도쿄", "싱가포르", "시드니", "파리", "런던", "뉴욕", "로스앤젤레스",
  "멕시코시티", "상파울루", "부에노스아이레스",
];
const options = cities.map((city) => ({ value: city, label: city }));
</script>

<template>
  <UISelect aria-label="기준 도시" :options="options" default-value="서울" />
</template>
