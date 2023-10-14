import { Ref } from "preact";
import { GlobalAttributes } from "../utility/types.js";
export interface StructureRadioWrapperProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    pending: boolean;
    inline: boolean;
    labelPosition: "before" | "after" | "hidden" | "tooltip";
}
export declare const StructureRadioWrapper: ({ labelPosition, pending, inline, children, ...props }: StructureRadioWrapperProps, ref: Ref<HTMLSpanElement>) => import("preact").JSX.Element;
//# sourceMappingURL=structure.d.ts.map