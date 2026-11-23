import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const paths = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard"], {
  cwd: root,
  encoding: "utf8",
}).split("\0");
const textFile = /\.(?:[cm]?[jt]sx?|vue|mdx?|mdc|html?|css|svg|jsonc?|ya?ml|toml|txt)$/i;
const middleDot = String.fromCodePoint(0x00b7);
const encodedMiddleDot = /&(?:middot|centerdot);|&#(?:0*183(?!\d)|x0*b7(?![\da-f]));?|\\(?:u(?:00b7|\{0*b7\})|xb7)/i;
const cssMiddleDot = /\\0{0,4}b7(?![\da-f])/i;

for (const path of new Set(paths.filter(path => textFile.test(path)))) {
  let content;
  try {
    content = readFileSync(join(root, path), "utf8");
  } catch (error) {
    if (error.code === "ENOENT") continue;
    throw error;
  }

  for (const [index, line] of content.split("\n").entries()) {
    const usesMiddleDot = line.includes(middleDot) || encodedMiddleDot.test(line)
      || (path.endsWith(".css") && cssMiddleDot.test(line));
    if (!usesMiddleDot) continue;
    console.error(`${path}:${index + 1} 가운뎃점(U+00B7) 사용 금지`);
    process.exitCode = 1;
  }
}

if (process.exitCode === 1) {
  console.error("가운뎃점으로 이어 붙이면 제목, 상태, 값의 위계가 흐려집니다. 서로 다른 정보는 제목, 배지 또는 목록으로 나누고, 한 문장 안에서는 접속어나 쉼표를 쓰세요.");
}
