import { Pause, Play, RotateCcw } from "@lucide/vue";
import { MeterIndicator, MeterRoot, MeterTrack, MeterValueText, type MeterRootSlotProps } from "@sectile/vue/meter";
import {
  MeterGroupIndicator, MeterGroupItem, MeterGroupItemIndicator, MeterGroupItemLabel, MeterGroupItemValue,
  MeterGroupList, MeterGroupRoot, MeterGroupSegment, MeterGroupTrack, MeterGroupValueText, type MeterGroupRootSlotProps,
} from "@sectile/vue/meter-group";
import { TimerActionTrigger, TimerArea, TimerControl, TimerItem, TimerRoot, TimerSeparator, type TimerSlotProps } from "@sectile/vue/timer";
import { defineComponent, h, type Component, type VNodeChild } from "vue";
import { controlFlag } from "../clear/clearable";

function withStatusContent<Root extends Component, State>(
  root: Root,
  render: (state: State, attrs: Record<string, unknown>) => VNodeChild,
): Root {
  return defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () => h(root as Component, attrs, slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])
        ? slots
        : { default: (state: State) => render(state, attrs) });
    },
  }) as unknown as Root;
}

export const UIMeter = withStatusContent(MeterRoot, (state: MeterRootSlotProps, attrs) => {
  const format = (attrs.formatValue ?? attrs["format-value"]) as ((value: string) => string) | undefined;
  return [
    h("div", { class: "ui-meter__heading" }, [attrs.label ? h("span", String(attrs.label)) : null, h(MeterValueText)]),
    h(MeterTrack, null, () => h(MeterIndicator)),
    h("div", { class: "ui-meter__scale", "aria-hidden": "true" }, [
      h("span", format?.(state.min) ?? state.min),
      h("span", format?.(state.max) ?? state.max),
    ]),
  ];
});

export const UIMeterGroup = withStatusContent(MeterGroupRoot, (state: MeterGroupRootSlotProps, attrs) => [
  h("div", { class: "ui-meter__heading" }, [attrs.label ? h("span", String(attrs.label)) : null, h(MeterGroupValueText)]),
  h(MeterGroupTrack, null, () => state.segments.map(({ id }) =>
    h(MeterGroupSegment, { key: id, id }, () => h(MeterGroupIndicator)))),
  h(MeterGroupList, null, () => state.segments.map(({ id }) =>
    h(MeterGroupItem, { key: id, id }, () => [h(MeterGroupItemIndicator), h(MeterGroupItemLabel), h(MeterGroupItemValue)]))),
]);

export const UITimer = withStatusContent(TimerRoot, (state: TimerSlotProps, attrs) => {
  const startMs = Number(attrs.startMs ?? attrs["start-ms"] ?? 0);
  const atStart = state.valueMs === startMs;
  const [action, label, icon] = state.running ? ["pause", "일시 정지", Pause] as const
    : state.completed ? ["restart", "다시 시작", Play] as const
      : atStart ? ["start", "시작", Play] as const : ["resume", "계속", Play] as const;
  return [
    h(TimerArea, null, () => [
      state.parts.hours > 0 && h(TimerItem, { type: "hours" }),
      state.parts.hours > 0 && h(TimerSeparator, null, () => ":"),
      h(TimerItem, { type: "minutes" }),
      h(TimerSeparator, null, () => ":"),
      h(TimerItem, { type: "seconds" }),
    ]),
    h(TimerControl, null, () => [
      h(TimerActionTrigger, { action }, () => [h(icon, { size: 16, "aria-hidden": "true" }), label]),
      h(TimerActionTrigger, { action: "reset", disabled: atStart && !state.running && !state.completed }, () => [
        h(RotateCcw, { size: 16, "aria-hidden": "true" }), "초기화",
      ]),
    ]),
  ];
});
