import type { TabularBulkSelectionState, TabularQuery, TabularRowSelection } from "@sectile/tabular";
import { rowSelectionContains } from "@sectile/tabular/data-table";
import type { DataTreeGridBulkSelectionControlProps, DataTreeGridController } from "@sectile/vue/data-tree-grid";
import { Primitive, type PrimitiveAs } from "@sectile/vue/primitive";
import { computed, defineComponent, h, mergeProps, onBeforeUnmount, onMounted, shallowRef, watch, type PropType } from "vue";
import UICheckboxBox from "../selection/UICheckboxBox.vue";

export interface UIDataTreeGridGroupLeavesRequest {
  readonly groupID: string;
  readonly query: TabularQuery;
  readonly queryRevision: number;
  readonly sourceGeneration: number;
}

export interface UIDataTreeGridComponentOptions {
  /** Return the distinct leaf IDs for this group and query, including collapsed and off-page rows. */
  readonly loadGroupLeafIDs?: (
    request: UIDataTreeGridGroupLeavesRequest,
    context: { readonly signal: AbortSignal },
  ) => readonly string[] | PromiseLike<readonly string[]>;
  readonly onGroupSelectionError?: (error: unknown, request: UIDataTreeGridGroupLeavesRequest) => void;
}

type GroupTarget = Extract<DataTreeGridBulkSelectionControlProps["target"], { kind: "group-leaves" }>;
type Controller = Pick<DataTreeGridController, "snapshot" | "getSnapshot" | "dispatch">;
type Loader = NonNullable<UIDataTreeGridComponentOptions["loadGroupLeafIDs"]>;

function groupState(ids: readonly string[], selection: TabularRowSelection): TabularBulkSelectionState {
  let selected = 0;
  for (const id of ids) if (rowSelectionContains(selection, id)) selected++;
  if (selected === 0) return "unchecked";
  return selected === ids.length ? "checked" : "indeterminate";
}

function changeGroup(ids: readonly string[], selection: TabularRowSelection, selected: boolean): TabularRowSelection {
  const explicit = selection.kind === "explicit-rows";
  const exceptions = new Set(explicit ? selection.rowIDs : selection.excludedRowIDs);
  for (const id of ids) {
    if (selected === explicit) exceptions.add(id);
    else exceptions.delete(id);
  }
  return explicit ? { kind: "explicit-rows", rowIDs: [...exceptions] } : { ...selection, excludedRowIDs: [...exceptions] };
}

