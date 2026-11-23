<script setup lang="ts">
import {
  UIButton,
  UIChart,
  UIChartActions,
  UIChartAxisView,
  UIChartCartesian,
  UIChartExternalViewControls,
  UIChartLegend,
  UIChartPlot,
  UIChartRenderer,
  UIChartResetView,
  UIChartScatter,
  UIChartViewControls,
  UIChartXAxis,
  UIChartYAxis,
  UIChartZoomControl,
} from "@connextable/ui";
import { computed, onUnmounted, ref, shallowRef } from "vue";

const day = 86_400_000;
const visibleCandles = 20;
const tickInterval = 750;
const ticksPerCandle = 4;
const closes = [102, 101, 106, 110, 107, 114, 116, 113, 117, 120, 119, 123, 121, 124, 129, 125, 123, 128, 132, 131];
const prices = shallowRef(closes.map((close, index) => {
  const open = closes[index - 1] ?? 100;
  return {
    date: Date.UTC(2026, 6, index + 1),
    open,
    close,
    high: Math.max(open, close) + 1 + index % 3,
    low: Math.min(open, close) - 1 - (index + 1) % 3,
  };
}));
const latest = computed(() => prices.value.at(-1)!);
const timeDomain = computed(() => ({
  kind: "temporal" as const,
  minimum: prices.value[0]!.date - day / 2,
  maximum: latest.value.date + day / 2,
}));
const priceDomain = computed(() => ({
  kind: "numeric" as const,
  minimum: Math.floor((Math.min(...prices.value.map(candle => candle.low)) - 2) / 5) * 5,
  maximum: Math.ceil((Math.max(...prices.value.map(candle => candle.high)) + 2) / 5) * 5,
}));
const layers = { open: "open", high: "high", low: "low", close: "close" } as const;
const fields = ["open", "high", "low", "close"] as const;
const labels = { open: "시가", high: "고가", low: "저가", close: "종가" } as const;
const format = new Intl.DateTimeFormat("ko-KR", { month: "numeric", day: "numeric", timeZone: "UTC" });
const pricesByDate = computed(() => new Map(prices.value.map(price => [price.date, price])));
const priceLabels = computed(() => new Map<string, string>(prices.value.flatMap(price => fields.map(field => [
  `${field}-${price.date}`,
  `${format.format(price.date)} ${labels[field]} ${price[field]}`,
] as const))));
const legend = [
  { label: "상승", color: "var(--ui-chart-rise)" },
  { label: "하락", color: "var(--ui-chart-fall)" },
];

const running = ref(false);
let timer: ReturnType<typeof setInterval> | undefined;
let ticks = 0;
let priceUpdates = 0;
let seed = 16377;

function priceMove(close: number) {
  const index = priceUpdates++;
  if (index < 2) return index + 3;
  seed = (Math.imul(seed, 1_664_525) + 1_013_904_223) >>> 0;
  const noise = seed / 2 ** 32 - 0.5;
  const baseline = 132 + 9 * Math.sin(index / 31);
  const volatility = 4 + 5 * (0.5 + 0.5 * Math.sin(index / 12));
  return Math.round((baseline - close) * 0.1 + noise * volatility);
}

function tick() {
  const current = latest.value;
  if (++ticks % ticksPerCandle === 0) {
    const { close } = current;
    const next = { date: current.date + day, open: close, high: close, low: close, close };
    prices.value = [...prices.value, next].slice(-visibleCandles);
    return;
  }
  const close = Math.max(1, current.close + priceMove(current.close));
  prices.value = [...prices.value.slice(0, -1), {
    ...current,
    close,
    high: Math.max(current.high, close),
    low: Math.min(current.low, close),
  }];
}

function toggleRunning() {
  running.value = !running.value;
  if (running.value) timer = setInterval(tick, tickInterval);
  else clearInterval(timer);
}

function accessiblePriceLabel(id: string | number) {
  return priceLabels.value.get(String(id)) ?? String(id);
}

onUnmounted(() => clearInterval(timer));
</script>

<template>
  <UIChart animate-updates :candlesticks="layers" :dom="{
    accessibilityLabel: '가상 종목 일봉',
    getAccessibleDatumLabel: accessiblePriceLabel,
  }">
    <template #default>
      <UIChartLegend :items="legend" />
      <UIChartCartesian>
        <UIChartXAxis id="date" field="date" scale="temporal" :ticks="6" :domain="timeDomain">
          <UIChartAxisView :minimum-span="4 * day" update="follow-end" />
        </UIChartXAxis>
        <UIChartYAxis id="price" scale="linear" :domain="priceDomain" :ticks="6" label="가격" />
        <UIChartScatter
          v-for="field in fields"
          :id="layers[field]"
          :key="field"
          :label="labels[field]"
          :data="prices"
          :get-id="price => `${field}-${price.date}`"
          :get-y="price => price[field]"
          x-axis="date"
          y-axis="price"
        />
        <UIChartExternalViewControls />
      </UIChartCartesian>
      <UIChartPlot><UIChartRenderer /></UIChartPlot>
      <UIChartActions>
        <output aria-live="off">
          {{ format.format(latest.date) }} · 시가 {{ latest.open }} · 고가 {{ latest.high }} · 저가 {{ latest.low }} · 종가 {{ latest.close }}
        </output>
        <UIChartViewControls axis="date">
          <UIChartZoomControl direction="in" label="확대">확대</UIChartZoomControl>
          <UIChartZoomControl direction="out" label="축소">축소</UIChartZoomControl>
          <UIChartResetView label="전체 범위">전체 범위</UIChartResetView>
        </UIChartViewControls>
        <UIButton size="sm" variant="outline" @click="toggleRunning">{{ running ? "일시정지" : "재생" }}</UIButton>
      </UIChartActions>
    </template>
    <template #tooltip="{ title, x }">
      <strong>{{ title }}</strong>
      <template v-if="typeof x === 'number' && pricesByDate.has(x)">
        <div v-for="field in fields" :key="field" class="ui-chart-tooltip__value">
          <span>{{ labels[field] }}</span>
          <strong>{{ pricesByDate.get(x)?.[field] }}</strong>
        </div>
      </template>
    </template>
  </UIChart>
</template>
