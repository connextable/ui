<script setup lang="ts">
import {
  UICalendar, UICheckboxGroup, UICheckboxTree, UIForm, UIFormActions, UIFormField, UIFormReset,
  UIFormSubmit, UIPinInput, UITagsInput, UIToggleButton, UIToggleGroup, UITreeSelect,
} from "@connextable/ui";
import { ref } from "vue";

const teams = [{ id: "design", parentID: null, label: "디자인" }];
const channels = [{ value: "email", label: "이메일" }, { value: "chat", label: "채팅" }];
const periods = [{ value: "am", label: "오전" }, { value: "pm", label: "오후" }];
const date = { year: 2026, month: 8, day: 22 };
const submitted = ref("");
</script>

<template>
  <UIForm @submit="({ values }) => { submitted = JSON.stringify(values) }" @reset="submitted = ''">
    <UIFormField name="pin" label="확인 코드" description="네 자리를 모두 입력하세요." required>
      <UIPinInput :length="4" label="확인 코드" clearable />
    </UIFormField>
    <UIFormField name="topics" label="검토 주제" required>
      <UITagsInput placeholder="예: 화면 검토" clearable />
    </UIFormField>
    <UIFormField name="channels" label="알림 채널" description="채널을 하나 이상 고르세요." required>
      <UICheckboxGroup :options="channels" clearable />
    </UIFormField>
    <UIFormField name="periods" label="가능한 시간대" required>
      <UIToggleGroup :options="periods" multiple />
    </UIFormField>
    <UIFormField name="teams" label="알릴 팀" required>
      <UICheckboxTree :nodes="teams" clearable />
    </UIFormField>
    <UIFormField name="owner" label="담당 팀" description="팀 이름으로 검색할 수 있습니다." required>
      <UITreeSelect :nodes="teams" clearable />
    </UIFormField>
    <UIFormField name="day" label="검토 날짜" readonly>
      <UICalendar :default-value="date" />
    </UIFormField>
    <UIFormField name="notify" label="완료 알림">
      <UIToggleButton value="yes">완료 알림 받기</UIToggleButton>
    </UIFormField>
    <UIFormActions>
      <UIFormReset>초기화</UIFormReset>
      <UIFormSubmit>확정</UIFormSubmit>
    </UIFormActions>
    <template #output>{{ submitted }}</template>
  </UIForm>
</template>
