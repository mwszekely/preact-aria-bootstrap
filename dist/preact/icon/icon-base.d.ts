import { h, Ref, VNode } from "preact";
export interface IconProps<E extends Element> extends Omit<h.JSX.HTMLAttributes<E>, "label" | "children"> {
    /**
     * All icons must either have an accessible label, or
     * explicitly declare that they do not have a label (and are implicitly presentation-only).
     */
    label: string | null;
    /**
     * Some icons, like a "help" icon, are actually interactive components that
     * are used to display help in a tooltip. If a tooltip is provided, then this
     * icon will become focusable for keyboard users (besides also, well, having a tooltip).
     */
    children: VNode<any>;
}
export declare const Icon: <E extends Element>({ label, role, "aria-label": ariaLabel, children, ref: unused, ...props }: IconProps<E>, ref: Ref<HTMLElement>) => VNode<any>;
//# sourceMappingURL=icon-base.d.ts.map