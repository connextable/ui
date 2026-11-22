import { h, inject, type Component, type PropType, type VNode, type VNodeProps } from "vue";
import type { RouteLocationRaw } from "vue-router";

// Keep the provider key stable across builds of the Nuxt module and UI library.
export const linkComponentKey = "@connextable/ui/button-link";

type PrefetchTrigger = "visibility" | "interaction";

export interface LinkPrefetchProps {
  prefetch?: boolean;
  prefetchOn?: PrefetchTrigger | Partial<Record<PrefetchTrigger, boolean>>;
  noPrefetch?: boolean;
}

export const linkProps = {
  href: String,
  to: [String, Object] as PropType<RouteLocationRaw>,
  external: { type: Boolean, default: undefined },
  replace: { type: Boolean, default: undefined },
  prefetch: { type: Boolean, default: undefined },
  prefetchOn: [String, Object] as PropType<LinkPrefetchProps["prefetchOn"]>,
  noPrefetch: { type: Boolean, default: undefined },
};

interface LinkSlot {
  href?: string;
  target: string | null;
  rel: string | null;
  isExternal: boolean;
  navigate(event: MouseEvent): unknown;
  prefetch?(): Promise<void>;
  shouldPrefetch?(trigger: PrefetchTrigger): boolean;
}

const visibleLinks = new Map<Element, () => void>();
let visibilityObserver: IntersectionObserver | undefined;

function stopObservingLink(element: Element) {
  if (!visibleLinks.delete(element)) return;
  visibilityObserver?.unobserve(element);
  if (!visibleLinks.size) {
    visibilityObserver?.disconnect();
    visibilityObserver = undefined;
  }
}

function prefetchHandlers(link: LinkSlot) {
  // Nuxt 4.5 and later expose the effective prefetch policy on the custom slot.
  if (!link.shouldPrefetch || !link.prefetch) return {};

  function prefetchLink(element: Element, trigger: PrefetchTrigger) {
    if (element.matches('a[href]:not([aria-disabled="true"])') && link.shouldPrefetch?.(trigger)) {
      void link.prefetch?.();
    }
  }

  function onInteraction(event: Event) {
    prefetchLink(event.currentTarget as Element, "interaction");
  }

  function observeVisibility(vnode: VNode) {
    const element = vnode.el;
    if (!(element instanceof HTMLAnchorElement)) return;
    if (!link.shouldPrefetch?.("visibility") || typeof IntersectionObserver === "undefined") {
      stopObservingLink(element);
      return;
    }

    visibilityObserver ??= new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleLinks.get(entry.target)?.();
      }
    });
    const alreadyObserved = visibleLinks.has(element);
    visibleLinks.set(element, () => {
      stopObservingLink(element);
      prefetchLink(element, "visibility");
    });
    if (!alreadyObserved) visibilityObserver.observe(element);
  }

  return {
    onPointerenter: onInteraction,
    onPointerdown: onInteraction,
    onFocus: onInteraction,
    onVnodeMounted: observeVisibility,
    onVnodeUpdated: observeVisibility,
    onVnodeBeforeUnmount: (vnode: VNode) => stopObservingLink(vnode.el as Element),
  };
}

export function useLinkComponent() {
  return inject<Component | null>(linkComponentKey, null);
}

export function useLinkRenderer() {
  const Link = useLinkComponent();

  return (
    props: LinkPrefetchProps & { href?: string; to?: RouteLocationRaw; external?: boolean; replace?: boolean },
    attrs: Record<string, unknown>,
    renderAnchor: (attributes: VNodeProps & Record<string, unknown>) => VNode,
    native = false,
  ): VNode => {
    const destination = props.to ?? props.href;
    const href = typeof destination === "string" ? destination : props.href;
    const download = attrs.download != null && attrs.download !== false;
    const pageFragment = typeof destination === "string" && destination.startsWith("#");
    if (!Link || destination == null || native || download || pageFragment) {
      return renderAnchor({ href });
    }

    return h(Link, {
      custom: true,
      to: destination,
      external: props.external,
      replace: props.replace,
      prefetch: props.prefetch,
      prefetchOn: props.prefetchOn,
      noPrefetch: props.noPrefetch,
      target: attrs.target,
      rel: attrs.rel,
    }, {
      default: (link: LinkSlot) => renderAnchor({
        href: link.href,
        target: link.target ?? undefined,
        rel: link.rel ?? undefined,
        ...prefetchHandlers(link),
        onClick: link.isExternal ? undefined : (event: MouseEvent) => {
          if (!event.defaultPrevented) void link.navigate(event);
        },
      }),
    });
  };
}
