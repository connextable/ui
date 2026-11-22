import { CascadeSelectRoot } from "@sectile/vue/cascade-select";
import { withClearableModel, type ClearableComponent } from "../clear/with-clearable";

export const UICascadeSelect: ClearableComponent<typeof CascadeSelectRoot> = withClearableModel(CascadeSelectRoot, null);

export {
  CascadeSelectValue as UICascadeSelectValue,
  CascadeSelectContent as UICascadeSelectContent,
  CascadeSelectColumn as UICascadeSelectColumn,
  CascadeSelectItem as UICascadeSelectItem,
  CascadeSelectItemIndicator as UICascadeSelectItemIndicator,
  CascadeSelectItemChevron as UICascadeSelectItemChevron,
} from "@sectile/vue/cascade-select";
export { default as UICascadeSelectTrigger } from "./UICascadeSelectTrigger.vue";
