import type { UIFileUploadAdapter } from "@connextable/ui";

export function createExampleUpload(duration: number, failFirst = false): UIFileUploadAdapter<File, string> {
  let attempts = 0;

  return ({ file, reportProgress }) => {
    const shouldFail = failFirst && ++attempts === 1;
    let step = 0;
    let timer: ReturnType<typeof setInterval>;
    const result = new Promise<string>((resolve, reject) => {
      timer = setInterval(() => {
        step++;
        reportProgress({ loaded: Math.floor(file.size * step / 20), total: file.size });
        if (step < 20) return;
        clearInterval(timer);
        if (shouldFail) reject(new Error("예제 전송 실패"));
        else resolve(file.name);
      }, duration / 20);
    });
    return { result, dispose: () => clearInterval(timer) };
  };
}
