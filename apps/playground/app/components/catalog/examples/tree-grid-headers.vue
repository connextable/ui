<script setup lang="ts">
import {
  UITreeGrid,
  UITreeGridCell,
  UITreeGridDisclosure,
  UITreeGridEditor,
  UITreeGridHeader,
  UITreeGridHeaderCell,
  UITreeGridRow,
} from "@connextable/ui";
import { ChevronRight } from "@lucide/vue";

import { reactive } from 'vue'
const rows = [
  { id: 'platform', parentID: null, cells: ['platform-name', 'platform-owner', 'platform-status'] },
  { id: 'storefront', parentID: 'platform', cells: ['storefront-name', 'storefront-owner', 'storefront-status'] },
  { id: 'checkout', parentID: 'storefront', cells: ['checkout-name', 'checkout-owner', 'checkout-status'] },
]
const values = reactive(new Map([
  ['platform-name', '상거래 플랫폼'], ['platform-owner', '플랫폼팀'], ['platform-status', '정상'],
  ['storefront-name', '스토어'], ['storefront-owner', '김민아'], ['storefront-status', '수정됨'],
  ['checkout-name', '결제 흐름'], ['checkout-owner', '알렉스 천'], ['checkout-status', '검토 중'],
]))
const valueFor = (id: string) => values.get(id) ?? ''
const updateValue = (id: string, value: string) => values.set(id, value)
</script>

<template>
  <UITreeGrid
    :rows="rows"
    :headers="['서비스', '담당자', '상태']"
    :get-cell-value="valueFor"
    :set-cell-value="updateValue"
    :default-expanded-value="['platform', 'storefront']"
    aria-label="프로젝트 목록"
    v-slot="{ expandedValue }"
  >
    <UITreeGridHeader>
      <UITreeGridHeaderCell :column-index="1" />
      <UITreeGridHeaderCell :column-index="2" />
      <UITreeGridHeaderCell :column-index="3" />
    </UITreeGridHeader>
    <UITreeGridRow value="platform" :row-index="1" expandable>
      <UITreeGridCell value="platform-name" :column-index="1">
        <UITreeGridDisclosure as="button" type="button" for="platform" aria-label="상거래 플랫폼 하위 리소스">
          <ChevronRight :size="16" aria-hidden="true" />
        </UITreeGridDisclosure>
        {{ valueFor('platform-name') }}
      </UITreeGridCell>
      <UITreeGridCell value="platform-owner" :column-index="2" v-slot="{ editing }">
        <span v-if="!editing">{{ valueFor('platform-owner') }}</span>
        <UITreeGridEditor for="platform-owner" label="상거래 플랫폼 담당자" />
      </UITreeGridCell>
      <UITreeGridCell value="platform-status" :column-index="3">{{ valueFor('platform-status') }}</UITreeGridCell>
    </UITreeGridRow>
    <UITreeGridRow v-if="expandedValue.includes('platform')" value="storefront" :row-index="2" :level="2" expandable>
      <UITreeGridCell value="storefront-name" :column-index="1">
        <UITreeGridDisclosure as="button" type="button" for="storefront" aria-label="스토어 하위 리소스">
          <ChevronRight :size="16" aria-hidden="true" />
        </UITreeGridDisclosure>
        {{ valueFor('storefront-name') }}
      </UITreeGridCell>
      <UITreeGridCell value="storefront-owner" :column-index="2" v-slot="{ editing }">
        <span v-if="!editing">{{ valueFor('storefront-owner') }}</span>
        <UITreeGridEditor for="storefront-owner" label="스토어 담당자" />
      </UITreeGridCell>
      <UITreeGridCell value="storefront-status" :column-index="3">{{ valueFor('storefront-status') }}</UITreeGridCell>
    </UITreeGridRow>
    <UITreeGridRow v-if="expandedValue.includes('storefront')" value="checkout" :row-index="3" :level="3">
      <UITreeGridCell value="checkout-name" :column-index="1">{{ valueFor('checkout-name') }}</UITreeGridCell>
      <UITreeGridCell value="checkout-owner" :column-index="2" v-slot="{ editing }">
        <span v-if="!editing">{{ valueFor('checkout-owner') }}</span>
        <UITreeGridEditor for="checkout-owner" label="결제 담당자" />
      </UITreeGridCell>
      <UITreeGridCell value="checkout-status" :column-index="3">{{ valueFor('checkout-status') }}</UITreeGridCell>
    </UITreeGridRow>
  </UITreeGrid>
</template>
