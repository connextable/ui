import { withClearableModel, type ClearableComponent } from "../clear/with-clearable";
import { CascadeSelectComposition } from "./cascade-composition";

export const UICascadeSelect: ClearableComponent<typeof CascadeSelectComposition> = withClearableModel(CascadeSelectComposition, null);

export {
  CascadeSelectValue as UICascadeSelectValue,
  CascadeSelectContent as UICascadeSelectContent,
  CascadeSelectColumn as UICascadeSelectColumn,
  CascadeSelectItem as UICascadeSelectItem,
  CascadeSelectItemIndicator as UICascadeSelectItemIndicator,
  CascadeSelectItemChevron as UICascadeSelectItemChevron,
} from "@sectile/vue/cascade-select";
export { default as UICascadeSelectTrigger } from "./UICascadeSelectTrigger.vue";
