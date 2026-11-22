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
