import { h, inject, type Component, type PropType, type VNode, type VNodeProps } from "vue";
import type { RouteLocationRaw } from "vue-router";

// Keep the provider key stable across builds of the Nuxt module and UI library.
export const linkComponentKey = "@connextable/ui/button-link";

export const linkProps = {
  href: String,
  to: [String, Object] as PropType<RouteLocationRaw>,
  external: { type: Boolean, default: undefined },
  replace: { type: Boolean, default: undefined },
};

interface LinkSlot {
  href?: string;
  target: string | null;
  rel: string | null;
  isExternal: boolean;
  navigate(event: MouseEvent): unknown;
}

export function useLinkComponent() {
  return inject<Component | null>(linkComponentKey, null);
}

export function useLinkRenderer() {
  const Link = useLinkComponent();

  return (
    props: { href?: string; to?: RouteLocationRaw; external?: boolean; replace?: boolean },
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
      target: attrs.target,
      rel: attrs.rel,
    }, {
      default: (link: LinkSlot) => renderAnchor({
        href: link.href,
        target: link.target ?? undefined,
        rel: link.rel ?? undefined,
        onClick: link.isExternal ? undefined : (event: MouseEvent) => {
          if (!event.defaultPrevented) void link.navigate(event);
        },
      }),
    });
  };
}
