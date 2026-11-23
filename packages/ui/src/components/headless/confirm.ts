import { inject, onScopeDispose, provide, readonly, ref, shallowReadonly, shallowRef, type InjectionKey } from "vue";

export interface UIConfirmOptions {
  title: string;
  description: string;
  trigger?: HTMLElement | null;
}

function createConfirmation() {
  const open = ref(false);
  const request = shallowRef<Readonly<UIConfirmOptions>>();
  let pending: { owner: symbol; resolve: (accepted: boolean) => void } | undefined;

  function settle(accepted: boolean, owner?: symbol) {
    if (!pending || (owner && pending.owner !== owner)) return;
    const { resolve } = pending;
    pending = undefined;
    open.value = false;
    resolve(accepted);
  }

  function confirm(options: UIConfirmOptions, owner: symbol) {
    if (pending || typeof document === "undefined") return Promise.resolve(false);
    const focused = document.activeElement;
    const trigger = options.trigger === undefined ? (focused instanceof HTMLElement ? focused : null) : options.trigger;
    request.value = { ...options, trigger };
    return new Promise<boolean>(resolve => {
      pending = { owner, resolve };
      open.value = true;
    });
  }

  onScopeDispose(() => settle(false));
  return { open: readonly(open), request: shallowReadonly(request), confirm, settle };
}

const confirmationKey: InjectionKey<ReturnType<typeof createConfirmation>> = Symbol("UIConfirmation");

export function provideUIConfirmation() {
  const controller = createConfirmation();
  provide(confirmationKey, controller);
  return controller;
}

export function useConfirm() {
  const controller = inject(confirmationKey);
  if (!controller) throw new Error("useConfirm requires UIConfirmProvider.");
  const owner = Symbol();
  let disposed = false;
  onScopeDispose(() => {
    disposed = true;
    controller.settle(false, owner);
  });
  return { confirm: (options: UIConfirmOptions) => disposed ? Promise.resolve(false) : controller.confirm(options, owner) };
}
