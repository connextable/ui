<script setup lang="ts">
import { UITreeSelect, UITreeSelectContent, UITreeSelectDisclosure, UITreeSelectField, UITreeSelectGroup, UITreeSelectItem } from "@connextable/ui";
import { Check, Folder, Users } from "@lucide/vue";

const nodes = [
  { id: "design", parentID: null },
  { id: "ui", parentID: "design" },
  { id: "development", parentID: null },
  { id: "web", parentID: "development" },
] as const;
const labels = { design: "디자인", ui: "화면", development: "개발", web: "웹" };
</script>

<template>
  <UITreeSelect :nodes="nodes" :disabled-items="['design', 'ui']" :default-expanded-values="['development']" v-slot="{ value }">
    <UITreeSelectField aria-label="이동할 팀 선택" :selected="!!value.length" :placeholder="value[0] ? labels[value[0]] : '이동할 팀'" />
    <UITreeSelectContent>
      <UITreeSelectItem value="design">
        <UITreeSelectDisclosure for="design" as="button" aria-label="디자인 하위 팀 펼치기 또는 접기" />
        <Folder :size="16" aria-hidden="true" /> {{ labels.design }} (잠김)
      </UITreeSelectItem>
      <UITreeSelectGroup for="design">
        <UITreeSelectItem value="ui"><Users :size="16" aria-hidden="true" /> {{ labels.ui }}</UITreeSelectItem>
      </UITreeSelectGroup>
      <UITreeSelectItem value="development">
        <UITreeSelectDisclosure for="development" as="button" aria-label="개발 하위 팀 펼치기 또는 접기" />
        <Folder :size="16" aria-hidden="true" /> {{ labels.development }}
        <Check v-if="value.includes('development')" :size="16" aria-hidden="true" />
      </UITreeSelectItem>
      <UITreeSelectGroup for="development">
        <UITreeSelectItem value="web">
          <Users :size="16" aria-hidden="true" /> {{ labels.web }}
          <Check v-if="value.includes('web')" :size="16" aria-hidden="true" />
        </UITreeSelectItem>
      </UITreeSelectGroup>
    </UITreeSelectContent>
  </UITreeSelect>
</template>
