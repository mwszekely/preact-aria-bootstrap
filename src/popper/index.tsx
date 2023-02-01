import { Alignment, arrow, autoUpdate, computePosition, flip, hide, offset, Placement, shift, Side, size } from "@floating-ui/dom";
import { h } from "preact";
import { returnZero, useElementSize, useMergedProps, usePassiveState, useRefElement, useStableCallback, useStableGetter, useState } from "preact-prop-helpers";
import { identity, runImmediately } from "preact-prop-helpers/preact-extensions/use-passive-state";
import { CSSProperties } from "preact/compat";
import { useCallback, useEffect, useLayoutEffect, useRef } from "preact/hooks";

export interface UsePopperProps {
    popperParameters: {

        placement: Placement;

        absolutePositioning?: boolean;

        open: boolean;

        /**
         * When `alignMode` is `"mouse"`, this can be used to freeze the mouse tracking in place.
         * 
         * For example, tooltips track while open on the trigger, but stop tracking when open on the tooltip.
         */
        pauseMouseTracking?: boolean;

        /**
         * * `"mouse-start"`: The popper will follow the mouse cursor, within the bounds of the element, and will be start-aligned.
         * * `"mouse-center"`: The popper will follow the mouse cursor, within the bounds of the element, and will be center-aligned.
         * * `"center"`: The popper will be centered on the element.
         */
        alignMode: "mouse" | "element";

        getElement?: (e: HTMLElement) => HTMLElement;
    }
}

const Map1 = {
    "data-popup-source-x": "popupSourceX",
    "data-popup-source-y": "popupSourceY",
    "data-popup-arrow-x": "popupArrowX",
    "data-popup-arrow-y": "popupArrowY",
    "data-popup-arrow-static-side": "popupArrowStaticSide",
    "data-popup-arrow-static-alignment": "popupArrowStaticAlignment",
    "data-popup-arrow-static-side-value": "popupArrowStaticSideValue",
    "data-popup-escaped": "popupEscaped",
    "data-popup-reference-hidden": "popupReferenceHidden",
    "data-popup-shift-x": "popupShiftX",
    "data-popup-shift-y": "popupShiftY",
    "data-popup-offset-x": "popupOffsetX",
    "data-popup-offset-y": "popupOffsetY",
    "data-popper-placement": "popperPlacement"
}

function useFoo() {

}

