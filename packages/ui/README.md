# Connextable UI

## Nuxt 4

`nuxt.config.ts`의 `modules`에 `@connextable/ui/nuxt`를 추가합니다.

```ts
export default defineNuxtConfig({
  modules: ["@connextable/ui/nuxt"],
});
```

템플릿에서 `UIButton`, `UILightbox` 등 공개 컴포넌트를 바로 사용할 수 있습니다. `useUIScrollArea`와 같은 공개 `useUI…` 컴포저블과 스타일시트도 모듈이 등록합니다.

| `connextableUI` 설정 | 기본값 | 동작 |
| --- | --- | --- |
| `prefix` | `"UI"` | 자동 임포트 이름의 `UI`를 바꿉니다. `"App"`이면 `<AppButton>`으로 사용합니다. |
| `components` | `true` | 컴포넌트 자동 임포트를 켭니다. |
| `composables` | `true` | `useUI…` 컴포저블 자동 임포트를 켭니다. |
| `css` | `true` | `@connextable/ui/styles.css`를 등록합니다. |
| `nuxtLink` | `true` | 버튼, 앵커, 메뉴의 링크를 NuxtLink에 연결합니다. |

예를 들어 `connextableUI: { prefix: "App", css: false }`로 템플릿 이름을 변경하고 스타일시트를 직접 불러올 수 있습니다.

## 링크로 이동하기

`UIButton`, `UIAnchor`, `UINavigationMenuLink`, `UIMenuItem`, `UIContextMenuItem`, `UIMenubarItem`에 `href`나 `to`를 직접 넘깁니다. `UINavigationMenuPopover`에서는 각 항목에 같은 속성을 지정합니다. 두 속성을 함께 쓰면 `to`가 우선합니다. Nuxt에서는 경로 문자열과 라우트 객체를 `to`로 전달할 수 있고, 일반 Vue에서는 문자열 주소를 사용할 수 있습니다.

```vue
<template>
  <UIAnchor :to="{ path: '/settings', hash: '#notifications' }">알림 설정</UIAnchor>
  <UIButton to="/settings" variant="outline">설정 열기</UIButton>
  <UIButton href="https://nuxt.com/docs" target="_blank" variant="outline">
    Nuxt 문서 새 탭에서 열기
  </UIButton>
  <UIButton href="/reports/monthly.pdf" download variant="outline">보고서 다운로드</UIButton>
</template>
```

Nuxt에서 정적 파일이나 같은 도메인의 별도 앱으로 이동할 때는 `external`을 지정합니다. `disabled`나 `loading` 상태에서는 링크가 활성화되지 않습니다.

Nuxt 4.5 이상에서 링크는 앱의 `experimental.defaults.nuxtLink` 프리패치 설정을 따릅니다. 개별 링크는 `:prefetch="false"` 또는 `no-prefetch`로 끌 수 있습니다. 포인터가 닿거나 포커스를 받을 때만 실행하려면 `prefetch-on="interaction"`을 지정합니다.

일반 Vue 앱에서 사용할 때는 `@connextable/ui`에서 컴포넌트를 가져오고 `@connextable/ui/styles.css`를 한 번 불러옵니다.

## 파일 업로드

`createUIFileUploadAdapter`에 업로드 주소를 전달합니다. 기본 요청은 `POST`이며, 선택한 파일은 `file` 필드에 담긴 `multipart/form-data`로 전송됩니다. `UIFileUpload`가 진행률과 취소를 연결합니다.

```vue
<script setup lang="ts">
import { createUIFileUploadAdapter, UIFileUpload } from "@connextable/ui";

const upload = createUIFileUploadAdapter({ url: "/api/uploads" });
</script>

<template>
  <UIFileUpload :adapter="upload" auto-start />
</template>
```

