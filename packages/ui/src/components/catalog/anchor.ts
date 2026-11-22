import { Anchor, type AnchorProps, type AnchorExpose } from "@sectile/vue/primitive";
import { defineComponent, h, mergeProps, shallowRef, type VNodeProps } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { linkProps, useLinkRenderer } from "../link-component";

type AnchorInstance = InstanceType<typeof Anchor>;
type AnchorLinkProps = AnchorInstance["$props"] & {
  to?: RouteLocationRaw;
  external?: boolean;
  replace?: boolean;
};

export const UIAnchor = defineComponent({
  name: "UIAnchor",
  inheritAttrs: false,
  props: {
    ...linkProps,
    disabled: Boolean,
    asChild: Boolean,
  },
  setup(props, { attrs, slots, expose }) {
    const anchor = shallowRef<AnchorExpose | null>(null);
    const renderLink = useLinkRenderer();
    expose({
      get element() { return anchor.value?.element ?? null; },
      focus(options?: FocusOptions) { anchor.value?.focus(options); },
    } satisfies AnchorExpose);
    return () => renderLink(props, attrs, link => h(Anchor, mergeProps(attrs, {
      ref: anchor,
      class: "ui-anchor",
      disabled: props.disabled,
      asChild: props.asChild,
      // An absent href lets an adopted anchor supply its own destination.
      ...(link.href === undefined ? {} : link),
    }) as AnchorProps & VNodeProps, slots), props.disabled || props.asChild);
  },
}) as unknown as { new(): AnchorInstance & { $props: AnchorLinkProps } };
