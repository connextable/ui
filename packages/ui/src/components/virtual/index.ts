import { VirtualList, type VirtualListComponent } from "@sectile/vue/virtual/list";
import { VirtualGrid, type VirtualGridComponent } from "@sectile/vue/virtual/grid";
import { VirtualMasonry, type VirtualMasonryComponent } from "@sectile/vue/virtual/masonry";
import { VirtualSpatial, type VirtualSpatialComponent } from "@sectile/vue/virtual/spatial";

export const UIVirtualList: VirtualListComponent = VirtualList;
export const UIVirtualGrid: VirtualGridComponent = VirtualGrid;
export const UIVirtualMasonry: VirtualMasonryComponent = VirtualMasonry;
export const UIVirtualSpatial: VirtualSpatialComponent = VirtualSpatial;

export {
  VirtualizerRoot as UIVirtualizer,
  VirtualizerSurface as UIVirtualizerSurface,
  VirtualizerItem as UIVirtualizerItem,
  VirtualizerHeader as UIVirtualizerHeader,
  VirtualizerFooter as UIVirtualizerFooter,
  useVirtualizer as useUIVirtualizer,
} from "@sectile/vue/virtual/core";
export { createUniformExtentIndex } from "@sectile/virtual/extent-index";
export { createDenseTrackGridLayout, trackGridLayoutStrategy } from "@sectile/virtual/track-grid-layout";