export function createGroupSelectionControl(controller: Controller, load: Loader, onError: UIDataTreeGridComponentOptions["onGroupSelectionError"]) {
  return defineComponent({
    name: "UIDataTreeGridGroupSelectionControl",
    inheritAttrs: false,
    props: {
      target: { type: Object as PropType<GroupTarget>, required: true },
      disabled: Boolean,
      as: { type: [String, Object, Function] as PropType<PrimitiveAs>, default: "button" },
      asChild: Boolean,
    },
    setup(props, { attrs, slots }) {
      const snapshot = controller.snapshot;
      const tabular = computed(() => snapshot.value.tabular.state);
      const view = computed(() => {
        const accepted = tabular.value.acceptedViewState;
        return accepted.kind === "current" ? accepted.view : undefined;
      });
      const groupID = computed(() => props.target.groupID);
      const ids = shallowRef<readonly string[]>();
      const active = shallowRef<AbortController>();
      const failed = shallowRef(false);
      const mounted = shallowRef(false);
      const element = shallowRef<HTMLElement>();
      const state = computed(() => ids.value ? groupState(ids.value, tabular.value.rowSelection) : "unchecked");
      const hasSelection = computed(() => {
        const selection = tabular.value.rowSelection;
        return selection.kind === "all-matching" || selection.rowIDs.length > 0;
      });
      const disabled = computed(() => props.disabled || ids.value?.length === 0);
      const loading = computed(() => Boolean(active.value) || (
        view.value !== undefined && hasSelection.value && ids.value === undefined && !disabled.value && !failed.value
      ));

      function clear() {
        active.value?.abort();
        active.value = undefined;
        ids.value = undefined;
        failed.value = false;
      }

      async function resolve(toggle: boolean) {
        const currentView = view.value;
        if (!currentView || disabled.value || active.value) return;
        const { sourceGeneration, query, queryRevision } = tabular.value;
        const request = { groupID: groupID.value, query, sourceGeneration, queryRevision };
        const abort = new AbortController();
        const isCurrent = () => !abort.signal.aborted && view.value === currentView && groupID.value === request.groupID;
        try {
          failed.value = false;
          if (ids.value === undefined) {
            active.value = abort;
            const result = await load(request, { signal: abort.signal });
            if (!isCurrent()) return;
            ids.value = [...new Set(result)];
          }
          if (!toggle || props.disabled || !ids.value.length) return;
          // Row toggles may have changed the selection while the membership request was pending.
          const latest = controller.getSnapshot().tabular.state.rowSelection;
          const selected = groupState(ids.value, latest) !== "checked";
          const result = controller.dispatch({ type: "set-row-selection", selection: changeGroup(ids.value, latest, selected) });
          if (!result.ok) throw result.error;
        } catch (error) {
          if (!isCurrent()) return;
          failed.value = true;
          onError?.(error, request);
        } finally {
          if (active.value === abort) active.value = undefined;
        }
      }

      watch([view, groupID], clear, { flush: "sync" });
      watch([mounted, view, groupID, hasSelection, () => props.disabled], () => {
        if (mounted.value && hasSelection.value && !ids.value && !failed.value) void resolve(false);
      });
      onMounted(() => { mounted.value = true; });
      onBeforeUnmount(clear);

      function activate(event: Event) {
        if (event.defaultPrevented) return;
        event.preventDefault();
        void resolve(true);
      }

      return () => {
        const tag = !props.asChild && typeof props.as === "string" ? props.as : element.value?.tagName.toLowerCase();
        const native = tag === "button" || tag === "input";
        const selectionState = state.value;
        const control = (styled: boolean) => h(Primitive, mergeProps(attrs, {
          as: props.as,
          asChild: props.asChild,
          elementRef: (value: HTMLElement | null) => { element.value = value ?? undefined; },
          class: styled ? "ui-checkbox__control" : undefined,
          "data-scope": "data-tree-grid",
          "data-part": "bulk-selection-control",
          "data-state": selectionState,
          "data-error": failed.value ? "" : undefined,
          role: "checkbox",
          "aria-checked": selectionState === "indeterminate" ? "mixed" : String(selectionState === "checked"),
          "aria-disabled": String(disabled.value || !view.value || loading.value),
          "aria-busy": loading.value ? "true" : undefined,
          "aria-description": failed.value ? "그룹 선택을 처리하지 못했습니다. 다시 시도할 수 있습니다." : attrs["aria-description"],
          ...(tag === "input" ? { type: "checkbox", checked: selectionState === "checked", indeterminate: selectionState === "indeterminate" }
            : tag === "button" ? { type: "button" } : {}),
          ...(native ? { disabled: disabled.value } : { tabindex: disabled.value ? -1 : 0 }),
          onClick: activate,
          onKeydown: (event: KeyboardEvent) => {
            if (!native && event.key === " " && !event.repeat && !event.isComposing && !event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey) activate(event);
          },
        }), slots.default ? {
          default: () => {
            const current = tabular.value;
            return slots.default?.({
              controller,
              snapshot: snapshot.value,
              acceptedViewState: current.acceptedViewState,
              requestState: current.requestState,
              query: current.query,
              rowSelection: current.rowSelection,
              columnState: current.columnState,
              accessState: current.accessState,
              expansion: current.expansion,
              cursor: snapshot.value.cursor,
              editState: snapshot.value.edit,
              rows: current.acceptedViewState.kind === "none" ? [] : current.acceptedViewState.view.rows,
            });
          },
        } : undefined);
        if (props.asChild || props.as !== "button" || slots.default) return control(false);
        return h(UICheckboxBox, null, { control: () => control(true) });
      };
    },
  });
}
