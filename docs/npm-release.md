# npm 공개 배포

배포 대상은 `packages/ui`의 `@connextable/ui`입니다. [Releaseway npm Actions v0.9.0](https://github.com/releaseway/npm-actions/tree/v0.9.0)을 사용합니다.

## 첫 버전 준비

로컬에서 tarball을 만들고 빈 npm 프로젝트에서 설치와 ESM 가져오기를 검증합니다.

```sh
pnpm install --frozen-lockfile
pnpm --filter @connextable/ui build
node --test packages/ui/tests/*.test.mjs
node scripts/pack-npm-release.mjs /tmp/connextable-ui-release
```

GitHub의 `Publish npm package` 워크플로를 수동 실행해도 검증한 tarball을 받을 수 있습니다. 수동 실행은 패키지를 빌드하고 아티팩트를 올린 뒤 TypeScript 소비자 검사를 실행합니다. 5.9와 6에서는 Vite와 Nuxt 템플릿을 검사하고, 7.0에서는 기본 컴파일러로 공개 타입을, 브리지로 Vue 템플릿을 검사합니다.

로컬에서 같은 tarball로 특정 조합을 검사할 때는 `node scripts/check-npm-types.mjs /tmp/connextable-ui-release 5.9`을 사용합니다. 마지막 인수로 `5.9`, `6`, `7`, `7-vue` 중 하나를 지정합니다.

Releaseway는 공개 레지스트리에 이미 생성된 패키지에서 자동 배포를 시작합니다. 최초 버전은 `@connextable` 스코프의 게시 권한이 있는 계정에서 검증한 tarball로 생성합니다. [Releaseway 최초 등록 요건](https://github.com/releaseway/npm-actions/tree/v0.9.0#package-bootstrap), [npm 스코프 공개 게시](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/)

```sh
npm publish /tmp/connextable-ui-release/connextable-ui-0.1.0.tgz --access public
```

## 이후 자동 배포

1. GitHub 원격이 `connextable/ui`인지 확인합니다. 다른 이름을 사용한다면 `packages/ui/package.json`의 `repository.url`과 npm의 연결 정보를 해당 원격으로 맞춥니다.
2. npm 패키지 설정의 Trusted publishing에서 GitHub Actions를 연결합니다. Organization or user는 `connextable`, Repository는 `ui`, Workflow filename은 `publish.yml`을 사용합니다. Environment name은 비워 두고 `Allow npm publish`를 활성화합니다. [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/)
3. `packages/ui/package.json`의 버전을 올리고 같은 버전의 `v<version>` 태그를 GitHub에 푸시합니다. 패키지 검증 작업이 설치와 테스트를 완료하면 배포 작업이 같은 tarball을 받아 SHA-512를 확인하고 npm에 공개합니다.
4. 실행 결과의 `published` 상태와 `npm view @connextable/ui version`을 확인합니다. 실패한 배포 작업을 재실행할 때는 같은 실행에서 만든 패키지 아티팩트를 사용합니다.

## 공식 문서 배포

Connextable UI 공식 문서는 `apps/docs`의 Nuxt 앱입니다. 저장소 루트에서 `dvt run dev:docs` 또는 `pnpm dev`로 실행합니다.

문서 사이트와 npm 패키지 홈페이지의 공개 주소는 `https://ui.connextable.com`입니다. Node.js 호스팅에 `apps/docs/.env.example`의 `NUXT_PUBLIC_SITE_URL`을 런타임 환경 변수로 설정합니다. Nuxt는 이 주소로 문서의 canonical URL과 `/robots.txt`, `/sitemap.xml`을 만듭니다. [Nuxt 런타임 설정](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)

저장소 루트에서 빌드해 `apps/docs/.output`을 배포합니다. 실행 명령의 경로는 저장소 루트 기준입니다.

```sh
pnpm install --frozen-lockfile
pnpm build
node apps/docs/.output/server/index.mjs
```

호스팅에서 제공한 DNS 대상으로 `ui.connextable.com`을 연결합니다. 연결 후 HTTPS로 시작하기, 디자인 시스템, 컴포넌트 문서와 sitemap을 열어 공개 주소를 확인합니다.
