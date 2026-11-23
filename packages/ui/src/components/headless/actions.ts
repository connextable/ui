export interface UIAsyncActionContext {
  signal: AbortSignal;
}

export type UIAsyncActionHandler<Result, Context extends UIAsyncActionContext = UIAsyncActionContext> =
  (context: Context) => Result | Promise<Result>;

export function createUIAsyncAction<Result, Context extends UIAsyncActionContext = UIAsyncActionContext>(
  execute: UIAsyncActionHandler<Result, Context>,
) {
  return async (context: Context): Promise<Awaited<Result>> => {
    context.signal.throwIfAborted();
    const result = await execute(context);
    context.signal.throwIfAborted();
    return result;
  };
}

export type UICopySource = string | (() => string | null | undefined);

export function createUICopyAction(source: UICopySource) {
  return async () => {
    const text = typeof source === "function" ? source() : source;
    if (text == null) throw new Error("No text is available to copy.");
    const clipboard = globalThis.navigator?.clipboard;
    if (!clipboard?.writeText) throw new Error("Clipboard writing is unavailable.");
    await clipboard.writeText(text);
  };
}
