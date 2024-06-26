import { Ref, memo } from "preact-prop-helpers";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { Icon, IconProps } from "./icon-base.js";


export interface ImageIconProps extends Omit<IconProps<HTMLImageElement>, "children"> { }

export const ImageIcon = /* @__PURE__ */ memo(forwardElementRef(function ImageIcon(props: ImageIconProps, ref: Ref<HTMLImageElement>) {
    return (<Icon {...props} ref={ref}><img className="image-icon" /></Icon>);
}));
