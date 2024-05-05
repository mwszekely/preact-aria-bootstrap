import { ComponentChildren, Ref, VNode } from "preact-prop-helpers/preact";
import { GlobalAttributes } from "../utility/types.js";
export interface FigureProps extends Omit<GlobalAttributes<HTMLElement>, "children"> {
    caption: ComponentChildren;
    align?: "start" | "end" | "center";
    children: VNode;
}
export declare const Figure: ({ children, caption, align, ...props }: FigureProps, ref: Ref<HTMLElement>) => any;
//# sourceMappingURL=figure.d.ts.map