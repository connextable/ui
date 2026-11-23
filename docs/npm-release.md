# npm 릴리즈와 문서 배포

## npm 릴리즈

1. `packages/ui/package.json`에서 새 버전을 지정하고 `main`에 반영합니다.
2. GitHub Actions의 **Publish npm package**에서 `main`을 선택합니다. **Publish the verified package to npm**을 켜고 실행합니다. 기본값으로 실행하면 패키징과 테스트, TypeScript 호환성 검사만 합니다.
3. 실행 결과와 `npm view @connextable/ui version`을 확인합니다. Releaseway가 검증한 tarball의 SHA-512를 확인한 뒤 npm에 게시합니다. [Releaseway npm Actions](https://github.com/releaseway/npm-actions/tree/v0.9.0)

npm의 Trusted Publisher는 GitHub 조직 `connextable`, 저장소 `ui`, 워크플로 파일 `publish.yml`을 사용합니다. Environment name은 비워 두고 **Allow npm publish**를 켭니다. [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/)

로컬에서 패키징을 확인할 수도 있습니다.

```sh
pnpm install --frozen-lockfile
pnpm --filter @connextable/ui build
node --test packages/ui/tests/*.test.mjs
node scripts/pack-npm-release.mjs /tmp/connextable-ui-release
```

## 공식 문서 배포

Connextable UI 공식 문서는 `apps/docs`의 Nuxt 앱입니다. 저장소 루트에서 `dvt run dev:docs` 또는 `pnpm dev`로 실행합니다.

GitHub Actions의 `Deploy documentation`은 `main`에 푸시하거나 수동 실행하면 문서를 빌드해 Cloudflare Pages의 `connextable-ui`에 배포합니다. `main`에서 실행한 빌드의 산출물을 같은 실행의 배포 작업에서 사용합니다.

### 최초 배포 설정

1. Cloudflare에서 `connextable` 계정의 **Cloudflare Pages Edit** 권한으로 API 토큰을 만듭니다. [Cloudflare Pages CI 자격 증명](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)
2. GitHub의 `docs-production` 환경에 `CLOUDFLARE_API_TOKEN`과 `CLOUDFLARE_ACCOUNT_ID`를 시크릿으로 등록합니다.
3. GitHub Actions에서 `main`의 `Deploy documentation`을 실행합니다. Pages 프로젝트가 없으면 처음 실행에서 생성합니다.
4. 첫 배포가 끝나면 Cloudflare Pages의 `connextable-ui` 프로젝트에서 **Custom domains**에 `ui.connextable.com`을 연결합니다. [Cloudflare Pages 커스텀 도메인](https://developers.cloudflare.com/pages/configuration/custom-domains/)

Pages에서 사용하는 공개 주소는 `apps/docs/wrangler.toml`의 `NUXT_PUBLIC_SITE_URL`입니다. 도메인 연결 후에는 `main`에 푸시할 때마다 같은 프로젝트에 배포됩니다. HTTPS로 시작하기, 디자인 시스템, 컴포넌트 문서와 `/sitemap.xml`을 열어 확인합니다.
