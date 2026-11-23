import { onMounted, onScopeDispose, readonly, ref, toValue, watch, type MaybeRefOrGetter } from "vue";

export interface UIScrollSpySection {
  id: string;
  element: HTMLElement;
}

export interface UIScrollSpyOptions {
  root?: MaybeRefOrGetter<HTMLElement | null | undefined>;
  content?: MaybeRefOrGetter<Element | null | undefined>;
  trackHash?: MaybeRefOrGetter<boolean>;
}

export interface UIScrollToSectionOptions {
  behavior?: ScrollBehavior;
  focus?: boolean;
}

export function useScrollSpy(sections: MaybeRefOrGetter<readonly UIScrollSpySection[]>, options: UIScrollSpyOptions = {}) {
  const activeId = ref<string | null>(null);
  const mounted = ref(false);
  let frame = 0;
  let requestedId: string | undefined;

  function metrics() {
    const root = toValue(options.root);
    const scroller = root ?? document.scrollingElement ?? document.documentElement;
    const top = root ? root.getBoundingClientRect().top + root.clientTop : 0;
    const padding = Number.parseFloat(getComputedStyle(root ?? document.documentElement).scrollPaddingTop) || 0;
    return { scroller, top, padding, max: Math.max(0, scroller.scrollHeight - scroller.clientHeight) };
  }

  function sectionOffset(element: HTMLElement, padding: number) {
    return padding + (Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0);
  }

  function destination(element: HTMLElement, { scroller, top, padding, max }: ReturnType<typeof metrics>) {
    return Math.max(0, Math.min(max, scroller.scrollTop + element.getBoundingClientRect().top - top - sectionOffset(element, padding)));
  }

  function update() {
    frame = 0;
    const entries = toValue(sections).filter(section => section.element.isConnected && section.element.getClientRects().length);
    const first = entries[0];
    const last = entries.at(-1);
    if (!first || !last) {
      activeId.value = null;
      return;
    }

    const position = metrics();
    const { scroller, top, padding, max } = position;
    if (requestedId) {
      const target = entries.find(section => section.id === requestedId);
      if (target && Math.abs(scroller.scrollTop - destination(target.element, position)) < 2) {
        activeId.value = target.id;
        return;
      }
      requestedId = undefined;
    }

    const offset = sectionOffset(first.element, padding);
    const remaining = Math.max(0, max - scroller.scrollTop);
    // At the end, include headings below the reading line that cannot scroll any higher.
    const overflow = Math.max(0, last.element.getBoundingClientRect().top - top - remaining - offset);
    const approach = Math.min(max, overflow);
    const progress = approach > 0 ? Math.max(0, 1 - remaining / approach) : 0;
    const line = top + offset + overflow * progress;
    const current = entries.reverse().find(section => section.element.getBoundingClientRect().top <= line + 4);
    activeId.value = (current ?? first).id;
  }

  function refresh() {
    if (mounted.value && !frame) frame = requestAnimationFrame(update);
  }

  function markTarget(id: string) {
    requestedId = id;
    refresh();
  }

  function scrollToSection(id: string, { behavior = "instant", focus = false }: UIScrollToSectionOptions = {}) {
    if (!mounted.value) return false;
    const section = toValue(sections).find(entry => entry.id === id);
    if (!section?.element.isConnected || !section.element.getClientRects().length) return false;
    const position = metrics();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    position.scroller.scrollTo({ top: destination(section.element, position), behavior: reduced ? "instant" : behavior });
    if (focus) section.element.focus({ preventScroll: true });
    markTarget(id);
    return true;
  }

  function syncHash() {
    const hash = window.location.hash.slice(1);
    requestedId = toValue(sections).find(section => encodeURIComponent(section.id) === hash || section.id === hash)?.id;
    refresh();
  }

  onMounted(() => { mounted.value = true; });
  watch(
    () => [mounted.value, toValue(options.root), toValue(options.content), toValue(options.trackHash)] as const,
    ([ready, root, content, trackHash], _, onCleanup) => {
      if (!ready) return;
      const viewport = root ?? window;
      viewport.addEventListener("scroll", refresh, { passive: true });
      window.addEventListener("resize", refresh);
      if (trackHash) window.addEventListener("hashchange", syncHash);
      const resize = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(refresh);
      resize?.observe(root ?? document.documentElement);
      if (content && content !== root) resize?.observe(content);
      if (trackHash) syncHash();
      else {
        requestedId = undefined;
        refresh();
      }
      onCleanup(() => {
        viewport.removeEventListener("scroll", refresh);
        window.removeEventListener("resize", refresh);
        window.removeEventListener("hashchange", syncHash);
        resize?.disconnect();
      });
    },
    { flush: "post" },
  );
  watch(() => toValue(sections).map(({ id, element }) => [id, element]), () => {
    if (mounted.value && toValue(options.trackHash)) syncHash();
    else refresh();
  }, { flush: "post" });
  onScopeDispose(() => { if (frame) cancelAnimationFrame(frame); });

  return { activeId: readonly(activeId), refresh, scrollToSection, markTarget };
}
