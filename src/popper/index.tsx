import { Alignment, arrow, computePosition, flip, hide, Middleware, offset, Placement, shift, Side, size } from "@floating-ui/dom";
import { identity } from "lodash-es";
import { CSSProperties, ElementProps, JSX, returnZero, runImmediately, useCallback, useEffect, useElementSize, useMergedProps, usePassiveState, useRef, useRefElement, useStableCallback, useStableGetter, useState } from "preact-prop-helpers/preact";

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
        //pauseMouseTracking?: boolean;

        /**
         * * `"mouse"`: The popper will follow the mouse cursor, within the bounds of the element.
         * * `"center"`: The popper will be centered on the element.
         */
        alignMode: "mouse" | "element";

        getElement?: (e: SourceElement) => HTMLElement;
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

function roundByDPR(value: number) {
    const dpr = window.devicePixelRatio || 1;
    return Math.round(value * dpr) / dpr;
}

export interface UsePopperReturnType<SourceElement extends Element, PopupElement extends HTMLElement, ArrowElement extends HTMLElement> {
    propsSource: ElementProps<SourceElement>;
    propsPopup: ElementProps<PopupElement>;
    propsArrow: ElementProps<ArrowElement>;
    propsData: JSX.HTMLAttributes<any>;
    popperReturn: { usedSide: Side | null; usedAlignment: Alignment | null; hidden: boolean; };
}

