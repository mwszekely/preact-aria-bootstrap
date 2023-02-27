import { jsx as _jsx } from "preact/jsx-runtime";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
export const CardGroup = memo(forwardElementRef(function CardGroup(props, ref) {
    return (_jsx("div", { ...useMergedProps(props, { ref, className: "card-group" }) }));
}));
//# sourceMappingURL=card-group.js.map