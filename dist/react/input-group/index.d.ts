import { JSX, Ref } from "preact-prop-helpers";
import { GlobalAttributes } from "../utility/types.js";
export interface InputGroupProps extends Pick<JSX.HTMLAttributes<HTMLDivElement>, "children" | "style" | "class" | "className"> {
    wrap?: boolean;
    size?: "sm" | "md" | "lg";
}
export declare const InputGroup: ({ wrap, size, children, ...props }: InputGroupProps, ref?: Ref<HTMLDivElement>) => any;
export declare const InputGroupText: (props: GlobalAttributes<HTMLDivElement, "children">, ref: Ref<HTMLDivElement>) => any;
//# sourceMappingURL=index.d.ts.map