export function usePopper<SourceElement extends Element, PopupElement extends HTMLElement, ArrowElement extends HTMLElement>({ popperParameters: { open, getElement, alignMode, placement: requestedPlacement, absolutePositioning } }: UsePopperProps<SourceElement>): UsePopperReturnType<SourceElement, PopupElement, ArrowElement> {
    //const [getSourceElement, setSourceElement] = usePassiveState<SourceElement | null, never>(null);
    //const [getPopupElement, setPopupElement] = usePassiveState<PopupElement | null, never>(null);
    //const [getArrowElement, setArrowElement] = usePassiveState<ArrowElement | null, never>(null);

    const [hidden, setHidden] = useState(false);
    const [usedSide, setUsedSide] = useState<Side | null>(null);
    const [usedAlignment, setUsedAlignment] = useState<Alignment | null>(null);

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
    //const lastUsedPlacement = useRef<Placement | null>(null);
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

    const handleUpdate = useStableCallback(async (forceUpdate: boolean) => {
        if (forceUpdate || open || hasOpenedAtLeastOnce.current) {
            const [requestedSide, requestedAlignment] = requestedPlacement.split('-') as [Side, Alignment?];
            hasOpenedAtLeastOnce.current = true;
            const sourceElement = getSourceElement();
            const popupElement = getPopupElement();
            const arrowElement = getArrowElement();
            if (sourceElement && popupElement && arrowElement) {
                //const [staticSide2, staticAlignment2] = requestedPlacement.split('-') as [Side, Alignment?];
                // (staticAlignment2 == 'start' ? 1 : -1)
                const elementContext = "floating"; // (absolutePositioning ? "floating" : "reference")
                const middleware: Middleware[] = [
                    //offset({}),
                    offset( /*(alignMode == "mouse" && staticAlignment2) ? { crossAxis: (popupElement.clientWidth / 2) * (0.75) * 0 } : undefined*/),
                    shift({ elementContext }),
                    arrow({ element: arrowElement, padding: 12 }),
                    flip({ elementContext }),
                    size({
                        elementContext,
                        apply({ availableWidth, availableHeight }) {
                            popupElement.style.setProperty("--popup-max-width", popupStyle.current.maxWidth = `${availableWidth}px`);
                            popupElement.style.setProperty("--popup-max-height", popupStyle.current.maxHeight = `${availableHeight}px`);
                        },
                    }),
                    //autoPlacement({ }), 
                    hide({ elementContext })
                ];

                const { middlewareData, placement: usedPlacement, strategy, x, y } = await computePosition({
                    contextElement: sourceElement,
                    getBoundingClientRect: () => getBoundingClientRectByMouse(sourceElement, alignMode == "mouse" ? (requestedSide == "left" || requestedSide == "right" ? "y" : "x") : "off", getMouseX(), getMouseY()),
                    getClientRects: () => getClientRectsByMouse(sourceElement, getMouseX(), getMouseY())
                },
                    popupElement,
                    {
                        middleware,
                        placement: requestedPlacement,
                        strategy: absolutePositioning ? "absolute" : "fixed"
                    });

                const [usedSide, usedAlignment] = usedPlacement.split('-') as [Side, Alignment?];
                setUsedSide(usedSide);
                setUsedAlignment(usedAlignment ?? null);
                setHidden(middlewareData.hide?.escaped || middlewareData.hide?.referenceHidden || false);
                //lastUsedPlacement.current ||= staticSide;

                popupProps.current["data-popper-placement"] = usedSide || "";
                /*popupProps.current["data-popup-arrow-static-alignment"] = staticAlignment || "";
                popupProps.current["data-popup-escaped"] = middlewareData.hide?.escaped ? "true" : "";
                popupProps.current["data-popup-reference-hidden"] = middlewareData.hide?.referenceHidden ? "true" : "";*/

                popupElement.style.setProperty("--popup-source-x", popupStyle.current["--popup-source-x"] = x == null ? null : `${roundByDPR(x)}px`);
                popupElement.style.setProperty("--popup-source-y", popupStyle.current["--popup-source-y"] = y == null ? null : `${roundByDPR(y)}px`);
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

    // This is useEffect, not useLayoutEffect, for performance reasons.
    // E.G. A list with popup items -- we *really* don't want each individual useLayoutEffect
    // to call handleUpdate (which causes a reflow one-by-one excruciatingly slowly!)
    //
    // If this needs to be useLayoutEffect for some other reason, there needs to be a 
    // mechanism for delaying the very, very first update to useEffect (and all others can have useLayoutEffect)
    useEffect(() => {
        handleUpdate(true);
        if (open) {
            hasOpenedAtLeastOnce.current = true;

            const scrollListener = function (e: Event) { if (getOpen()) handleUpdate(false); }
            const mouseListener = function (e: MouseEvent) {
                const mouseElement = e.target as Node | null;
                const sourceElement = getSourceElement();
                const popupElement = getPopupElement();
                if (sourceElement?.contains(mouseElement)) {
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
                    handleUpdate(false);
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

    useEffect(() => {
        if (open) {
            handleUpdate(true);
        }
    }, [open, alignMode, requestedPlacement, absolutePositioning]);

    const { refElementReturn: { getElement: getSourceElement }, propsStable: propsSource } = useRefElement<SourceElement>({ refElementParameters: {} });
    const { refElementReturn: { getElement: getPopupElement }, propsStable: propsPopup } = useRefElement<PopupElement>({ refElementParameters: {} });
    const { refElementReturn: { getElement: getArrowElement }, propsStable: propsArrow } = useRefElement<ArrowElement>({ refElementParameters: {} });

    // Because we don't set our mouse coordinates until mousemove,
    // and because we don't listen for mousemove until open (for performance reasons),
    // we need to listen for mouseenter just to capture that initial position at least.
    const extraSourceProps = useRef<JSX.HTMLAttributes<SourceElement>>({
        onPointerEnterCapture: (e: JSX.TargetedPointerEvent<SourceElement>) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        }
    });

    return {
        propsSource: useMergedProps(propsSource, extraSourceProps.current),
        propsPopup: { ...propsPopup, style: popupStyle.current, className: "popper-popup" } as JSX.HTMLAttributes<PopupElement>,
        propsArrow: { ...propsArrow, style: arrowStyle.current, className: "popper-arrow" } as JSX.HTMLAttributes<ArrowElement>,
        propsData: { ...popupProps.current as JSX.HTMLAttributes<any> },
        popperReturn: {
            usedSide,
            usedAlignment,
            hidden
        }
    }
}

class BetterBox {
    constructor(private _x: number, private _y: number, private _width: number, private _height: number) { }

    public get left() { return this._x }
    public set left(value: number) { this._x = value; }

    public get right() { return this._x + this._width }
    public set right(value: number) { this._width = value - this._x; }

    public get top() { return this._y }
    public set top(value: number) { this._y = value; }

    public get bottom() { return this._y + this._height }
    public set bottom(value: number) { this._height = value - this._y; }

    asDOMRectReadOnly() { return new DOMRectReadOnly(this._x, this._y, this._width, this._height); }
}

function getBoundingClientRectByMouse(element: Element, track: "x" | "y" | "both" | "off", mouseX: number | null, mouseY: number | null): DOMRectReadOnly {
    const readOnly = element.getBoundingClientRect();
    let ret = new BetterBox(readOnly.x, readOnly.y, readOnly.width, readOnly.height);

    if (track == "off" || !mouseX || !mouseY)
        return readOnly;

    if (track == "x" || track == "both") {
        ret.left = Math.min(Math.max(ret.left, mouseX), readOnly.right);
        ret.right = Math.max(Math.min(ret.right, mouseX), readOnly.left);
        /**
         * Explanation:
         * 
         * Imagine mouseX positions A, B, and C:
         *         _________________
         *         |               |    
         *    A    |       B       |    C
         *         |_______________|
         * 
         * We need to adjust the left and right of the box to contain only the mouse cursor,
         * but only to the extent that it's within the original box. So while left and right only snap to B,
         * A and C would still have an effect on the box.
         * 
         * The lefthand side snaps to the mouse if it's farther right than it,
         * but if it's so far that it would escape the original box, we snap
         * back to the righthand side.
         * 
         */
    }
    if (track == "y" || track == "both") {
        ret.top = Math.min(Math.max(ret.top, mouseY), readOnly.bottom);
        ret.bottom = Math.max(Math.min(ret.bottom, mouseY), readOnly.top);
    }

    return ret.asDOMRectReadOnly();
}
function getClientRectsByMouse(element: Element, mouseX: number | null, mouseY: number | null) {
    return element.getClientRects();
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