`fieldName`, `method`, `headers`, `withCredentials`로 요청을 설정합니다. 브라우저가 multipart 경계를 지정하도록 `Content-Type`은 비워 둡니다. 기본 완료 값은 응답 본문 문자열입니다. JSON과 같은 완료 값은 `readReceipt: response => JSON.parse(response.responseText)`로 읽을 수 있습니다.

별도 SDK를 쓸 때는 `createUIFileUploadAdapter(({ file, signal, reportProgress }) => …)` 형태로 완료 값이나 Promise를 반환합니다. SDK에 `signal`을 연결하고, 전송이 진행될 때 `reportProgress({ loaded, total })`를 호출합니다. 작업 종료 시 동기 정리가 필요하면 `UIFileUploadAdapter`를 직접 구현하고 `{ result, dispose }`를 반환합니다.

여러 파일은 `UIFileUploadQueue`에 `{ id, file }` 목록으로 전달합니다. 각 `id`는 대기열 내에서 고유해야 합니다. 컴포넌트가 진행률, 취소, 재시도, 완료 후 초기화를 표시합니다. `concurrency`는 동시 전송 수이며 기본값은 3입니다.

```vue
<UIFileUploadQueue :items="attachments" :adapter="upload" :concurrency="2" />
```

외부 버튼에서도 컴포넌트 ref의 `start()`, `cancel()`, `reset()`을 호출할 수 있습니다. `start`와 `cancel`에 ID 배열을 넘기면 해당 파일에만 적용됩니다. `getItem(id)`로 완료 결과를 읽습니다. `readonly`와 `disabled`는 새로운 조작을 제한하며 이미 시작한 전송은 계속 처리합니다.

## 표와 그리드에 데이터 연결하기

로컬 데이터는 `UIDataTable`과 `UIDataGrid`의 `columns`, `rows`에 바로 전달합니다. 서버에서 행을 요청하는 화면은 `createUITabularSource`로 응답을 만들어 `useUIDataTable`, `useUIDataGrid`, `useUIDataTreeGrid`의 `source`에 연결합니다.

```ts
import { createUITabularSource, useUIDataTable } from "@connextable/ui";

const table = useUIDataTable({
  source: createUITabularSource({
    columns: [{ id: "name" }],
    async load({ access }, { signal }) {
      const params = new URLSearchParams(access.kind === "page"
        ? { page: String(access.page), limit: String(access.itemsPerPage) }
        : { offset: String(access.start), limit: String(access.count) });
      const response = await fetch(`/api/reports?${params}`, { signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const { items, total } = await response.json() as {
        items: { id: string; name: string }[];
        total: number;
      };
      return {
        rows: items.map(({ id, name }) => ({ kind: "leaf", id, cells: { name } })),
        matchingLeafCount: total,
        visibleRowCount: total,
      };
    },
  }),
});
```

모든 행을 한 번에 반환할 때는 두 개수를 생략할 수 있습니다. 일부 행만 반환할 때는 전체 개수 또는 `"unknown"`을 전달합니다. 트리의 `matchingLeafCount`는 그룹을 제외한 전체 결과 개수이고, `visibleRowCount`는 그룹 행을 포함해 현재 펼침 상태에서 표시되는 전체 행 개수입니다. 서버가 전체 응답과 열 스키마를 관리하는 경우 `source`에 직접 연결할 수 있습니다.

## 날짜와 시간 선택

달력, 피커, 범위 입력은 기본 입력부와 버튼, 선택 목록을 제공합니다. 예를 들어 일시 범위는 아래처럼 연결합니다.

```vue
<script setup lang="ts">
import { UIDateTimeRangePicker, type UIDateTimeRange } from "@connextable/ui";
import { ref } from "vue";

const period = ref<UIDateTimeRange | null>(null);
</script>

<template>
  <UIDateTimeRangePicker v-model="period" label="예약 기간" clearable />
</template>
```

기본 슬롯에 세부 컴포넌트를 넣으면 입력부와 선택 창을 직접 구성할 수 있습니다.
