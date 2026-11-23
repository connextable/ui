# Connextable UI

Vue 앱을 위한 UI 컴포넌트와 컴포저블입니다. Vue 3.5.41 이상에서 사용할 수 있습니다.

## 설치

```sh
npm install @connextable/ui
```

## 사용

스타일시트를 한 번 가져온 뒤 컴포넌트를 사용합니다.

```vue
<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import "@connextable/ui/styles.css";
</script>

<template>
  <UIButton>저장</UIButton>
</template>
```

- [컴포넌트 문서와 예제](https://ui.connextable.com/components/button)
- [Vite 자동 임포트](https://ui.connextable.com/#vite)
- [Nuxt 모듈 설정](https://ui.connextable.com/#nuxt)

## 문서 개발

```sh
pnpm install --frozen-lockfile
dvt run dev:docs
```

[문서 배포와 npm 릴리즈](docs/npm-release.md)
