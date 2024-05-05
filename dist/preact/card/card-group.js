import { jsx as _jsx } from "preact/jsx-runtime";
import { memo, useMergedProps } from "preact-prop-helpers/preact";
import { forwardElementRef } from "../utility/forward-element-ref.js";
export const CardGroup = memo(forwardElementRef(function CardGroup(props, ref) {
    return (_jsx("div", { ...useMergedProps(props, { ref, className: "card-group" }) }));
}));
//# sourceMappingURL=card-group.js.map