import { Ref } from "preact-prop-helpers";
import { OmitStrong } from "../utility/types.js";
import { IconProps } from "./icon-base.js";
export interface FontIconProps extends OmitStrong<IconProps<HTMLElement>, "children"> {
}
/**
 * Generic way to represent any icon that's based on a font using some specific class to choose which icon to display.
 *
 *
 */
export declare const FontIcon: (props: FontIconProps, ref: Ref<HTMLElement>) => any;
//# sourceMappingURL=font-icon.d.ts.map