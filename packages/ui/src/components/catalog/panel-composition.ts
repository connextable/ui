import { AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogRoot, AlertDialogTitle, AlertDialogTrigger, type AlertDialogRootProps } from "@sectile/vue/alert-dialog";
import { DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, type DialogInteractOutsideHandler, type DialogRootProps, type DialogRootSlotProps, type PopupCloseReason } from "@sectile/vue/dialog";
import { DrawerDescription, DrawerHandle, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTitle, DrawerTrigger, type DrawerRootProps } from "@sectile/vue/drawer";
import { PopoverArrow, PopoverContent, PopoverDescription, PopoverPortal, PopoverRoot, PopoverTitle, PopoverTrigger, type PopoverRootProps } from "@sectile/vue/popover";
import { defineComponent, h, shallowRef, type Component, type VNodeChild } from "vue";
import UIButton from "../button/UIButton.vue";
import { controlFlag } from "../clear/clearable";
import UIAlertDialogContent from "./UIAlertDialogContent.vue";
import UIDialogContent from "./UIDialogContent.vue";
import UIDrawerContent from "./UIDrawerContent.vue";
import UISheetContent from "./UISheetContent.vue";

type PanelOptions = { title?: string; description?: string; triggerLabel?: string; panelClass?: string };
type ClosablePanel = { showClose?: boolean; closeLabel?: string };
type PanelSlot = (state: DialogRootSlotProps & { close(): void }) => VNodeChild;
type PanelComponent<Props> = new () => {
  $props: Props & PanelOptions & {
    "onUpdate:open"?: (open: boolean) => void;
    onCloseRequest?: (reason: PopupCloseReason) => void;
    onAfterClose?: () => void;
    onInteractOutside?: DialogInteractOutsideHandler;
  };
  $slots: {
    default?: (state: DialogRootSlotProps) => VNodeChild;
    trigger?: PanelSlot;
    body?: PanelSlot;
    actions?: PanelSlot;
    "footer-leading"?: PanelSlot;
  };
  requestClose(): void;
};

function withPanelComposition<Props>(root: Component, parts: {
  trigger: Component;
  portal: Component;
  overlay?: Component;
  content: Component;
  title: Component;
  description: Component;
  decoration?: Component;
  sheet?: boolean;
}): PanelComponent<Props> {
  return defineComponent({
    inheritAttrs: false,
    props: {
      title: String,
      description: String,
      triggerLabel: String,
      panelClass: String,
    },
    setup(props, { attrs, slots, expose }) {
      const handle = shallowRef<{ requestClose(): void }>();
      const close = () => handle.value?.requestClose();
      expose({ requestClose: close });

      return () => {
        if (slots.default) return h(root, { ...attrs, ref: handle }, slots);

        const { showClose, "show-close": showCloseKebab, closeLabel, "close-label": closeLabelKebab, size, block, ...bindings } = attrs;
        const inline = bindings.presentation === "inline";
        const decorate = parts.sheet ? controlFlag(bindings.swipeToDismiss ?? bindings["swipe-to-dismiss"]) : true;
        const panelProps = parts.sheet ? { size, block: controlFlag(block) } : {
          showClose: showClose === undefined && showCloseKebab === undefined ? undefined : controlFlag(showClose ?? showCloseKebab),
          closeLabel: closeLabel ?? closeLabelKebab,
        };
        return h(root, { ...bindings, ref: handle }, {
          default: (state: DialogRootSlotProps) => {
            const slotState = { ...state, close };
            const panel = () => h(parts.content, { ...panelProps, class: props.panelClass }, {
              default: () => [
                decorate && parts.decoration && h(parts.decoration),
                props.title && h(parts.title, null, () => props.title),
                props.description && h(parts.description, null, () => props.description),
                slots.body?.(slotState),
              ],
              ...(slots.actions ? { actions: () => slots.actions?.(slotState) } : {}),
              ...(slots["footer-leading"] ? { "footer-leading": () => slots["footer-leading"]?.(slotState) } : {}),
            });
            return [
              !inline && (slots.trigger || props.triggerLabel) && h(parts.trigger, { asChild: true }, () =>
                slots.trigger?.(slotState) ?? h(UIButton, { variant: "outline" }, () => props.triggerLabel)),
              inline ? panel() : h(parts.portal, null, () => [parts.overlay && h(parts.overlay), panel()]),
            ];
          },
        });
      };
    },
  }) as unknown as PanelComponent<Props>;
}

const drawerParts = { trigger: DrawerTrigger, portal: DrawerPortal, overlay: DrawerOverlay, title: DrawerTitle, description: DrawerDescription };

export const UIDialog = withPanelComposition<DialogRootProps & ClosablePanel>(DialogRoot, {
  trigger: DialogTrigger, portal: DialogPortal, overlay: DialogOverlay, content: UIDialogContent,
  title: DialogTitle, description: DialogDescription,
});
export const UIAlertDialog = withPanelComposition<AlertDialogRootProps>(AlertDialogRoot, {
  trigger: AlertDialogTrigger, portal: AlertDialogPortal, overlay: AlertDialogOverlay, content: UIAlertDialogContent,
  title: AlertDialogTitle, description: AlertDialogDescription,
});
export const UIDrawer = withPanelComposition<DrawerRootProps & ClosablePanel>(DrawerRoot, { ...drawerParts, content: UIDrawerContent });
export const UISheet = withPanelComposition<DrawerRootProps & { size?: "sm" | "md" | "lg"; block?: boolean }>(DrawerRoot, {
  ...drawerParts, content: UISheetContent, decoration: DrawerHandle, sheet: true,
});
export const UIPopover: PanelComponent<PopoverRootProps> = withPanelComposition(PopoverRoot, {
  trigger: PopoverTrigger, portal: PopoverPortal, content: PopoverContent, decoration: PopoverArrow,
  title: PopoverTitle, description: PopoverDescription,
});
