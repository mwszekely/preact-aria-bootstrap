import { JSX, Ref } from "preact-prop-helpers/preact";
import { GlobalAttributes } from "../utility/types.js";
export interface InputGroupProps extends Pick<JSX.HTMLAttributes<HTMLDivElement>, "children" | "style" | "class" | "className"> {
    wrap?: boolean;
    size?: "sm" | "md" | "lg";
}
export declare const InputGroup: ({ wrap, size, children, ...props }: InputGroupProps, ref?: Ref<HTMLDivElement>) => JSX.Element;
export declare const InputGroupText: (props: GlobalAttributes<HTMLDivElement, "children">, ref: Ref<HTMLDivElement>) => JSX.Element;
//# sourceMappingURL=index.d.ts.map