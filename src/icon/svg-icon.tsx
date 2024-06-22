import { Ref, memo } from "preact-prop-helpers";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { Icon, IconProps } from "./icon-base.js";


export interface SvgIconProps extends Omit<IconProps<SVGSVGElement>, "children"> { }

export const SvgIcon = /* @__PURE__ */ memo(forwardElementRef(function SvgIcon(props: SvgIconProps, ref: Ref<SVGSVGElement>) {
    return (<Icon {...props} ref={ref}><svg className="svg-icon" /></Icon>);
}));
