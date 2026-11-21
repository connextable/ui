import type { InjectionKey, Ref } from "vue";

export interface PlaygroundVisualExample {
  id: string;
  title: string;
  description?: string;
}

export const playgroundVisualStatesKey: InjectionKey<{
  activeId: Readonly<Ref<string | null>>;
  target: Readonly<Ref<HTMLElement | null>>;
  register: (example: PlaygroundVisualExample) => () => void;
}> = Symbol("PlaygroundVisualStates");
