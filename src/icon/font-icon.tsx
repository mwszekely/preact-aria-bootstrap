import { cloneElement, ComponentChild, h, Ref, VNode } from "preact";
import { useMergedProps, useMergedRefs } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility";
import { Icon, IconProps } from "./icon-base";

export interface FontIconProps extends Omit<IconProps<HTMLElement>, "children"> {

}

/**
 * Generic way to represent any icon that's based on a font using some specific class to choose which icon to display.
 * 
 * 
 */
export const FontIcon = memo(forwardElementRef(function FontIcon(props: FontIconProps, ref: Ref<HTMLElement>) {
    return (<Icon {...props} ref={ref}><i class="font-icon" /></Icon>);
}));