export function usePopper<SourceElement extends Element, PopupElement extends HTMLElement, ArrowElement extends HTMLElement>({ popperParameters: { pauseMouseTracking, open, getElement, alignMode, placement: requestedPlacement, absolutePositioning } }: UsePopperProps) {
    //const [getSourceElement, setSourceElement] = usePassiveState<SourceElement | null, never>(null);
    //const [getPopupElement, setPopupElement] = usePassiveState<PopupElement | null, never>(null);
    //const [getArrowElement, setArrowElement] = usePassiveState<ArrowElement | null, never>(null);
    const [getMouseX, setMouseX] = usePassiveState(null, returnZero, runImmediately);
    const [getMouseY, setMouseY] = usePassiveState(null, returnZero, runImmediately);
    const cachedRects = useRef<DOMRectList | null>(null);
    const cachedRect = useRef<DOMRectReadOnly | null>(null);
    //const getPlacement = useStableGetter(placement);
    //const popperInstance = useRef<Instance | null>(null);

    getElement ??= identity;

    // For performance reasons, we update the element in realtime instead of re-rendering every single time the position changes.
    // To keep things in sync, we save those changes and re-apply them when we *do* re-render from some other source.
    const popupProps = useRef<{ [key in keyof typeof Map1]?: string | undefined }>({});
    const popupStyle = useRef<CSSProperties>({});
    const arrowStyle = useRef<CSSProperties>({});
    const lastUsedPlacement = useRef<Placement | null>(null);
    const hasOpenedAtLeastOnce = useRef(false);
    const { elementSizeReturn, refElementReturn } = useElementSize({
        elementSizeParameters: {
            getObserveBox: useCallback(() => { return "content-box" }, []),
            onSizeChange: useCallback((size) => {
                const element = refElementReturn.getElement();
                if (element) {
                    cachedRects.current = element.getClientRects();
                    cachedRect.current = element.getBoundingClientRect();
                }
            }, [])
        }, refElementParameters: {}
    })

    //autoUpdate()

    const handleUpdate = useStableCallback(async () => {
        if (open || hasOpenedAtLeastOnce.current) {
            hasOpenedAtLeastOnce.current = true;
            const sourceElement = getSourceElement();
            const popupElement = getPopupElement();
            const arrowElement = getArrowElement();
            if (sourceElement && popupElement && arrowElement) {
                const [staticSide2, staticAlignment2] = requestedPlacement.split('-') as [Side, Alignment?];
                // (staticAlignment2 == 'start' ? 1 : -1)
                const middleware = [
                    offset((alignMode == "mouse" && staticAlignment2) ? { crossAxis: (popupElement.clientWidth / 2) * (0.75) * 0 } : undefined),
                    shift({}),
                    arrow({ element: arrowElement, padding: 12 }),
                    flip({}),
                    size({
                        apply({ availableWidth, availableHeight }) {
                            popupElement.style.setProperty("--popup-max-width", popupStyle.current.maxWidth = `${availableWidth}px`);
                            popupElement.style.setProperty("--popup-max-height", popupStyle.current.maxHeight = `${availableHeight}px`);
                        },
                    }),
                    //autoPlacement({ }), 
                    hide({})
                ];
                // Returns a bounding rectangle that, while fitting the mouse cursor, is as small as possible.
                // Importantly, this ALSO accounts for wrapping text, and picks the closest box to the mouse to use.
                function getBoundingClientRect2(): DOMRectReadOnly {
                    if (alignMode == "element")
                        return (cachedRect.current ||= (getElement!((sourceElement || document.body) as HTMLElement).getBoundingClientRect()));

                    const usedPlacement = lastUsedPlacement.current || requestedPlacement;
                    let [staticSide, staticAlignment] = (usedPlacement?.split('-')) as [Side, Alignment?];

                    console.assert(!!sourceElement);
                    const rects = (cachedRects.current ||= ((sourceElement || document.body).getClientRects()));
                    //let indexOfClosest = Infinity;
                    let distanceToClosest = Infinity;
                    let closestRect = null as DOMRectReadOnly | null;
                    //let indexOfBoth = -1;
                    //let indexOfOne = -1;
                    //const results = new Array<DOMRectReadOnly>();
                    for (let i = 0; i < rects.length; ++i) {
                        const rect = rects[i];
                        const mouseX = getMouseX();
                        const mouseY = getMouseY();
                        let x0 = rect.x;
                        let y0 = rect.y;
                        let x1 = x0 + rect.width;
                        let y1 = y0 + rect.height;
                        //let width = rect.width;
                        //let height = rect.height;

                        // The mouse position within the element, or the closest edge to the mouse if it's outside the element.
                        let boundedMouseX = Math.min(x1, Math.max(x0, mouseX));
                        let boundedMouseY = Math.min(y1, Math.max(y0, mouseY));

                        const containedX = (mouseX >= x0 && mouseX <= x1);
                        const containedY = (mouseY >= y0 && mouseY <= y1);

                        if (staticSide == "top" || staticSide == "bottom") {
                            x0 = Math.max(boundedMouseX, x0);
                            x1 = Math.min(boundedMouseX, x1);
                        }
                        else {
                            y0 = Math.max(boundedMouseY, y0);
                            y1 = Math.min(boundedMouseY, y1);
                        }

                        let distanceToThisRect = (containedX && containedY ? -Infinity : distanceToDOMRect(mouseX, mouseY, rect));
                        if (distanceToThisRect < distanceToClosest) {
                            distanceToClosest = distanceToThisRect;
                            closestRect = new DOMRectReadOnly(x0, y0, x1 - x0, y1 - y0);
                        }


                    }

                    return closestRect ?? ((cachedRect.current ||= (sourceElement || document.body).getBoundingClientRect()));

                }
                const { middlewareData, placement: usedPlacement, strategy, x, y } = await computePosition({
                    getBoundingClientRect: getBoundingClientRect2,
                    contextElement: sourceElement
                },
                    popupElement,
                    {
                        middleware,
                        placement: requestedPlacement,
                        strategy: absolutePositioning ? "absolute" : "fixed"
                    });

                const [staticSide, staticAlignment] = usedPlacement.split('-') as [Side, Alignment?];
                lastUsedPlacement.current ||= staticSide;

                popupProps.current["data-popper-placement"] = staticSide || "";
                /*popupProps.current["data-popup-arrow-static-alignment"] = staticAlignment || "";
                popupProps.current["data-popup-escaped"] = middlewareData.hide?.escaped ? "true" : "";
                popupProps.current["data-popup-reference-hidden"] = middlewareData.hide?.referenceHidden ? "true" : "";*/

                popupElement.style.setProperty("--popup-source-x", popupStyle.current["--popup-source-x"] = x == null ? null : `${x}px`);
                popupElement.style.setProperty("--popup-source-y", popupStyle.current["--popup-source-y"] = y == null ? null : `${y}px`);
                popupElement.style.setProperty("--popup-shift-x", popupStyle.current["--popup-shift-x"] = middlewareData.shift?.x ? "true" : null);
                popupElement.style.setProperty("--popup-shift-y", popupStyle.current["--popup-shift-y"] = middlewareData.shift?.y ? "true" : null);
                popupElement.style.setProperty("--popup-offset-x", popupStyle.current["--popup-offset-x"] = middlewareData.offset?.x ? "true" : null);
                popupElement.style.setProperty("--popup-offset-y", popupStyle.current["--popup-offset-y"] = middlewareData.offset?.y ? "true" : null);
                arrowElement.style.setProperty("--popup-arrow-x", arrowStyle.current["--popup-arrow-x"] = middlewareData?.arrow?.x == null ? null : `${middlewareData.arrow.x}px`);
                arrowElement.style.setProperty("--popup-arrow-y", arrowStyle.current["--popup-arrow-y"] = middlewareData?.arrow?.y == null ? null : `${middlewareData.arrow.y}px`);
                //middlewareData.arrow?.centerOffset


                const elements = [popupElement, arrowElement, sourceElement];
                for (const element of elements) {
                    for (const propName in popupProps.current) {
                        const datasetName = Map1[propName as keyof typeof Map1];
                        if (datasetName)
                            (element as HTMLElement).dataset[datasetName] = popupProps.current[propName as never];
                    }
                }
            }
        }
    });

    const getOpen = useStableGetter(open);
    const getPauseMouseTracking = useStableGetter(pauseMouseTracking);
    useLayoutEffect(() => {
        handleUpdate();
        if (open) {
            hasOpenedAtLeastOnce.current = true;

            const scrollListener = function (e: Event) { if (getOpen()) handleUpdate(); }
            const mouseListener = function (e: MouseEvent) {
                const mouseElement = e.target as Node | null;
                const sourceElement = getSourceElement();
                const popupElement = getPopupElement();
                if (!getPauseMouseTracking()) {
                    setMouseX(e.clientX);
                    setMouseY(e.clientY);
                }
                let shouldUpdate = false;
                if (getOpen())
                    shouldUpdate = true;
                if (sourceElement?.contains(mouseElement) || popupElement?.contains(mouseElement)) {
                    shouldUpdate = true;
                }
                if (shouldUpdate) {
                    handleUpdate();
                }
            }
            document.addEventListener("scroll", scrollListener, { capture: true, passive: true });
            window.addEventListener("resize", scrollListener, { capture: true, passive: true });
            document.addEventListener("mousemove", mouseListener, { capture: true, passive: true });
            return () => {
                document.removeEventListener("scroll", scrollListener, { capture: true });
                document.removeEventListener("mousemove", mouseListener, { capture: true });
                window.removeEventListener("resize", scrollListener, { capture: true });
            }
        }
    }, [open])

    /*useEffect(() => {
        handleUpdate();
    }, [open])

    useEffect(() => {
        handleUpdate();
    });*/

    const { refElementReturn: { propsStable: propsSource, getElement: getSourceElement } } = useRefElement<SourceElement>({ refElementParameters: {} });
    const { refElementReturn: { propsStable: propsPopup, getElement: getPopupElement } } = useRefElement<PopupElement>({ refElementParameters: {} });
    const { refElementReturn: { propsStable: propsArrow, getElement: getArrowElement } } = useRefElement<ArrowElement>({ refElementParameters: {} });

    // Because we don't set our mouse coordinates until mousemove,
    // and because we don't listen for mousemove until open (for performance reasons),
    // we need to listen for mouseenter just to capture that initial position at least.
    const extraSourceProps = useRef({
        onPointerEnter: (e: h.JSX.TargetedPointerEvent<SourceElement>) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        }
    });

    return {
        propsSource: useMergedProps(propsSource, extraSourceProps.current),
        propsPopup: { ...propsPopup, style: popupStyle.current, className: "popper-popup" } as h.JSX.HTMLAttributes<PopupElement>,
        propsArrow: { ...propsArrow, style: arrowStyle.current, className: "popper-arrow" } as h.JSX.HTMLAttributes<ArrowElement>,
        propsData: { ...popupProps.current as h.JSX.HTMLAttributes<any> }
    }
}

function sqr(n: number) { return n * n; }
function distanceToPoint(x0: number, y0: number, x1: number, y1: number) { return (Math.sqrt(sqr(x1 - x0) / sqr(y1 - y0))) }

function distanceToDOMRect(x: number, y: number, rect: DOMRectReadOnly) {
    return Math.min(
        distanceToPoint(x, y, rect.x + 0, rect.y + 0),
        distanceToPoint(x, y, rect.x + 0, rect.y + rect.height),
        distanceToPoint(x, y, rect.x + rect.width, rect.y + 0),
        distanceToPoint(x, y, rect.x + rect.width, rect.y + rect.height),
    )
}