import { h, Ref } from "preact";
import { GlobalAttributes } from "../utility/types.js";
export interface InputGroupProps extends Pick<h.JSX.HTMLAttributes<HTMLDivElement>, "children" | "style" | "class" | "className"> {
    wrap?: boolean;
    size?: "sm" | "md" | "lg";
}
export declare const InputGroup: ({ wrap, size, children, ...props }: InputGroupProps, ref?: Ref<HTMLDivElement>) => import("preact").JSX.Element;
export declare const InputGroupText: (props: GlobalAttributes<HTMLDivElement, "children">, ref: Ref<HTMLDivElement>) => import("preact").JSX.Element;
//# sourceMappingURL=index.d.ts.map