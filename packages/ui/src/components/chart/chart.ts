import { ChartRoot, createChartComponents, type ChartRootProps, type ChartRootPublicProps, type ChartRootSlotProps } from "@sectile/vue/chart";
import { defineComponent, h, onBeforeUnmount, onMounted, shallowRef, unref, watch, type Component, type PropType, type ShallowRef, type VNodeChild } from "vue";
import { createUIChartRenderer, type ChartGrid, type ChartTickFormatter } from "./chart-renderer";
import type { ChartCandlestickLayers } from "./chart-candlesticks";
import UIChartLegend from "./UIChartLegend.vue";
import UIChartPlot from "./UIChartPlot.vue";
import UIChartTooltip from "./UIChartTooltip.vue";
import type { ChartTooltipDatum, ChartTooltipGroup } from "./chart-tooltip";

type ChartDOM = ChartRootProps["dom"];
type ChartInstance = InstanceType<typeof ChartRoot>;
interface ChartAppearanceProps {
  readonly fill?: "area";
  readonly candlesticks?: ChartCandlestickLayers;
  readonly animateUpdates?: boolean;
  readonly grid?: ChartGrid;
  readonly formatTick?: ChartTickFormatter;
  readonly tooltip?: boolean | "shared";
  readonly tooltipGroup?: ChartTooltipGroup;
}

interface UIChartComponent {
  new <ID extends string | number = string | number>(props: ChartRootPublicProps<ID> & ChartAppearanceProps): {
    $props: ChartRootPublicProps<ID> & ChartAppearanceProps;
    $slots: {
      default?: (scope: ChartRootSlotProps<ID>) => VNodeChild;
      tooltip?: (datum: ChartTooltipDatum<ID>) => VNodeChild;
    };
    readonly controller: ShallowRef<ChartRootSlotProps<ID>["controller"]>;
    getDeclarationDiagnostics: ChartInstance["getDeclarationDiagnostics"];
    refresh: ChartInstance["refresh"];
  };
}

function themedRoot(
  rootComponent: typeof ChartRoot,
  boundController?: Parameters<typeof createChartComponents>[0],
) {
  return defineComponent({
    name: "UIChart",
    inheritAttrs: false,
    props: {
      dom: Object as PropType<ChartDOM>,
      fill: String as PropType<ChartAppearanceProps["fill"]>,
      candlesticks: Object as PropType<ChartCandlestickLayers>,
      animateUpdates: Boolean,
      grid: { type: String as PropType<ChartGrid>, default: "auto" },
      formatTick: Function as PropType<ChartTickFormatter>,
      tooltip: { type: [Boolean, String] as PropType<ChartAppearanceProps["tooltip"]>, default: true },
      tooltipGroup: Function as PropType<ChartTooltipGroup>,
    },
    setup(props, { attrs, slots, expose }) {
      const root = shallowRef<(ChartInstance & { $el: HTMLElement }) | null>(null);
      const useTheme = props.dom?.renderer === undefined && props.dom?.renderStyle === undefined;
      const renderer = useTheme
        ? createUIChartRenderer(
          () => root.value?.$el.querySelector<HTMLCanvasElement>('canvas[data-scope="chart"][data-part="renderer"]') ?? null,
          () => props.fill === "area",
          () => (boundController ?? unref(root.value?.controller))?.getSnapshot().state,
          () => props.candlesticks,
          () => props.animateUpdates,
          () => props.grid,
          () => props.formatTick,
        )
        : undefined;

      expose({
        get controller() { return root.value?.controller ?? null; },
        getDeclarationDiagnostics: () => root.value?.getDeclarationDiagnostics?.(),
        refresh: () => root.value?.refresh?.(),
      });
      onMounted(() => {
        if (renderer?.getDiagnostics().liveResources === 0) root.value?.refresh?.();
      });
      watch(
        [() => props.fill, () => props.candlesticks, () => props.animateUpdates, () => props.grid, () => props.formatTick, () => props.tooltip],
        () => renderer?.refreshAppearance(),
        { flush: "post" },
      );
      onBeforeUnmount(() => renderer?.disconnect());

      return () => {
        const shared = props.tooltip === "shared";
        const chartSlots = props.tooltip ? {
          default: (scope: ChartRootSlotProps) => [
            ...(slots.default?.(scope) ?? []),
            h(UIChartTooltip, {
              scope,
              getLabel: props.dom?.getAccessibleDatumLabel,
              shared,
              groupValue: props.tooltipGroup,
            }, { default: slots.tooltip }),
          ],
        } : slots;
        return h(rootComponent as unknown as Component, {
          ...attrs,
          ref: root,
          dom: renderer ? {
            ...props.dom,
            renderer,
            onCommand: (command: Parameters<typeof renderer.handleCommand>[0]) => {
              renderer.handleCommand(command);
              props.dom?.onCommand?.(command);
            },
          } : props.dom,
          "data-ui-chart-themed": renderer ? "" : undefined,
          "data-ui-chart-shared-tooltip": shared ? "" : undefined,
        }, chartSlots);
      };
    },
  }) as unknown as UIChartComponent;
}

export const UIChart = themedRoot(ChartRoot);

const themedSuites = new WeakMap<object, object>();

export function createUIChartComponents<ID extends string | number>(controller: Parameters<typeof createChartComponents<ID>>[0]) {
  const suite = createChartComponents(controller);
  const buildSuite = () => Object.freeze({
    ...suite,
    Root: themedRoot(suite.Root as typeof ChartRoot, controller),
    Plot: UIChartPlot,
    Legend: UIChartLegend,
  });
  const cached = themedSuites.get(suite) as ReturnType<typeof buildSuite> | undefined;
  if (cached) return cached;
  const themed = buildSuite();
  themedSuites.set(suite, themed);
  return themed;
}
