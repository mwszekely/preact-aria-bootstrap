import { ComponentChildren, Ref, VNode } from "preact";
import { GlobalAttributes } from "../utility/types.js";
export interface FigureProps extends Omit<GlobalAttributes<HTMLElement>, "children"> {
    caption: ComponentChildren;
    align?: "start" | "end" | "center";
    children: VNode<any>;
}
export declare const Figure: ({ children, caption, align, ...props }: FigureProps, ref: Ref<HTMLElement>) => import("preact").JSX.Element;
//# sourceMappingURL=figure.d.ts.map