import type { InjectionKey, Ref } from "vue";

export const playgroundHeadingLevelKey: InjectionKey<Readonly<Ref<number>>> = Symbol("PlaygroundHeadingLevel");
