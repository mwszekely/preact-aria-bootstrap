import { Ref } from "preact";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { Icon, IconProps } from "./icon-base.js";


export interface SvgIconProps extends Omit<IconProps<SVGSVGElement>, "children"> { }

export const SvgIcon = memo(forwardElementRef(function SvgIcon(props: SvgIconProps, ref: Ref<SVGSVGElement>) {
    return (<Icon {...props} ref={ref}><svg class="svg-icon" /></Icon>);
}));
