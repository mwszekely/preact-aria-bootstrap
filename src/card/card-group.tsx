import { Ref, memo, useMergedProps } from "preact-prop-helpers/preact";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";

export const CardGroup = memo(forwardElementRef(function CardGroup(props: GlobalAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps(props, { ref, className: "card-group" })} />
    )
}));
