import { ComponentChildren, Ref } from "preact";
import { UseMenuSurfaceReturnType } from "preact-aria-widgets";
import { ButtonProps } from "../button/index.js";
export interface PopoverProps {
    forceOpen?: boolean | null | undefined;
    label: ComponentChildren;
    disabled?: boolean;
    children: ComponentChildren;
    selectedIndex?: number | null;
    align?: "start" | "end";
    buttonVariantSize?: ButtonProps["variantSize"];
    buttonVariantFill?: ButtonProps["variantFill"];
    buttonVariantTheme?: ButtonProps["variantTheme"];
    buttonVariantDropdown?: ButtonProps["variantDropdown"];
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));
    header?: ComponentChildren;
    imperativeHandle?: Ref<UseMenuSurfaceReturnType<HTMLDivElement, HTMLDivElement, HTMLButtonElement>>;
}
export declare function Popover({ children, label, align, buttonVariantDropdown, buttonVariantFill, buttonVariantSize, buttonVariantTheme, disabled, forceOpen, imperativeHandle, header, onSelectedIndexChange, selectedIndex, ...props }: PopoverProps, ref?: Ref<HTMLButtonElement>): import("preact").JSX.Element;
//# sourceMappingURL=index.d.ts.map