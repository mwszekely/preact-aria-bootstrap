import { SelectedIndexChangeEvent } from "preact-prop-helpers";
import { GlobalAttributes } from "../utility/types.js";
export interface ListboxSingleProps {
    selectedIndex: number | null;
    staggered?: boolean;
    onSelectedIndexChange: (nextIndex: number | null, event: SelectedIndexChangeEvent) => void;
}
export interface ListboxSingleItemProps extends GlobalAttributes<HTMLLIElement> {
    index: number;
    disabled?: boolean;
}
/**
 * A listbox is a much simpler List.
 *
 * Unlike a List, there can't be any additional elements for each list item -- e.g. you can't have a "delete" button for each item in a listbox.
 *
 * @param param0
 * @returns
 */
//# sourceMappingURL=listbox-single.d.ts.map