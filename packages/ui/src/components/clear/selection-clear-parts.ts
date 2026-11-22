import { FileInputClear } from "@sectile/vue/form/file-input";
import { TagsInputClear } from "@sectile/vue/tags-input";
import { withClearButton } from "./clear-button-part";

export const UIFileInputClear: typeof FileInputClear = withClearButton(FileInputClear, "파일 모두 지우기");
export const UITagsInputClear: typeof TagsInputClear = withClearButton(TagsInputClear, "태그 모두 지우기");
