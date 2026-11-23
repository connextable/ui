import type {
  ReorderInteractionChange, ReorderInteractionSnapshot, TreeReorderTarget,
} from "@sectile/vue/reorder";
import { computed, provide, shallowRef, watch, type InjectionKey, type Ref } from "vue";

export type UIReorderInteraction<ID extends string> = ReorderInteractionSnapshot<ID> & {
  readonly sourceIDs?: readonly ID[];
};

export type UIReorderInteractionChange<ID extends string> = Omit<ReorderInteractionChange<ID>, "interaction"> & {
  readonly interaction: UIReorderInteraction<ID>;
};

type SelectionContext = {
  selectable(id: string): boolean;
  selected(id: string): boolean;
  toggle(id: string): void;
  register(id: string, disabled: () => boolean): () => void;
};

export const reorderSelectionKey: InjectionKey<SelectionContext> = Symbol("reorder selection");

interface ReorderSelection<ID extends string, Order> {
  readonly order: Readonly<Ref<Order>>;
  update(next: Order): void;
  change(event: ReorderInteractionChange<ID>): void;
  interaction(snapshot: ReorderInteractionSnapshot<ID>): UIReorderInteraction<ID>;
  preview(): Order | undefined;
  moveSingle<Result>(move: () => Result): Result;
}

export function useReorderSelection<ID extends string, Order>(options: {
  multiple: () => boolean;
  locked: () => boolean;
  controlled: () => boolean;
  order: () => Order;
  selected: Ref<readonly ID[]>;
  orderedSources: (order: Order, selected: ReadonlySet<ID>) => readonly ID[];
  move: (order: Order, ids: readonly ID[], target: TreeReorderTarget<ID>) => Order | undefined;
  update: (order: Order) => void;
  onInteraction: (change: UIReorderInteractionChange<ID>) => void;
}): ReorderSelection<ID, Order> {
  const order = shallowRef(options.order());
  watch(options.order, value => { order.value = value; });
  const selected = computed(() => new Set<string>(options.selected.value));
  const registered = new Map<string, () => boolean>();
  const batch = shallowRef<{ sourceID: ID; ids: readonly ID[]; initial: Order }>();
  let proposal: Order | undefined;
  let destination: TreeReorderTarget<ID> | null = null;
  let applied = false;
  let imperative = false;

  function selectable(id: string) {
    return options.multiple() && !options.locked() && registered.get(id)?.() !== true;
  }

  provide(reorderSelectionKey, {
    selectable,
    selected: id => options.multiple() && selected.value.has(id),
    toggle: id => {
      if (!selectable(id) || !registered.has(id)) return;
      const value = id as ID;
      options.selected.value = selected.value.has(id)
        ? options.selected.value.filter(entry => entry !== value)
        : [...options.selected.value, value];
    },
    register: (id, disabled) => {
      registered.set(id, disabled);
      return () => { if (registered.get(id) === disabled) registered.delete(id); };
    },
  });

  function publish(next: Order) {
    if (!options.controlled()) order.value = next;
    if (!imperative) applied = !options.controlled();
    options.update(next);
  }

  function update(next: Order) {
    // Sectile proposes the primary item first. Publish the batch once at commit.
    if (!batch.value || imperative) publish(next);
  }

  function project(session: NonNullable<typeof batch.value>, snapshot: ReorderInteractionSnapshot<ID>) {
    if (!snapshot.allowed || !snapshot.target || order.value !== session.initial
      || ![session.sourceID, ...session.ids].every(selectable)) return;
    return options.move(session.initial, session.ids, snapshot.target);
  }

  function interaction(snapshot: ReorderInteractionSnapshot<ID>): UIReorderInteraction<ID> {
    const session = batch.value;
    return session && session.sourceID === snapshot.sourceID
      ? { ...snapshot, sourceIDs: session.ids, allowed: snapshot.allowed && proposal !== undefined }
      : snapshot;
  }

  function change(event: ReorderInteractionChange<ID>) {
    const { type, interaction: snapshot } = event;
    const sourceID = snapshot.sourceID;
    if (type === "start") {
      batch.value = undefined;
      destination = null;
      proposal = undefined;
      applied = false;
      if (sourceID !== null && selected.value.has(sourceID) && selectable(sourceID)) {
        const ids = options.orderedSources(order.value, new Set(options.selected.value.filter(selectable)));
        if (ids.length > 1 || (ids.length === 1 && ids[0] !== sourceID)) {
          batch.value = { sourceID, ids, initial: order.value };
        }
      }
    }

    const session = batch.value;
    if (session && type === "preview") {
      const target = snapshot.target;
      // Pointer-only updates keep the same destination and projected order.
      if (!snapshot.allowed || target?.parentID !== destination?.parentID || target?.beforeID !== destination?.beforeID) {
        proposal = project(session, snapshot);
        destination = snapshot.allowed ? target : null;
      }
    }
    if (session && type === "commit") {
      proposal = project(session, snapshot);
      if (proposal !== undefined && proposal !== session.initial) publish(proposal);
    }

    const state = interaction(snapshot);
    if (type === "commit" && session && proposal === undefined) {
      options.onInteraction({ type: "cancel", interaction: state });
    } else {
      options.onInteraction({
        ...event,
        interaction: state,
        ...(type === "commit" && options.multiple() ? { accepted: applied } : {}),
      });
    }
    if (type === "end") {
      batch.value = undefined;
      destination = null;
      proposal = undefined;
    }
  }

  return {
    order,
    update,
    change,
    interaction,
    preview: () => batch.value ? proposal ?? order.value : undefined,
    moveSingle<Result>(move: () => Result) {
      const previous = imperative;
      imperative = true;
      try { return move(); }
      finally { imperative = previous; }
    },
  };
}
