import { Ref } from "preact";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref";
import { OmitStrong } from "../utility/types";
import { Icon, IconProps } from "./icon-base";

export interface FontIconProps extends OmitStrong<IconProps<HTMLElement>, "children"> {

}

/**
 * Generic way to represent any icon that's based on a font using some specific class to choose which icon to display.
 * 
 * 
 */
export const FontIcon = memo(forwardElementRef(function FontIcon(props: FontIconProps, ref: Ref<HTMLElement>) {
    return (<Icon {...props} ref={ref}><i class="font-icon" /></Icon>);
}));
