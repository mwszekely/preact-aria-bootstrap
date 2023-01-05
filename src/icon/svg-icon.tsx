import { cloneElement, ComponentChild, h, Ref, VNode } from "preact";
import { useMergedProps, useMergedRefs } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility";
import { Icon, IconProps } from "./icon-base";


export interface SvgIconProps extends Omit<IconProps<SVGSVGElement>, "children"> {

}

export const SvgIcon = memo(forwardElementRef(function SvgIcon(props: SvgIconProps, ref: Ref<SVGSVGElement>) {
    return (<Icon {...props} ref={ref}><svg class="svg-icon" /></Icon>);
}));
