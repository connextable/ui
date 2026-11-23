import type { InjectionKey, Ref } from "vue";

export const playgroundPrimaryExampleKey: InjectionKey<{
  id: Readonly<Ref<string | undefined>>;
  readonly visualStates: boolean;
  register: (id: string) => () => void;
}> = Symbol("PlaygroundPrimaryExample");
