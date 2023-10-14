import { Alignment, Placement, Side } from "@floating-ui/dom";
import { h } from "preact";
import { ElementProps } from "preact-prop-helpers";
export interface UsePopperProps<SourceElement extends Element> {
    popperParameters: {
        placement: Placement;
        absolutePositioning?: boolean;
        open: boolean;
        /**
         * When `alignMode` is `"mouse"`, this can be used to freeze the mouse tracking in place.
         *
         * For example, tooltips track while open on the trigger, but stop tracking when open on the tooltip.
         */
        /**
         * * `"mouse"`: The popper will follow the mouse cursor, within the bounds of the element.
         * * `"center"`: The popper will be centered on the element.
         */
        alignMode: "mouse" | "element";
        getElement?: (e: SourceElement) => HTMLElement;
    };
}
export interface UsePopperReturnType<SourceElement extends Element, PopupElement extends HTMLElement, ArrowElement extends HTMLElement> {
    propsSource: ElementProps<SourceElement>;
    propsPopup: ElementProps<PopupElement>;
    propsArrow: ElementProps<ArrowElement>;
    propsData: h.JSX.HTMLAttributes<any>;
    popperReturn: {
        usedSide: Side | null;
        usedAlignment: Alignment | null;
        hidden: boolean;
    };
}
export declare function usePopper<SourceElement extends Element, PopupElement extends HTMLElement, ArrowElement extends HTMLElement>({ popperParameters: { open, getElement, alignMode, placement: requestedPlacement, absolutePositioning } }: UsePopperProps<SourceElement>): UsePopperReturnType<SourceElement, PopupElement, ArrowElement>;
//# sourceMappingURL=index.d.ts.map