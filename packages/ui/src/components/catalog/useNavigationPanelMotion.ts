import { nextTick, onMounted, onScopeDispose, watch, type Ref } from "vue";

export function useNavigationPanelMotion(
  panel: Readonly<Ref<HTMLElement | null>>,
  open: Readonly<Ref<boolean>>,
  target: () => unknown,
) {
  let preference: MediaQueryList | undefined;
  let placement: MutationObserver | undefined;
  let animation: Animation | undefined;
  let lockedPositioner: HTMLElement | undefined;
  let revision = 0;

  function cancel() {
    revision++;
    placement?.disconnect();
    placement = undefined;
    animation?.cancel();
    animation = undefined;
    lockedPositioner?.style.removeProperty("--ui-navigation-positioner-height");
    lockedPositioner?.removeAttribute("data-navigation-moving");
    lockedPositioner = undefined;
  }

  onMounted(() => {
    preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", cancel);
    window.addEventListener("resize", cancel);
  });

  watch(
    target,
    () => {
      const surface = panel.value;
      const positioner = surface?.parentElement;
      if (!surface || !positioner || !open.value || preference?.matches) return;
      if (positioner.dataset.state !== "open" || getComputedStyle(positioner).visibility !== "visible") return;

      // Measure the on-screen frame even when a previous switch is still moving.
      const from = surface.getBoundingClientRect();
      cancel();
      const request = revision;

      void nextTick(() => {
        if (request !== revision || !open.value) return;

        const animateWhenPlaced = () => {
          const style = getComputedStyle(positioner);
          if (positioner.hidden || style.visibility !== "visible") return;
          placement?.disconnect();
          placement = undefined;

          const to = surface.getBoundingClientRect();
          const x = from.left - to.left;
          const y = from.top - to.top;
          if (Math.max(Math.abs(x), Math.abs(y), Math.abs(from.width - to.width), Math.abs(from.height - to.height)) < 0.5) return;

          const token = style.getPropertyValue("--ui-motion-standard").trim();
          const duration = Number.parseFloat(token) * (token.endsWith("ms") ? 1 : 1000);
          if (duration <= 0) return;

          // Keep collision detection on the destination box while the visible panel interpolates.
          lockedPositioner = positioner;
          positioner.style.setProperty("--ui-navigation-positioner-height", `${to.height}px`);
          positioner.setAttribute("data-navigation-moving", "");
          const moving = surface.animate(
            [
              { translate: `${x}px ${y}px`, width: `${from.width}px`, height: `${from.height}px` },
              { translate: "0px 0px", width: `${to.width}px`, height: `${to.height}px` },
            ],
            {
              duration: Number.isFinite(duration) ? duration : 220,
              easing: style.getPropertyValue("--ui-ease-out").trim() || "ease-out",
              fill: "both",
            },
          );
          animation = moving;
          moving.onfinish = () => {
            if (animation === moving) cancel();
          };
        };

        placement = new MutationObserver(animateWhenPlaced);
        placement.observe(positioner, { attributeFilter: ["style", "hidden"] });
        animateWhenPlaced();
      });
    },
    { flush: "pre" },
  );

  watch(open, visible => {
    if (visible) {
      cancel();
    } else {
      revision++;
      placement?.disconnect();
      placement = undefined;
      // The closing fade starts from the currently visible position and size.
      animation?.pause();
    }
  }, { flush: "sync" });

  onScopeDispose(() => {
    preference?.removeEventListener("change", cancel);
    if (preference) window.removeEventListener("resize", cancel);
    cancel();
  });

  return cancel;
}
