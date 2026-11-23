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
  let layout: ReturnType<typeof measure> | undefined;

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

  function measure() {
    const { scroller, top, padding, max } = metrics();
    const scrollTop = scroller.scrollTop;
    const entries = toValue(sections)
      .filter(({ element }) => element.isConnected && element.getClientRects().length)
      .map(({ id, element }) => ({ id, element, offset: scrollTop + element.getBoundingClientRect().top - top }));
    return {
      scroller, max, top, padding, entries,
      readingOffset: entries[0] ? sectionOffset(entries[0].element, padding) : padding,
    };
  }

  function update() {
    frame = 0;
    const position = layout ??= measure();
    const { scroller, entries, max, readingOffset } = position;
    const first = entries[0];
    const last = entries.at(-1);
    if (!first || !last) {
      activeId.value = null;
      return;
    }

    const scrollTop = scroller.scrollTop;
    if (requestedId) {
      const target = entries.find(section => section.id === requestedId);
      if (target && Math.abs(scrollTop - destination(target.element, position)) < 2) {
        activeId.value = target.id;
        return;
      }
      requestedId = undefined;
    }

    const remaining = Math.max(0, max - scrollTop);
    // At the end, include headings below the reading line that cannot scroll any higher.
    const overflow = Math.max(0, last.offset - scrollTop - remaining - readingOffset);
    const approach = Math.min(max, overflow);
    const progress = approach > 0 ? Math.max(0, 1 - remaining / approach) : 0;
    const line = scrollTop + readingOffset + overflow * progress;
    for (let index = entries.length - 1; index >= 0; index--) {
      const entry = entries[index]!;
      if (entry.offset <= line + 4) {
        activeId.value = entry.id;
        return;
      }
    }
    activeId.value = first.id;
  }

  function scheduleUpdate() {
    if (mounted.value && !frame) frame = requestAnimationFrame(update);
  }

  function refresh() {
    layout = undefined;
    scheduleUpdate();
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
      viewport.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", refresh);
      if (trackHash) window.addEventListener("hashchange", syncHash);
      const resize = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(refresh);
      resize?.observe(root ?? document.documentElement);
      if (content && content !== root) resize?.observe(content);
      const mutations = typeof MutationObserver === "undefined" ? undefined : new MutationObserver(refresh);
      const scope = content ?? root ?? document.body;
      scope.addEventListener("load", refresh, true);
      mutations?.observe(scope, {
        subtree: true, childList: true, characterData: true,
        attributes: true, attributeFilter: ["class", "style", "hidden", "open"],
      });
      for (let ancestor = scope.parentElement; ancestor; ancestor = ancestor.parentElement) {
        mutations?.observe(ancestor, { attributes: true, attributeFilter: ["class", "style", "hidden", "open"] });
      }
      document.fonts?.addEventListener("loadingdone", refresh);
      if (trackHash) syncHash();
      else {
        requestedId = undefined;
        refresh();
      }
      onCleanup(() => {
        viewport.removeEventListener("scroll", scheduleUpdate);
        window.removeEventListener("resize", refresh);
        window.removeEventListener("hashchange", syncHash);
        scope.removeEventListener("load", refresh, true);
        document.fonts?.removeEventListener("loadingdone", refresh);
        resize?.disconnect();
        mutations?.disconnect();
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
