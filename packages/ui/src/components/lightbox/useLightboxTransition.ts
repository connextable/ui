import { nextTick, onBeforeUnmount } from "vue";

type LightboxTransition = "open" | "next" | "previous";
type TransitionRun = {
  transition: ViewTransition;
  commit: () => void;
  restore: () => void;
};

function nameSnapshot(element: HTMLElement, name: string) {
  const previousName = element.style.viewTransitionName;
  const previousClass = element.style.viewTransitionClass;
  element.style.viewTransitionName = name;
  element.style.viewTransitionClass = "ui-lightbox-media";
  return () => {
    element.style.viewTransitionName = previousName;
    element.style.viewTransitionClass = previousClass;
  };
}

export function useLightboxTransition(id: string) {
  const name = `ui-lightbox-${id.replace(/[^\w-]/g, "-")}`;
  let active: TransitionRun | undefined;

  function stop(commitPending = true) {
    const run = active;
    if (!run) return false;
    active = undefined;
    run.transition.skipTransition();
    run.restore();
    if (commitPending) run.commit();
    return true;
  }

  function start(
    direction: LightboxTransition,
    before: HTMLElement | null | undefined,
    update: () => void,
    after: () => HTMLElement | null | undefined,
  ) {
    if (!before || typeof document.startViewTransition !== "function"
      || document.fullscreenElement || matchMedia("(prefers-reduced-motion: reduce)").matches
      || !CSS.supports("selector(:active-view-transition-type(ui-lightbox-open))")
      || !CSS.supports("view-transition-class: ui-lightbox-media")) {
      update();
      return;
    }

    let committed = false;
    let restore = nameSnapshot(before, name);
    const commit = () => {
      if (committed) return;
      committed = true;
      update();
    };
    const transition = document.startViewTransition({
      types: [`ui-lightbox-${direction}`],
      async update() {
        if (active?.transition !== transition) return;
        restore();
        commit();
        await nextTick();
        if (active?.transition !== transition) return;
        const target = after();
        if (target) restore = nameSnapshot(target, name);
      },
    });
    const run: TransitionRun = { transition, commit, restore: () => restore() };
    active = run;
    const finish = () => {
      if (active !== run) return;
      active = undefined;
      restore();
    };
    void transition.ready.catch(() => undefined);
    void transition.finished.then(finish, finish);
  }

  onBeforeUnmount(() => stop(false));
  return { start, stop };
}
