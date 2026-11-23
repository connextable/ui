import { UIButton, createTableData } from "@connextable/ui";
import type { GlobalComponents } from "vue";

const rows = [{ id: "invoice", cells: { amount: 120 } }];
const data = createTableData({ rows, columns: [{ id: "amount", label: "Amount" }] });

// @ts-expect-error Column IDs are checked against the row model.
createTableData({ rows, columns: [{ id: "amout", label: "Amount" }] });

const button: GlobalComponents["AppButton"] = UIButton;

export { button, data };
