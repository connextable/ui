<script setup lang="ts">
definePageMeta({
  title: "설치와 사용",
  description: "Connextable UI를 설치하고 Vue, Vite, Nuxt에서 첫 컴포넌트를 사용합니다.",
});

const vueExample = `<script setup lang="ts">
import { UIButton } from "@connextable/ui";
<\/script>

<template>
  <UIButton>저장</UIButton>
</template>`;

const viteConfig = `import connextableUI from "@connextable/ui/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue(), connextableUI()],
});`;

const viteAppConfig = `import connextableUI from "@connextable/ui/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue(), connextableUI({ prefix: "App" })],
});`;

const viteTypeScriptConfig = `{
  "include": ["src/**/*", "src/**/*.vue", "connextable-ui.d.ts"]
}`;

const nuxtConfig = `export default defineNuxtConfig({
  modules: ["@connextable/ui/nuxt"],
});`;

const nuxtAppConfig = `export default defineNuxtConfig({
  modules: ["@connextable/ui/nuxt"],
  connextableUI: {
    prefix: "App",
  },
});`;

const autoImportExample = `<template>
  <UIButton>저장</UIButton>
</template>`;

const appButtonExample = `<template>
  <AppButton>저장</AppButton>
</template>`;
</script>

<template>
  <div class="docs-installation">
    <section aria-labelledby="install">
      <h2 id="install" data-playground-heading tabindex="-1">설치</h2>
      <p>Vue 3.5.41 이상에서 사용할 수 있습니다. 프로젝트에서 패키지를 설치합니다.</p>
      <PlaygroundCodeBlock class="docs-installation__code" code="npm install @connextable/ui" language="shellscript" />
    </section>

    <section aria-labelledby="typescript">
      <h2 id="typescript" data-playground-heading tabindex="-1">TypeScript</h2>
      <p>공개 타입 선언은 TypeScript 5.9.3, 6, 7을 지원합니다.</p>
      <p><code>vue-tsc</code>로 Vue 템플릿을 검사할 때는 TypeScript 5.9 또는 6을 사용할 수 있습니다.</p>
    </section>

    <section aria-labelledby="vue">
      <h2 id="vue" data-playground-heading tabindex="-1">Vue에서 직접 임포트</h2>
      <p>앱 진입점에 스타일시트 임포트를 한 번 추가합니다.</p>
      <PlaygroundCodeBlock
        class="docs-installation__code"
        filename="src/main.ts"
        code='import "@connextable/ui/styles.css";'
        language="typescript"
      />
      <p>사용할 컴포넌트를 가져와 템플릿에 넣습니다.</p>
      <PlaygroundCodeBlock class="docs-installation__code" filename="src/App.vue" :code="vueExample" />
    </section>

    <section aria-labelledby="vite">
      <h2 id="vite" data-playground-heading tabindex="-1">Vite</h2>
      <p>Vite 7.3.x 또는 8.x를 쓰는 Vue 앱에서 자동 임포트 도구를 설치합니다.</p>
      <PlaygroundCodeBlock
        class="docs-installation__code"
        code="npm install -D unplugin-vue-components unimport"
        language="shellscript"
      />
      <p>기존 <code>plugins</code> 배열에 <code>connextableUI()</code>를 추가합니다.</p>
      <PlaygroundCodeBlock class="docs-installation__code" filename="vite.config.ts" :code="viteConfig" language="typescript" />
      <p>플러그인은 컴포넌트와 컴포저블을 자동 임포트하고, Vite가 처리하는 HTML에 스타일시트를 등록합니다.</p>
      <PlaygroundCodeBlock class="docs-installation__code" filename="src/App.vue" :code="autoImportExample" />

      <h3 id="vite-typescript" data-playground-heading tabindex="-1">TypeScript 선언 파일 연결</h3>
      <p>Vite를 한 번 실행하면 프로젝트 루트에 <code>connextable-ui.d.ts</code>가 생성됩니다.</p>
      <PlaygroundCodeBlock class="docs-installation__code" code="npx vite" language="shellscript" />
      <p>앱을 검사하는 TypeScript 설정 파일의 기존 <code>include</code> 배열에 <code>connextable-ui.d.ts</code>를 추가합니다.</p>
      <PlaygroundCodeBlock class="docs-installation__code" filename="tsconfig.app.json" :code="viteTypeScriptConfig" language="json" />

      <h3 id="vite-prefix" data-playground-heading tabindex="-1">컴포넌트 접두사 바꾸기</h3>
      <p>플러그인에 <code>prefix</code>를 지정합니다.</p>
      <PlaygroundCodeBlock class="docs-installation__code" filename="vite.config.ts" :code="viteAppConfig" language="typescript" />
      <p>템플릿에서는 <code>AppButton</code>을 사용합니다. 컴포저블은 <code>useScrollArea</code>처럼 기존 이름으로 호출합니다.</p>
      <PlaygroundCodeBlock class="docs-installation__code" filename="src/App.vue" :code="appButtonExample" />
    </section>

    <section aria-labelledby="nuxt">
      <h2 id="nuxt" data-playground-heading tabindex="-1">Nuxt</h2>
      <p>Nuxt 4.5 이상에서는 기존 <code>modules</code> 배열에 <code>@connextable/ui/nuxt</code>를 추가합니다.</p>
      <PlaygroundCodeBlock class="docs-installation__code" filename="nuxt.config.ts" :code="nuxtConfig" language="typescript" />
      <p>모듈이 컴포넌트와 컴포저블, 스타일시트를 등록합니다. 템플릿에서 <code>UIButton</code>을 바로 사용합니다.</p>
      <PlaygroundCodeBlock class="docs-installation__code" filename="app/app.vue" :code="autoImportExample" />

      <h3 id="nuxt-prefix" data-playground-heading tabindex="-1">컴포넌트 접두사 바꾸기</h3>
      <p><code>connextableUI.prefix</code>를 지정합니다.</p>
      <PlaygroundCodeBlock class="docs-installation__code" filename="nuxt.config.ts" :code="nuxtAppConfig" language="typescript" />
      <PlaygroundCodeBlock class="docs-installation__code" filename="app/app.vue" :code="appButtonExample" />
    </section>

    <section aria-labelledby="reference">
      <h2 id="reference" data-playground-heading tabindex="-1">예제와 레퍼런스</h2>
      <p><UIAnchor to="/components/button">버튼 문서</UIAnchor>에서 예제를 실행하고 속성과 슬롯을 확인할 수 있습니다.</p>
      <p><UIAnchor to="/design-system">디자인 시스템</UIAnchor>에서 색상, 타이포그래피와 공통 스타일 토큰을 확인할 수 있습니다.</p>
    </section>
  </div>
</template>

<style scoped>
.docs-installation {
  display: grid;
  gap: 2.5rem;
  padding-block-end: 2rem;
}

.docs-installation h2 {
  margin: 0;
  font-size: 1.375rem;
  letter-spacing: -0.025em;
}

.docs-installation h3 {
  margin: 1.625rem 0 0;
  font-size: 1.0625rem;
}

.docs-installation p {
  margin: var(--ui-space-sm) 0;
}

.docs-installation__code {
  min-inline-size: 0;
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-md);
  background: var(--ui-color-surface-muted);
}

.docs-installation__code + .docs-installation__code {
  margin-block-start: var(--ui-space-sm);
}
</style>
