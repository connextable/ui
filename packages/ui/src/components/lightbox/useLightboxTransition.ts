import { nextTick, onBeforeUnmount } from "vue";

type LightboxTransition = "open" | "close" | "next" | "previous";
type LightboxSnapshots = Partial<Record<"media" | "panel" | "overlay", HTMLElement | null>>;
type TransitionRun = {
  direction: LightboxTransition;
  transition: ViewTransition;
  commit: () => void;
  cleanup: () => void;
};

// A document can have only one active View Transition, including across lightboxes.
const activeLightboxes = new WeakMap<Document, () => void>();

function nameSnapshots(elements: LightboxSnapshots) {
  const restore: (() => void)[] = [];
  for (const [part, element] of Object.entries(elements)) {
    if (!element) continue;
    const previousName = element.style.viewTransitionName;
    element.style.viewTransitionName = `ui-lightbox-${part}`;
    restore.push(() => { element.style.viewTransitionName = previousName; });
  }
  return () => restore.forEach(restoreName => restoreName());
}

export function useLightboxTransition() {
  let active: TransitionRun | undefined;

  function stop(commitPending = true) {
    const run = active;
    if (!run) return;
    active = undefined;
    run.transition.skipTransition();
    run.cleanup();
    if (commitPending) run.commit();
  }

  function start(
    direction: LightboxTransition,
    update: () => void,
    before: LightboxSnapshots,
    after: () => LightboxSnapshots,
  ) {
    const owner = before.media?.ownerDocument ?? before.panel?.ownerDocument ?? document;
    if (typeof owner.startViewTransition !== "function" || owner.fullscreenElement
      || owner.defaultView?.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      update();
      return;
    }

    activeLightboxes.get(owner)?.();

    let committed = false;
    let restore: (() => void) | undefined = nameSnapshots(before);
    const root = owner.documentElement;
    const cancel = () => stop();
    root.dataset.uiLightboxTransition = direction;
    const commit = () => {
      if (committed) return;
      committed = true;
      update();
    };
    const transition = owner.startViewTransition(async () => {
      if (active?.transition !== transition) return;
      restore?.();
      restore = undefined;
      commit();
      await nextTick();
      if (active?.transition === transition) restore = nameSnapshots(after());
    });
    const cleanup = () => {
      restore?.();
      delete root.dataset.uiLightboxTransition;
      activeLightboxes.delete(owner);
    };
    const run: TransitionRun = { direction, transition, commit, cleanup };
    active = run;
    activeLightboxes.set(owner, cancel);
    const finish = () => {
      if (active !== run) return;
      active = undefined;
      cleanup();
    };
    void transition.ready.catch(() => undefined);
    void transition.finished.then(finish, finish);
  }

  onBeforeUnmount(() => stop(false));
  return { start, stop, isClosing: () => active?.direction === "close" };
}
