import { Ref } from "preact-prop-helpers";
import { GlobalAttributes } from "../utility/types.js";
export interface StructureRadioWrapperProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    pending: boolean;
    inline: boolean;
    labelPosition: "before" | "after" | "hidden" | "tooltip";
}
export declare const StructureRadioWrapper: ({ labelPosition, pending, inline, children, ...props }: StructureRadioWrapperProps, ref: Ref<HTMLSpanElement>) => import("preact-prop-helpers").JSX.Element;
//# sourceMappingURL=structure.d.ts.map