import { Ref, memo } from "preact-prop-helpers/preact";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { OmitStrong } from "../utility/types.js";
import { Icon, IconProps } from "./icon-base.js";

export interface FontIconProps extends OmitStrong<IconProps<HTMLElement>, "children"> {

}

/**
 * Generic way to represent any icon that's based on a font using some specific class to choose which icon to display.
 * 
 * 
 */
export const FontIcon = memo(forwardElementRef(function FontIcon(props: FontIconProps, ref: Ref<HTMLElement>) {
    return (<Icon {...props} ref={ref}><i className="font-icon" /></Icon>);
}));
