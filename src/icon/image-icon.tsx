import { Ref } from "preact";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref";
import { Icon, IconProps } from "./icon-base";


export interface ImageIconProps extends Omit<IconProps<HTMLImageElement>, "children"> {

}

export const ImageIcon = memo(forwardElementRef(function ImageIcon(props: ImageIconProps, ref: Ref<HTMLImageElement>) {
    return (<Icon {...props} ref={ref}><img class="image-icon" /></Icon>);
}));
