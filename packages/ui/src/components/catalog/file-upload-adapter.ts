import type { FileUploadAdapter, FileUploadRequest } from "@sectile/vue/form/file-upload";

export interface UIFileUploadHTTPOptions {
  url: string;
  method?: "POST" | "PUT" | "PATCH";
  fieldName?: string;
  headers?: HeadersInit;
  withCredentials?: boolean;
}

type Upload<Receipt, FileType extends File = File> = (request: FileUploadRequest<FileType>) => Receipt | PromiseLike<Receipt>;
type ReadReceipt<Receipt> = (response: XMLHttpRequest) => Receipt | PromiseLike<Receipt>;

async function sendFile(
  options: UIFileUploadHTTPOptions & { readReceipt?: ReadReceipt<unknown> },
  { file, signal, reportProgress }: FileUploadRequest<File>,
) {
  const xhr = new XMLHttpRequest();
  const body = new FormData();
  body.append(options.fieldName ?? "file", file);

  const abort = () => xhr.abort();
  try {
    await new Promise<void>((resolve, reject) => {
      xhr.upload.addEventListener("progress", ({ loaded, total, lengthComputable }) => {
        reportProgress(lengthComputable ? { loaded, total } : { loaded });
      });
      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve();
        else reject(new Error(`Upload failed with HTTP status ${xhr.status}.`));
      });
      xhr.addEventListener("error", () => reject(new Error("Upload failed due to a network error.")));
      xhr.addEventListener("abort", () => reject(signal.reason ?? new DOMException("Upload aborted.", "AbortError")));

      xhr.open(options.method ?? "POST", options.url);
      xhr.withCredentials = options.withCredentials ?? false;
      new Headers(options.headers).forEach((value, name) => xhr.setRequestHeader(name, value));
      signal.addEventListener("abort", abort, { once: true });
      xhr.send(body);
    });
    signal.throwIfAborted();
    return options.readReceipt ? await options.readReceipt(xhr) : xhr.responseText;
  } finally {
    signal.removeEventListener("abort", abort);
  }
}

export function createUIFileUploadAdapter<Receipt, FileType extends File = File>(upload: Upload<Receipt, FileType>): FileUploadAdapter<FileType, Receipt>;
export function createUIFileUploadAdapter<Receipt>(options: UIFileUploadHTTPOptions & { readReceipt: ReadReceipt<Receipt> }): FileUploadAdapter<File, Receipt>;
export function createUIFileUploadAdapter(options: UIFileUploadHTTPOptions & { readReceipt?: undefined }): FileUploadAdapter<File, string>;
export function createUIFileUploadAdapter<Receipt, FileType extends File = File>(
  upload: Upload<Receipt, FileType> | (UIFileUploadHTTPOptions & { readReceipt?: ReadReceipt<unknown> }),
): FileUploadAdapter<FileType, unknown> {
  const perform = typeof upload === "function" ? upload : (request: FileUploadRequest<FileType>) => sendFile(upload, request);
  async function run(request: FileUploadRequest<FileType>) {
    request.signal.throwIfAborted();
    const result = await perform(request);
    request.signal.throwIfAborted();
    return result;
  }
  return request => ({ result: run(request) });
}
