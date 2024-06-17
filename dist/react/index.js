import { Accordion as Accordion$1, AccordionSection as AccordionSection$1, Tooltip as Tooltip$1, useDefaultRenderPortal, Toolbar, EventDetail as EventDetail$1, ToolbarChild, Button as Button$1, Progress, Heading, ProgressWithHandler, Checkbox as Checkbox$1, CheckboxGroup as CheckboxGroup$1, CheckboxGroupParent as CheckboxGroupParent$1, CheckboxGroupChild as CheckboxGroupChild$1, Dialog as Dialog$1, Gridlist, GridlistRows, GridlistChild, GridlistRow, Menu as Menu$1, MenuItem as MenuItem$1, ParentDepthContext, useMenuSurface, useDefault, RadioGroup as RadioGroup$1, Radio as Radio$1, useLabel, useSlider, useSliderThumb, TableRows, Table as Table$1, TableSection as TableSection$1, TableRow as TableRow$1, TableCell as TableCell$1, Tabs as Tabs$1, Tab as Tab$1, TabPanel as TabPanel$1, Toasts, Toast as Toast$1, useNotificationProvider, NotificationProviderContext } from 'preact-aria-widgets/react';
export { Heading, HeadingReset } from 'preact-aria-widgets/react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { forwardRef, memo, useMergedProps, createContext, useState, usePassiveState, returnZero, runImmediately, useRef, useElementSize, useCallback, useStableCallback, useStableGetter, useEffect, useRefElement, cloneElement, createElement, useContext, generateRandomId, useHasCurrentFocus, useLayoutEffect, usePersistentState, useGlobalHandler, useAsync, EventDetail, useMemo, useAsyncHandler, returnFalse, usePress, returnUndefined, useTimeout, useImperativeHandle, useRandomId, useEnsureStability, usePortalChildren } from 'preact-prop-helpers/react';
import { CollapseFade, SlideFade, SlideZoomFade, Fade, ZoomFade, Slide, Swappable, ExclusiveTransitionProvider } from 'preact-transition/react';
import clsx$1, { clsx } from 'clsx';
import { identity } from 'lodash-es';
import { createElement as createElement$1 } from 'react';

function forwardElementRef(t) {
    return forwardRef(t);
}
function memoForwardRef(fn) {
    return memo(forwardRef(fn));
}

/**
 *
 * <StructureAccordion>
 *     <StructureAccordionSection>
 *         <StructureAccordionSectionHeader>
 *             <StructureAccordionSectionHeaderButton></StructureAccordionSectionHeaderButton>
 *         </StructureAccordionSectionHeader>
 *     </StructureAccordionSection>
 *     <StructureAccordionSection>{...}</StructureAccordionSection>
 *     <StructureAccordionSection>{...}</StructureAccordionSection>
 *     <StructureAccordionSection>{...}</StructureAccordionSection>
 *     <StructureAccordionSection>{...}</StructureAccordionSection>
 *     <StructureAccordionSection>{...}</StructureAccordionSection>
 * </StructureAccordion>
 */
const StructureAccordion = memoForwardRef(function StructureAccordion({ children, ...props }, ref) {
    return (jsx("div", { ...useMergedProps({ class: "accordion" }, { ...props, ref }), children: children }));
});
const StructureAccordionSection = memoForwardRef(function Structure({ children, ...props }, ref) {
    return (jsx("div", { ...useMergedProps({ class: "accordion-item" }, { ...props, ref }), children: children }));
});
const StructureAccordionSectionHeader = memoForwardRef(function Structure({ children, ...props }, ref) {
    return (jsx("h2", { ...useMergedProps({ class: "accordion-header" }, { ...props, ref }), children: children }));
});
const StructureAccordionSectionHeaderButton = memoForwardRef(function Structure({ children, ...props }, ref) {
    return (jsx("button", { ...useMergedProps({ class: "accordion-button", type: "button" }, { ...props, ref }), children: children }));
});
const StructureAccordionSectionBody = memoForwardRef(function Structure({ show, children, ...props }, ref) {
    return (jsx(CollapseFade, { show: show, children: jsx("div", { ...useMergedProps({ class: "accordion-collapse" }, { ...props, ref }), children: jsx("div", { className: "accordion-body", children: children }) }) }));
});

const Accordion = memo(forwardElementRef(function Accordion({ children, ...props }, ref) {
    return (jsx(Accordion$1, { orientation: "vertical", render: info => {
            return (jsx(StructureAccordion, { ...useMergedProps({ ...props, ref }), children: children }));
        } }));
}));
const AccordionSection = memo(forwardElementRef(function AccordionSection({ index, children, header, bodyRole, disabled, untabbable, open, ...props }, ref) {
    return (jsx(AccordionSection$1, { index: index, tagButton: "button", bodyRole: bodyRole, disabled: disabled, untabbable: untabbable, open: open, render: info => {
            const show = info.accordionSectionReturn.expanded;
            const propsHeader = info.propsHeader;
            const propsHeaderButton = useMergedProps(info.propsHeaderButton, { className: show ? "" : "collapsed" });
            const propsBody = useMergedProps(info.propsBody, { className: show ? "show" : "" });
            return (jsxs(StructureAccordionSection, { children: [jsx(StructureAccordionSectionHeader, { ...propsHeader, children: jsx(StructureAccordionSectionHeaderButton, { ...propsHeaderButton, children: header }) }), jsx(StructureAccordionSectionBody, { show: show, ...propsBody, children: children })] }));
        } }));
}));

/**
 * **IMPORTANT**: Generally, badges should include extra hidden text for assistive technologies besides just whatever (e.g.) number is visually shown.
 *
 * For example, if this badge represents the number of unread messages with a number, then `children` should probably be something like
 *
 * `<Badge>{10 <span className="visually-hidden">unread messages</span>}</Badge>`
 */
const Badge = memo(forwardElementRef(function Badge({ children, position, variantTheme, roundedPill, ...props }, ref) {
    position ??= "inline";
    return jsx("span", { ...useMergedProps({
            ref,
            className: clsx("badge", roundedPill && "rounded-pill", variantTheme !== null && `text-bg-${variantTheme ?? "secondary"}`, position != "inline" && `position-absolute translate-middle top-0`, position == "top-end" && `start-100`, position == "top-start" && `start-0`)
        }, props), children: children });
}));

const DisabledContext$1 = createContext(false);
const DefaultDisabledType = createContext("soft");
const DefaultButtonTheme = createContext(null);
const DefaultButtonSize = createContext(null);

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const sides = ['top', 'right', 'bottom', 'left'];
const min = Math.min;
const max = Math.max;
const round = Math.round;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$1 = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          // Try next placement and re-run the lifecycle.
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$map$so;
                const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some(side => overflow[side] >= 0);
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'hide',
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = 'referenceHidden',
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case 'referenceHidden':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
        case 'escaped':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
        default:
          {
            return {};
          }
      }
    }
  };
};

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$1 = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const overflowAvailableHeight = height - overflow[heightSide];
      const overflowAvailableWidth = width - overflow[widthSide];
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        const maximumClippingWidth = width - overflow.left - overflow.right;
        availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle(element);

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

function getCssDimensions(element) {
  const css = getComputedStyle(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

const topLayerSelectors = [':popover-open', ':modal'];
function isTopLayer(element) {
  return topLayerSelectors.some(selector => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return getComputedStyle(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return getComputedStyle(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = offset$1;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = shift$1;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = flip$1;

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = size$1;

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = hide$1;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = arrow$1;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

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
};
function roundByDPR(value) {
    const dpr = window.devicePixelRatio || 1;
    return Math.round(value * dpr) / dpr;
}
function usePopper({ popperParameters: { open, getElement, alignMode, placement: requestedPlacement, absolutePositioning } }) {
    //const [getSourceElement, setSourceElement] = usePassiveState<SourceElement | null, never>(null);
    //const [getPopupElement, setPopupElement] = usePassiveState<PopupElement | null, never>(null);
    //const [getArrowElement, setArrowElement] = usePassiveState<ArrowElement | null, never>(null);
    const [hidden, setHidden] = useState(false);
    const [usedSide, setUsedSide] = useState(null);
    const [usedAlignment, setUsedAlignment] = useState(null);
    const [getMouseX, setMouseX] = usePassiveState(null, returnZero, runImmediately);
    const [getMouseY, setMouseY] = usePassiveState(null, returnZero, runImmediately);
    const cachedRects = useRef(null);
    const cachedRect = useRef(null);
    //const getPlacement = useStableGetter(placement);
    //const popperInstance = useRef<Instance | null>(null);
    getElement ??= identity;
    // For performance reasons, we update the element in realtime instead of re-rendering every single time the position changes.
    // To keep things in sync, we save those changes and re-apply them when we *do* re-render from some other source.
    const popupProps = useRef({});
    const popupStyle = useRef({});
    const arrowStyle = useRef({});
    //const lastUsedPlacement = useRef<Placement | null>(null);
    const hasOpenedAtLeastOnce = useRef(false);
    const { elementSizeReturn, refElementReturn } = useElementSize({
        elementSizeParameters: {
            getObserveBox: useCallback(() => { return "content-box"; }, []),
            onSizeChange: useCallback((size) => {
                const element = refElementReturn.getElement();
                if (element) {
                    cachedRects.current = element.getClientRects();
                    cachedRect.current = element.getBoundingClientRect();
                }
            }, [])
        }, refElementParameters: {}
    });
    //autoUpdate()
    const handleUpdate = useStableCallback(async (forceUpdate) => {
        if (forceUpdate || open || hasOpenedAtLeastOnce.current) {
            const [requestedSide, requestedAlignment] = requestedPlacement.split('-');
            hasOpenedAtLeastOnce.current = true;
            const sourceElement = getSourceElement();
            const popupElement = getPopupElement();
            const arrowElement = getArrowElement();
            if (sourceElement && popupElement && arrowElement) {
                //const [staticSide2, staticAlignment2] = requestedPlacement.split('-') as [Side, Alignment?];
                // (staticAlignment2 == 'start' ? 1 : -1)
                const elementContext = "floating"; // (absolutePositioning ? "floating" : "reference")
                const middleware = [
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
                }, popupElement, {
                    middleware,
                    placement: requestedPlacement,
                    strategy: absolutePositioning ? "absolute" : "fixed"
                });
                const [usedSide, usedAlignment] = usedPlacement.split('-');
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
                        const datasetName = Map1[propName];
                        if (datasetName)
                            element.dataset[datasetName] = popupProps.current[propName];
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
            const scrollListener = function (e) { if (getOpen())
                handleUpdate(false); };
            const mouseListener = function (e) {
                const mouseElement = e.target;
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
            };
            document.addEventListener("scroll", scrollListener, { capture: true, passive: true });
            window.addEventListener("resize", scrollListener, { capture: true, passive: true });
            document.addEventListener("mousemove", mouseListener, { capture: true, passive: true });
            return () => {
                document.removeEventListener("scroll", scrollListener, { capture: true });
                document.removeEventListener("mousemove", mouseListener, { capture: true });
                window.removeEventListener("resize", scrollListener, { capture: true });
            };
        }
    }, [open]);
    useEffect(() => {
        if (open) {
            handleUpdate(true);
        }
    }, [open, alignMode, requestedPlacement, absolutePositioning]);
    const { refElementReturn: { getElement: getSourceElement }, propsStable: propsSource } = useRefElement({ refElementParameters: {} });
    const { refElementReturn: { getElement: getPopupElement }, propsStable: propsPopup } = useRefElement({ refElementParameters: {} });
    const { refElementReturn: { getElement: getArrowElement }, propsStable: propsArrow } = useRefElement({ refElementParameters: {} });
    // Because we don't set our mouse coordinates until mousemove,
    // and because we don't listen for mousemove until open (for performance reasons),
    // we need to listen for mouseenter just to capture that initial position at least.
    const extraSourceProps = useRef({
        onPointerEnterCapture: (e) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        }
    });
    return {
        propsSource: useMergedProps(propsSource, extraSourceProps.current),
        propsPopup: { ...propsPopup, style: popupStyle.current, className: "popper-popup" },
        propsArrow: { ...propsArrow, style: arrowStyle.current, className: "popper-arrow" },
        propsData: { ...popupProps.current },
        popperReturn: {
            usedSide,
            usedAlignment,
            hidden
        }
    };
}
class BetterBox {
    _x;
    _y;
    _width;
    _height;
    constructor(_x, _y, _width, _height) {
        this._x = _x;
        this._y = _y;
        this._width = _width;
        this._height = _height;
    }
    get left() { return this._x; }
    set left(value) { this._x = value; }
    get right() { return this._x + this._width; }
    set right(value) { this._width = value - this._x; }
    get top() { return this._y; }
    set top(value) { this._y = value; }
    get bottom() { return this._y + this._height; }
    set bottom(value) { this._height = value - this._y; }
    asDOMRectReadOnly() { return new DOMRectReadOnly(this._x, this._y, this._width, this._height); }
}
function getBoundingClientRectByMouse(element, track, mouseX, mouseY) {
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
function getClientRectsByMouse(element, mouseX, mouseY) {
    return element.getClientRects();
}

function usePortalId(type) {
    const fullId = `portal-${type}`;
    if (document.getElementById(fullId) == null) {
        let portalRoot = document.getElementById("portal");
        let thisRoot = document.createElement("div");
        thisRoot.id = fullId;
        portalRoot?.appendChild(thisRoot);
    }
    return fullId;
}

// TODO: This should be on `globalThis` in case this library is imported multiple times.
const otherTooltipCloses = new Set();
/**
 * General TODO for tooltip: It should be possible for the hover element and the target element to be different.
 *
 * E.G. a checkbox is TINY and can be hard to hover over, but we can't add ::after pseudo elements to increase its size because it's replaced.
 */
const Tooltip = forwardElementRef(function Tooltip({ forward, getElement, forceOpen, children, tooltip, placement, maxWidth, hoverDelay, containsTabbable, absolutePositioning, semanticType, alignMode, ...props }, ref) {
    if (forward == null && typeof children == "object" && children.props) {
        forward = true;
    }
    maxWidth ??= "33vw";
    let [status, setStatus] = useState(null);
    useEffect(() => {
        if (forceOpen)
            setStatus("focus");
    }, [forceOpen]);
    const myClose = useCallback(() => { setStatus(null); }, []);
    useEffect(() => {
    }, []);
    return (jsx(Tooltip$1, { onStatus: setStatus, hoverDelay: hoverDelay, tooltipSemanticType: semanticType || (forward ? "label" : "description"), render: tooltipInfo => {
            //const mouseTrackingPaused = (status == "focus")
            if (forceOpen)
                status = "focus";
            // Any time the tooltip is shown, make sure all other open tooltips close themselves.
            // ... (times like this I *really* appreciate JS is single-threaded)
            useEffect(() => {
                if (status != null) {
                    otherTooltipCloses.forEach(close => close());
                    otherTooltipCloses.add(myClose);
                    return () => otherTooltipCloses.delete(myClose);
                }
            }, [status != null]);
            const portalId = usePortalId("tooltip");
            const isFocusOverride = (status == "focus");
            const { propsArrow, propsPopup, propsSource, propsData, popperReturn: { usedAlignment, usedSide, hidden } } = usePopper({
                popperParameters: {
                    open: status != null,
                    getElement,
                    absolutePositioning: absolutePositioning || false,
                    placement: placement ?? "top",
                    alignMode: isFocusOverride ? "element" : alignMode ?? (`mouse`)
                }
            });
            const slideTargetScale = (1 / 9);
            const transitionDuration = 200;
            const slideTargetBlock = (usedSide == "top" ? slideTargetScale : usedSide == "bottom" ? -slideTargetScale : 0);
            const slideTargetInline = (usedSide == "right" ? slideTargetScale : usedSide == "left" ? -slideTargetScale : 0);
            // IMPORTANT:
            // The tooltip must remain non-hidden to assistive technologies even when closed.
            // Don't set hidden or inert or anything like that when is's closed!
            const tooltipContent = jsx("div", { ...useMergedProps(propsPopup, {}), children: jsx(SlideFade, { exitVisibility: "visible", exclusivityKey: "tooltip", duration: transitionDuration, show: hidden ? false : (tooltip == null ? false : (status != null)), slideTargetBlock: slideTargetBlock, slideTargetInline: slideTargetInline, children: jsxs("div", { ...useMergedProps(propsData, { style: maxWidth ? { "--bs-tooltip-max-width": maxWidth } : {}, className: clsx("bs-tooltip-auto tooltip", absolutePositioning && "portal-tooltip-child") }, tooltipInfo.propsPopup), children: [jsx("div", { ...useMergedProps(propsArrow, { className: "tooltip-arrow" }) }), jsx("div", { className: "tooltip-inner", children: tooltip })] }) }) });
            let contentIfRelative = useDefaultRenderPortal({ children: tooltipContent, portalId });
            const portalJsx = absolutePositioning ? tooltipContent : contentIfRelative;
            if (forward) {
                const vnode = children;
                console.assert(!!vnode.type);
                return (jsxs(Fragment, { children: [(cloneElement(vnode, useMergedProps(propsData, vnode.props, tooltipInfo.propsTrigger, propsSource, props, { ref }, { ref: vnode.ref }))), portalJsx] }));
            }
            return (jsx(Fragment, { children: jsxs("span", { ...useMergedProps({ ref }, propsData, tooltipInfo.propsTrigger, propsSource, props, { tabIndex: !containsTabbable ? 0 : undefined }), children: [children, portalJsx] }) }));
        } }));
});

function childrenIsVnode(children) {
    if (children && children.type && children.props)
        return true;
    return false;
}
function useClonedElement(children, props, ref, Tag = 'span') {
    const T = Tag;
    const c = (childrenIsVnode(children) ? children : jsx(T, { children: children }));
    return createElement(c.type, useMergedProps(c.props, { ref: c.ref }, props, { ref }));
}

const KeyboardAssistContext = createContext(null);
const KeyboardAssistIcon = forwardElementRef(function KeyboardAssistIcon({ description, activateEnter, activateSpace, leftRight, upDown, homeEnd, pageKeys, children, typeaheadStatus, leaveF2, textF10, ...props }, ref) {
    const { id: figureDescriptionId, addHomeEnd, setDescription, addActivateEnter, removeActivateEnter, addActivateSpace, removeActivateSpace, addLeftRight, addPageKeys, addUpDown, addLeaveF2, addTextF10, removeHomeEnd, removeLeftRight, removePageKeys, removeLeaveF2, removeTextF10, removeUpDown, setTypeaheadStatus } = useContext(KeyboardAssistContext);
    const [randomId] = useState(() => generateRandomId());
    const [focusedInner, setFocusedInner] = useState(false);
    const { refElementReturn, propsStable } = useRefElement({ refElementParameters: {} });
    const { hasCurrentFocusReturn } = useHasCurrentFocus({
        hasCurrentFocusParameters: {
            onCurrentFocusedChanged: null,
            onCurrentFocusedInnerChanged: useStableCallback((focused) => {
                setFocusedInner(focused);
                if (focused)
                    setDescription(description);
            })
        },
        refElementReturn
    });
    leftRight &&= focusedInner;
    upDown &&= focusedInner;
    homeEnd &&= focusedInner;
    pageKeys &&= focusedInner;
    leaveF2 &&= focusedInner;
    textF10 &&= focusedInner;
    activateEnter &&= focusedInner;
    activateSpace &&= focusedInner;
    useEffect(() => {
        if (activateEnter) {
            addActivateEnter(randomId);
            return () => removeActivateEnter(randomId);
        }
    }, [activateEnter]);
    useEffect(() => {
        if (activateSpace) {
            addActivateSpace(randomId);
            return () => removeActivateSpace(randomId);
        }
    }, [activateSpace]);
    useEffect(() => {
        setTypeaheadStatus(typeaheadStatus);
        return () => setTypeaheadStatus(null);
    }, [typeaheadStatus]);
    useEffect(() => {
        if (leftRight) {
            addLeftRight(randomId);
            return () => removeLeftRight(randomId);
        }
    }, [leftRight]);
    useEffect(() => {
        if (upDown) {
            addUpDown(randomId);
            return () => removeUpDown(randomId);
        }
    }, [upDown]);
    useEffect(() => {
        if (pageKeys) {
            addPageKeys(randomId);
            return () => removePageKeys(randomId);
        }
    }, [pageKeys]);
    useEffect(() => {
        if (homeEnd) {
            addHomeEnd(randomId);
            return () => removeHomeEnd(randomId);
        }
    }, [homeEnd]);
    /*useEffect(() => {
        if (typeahead) {
            addTypeahead(randomId);
            return () => removeTypeahead(randomId);
        }
    }, [typeahead]);*/
    useEffect(() => {
        if (focusedInner && leaveF2) {
            addLeaveF2(randomId);
            return () => removeLeaveF2(randomId);
        }
    }, [focusedInner]);
    useEffect(() => {
        if (focusedInner && textF10) {
            addTextF10(randomId);
            return () => removeTextF10(randomId);
        }
    }, [focusedInner]);
    return (jsx(Fragment, { children: useClonedElement(children, useMergedProps(propsStable, hasCurrentFocusReturn.propsStable, props), ref) }));
});
function KeyboardAssistProvider({ children }) {
    const [id] = useState(() => generateRandomId("keyboard-assist-"));
    const [leftRight2, setLeftRight] = useState(false);
    const [upDown2, setUpDown] = useState(false);
    const [homeEnd2, setHomeEnd] = useState(false);
    const [pageKeys2, setPageKeys] = useState(false);
    //const [typeahead2, setTypeahead] = useState(false);
    const [leaveF22, setLeaveF2] = useState(false);
    const [textF102, setTextF10] = useState(false);
    const [activateEnter, setActivateEnter] = useState(false);
    const [activateSpace, setActivateSpace] = useState(false);
    const [typeaheadStatus, setTypeaheadStatus] = useState(null);
    const [leftRightDisplay, setLeftRightDisplay] = useState(false);
    const [upDownDisplay, setUpDownDisplay] = useState(false);
    const [homeEndDisplay, setHomeEndDisplay] = useState(false);
    const [pageKeysDisplay, setPageKeysDisplay] = useState(false);
    //const [typeaheadDisplay, setTypeaheadDisplay] = useState(false);
    const [leaveF2Display, setLeaveF2Display] = useState(false);
    const [textF10Display, setTextF10Display] = useState(false);
    const leftRightSet = useRef(new Set());
    const upDownSet = useRef(new Set());
    const homeEndSet = useRef(new Set());
    const pageKeysSet = useRef(new Set());
    //const typeaheadSet = useRef<Set<string>>(new Set<string>());
    const leaveF2Set = useRef(new Set());
    const textF10Set = useRef(new Set());
    const activateEnterSet = useRef(new Set());
    const activateSpaceSet = useRef(new Set());
    const visible = (leftRight2 || upDown2 || homeEnd2 || pageKeys2);
    const typeaheadDisplay = (typeaheadStatus != null);
    useLayoutEffect(() => {
        const visible = (leftRight2 || upDown2 || homeEnd2 || pageKeys2);
        if (visible) {
            setLeftRightDisplay(leftRight2);
            setUpDownDisplay(upDown2);
            setHomeEndDisplay(homeEnd2);
            setPageKeysDisplay(pageKeys2);
            //setTypeaheadDisplay(typeahead2);
            setLeaveF2Display(leaveF22);
            setTextF10Display(textF102);
        }
    }, [leftRight2, upDown2, homeEnd2, pageKeys2, leaveF22, textF102]);
    // TODO: Mutation during render, but this is kinda intentional?
    /*if (visible) {
        lastVisibleSet.current.leftRight = leftRight;
        lastVisibleSet.current.upDown = upDown;
        lastVisibleSet.current.homeEnd = homeEnd;
        lastVisibleSet.current.pageKeys = pageKeys;
        lastVisibleSet.current.typeahead = typeahead;
    }*/
    const context = useRef({
        addHomeEnd: (id) => { homeEndSet.current.add(id); setHomeEnd(homeEndSet.current.size > 0); },
        addLeftRight: (id) => { leftRightSet.current.add(id); setLeftRight(leftRightSet.current.size > 0); },
        addPageKeys: (id) => { pageKeysSet.current.add(id); setPageKeys(pageKeysSet.current.size > 0); },
        setTypeaheadStatus: (status) => { setTypeaheadStatus(status); /*if (status != null && status != 'none') setHeardTab(true);*/ },
        addUpDown: (id) => { upDownSet.current.add(id); setUpDown(upDownSet.current.size > 0); },
        addLeaveF2: (id) => { leaveF2Set.current.add(id); setLeaveF2(leaveF2Set.current.size > 0); },
        addTextF10: (id) => { textF10Set.current.add(id); setTextF10(textF10Set.current.size > 0); },
        addActivateSpace: id => { activateSpaceSet.current.add(id); setActivateSpace(activateSpaceSet.current.size > 0); },
        addActivateEnter: id => { activateEnterSet.current.add(id); setActivateEnter(activateEnterSet.current.size > 0); },
        removeLeftRight: (id) => { leftRightSet.current.delete(id); setLeftRight(leftRightSet.current.size > 0); },
        removeUpDown: (id) => { upDownSet.current.delete(id); setUpDown(upDownSet.current.size > 0); },
        removeHomeEnd: (id) => { homeEndSet.current.delete(id); setHomeEnd(homeEndSet.current.size > 0); },
        removePageKeys: (id) => { pageKeysSet.current.delete(id); setPageKeys(pageKeysSet.current.size > 0); },
        removeLeaveF2: (id) => { leaveF2Set.current.delete(id); setLeaveF2(leaveF2Set.current.size > 0); },
        removeTextF10: (id) => { textF10Set.current.delete(id); setTextF10(textF10Set.current.size > 0); },
        removeActivateSpace: id => { activateSpaceSet.current.delete(id); setActivateSpace(activateSpaceSet.current.size > 0); },
        removeActivateEnter: id => { activateEnterSet.current.delete(id); setActivateEnter(activateEnterSet.current.size > 0); },
        setDescription: desc => setDescription(desc),
        id: id
    });
    const [description, setDescription] = useState("Keyboard controls available:");
    const [heardTab, setHeardTab] = useState(false);
    const stateKey = `keyboard-assist-lr_${leftRightDisplay.toString()}-ud_${upDownDisplay.toString()}-pg_${pageKeysDisplay.toString()}-he_${homeEndDisplay.toString()}-tp_${typeaheadDisplay.toString()}-tp_${leaveF22.toString()}-tp_${textF102.toString()}`;
    const [userHasHidden, setUserHasHidden, getUserHasHidden] = usePersistentState(stateKey, false);
    const [userHasHiddenAny, setUserHasHiddenAny] = usePersistentState("keyboard-assist-hidden-any", false);
    //const [currentDescription, setCurrentDescription] = useState("Keyboard controls available:");
    useGlobalHandler(document, "keydown", event => {
        if (event.key == "Tab") {
            setHeardTab(true);
        }
        if (visible) {
            if (event.key == "F7") {
                if (event.shiftKey) {
                    event.preventDefault();
                    event.stopPropagation();
                    setUserHasHidden(false);
                    /*debugger;
    
                    for (const lr of Both) {
                        for (const ud of Both) {
                            for (const pg of Both) {
                                for (const he of Both) {
                                    for (const tp of Both) {
                                        const key = `keyboard-assist-lr_${lr}-ud_${ud}-pg_${pg}-he_${he}-tp_${tp}` as const;
                                        const value = getFromLocalStorage(key);
                                        if (value)
                                            storeToLocalStorage(`keyboard-assist-lr_${lr}-ud_${ud}-pg_${pg}-he_${he}-tp_${tp}`, false);
                                    }
                                }
                            }
                        }
                    }*/
                }
                else if (!getUserHasHidden()) {
                    event.preventDefault();
                    event.stopPropagation();
                    setUserHasHidden(true);
                    setUserHasHiddenAny(true);
                }
            }
        }
    }, { capture: true });
    return (jsxs(KeyboardAssistContext.Provider, { value: context.current, children: [jsx(KeyboardAssistIconDisplay, { id: id, description: description, heardTab: heardTab, userHasHidden: userHasHidden, homeEnd: homeEndDisplay, leftRight: leftRightDisplay, upDown: upDownDisplay, pageKeys: pageKeysDisplay, visible: visible, leaveF2: leaveF2Display, textF10: textF10Display, activateEnter: activateEnter, activateSpace: activateSpace, typeaheadStatus: typeaheadStatus }), children] }));
}
function KeyboardAssistIconDisplay({ heardTab, description, userHasHidden, leftRight, upDown, homeEnd, pageKeys, leaveF2, textF10, visible, activateEnter, activateSpace, id, typeaheadStatus }) {
    const show = (heardTab && !userHasHidden && visible);
    return (jsx(Fragment, { children: jsx(SlideZoomFade, { show: show, zoomMin: 0.875, zoomOriginInline: 1, zoomOriginBlock: 1, slideTargetBlock: 0.125, slideTargetInline: 0.125, children: jsxs("div", { className: "keyboard-assist-icon-container", role: "figure", "aria-labelledby": id, children: [jsx("div", { id: id, className: "keyboard-assist-instructions", children: description }), jsx(KeyboardAssistIconArrowKeys, { leftRight: leftRight, upDown: upDown }), jsx(KeyboardAssistIconHomeEnd, { enabled: homeEnd }), jsx(KeyboardAssistIconPageKeys, { enabled: pageKeys }), jsx(KeyboardAssistIconSelectable, { enter: activateEnter || false, space: activateSpace || false }), jsx(KeyboardAssistIconTypeahead, { typeaheadStatus: typeaheadStatus }), jsx(KeyboardAssistIconLeaveF2, { enabled: leaveF2 || false }), jsx(KeyboardAssistIconRichTextF10, { enabled: textF10 || false }), jsxs("div", { className: "keyboard-assist-dismiss-message", children: ["To dismiss these instructions, press ", jsx("kbd", { children: "F7" }), ".", jsx("br", {}), "To show again, press ", jsx("kbd", { children: "Shift+F7" }), "."] })] }) }) }));
}
const KeyboardAssistIconArrowKeys = memo(function KeyboardAssistIconArrowKeys({ leftRight, upDown }) {
    return (jsxs("div", { className: "keyboard-assist-arrow-keys", children: [jsx(KeyboardAssistIconKey, { enabled: upDown, className: "keyboard-assist-key-arrow-up", children: "\u2191" }), jsx(KeyboardAssistIconKey, { enabled: leftRight, className: "keyboard-assist-key-arrow-left", children: "\u2190" }), jsx(KeyboardAssistIconKey, { enabled: upDown, className: "keyboard-assist-key-arrow-down", children: "\u2193" }), jsx(KeyboardAssistIconKey, { enabled: leftRight, className: "keyboard-assist-key-arrow-right", children: "\u2192" })] }));
});
const KeyboardAssistIconPageKeys = memo(function KeyboardAssistIconPageKeys({ enabled }) {
    return (jsxs("div", { className: "keyboard-assist-page-keys", children: [jsx(KeyboardAssistIconKey, { enabled: enabled, className: "keyboard-assist-key-page-up", children: "Pg Up" }), jsx(KeyboardAssistIconKey, { enabled: enabled, className: "keyboard-assist-key-page-down", children: "Pg Dn" })] }));
});
const KeyboardAssistIconHomeEnd = memo(function KeyboardAssistIconHomeEnd({ enabled }) {
    return (jsxs("div", { className: "keyboard-assist-home-end", children: [jsx(KeyboardAssistIconKey, { enabled: enabled, className: "keyboard-assist-key-home", children: "Home" }), jsx(KeyboardAssistIconKey, { enabled: enabled, className: "keyboard-assist-key-end", children: "End" })] }));
});
const KeyboardAssistIconSelectable = memo(function KeyboardAssistIconTypeahead({ enter, space }) {
    let selectableLabel = (enter ? space ? "Enter or Space" : "Enter" : space ? "Space" : "");
    const visible = enter || space || false;
    // TODO: modification during render to ensure that it's not jumpy when transitioning in/out
    let selectableLabelRef = useRef(selectableLabel);
    if (visible)
        selectableLabelRef.current = selectableLabel;
    return (jsx(CollapseFade, { show: visible, exitVisibility: "hidden", children: jsx("div", { className: "keyboard-assist-selectable", children: jsxs("div", { className: "keyboard-assist-selectable-message", children: ["Select with ", selectableLabelRef.current] }) }) }));
});
const KeyboardAssistIconTypeahead = memo(function KeyboardAssistIconTypeahead({ typeaheadStatus }) {
    return (jsx(CollapseFade, { show: typeaheadStatus != null, exitVisibility: "hidden", children: jsx("div", { className: "keyboard-assist-typeahead", children: jsx("div", { className: "keyboard-assist-typeahead-message", children: typeaheadStatus == 'none' ? "Search by typing" : typeaheadStatus == 'valid' ? "Keep typing to continue" : "No result found" }) }) }));
});
const KeyboardAssistIconLeaveF2 = memo(function KeyboardAssistIconLeaveF2({ enabled }) {
    return (jsx(CollapseFade, { show: enabled, exitVisibility: "hidden", children: jsx("div", { className: "keyboard-assist-leave-f2", children: jsxs("div", { className: "keyboard-assist-leave-f2-message", children: ["Press ", jsx("kbd", { children: "F2" }), " to return"] }) }) }));
});
const KeyboardAssistIconRichTextF10 = memo(function KeyboardAssistIconRichTextF10({ enabled }) {
    return (jsx(CollapseFade, { show: enabled, exitVisibility: "hidden", children: jsx("div", { className: "keyboard-assist-rich-text-f10", children: jsxs("div", { className: "keyboard-assist-rich-text-f10-message", children: ["Press ", jsx("kbd", { children: "Alt+F10" }), " to focus the toolbar"] }) }) }));
});
const KeyboardAssistIconKey = memo(function KeyboardAssistIconKey({ children, className, enabled }) {
    return (jsx("div", { className: "keyboard-assist-key " + className + (!enabled ? " keyboard-assist-key-disabled" : ""), children: children }));
});

const ButtonGroupContext = createContext(null);
function ButtonGroup({ children, onSelectedIndexChange: onSelectedIndexChangeAsync, keyboardControlsDescription, variantTheme, variantSize, orientation, label, labelPosition, separated, disabled, selectedIndex, selectionMode, ...props }, ref) {
    labelPosition ??= "before";
    orientation ||= "horizontal";
    const imperativeHandle = useRef(null);
    const [capturedIndex, setCapturedIndex] = useState(null);
    const { syncHandler: onSelectedIndexChangeSync, pending } = useAsync((e) => { return onSelectedIndexChangeAsync?.(e[EventDetail].selectedIndex); }, {
        capture: (e) => { setCapturedIndex(e[EventDetail].selectedIndex); return [e]; },
        debounce: null,
        throttle: null,
    });
    const pendingIndex = (pending ? capturedIndex : null);
    const classBase = (separated ? "btn-toolbar" : "btn-group");
    if (labelPosition == 'hidden')
        console.assert(typeof label == "string");
    return (jsx(DefaultButtonSize.Provider, { value: variantSize ?? null, children: jsx(DefaultButtonTheme.Provider, { value: variantTheme ?? null, children: jsx(DisabledContext$1.Provider, { value: disabled ?? false, children: jsx(ButtonGroupContext.Provider, { value: useMemo(() => ({ pendingIndex }), [pendingIndex]), children: jsx(Toolbar, { onSingleSelectedIndexChange: (...e) => {
                            onSelectedIndexChangeSync(...e);
                        }, imperativeHandle: imperativeHandle, singleSelectionAriaPropName: "aria-pressed", singleSelectionMode: selectionMode == "single" ? "activation" : "disabled", multiSelectionMode: selectionMode == "multi" ? "activation" : "disabled", role: "toolbar" // TODO: Was group, but that doesn't count as an application, I think?
                        , pageNavigationSize: 0, orientation: orientation, ariaLabel: labelPosition == 'hidden' ? label : null, singleSelectedIndex: selectionMode == "single" ? (pendingIndex ?? selectedIndex) : undefined, render: info => {
                            const visibleLabel = jsx("label", { ...info.propsLabel, children: label });
                            return (jsxs(Fragment, { children: [labelPosition == "before" && visibleLabel, jsx(KeyboardAssistIcon, { leftRight: orientation == "horizontal", upDown: orientation == "vertical", homeEnd: true, pageKeys: false, typeaheadStatus: info.typeaheadNavigationReturn.typeaheadStatus, activateSpace: info.typeaheadNavigationReturn.typeaheadStatus == 'none', activateEnter: true, description: keyboardControlsDescription || "Keyboard controls for these buttons:", children: jsxs("span", { ...useMergedProps({ className: clsx(classBase, variantSize && `btn-group-${variantSize}`, orientation == "vertical" && `${classBase}-vertical`) }, info.propsToolbar, props, { ref }), children: [labelPosition == "within" && visibleLabel, children] }) }), labelPosition == "after" && visibleLabel] }));
                        } }) }) }) }) }));
}

const Button = memoForwardRef(function Button({ tooltip, buttonGroupIndex, children, tooltipPlacement, badge, pressed: standaloneOrMultiSelectPressed, disabled: userDisabled, onPress: onPressAsync, variantDropdown, variantFill, variantSize, loadingLabel, throttle, debounce, variantTheme, ...props }, ref) {
    //Tag ??= "button" as never;
    let defaultTheme = useContext(DefaultButtonTheme);
    let defaultSize = useContext(DefaultButtonSize);
    variantTheme ??= defaultTheme ?? undefined;
    variantSize ??= defaultSize ?? undefined;
    const { currentCapture, pending: individualPending, syncHandler, callCount } = useAsyncHandler({
        asyncHandler: onPressAsync,
        capture: (e) => e[EventDetail$1].pressed ?? null,
        debounce,
        throttle
    });
    // A button can look pressed for multiple reasons:
    // * The user has specified the button is pressed.
    // * This button is contained in a single-select widget, and that widget is telling this button that it is the selected one among all its siblings.
    // * The onPress handler is an async handler that sets the button to pressed/unpressed, in which case we show it in that state until the handler completes.
    const buttonGroupInfo = useContext(ButtonGroupContext);
    const { pendingIndex } = (buttonGroupInfo ?? {});
    //const isThePressedOne = ((pendingIndex == null ? (individualPending ? currentCapture : standaloneOrMultiSelectPressed) : (pendingIndex === buttonGroupIndex)) ?? null);
    //const singleSelectPending = pendingIndex != null && isThePressedOne;
    let isPendingForMultiSelect = null;
    let isPendingForSingleSelect = null;
    let isPressedForMultiSelect = null;
    if (individualPending) {
        isPendingForMultiSelect = true;
    }
    if (pendingIndex != null && pendingIndex == buttonGroupIndex) {
        isPendingForSingleSelect = true;
    }
    if (individualPending)
        isPressedForMultiSelect = currentCapture ?? null;
    else
        isPressedForMultiSelect = standaloneOrMultiSelectPressed ?? null;
    //let isPressed = null;
    const defaultDisabled = useContext(DisabledContext$1);
    const disabledType = useContext(DefaultDisabledType);
    //const pending = ((individualPending || singleSelectPending) ?? false);
    children = jsxs(Fragment, { children: [children, badge] });
    if (buttonGroupInfo == null) {
        //variantSize ??= "md";
        let pending = individualPending;
        let disabled = userDisabled;
        disabled ||= defaultDisabled;
        //disabled ||= (pendingIndex != null);
        disabled ||= pending;
        const d = disabled ? disabledType : false;
        let isPressed = (isPressedForMultiSelect) ?? null;
        return (jsx(ButtonStructure, { ref: ref, 
            //Tag={(Tag) as never}
            tooltip: tooltip, disabled: d, pending: pending, children: children, tooltipPlacement: tooltipPlacement, callCount: callCount, loadingLabel: loadingLabel ?? null, variantTheme: variantTheme ?? "primary", variantSize: variantSize, variantDropdown: variantDropdown || null, pressed: isPressed, onPress: syncHandler ?? null, excludeSpace: returnFalse, otherProps: props, variantFill: variantFill ?? null }));
    }
    else {
        return (jsx(ToolbarChild, { index: buttonGroupIndex ?? 0, disabledProp: "disabled", render: toolbarChildInfo => {
                //let pending = (toolbarChildInfo.multiSelectionChildReturn? isPendingForMultiSelect : selectionLimit == 'single'? isPendingForSingleSelect : individualPending) || false;
                let pending = (toolbarChildInfo.singleSelectionChildReturn.singleSelectionMode != "disabled" ? isPendingForSingleSelect :
                    toolbarChildInfo.multiSelectionChildReturn.multiSelectionMode != "disabled" ? isPendingForMultiSelect :
                        individualPending) || false;
                let disabled = userDisabled;
                disabled ||= defaultDisabled;
                //disabled ||= (pendingIndex != null);
                disabled ||= pending;
                const d = disabled ? disabledType : false;
                (toolbarChildInfo.singleSelectionChildReturn.singleSelected);
                let isPressed = toolbarChildInfo.singleSelectionChildReturn.singleSelected || toolbarChildInfo.multiSelectionChildReturn.multiSelected;
                return (jsx(ButtonStructure, { ref: ref, 
                    //Tag={(Tag) as never}
                    tooltip: tooltip, disabled: d, pending: pending, children: children, tooltipPlacement: tooltipPlacement, loadingLabel: loadingLabel ?? null, variantTheme: variantTheme ?? "primary", variantFill: variantFill ?? null, variantSize: variantSize ?? "md", variantDropdown: variantDropdown || null, pressed: isPressed, callCount: callCount, excludeSpace: toolbarChildInfo.pressParameters.excludeSpace || returnFalse, onPress: (e) => {
                        toolbarChildInfo.pressParameters.onPressSync?.(e);
                        return syncHandler?.(e);
                    }, otherProps: useMergedProps(props, toolbarChildInfo.propsChild, toolbarChildInfo.propsTabbable) }));
            } }));
    }
});
/**
 * A "raw" button -- just the markup.
 */
const ButtonStructure = memo(forwardElementRef(function ButtonStructure({ excludeSpace, tooltip, disabled, onPress, pressed, loadingLabel, otherProps, tooltipPlacement, pending, variantDropdown, variantTheme, variantFill, variantSize, children, callCount }, ref) {
    return (jsx(Button$1, { tagButton: "button", disabled: disabled, onPressSync: onPress, pressed: pressed, excludeSpace: excludeSpace, render: buttonInfo => {
            return (jsx(Progress, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", value: pending ? "indeterminate" : "disabled", tagProgressIndicator: "span", render: progressInfo => {
                    const { propsProgressIndicator, propsProgressRegion } = progressInfo;
                    const loadingJsx = (jsx(Fade, { show: pending, exitVisibility: "removed", children: jsx("span", { className: "spinner-border", ...propsProgressIndicator }) }));
                    if (pressed != null)
                        variantFill ??= (pressed ? "fill" : "outline");
                    const buttonClass = clsx(`btn position-relative`, variantDropdown && "dropdown-toggle", variantDropdown == "split" && "dropdown-toggle-split", variantSize && `btn-${variantSize}`, `btn${variantFill == "outline" ? "-outline" : ""}-${variantTheme || "primary"}`, pending && "pending", pressed && "pressed", disabled && "disabled", buttonInfo.pressReturn.pressing && "active");
                    //const ret = (h(Tag as never, useMergedProps<E>(otherProps, buttonInfo.props, { className: buttonClass, ref }), children, loadingJsx))
                    const ret = jsxs(StructureButtonButton, { ...useMergedProps(otherProps, buttonInfo.props, { className: buttonClass, ref }), children: [children, loadingJsx] });
                    if (tooltip) {
                        return jsx(Tooltip, { forward: true, alignMode: "element", semanticType: "label", absolutePositioning: true, placement: tooltipPlacement || "top", tooltip: tooltip, children: ret });
                    }
                    else {
                        return ret;
                    }
                } }));
        } }));
}));
const StructureButtonButton = memoForwardRef(function ButtonStructure({ children, ...props }, ref) {
    return (jsx("button", { ...useMergedProps({ class: "btn" }, { ...props, ref }), children: children }));
});
memoForwardRef(function StructureButtonProgress({ children, ...props }, ref) {
    return (jsx("label", { ...useMergedProps({ class: "btn-progress-label" }, { ...props, ref }), children: children }));
});
memoForwardRef(function StructureButtonProgress({ ...props }, ref) {
    return (jsx("progress", { ...useMergedProps({ class: "btn-progress-indicator" }, { ...props, ref }) }));
});

const CardGroup = memo(forwardElementRef(function CardGroup(props, ref) {
    return (jsx("div", { ...useMergedProps(props, { ref, className: "card-group" }) }));
}));

const Card = memo(forwardElementRef(function Card(p, ref) {
    let { children, title, subtitle, variantTheme, ...props } = p;
    if (subtitle)
        children = jsx(CardSubtitle, { subtitle: subtitle, className: title ? "pt-0" : "", children: children });
    if (title)
        children = jsx(CardTitle, { title: title, className: subtitle ? "pb-0" : "", children: children });
    return (jsx("div", { ...useMergedProps({ ref, className: clsx("card", variantTheme && `text-bg-${variantTheme}`) }, props), children: children }));
}));
function CardElement2({ type, ...p }, ref) {
    switch (type) {
        default:
        case "paragraph": {
            const { children, ...props } = p;
            return jsx(CardBody, { ...props, ref: ref, children: jsx(CardText, { children: children }) });
        }
        case "footer": {
            const { children, ...props } = p;
            return jsx(CardFooter, { ...props, ref: ref, children: children });
        }
        case "subtitle": {
            const { children, subtitle, ...props } = p;
            return jsx(CardSubtitle, { subtitle: subtitle, ...props, ref: ref, children: children });
        }
        case "title": {
            const { children, title, ...props } = p;
            return jsx(CardTitle, { title: title, ...props, ref: ref, children: children });
        }
        case "image": {
            const { src, position, ...props } = p;
            return jsx(CardImage, { src: src, position: position, ...props, ref: ref });
        }
        case "flush": {
            const { children, ...props } = p;
            return createElement("span", props, children);
        }
    }
}
const CardElement = memo(forwardElementRef(CardElement2));
const CardImage = memo(forwardElementRef(function CardImage(p, ref) {
    const { position, src, ...props } = p;
    return (jsx("img", { ...useMergedProps(props, { ref, className: `card-img${position == "both" ? "" : `-${position}`}` }) }));
}));
const CardBody = memo(forwardElementRef(function CardBody(props, ref) {
    return (jsx("div", { ...useMergedProps(props, { ref, className: "card-body" }) }));
}));
const CardFooter = memo(forwardElementRef(function CardFooter(p, ref) {
    const { ...props } = p;
    return (jsx("div", { ...useMergedProps(props, { ref, className: "card-footer" }) }));
}));
const CardTitle = memo(forwardElementRef(function CardTitle(p, ref) {
    const { title, children, ref: unused, ...props } = p;
    console.assert(ref == unused || unused == null);
    return jsx(Heading, { heading: title, ...useMergedProps(props, { ref, className: "card-title card-body" }), children: children });
}));
const CardSubtitle = memo(forwardElementRef(function CardSubtitle(p, ref) {
    const { subtitle, children, ref: unused, ...props } = p;
    console.assert(ref == unused || unused == null);
    return jsx(Heading, { heading: subtitle, ...useMergedProps(props, { ref, className: clsx("card-subtitle card-body", "mb-2", "text-muted") }), children: children });
}));
const CardText = memo(forwardElementRef(function CardText(props, ref) {
    return (jsx("div", { ...useMergedProps(props, { ref, className: "card-text" }) }));
}));

const WithinInputGroup = createContext(false);

const StructureCheckboxInput = memoForwardRef(function StructureCheckboxInput({ ...props }, ref) {
    return (jsx("input", { ...useMergedProps({ class: clsx("form-check-input") }, { ...props, ref }) }));
});
const StructureCheckboxLabel = memoForwardRef(function StructureCheckboxLabel({ children, ...props }, ref) {
    return (jsx("label", { ...useMergedProps({ class: "form-check-label" }, { ...props, ref }), children: children }));
});

function nextTristate(checked) {
    if (checked == false)
        return "mixed";
    else if (checked === "mixed")
        return true;
    else
        return false;
}
function Checkbox({ label, labelPosition, checked, tristate, onValueChange, loadingLabel, debounce, forciblyPending, throttle, inline, disabled: userDisabled, imperativeHandle, propsInput, propsLabel, ...props }, ref) {
    labelPosition ??= "after";
    const isSwitch = props._isSwitch;
    if (isSwitch)
        delete props._isSwitch;
    const withinInputGroup = useContext(WithinInputGroup);
    return (jsx(ProgressWithHandler, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", forciblyPending: forciblyPending, asyncHandler: (next, event) => {
            if (tristate)
                return onValueChange(nextTristate(checked), event);
            else
                return onValueChange?.(next, event);
        }, capture: e => {
            if (tristate)
                return nextTristate(checked);
            else
                return e[EventDetail$1].checked;
        }, debounce: debounce, throttle: throttle, tagProgressIndicator: "span", render: progressInfo => {
            const { asyncHandlerReturn, propsProgressIndicator, propsProgressRegion } = progressInfo;
            const { pending: p, debouncingAsync, debouncingSync, currentCapture, syncHandler } = asyncHandlerReturn;
            const pending = (p || debouncingAsync || debouncingSync);
            const loadingJsx = (jsx(Fade, { show: p, exitVisibility: "removed", children: jsx("span", { className: "spinner-border spinner-border-sm", ...propsProgressIndicator }) }));
            const defaultDisabled = useContext(DisabledContext$1);
            const disabledType = useContext(DefaultDisabledType);
            let disabled = userDisabled;
            disabled ||= defaultDisabled;
            const d = disabled ? disabledType : false;
            if (labelPosition == 'hidden')
                console.assert(typeof label == "string");
            return (jsx(Checkbox$1, { ariaLabel: labelPosition == 'hidden' ? label : null, checked: (pending ? currentCapture : null) ?? checked, onCheckedChange: syncHandler, labelPosition: labelPosition == "hidden" || labelPosition == "tooltip" ? "none" : "separate", tagInput: "input", tagLabel: "label", disabled: d, imperativeHandle: imperativeHandle, render: info => {
                    let inputJsx = jsx(StructureCheckboxInput, { ...useMergedProps(info.propsInput, propsInput || {}, withinInputGroup ? { class: "mt-0" } : {}) });
                    const visibleLabel = jsx(StructureCheckboxLabel, { ...useMergedProps(info.propsLabel, propsLabel || {}), children: label });
                    if (labelPosition == 'tooltip') {
                        inputJsx = jsx(Tooltip, { forward: true, tooltip: label, alignMode: "element", absolutePositioning: true, children: inputJsx });
                        labelPosition = "hidden";
                    }
                    if (!withinInputGroup) {
                        return (jsx(StructureCheckboxNormalOuter, { inline: inline || false, pending: pending, isSwitch: isSwitch, labelPosition: labelPosition || "before", childrenInput: inputJsx, childrenLabel: visibleLabel, childrenProgressIndicator: loadingJsx, childrenTooltip: label }));
                    }
                    else {
                        return (jsx(StructureCheckboxInputGroupOuter, { inline: inline || false, pending: pending, isSwitch: isSwitch, labelPosition: labelPosition || "before", childrenInput: inputJsx, childrenLabel: visibleLabel, childrenProgressIndicator: loadingJsx, childrenTooltip: label }));
                    }
                } }));
        } }));
}
const StructureCheckboxNormalOuter = memoForwardRef(function StructureCheckboxNormalOuter({ labelPosition, isSwitch, pending, inline, childrenProgressIndicator: loadingJsx, childrenTooltip: label, childrenInput: inputJsx, childrenLabel: visibleLabel, ...props }, ref) {
    return (jsxs("div", { ...useMergedProps({
            className: clsx("form-check", pending && "pending", isSwitch && "form-switch", inline && "form-check-inline", labelPosition == "before" && "form-check-reverse")
        }, { ...props, ref }), children: [loadingJsx, labelPosition == "before" && visibleLabel, inputJsx, labelPosition == "after" && visibleLabel] }));
});
const StructureCheckboxInputGroupOuter = memoForwardRef(function StructureCheckboxNormalOuter({ labelPosition, isSwitch, pending, inline, childrenProgressIndicator: loadingJsx, childrenTooltip: label, childrenInput: inputJsx, childrenLabel: visibleLabel, ...props }, ref) {
    const label2 = jsx("div", { ...({ className: clsx("input-group-text", pending && "pending") }), children: visibleLabel });
    return (jsxs(Fragment, { children: [labelPosition == "before" && label2, jsx("div", { ...useMergedProps({
                    className: clsx("input-group-text", pending && "pending", isSwitch && "form-switch", inline && "form-check-inline")
                }, props, { ref }), children: inputJsx }), labelPosition == "after" && label2] }));
});

function CheckboxGroup({ orientation, children, label, labelPosition, debounce, loadingLabel, throttle, disabled, inline, getSortValue }) {
    return (jsx(CheckboxGroup$1, { orientation: orientation, render: info => {
            return (jsxs("span", { ...info.props, children: [jsx(CheckboxGroupParent, { label: label, labelPosition: labelPosition, debounce: debounce, loadingLabel: loadingLabel, throttle: throttle, disabled: disabled, inline: inline, getSortValue: getSortValue }), children] }));
        } }));
}
function CheckboxGroupParent({ label, labelPosition, debounce, loadingLabel, throttle, disabled, inline, getSortValue, ...props }) {
    const imperativeHandle = useRef(null);
    return (jsx(CheckboxGroupParent$1, { focusSelf: useStableCallback(() => {
            if (imperativeHandle.current)
                imperativeHandle.current.checkboxLikeReturn.focusSelf();
        }), index: 0, render: info => {
            return (jsx(Checkbox, { labelPosition: labelPosition, label: label, throttle: throttle, disabled: disabled, inline: true, tristate: true, debounce: debounce, loadingLabel: loadingLabel, imperativeHandle: imperativeHandle, checked: info.checkboxGroupParentReturn.checked, onValueChange: useStableCallback(async (c, e) => { await info.checkboxGroupParentReturn.onParentCheckedChange(e); }), propsInput: useMergedProps(props, info.propsChild, info.propsTabbable) }));
        } }));
}
function CheckboxGroupChild({ checked, label, labelPosition, onValueChange, debounce, throttle, disabled, inline, loadingLabel, tristate, getSortValue, untabbable, index, ...props }) {
    const imperativeHandle = useRef(null);
    ++index;
    const [pendingFromParent, setPendingFromParent] = useState(false);
    return (jsx(CheckboxGroupChild$1, { checked: checked, focusSelf: useStableCallback(() => {
            if (imperativeHandle.current)
                imperativeHandle.current.checkboxLikeReturn.focusSelf();
        }), index: index, onChangeFromParent: useStableCallback(async (c, e) => {
            try {
                setPendingFromParent(true);
                await onValueChange?.(c, e);
            }
            catch (ex) {
                throw ex;
            }
            finally {
                setPendingFromParent(false);
            }
        }), untabbable: untabbable, render: info => {
            return (jsx(Checkbox, { checked: checked, label: label, inline: inline, loadingLabel: loadingLabel, tristate: tristate, debounce: debounce, throttle: throttle, disabled: pendingFromParent || disabled, labelPosition: labelPosition, imperativeHandle: imperativeHandle, onValueChange: useStableCallback(async (checked, event) => {
                    await onValueChange?.(checked, event);
                    info.checkboxGroupChildReturn.onChildCheckedChange(checked);
                }), propsInput: useMergedProps(props, info.propsChild, info.propsTabbable) }));
        } }));
}

const StructureDialogPortalRoot = memoForwardRef(function StructureDialogPortalRoot({ children, ...props }, ref) { return (jsx("div", { ...props, ref: ref, children: children })); });
const StructureDialogBackdrop = memoForwardRef(function StructureDialogBackdrop({ open, modal, ...props }, ref) {
    return (jsx("div", { ...useMergedProps({ class: clsx("dialog-backdrop", open && "visible", modal && "dialog-backdrop-blur"), role: "presentation" }, { ...props, ref }) }));
});
const StructureDialogModalTitle = memoForwardRef(function StructureDialogModalTitle({ children, ...props }, ref) {
    return (jsx("div", { ...useMergedProps({ class: "modal-title" }, { ...props, ref }), children: children }));
});
const StructureDialogModalCloseButton = memoForwardRef(function StructureDialogModalCloseButton({ onClose, ...props }, ref) {
    return (jsx(Button, { onPress: (_pressed, e) => onClose(e, "escape"), ...useMergedProps({ class: "btn-close", "aria-label": "Close" }, { ...props, ref }) }));
});
const StructureDialogModalBody = memoForwardRef(function StructureDialogModalBody({ children, ...props }, ref) {
    return (jsx("div", { ...useMergedProps({ class: "modal-body" }, { ...props, ref }), children: children }));
});
const StructureDialogModalFooter = memoForwardRef(function StructureDialogModalFooter({ children, ...props }, ref) {
    return (children == null ? null : jsx("div", { ...useMergedProps({ class: "modal-footer" }, { ...props, ref }), children: children }));
});
const StructureDialogModalDialog = memoForwardRef(function StructureDialogModalDialog({ open, children, header, ...props }, ref) {
    return (jsx(SlideFade, { animateOnMount: true, delayMountUntilShown: true, show: open, slideTargetBlock: 0.125 * (open ? 1 : -1), children: jsx("div", { ...useMergedProps({ class: "modal-dialog" }, { ...props, ref }), children: children }) }));
});
const StructureDialogModalContent = memoForwardRef(function StructureDialogModalContent({ childrenHeading, childrenBody, childrenFooter, headerPosition, ...props }, ref) {
    return (jsxs("span", { ...useMergedProps({ class: "modal-content" }, { ...props, ref }), children: [headerPosition == "start" ? jsx(Heading, { className: "modal-header", heading: childrenHeading, children: childrenBody }) : childrenBody, childrenFooter] }));
});
const StructureDialogModal = memoForwardRef(function StructureDialogModal({ open, variantSize, fullscreen, children, ...props }, ref) {
    const otherProps = {
        tabIndex: -1,
        className: clsx("modal modal-dialog-scrollable overflow-hidden", open ? "d-block" : "d-hidden", variantSize && `modal-${variantSize}`, fullscreen && (fullscreen === true ? "modal-fullscreen" : `modal-fullscreen-${fullscreen}`))
    };
    return (jsx("div", { ...useMergedProps(otherProps, { ...props, ref }), children: children }));
});

const Dialog = memo(forwardElementRef(function Dialog({ open, fullscreen, variantSize, header, headerPosition, footer, onClose, anchor, modal, children, propsPortal, ...props }, ref) {
    variantSize ??= "xl";
    headerPosition ??= "start";
    if (headerPosition == "hidden") {
        console.assert(typeof header == "string", `A dialog whose label is hidden must provide the label to use as a string to the header`);
    }
    return (jsx(Dialog$1, { ariaLabel: headerPosition == "hidden" ? header : null, active: open, onDismiss: onClose, focusPopup: (e, f) => f()?.focus?.(), dismissBackdropActive: modal ? false : true, dismissEscapeActive: modal ? false : true, render: info => {
            const headingJsx = (jsxs(Fragment, { children: [jsx(StructureDialogModalTitle, { children: header }), jsx(StructureDialogModalCloseButton, { onClose: onClose })] }));
            const bodyJsx = jsx(StructureDialogModalBody, { children: children });
            const footerJsx = (jsx(StructureDialogModalFooter, { children: footer }));
            return (jsxs(Fragment, { children: [anchor && useClonedElement(anchor, useMergedProps(info.propsSource, props), ref), useDefaultRenderPortal({
                        portalId: usePortalId("dialog"),
                        children: (jsx(StructureDialogPortalRoot, { ...useMergedProps(info.propsFocusContainer, propsPortal || {}), children: jsxs(StructureDialogModal, { fullscreen: fullscreen, open: open, variantSize: variantSize, ...info.propsDialog, children: [jsx(StructureDialogBackdrop, { open: open, modal: modal }), jsx(StructureDialogModalDialog, { open: open, header: header, children: jsx(StructureDialogModalContent, { childrenHeading: headingJsx, childrenBody: bodyJsx, childrenFooter: footerJsx, headerPosition: headerPosition }) })] }) }))
                    })] }));
        } }));
}));

const Figure = memo(forwardElementRef(function Figure({ children, caption, align, ...props }, ref) {
    return (jsxs("figure", { ...useMergedProps({ className: "figure", ref }, props), children: [cloneElement(children, useMergedProps({ className: "figure-img", ref: children.props.ref }, children.props)), jsx("figcaption", { className: clsx("figure", align === "end" && "text-end", align == "center" && "text-center"), children: caption })] }));
}));

const Icon = memo(forwardElementRef(function Icon({ label, role, "aria-label": ariaLabel, children, ref: unused, ...props }, ref) {
    console.assert(ref == unused || unused == null);
    const iconProps = useMergedProps(props, {
        class: "icon",
        [children?.type === "img" ? "alt" : "aria-label"]: (ariaLabel || (label ?? undefined)),
        role: (role || (label ? "img" : "presentation")),
        ref,
    });
    const iconElement = cloneElement(children, useMergedProps(("props" in (children || {}) ? children.props : {}), iconProps));
    return iconElement;
}));

/**
 * Generic way to represent any icon that's based on a font using some specific class to choose which icon to display.
 *
 *
 */
const FontIcon = memo(forwardElementRef(function FontIcon(props, ref) {
    return (jsx(Icon, { ...props, ref: ref, children: jsx("i", { className: "font-icon" }) }));
}));

/**
 * Specialization of a FontIcon to display any given Bootstrap icon.
 */
const BootstrapIcon = memo(forwardElementRef(function BootstrapIcon({ icon, label, ...props }, ref) {
    // Merge our custom CSS class with any additional classes that were passed in to this component
    const mergedProps = useMergedProps({ class: `bi bi-${icon}` }, props);
    // Render the actual FontIcon
    return jsx(FontIcon, { ...mergedProps, label: label, ref: ref });
}));

memo(forwardElementRef(function ImageIcon(props, ref) {
    return (jsx(Icon, { ...props, ref: ref, children: jsx("img", { className: "image-icon" }) }));
}));

memo(forwardElementRef(function SvgIcon(props, ref) {
    return (jsx(Icon, { ...props, ref: ref, children: jsx("svg", { className: "svg-icon" }) }));
}));

const InputGroup = memo(forwardElementRef(function InputGroup({ wrap, size, children, ...props }, ref) {
    return (jsx(WithinInputGroup.Provider, { value: true, children: jsx("div", { ...useMergedProps({ class: clsx("input-group", !wrap && "flex-nowrap", size && `input-group-${size}`), ref, children }, props) }) }));
}));
const InputGroupText = memo(forwardElementRef(function InputGroupText(props, ref) {
    return jsx("div", { ...useMergedProps({ className: "input-group-text" }, props), ref: ref });
}));

const GridBsContainer = memo(forwardElementRef(function GridContainer({ fillUntil, children, ...props }, ref) {
    fillUntil ??= "auto";
    return (useClonedElement(children, useMergedProps(props, {
        className: clsx(fillUntil == "auto" ? `container` :
            `container-${fillUntil}`)
    }), ref));
}));
const GridBsRow = memo(forwardElementRef(function GridRow({ justify, children, gutterHorizontal, gutterHorizontalXs, gutterHorizontalSm, gutterHorizontalMd, gutterHorizontalLg, gutterHorizontalXl, gutterHorizontalXxl, gutterVertical, gutterVerticalXs, gutterVerticalSm, gutterVerticalMd, gutterVerticalLg, gutterVerticalXl, gutterVerticalXxl, gutter, gutterXs, gutterSm, gutterMd, gutterLg, gutterXl, gutterXxl, ...props }, ref) {
    return (useClonedElement(children, useMergedProps(props, {
        className: clsx("row", gutterHorizontal != null && `gx-${gutterHorizontal}`, gutterHorizontalXs != null && `gx-xs-${gutterHorizontalXs}`, gutterHorizontalSm != null && `gx-sm-${gutterHorizontalSm}`, gutterHorizontalMd != null && `gx-md-${gutterHorizontalMd}`, gutterHorizontalLg != null && `gx-lg-${gutterHorizontalLg}`, gutterHorizontalXl != null && `gx-xl-${gutterHorizontalXl}`, gutterHorizontalXxl != null && `gx-xxl-${gutterHorizontalXxl}`, gutterVertical != null && `gy-${gutterVertical}`, gutterVerticalXs != null && `gy-xs-${gutterVerticalXs}`, gutterVerticalSm != null && `gy-sm-${gutterVerticalSm}`, gutterVerticalMd != null && `gy-md-${gutterVerticalMd}`, gutterVerticalLg != null && `gy-lg-${gutterVerticalLg}`, gutterVerticalXl != null && `gy-xl-${gutterVerticalXl}`, gutterVerticalXxl != null && `gy-xxl-${gutterVerticalXxl}`, gutter != null && `g-${gutter}`, gutterXs != null && `g-xs-${gutterXs}`, gutterSm != null && `g-sm-${gutterSm}`, gutterMd != null && `g-md-${gutterMd}`, gutterLg != null && `g-lg-${gutterLg}`, gutterXl != null && `g-xl-${gutterXl}`, gutterXxl != null && `g-xxl-${gutterXxl}`)
    }), ref));
}));
const GridBsItem = memo(forwardElementRef(function GridItem({ children, offset, offsetXs, offsetSm, offsetMd, offsetLg, offsetXl, offsetXxl, span, spanXs, spanSm, spanMd, spanLg, spanXl, spanXxl, ...props }, ref) {
    return (useClonedElement(children, useMergedProps(props, {
        className: clsx("col", offset && `offset-${offset}`, offsetXs && `offset-xs-${offsetXs}`, offsetSm && `offset-sm-${offsetSm}`, offsetMd && `offset-md-${offsetMd}`, offsetLg && `offset-lg-${offsetLg}`, offsetXl && `offset-xl-${offsetXl}`, offsetXxl && `offset-xxl-${offsetXxl}`, span && `col-${span}`, spanXs && `col-xs-${spanXs}`, spanSm && `col-sm-${spanSm}`, spanMd && `col-md-${spanMd}`, spanLg && `col-lg-${spanLg}`, spanXl && `col-xl-${spanXl}`, spanXxl && `col-xxl-${spanXxl}`)
    }), ref));
}));
const GridBsBreak = memo(forwardElementRef(function GridBreak({ hideUntil, children, ...props }, ref) {
    return (useClonedElement(children, useMergedProps(props, { className: clsx("w-100", hideUntil && `d-none d-${hideUntil}-block`) }), ref));
}));

const GridCss = memo(forwardElementRef(function GridCss({ columns, gap, children, ...props }, ref) {
    let style = {};
    if (gap != null)
        style["--bs-gap"] = gap;
    if (columns != null)
        style["--bs-columns"] = columns;
    return (useClonedElement(children, useMergedProps(props, { class: "grid", style }), ref));
}));
const GridCssItem = memo(forwardElementRef(function GridCssItem({ span, spanXs, spanSm, spanMd, spanLg, spanXl, spanXxl, start, startXs, startSm, startMd, startLg, startXl, startXxl, children, ...props }, ref) {
    return (useClonedElement(children, useMergedProps(props, {
        class: clsx(span && `g-col-${span}`, spanXs && `g-col-xs-${spanXs}`, spanSm && `g-col-sm-${spanSm}`, spanMd && `g-col-md-${spanMd}`, spanLg && `g-col-lg-${spanLg}`, spanXl && `g-col-xl-${spanXl}`, spanXxl && `g-col-xxl-${spanXxl}`, start && `g-start-${start}`, startXs && `g-start-xs-${startXs}`, startSm && `g-start-sm-${startSm}`, startMd && `g-start-md-${startMd}`, startLg && `g-start-lg-${startLg}`, startXl && `g-start-xl-${startXl}`, startXxl && `g-start-xxl-${startXxl}`)
    }), ref));
}));

/**
 * Very simple, easy responsive grid that guarantees each column is the minimum size.
 *
 * Use leftover to control what happens when there's more space than minimally required.
 * * "fill" to have each element expand equally to fill the remaining space
 * * "shrink" to keep as many elements on one line as possible
 *
 * Easy one-liners all around here!
 */
const GridResponsive = memo(forwardElementRef(function ResponsiveGrid({ minWidth, leftover, children, ...props }, ref) {
    const mergedProps = useMergedProps({
        className: "responsive-grid",
        style: !minWidth ? {} : {
            "--grid-min-width": `${minWidth}`,
            "--grid-auto-behavior": leftover ? `auto-${leftover == "shrink" ? "fit" : leftover}` : ""
        }
    }, props);
    return useClonedElement(children, mergedProps, ref);
}));

/**
 * Very simple, easy static grid that guarantees the number of columns is displayed,
 * no matter how janky it looks.
 *
 * (This can, of course, be achieved fairly easily with other grids -- this is more of a fun one-liner)
 */
const GridStatic = memo(forwardElementRef(function ResponsiveGrid({ columns, children, ...props }, ref) {
    const mergedProps = useMergedProps({
        className: "static-grid",
        style: typeof columns === "string" ? { "--static-grid-columns": columns } : { "--grid-column-count": columns }
    }, props);
    return useClonedElement(children, mergedProps, ref);
}));

function Pagination({ childCount, windowSize, onChange, labelPosition, label, keyboardControlsDescription }) {
    labelPosition ??= "before";
    const [page, setPage] = useState(0);
    useEffect(() => {
        const start = ((page + 0) * windowSize);
        const end = ((page + 1) * windowSize);
        onChange?.(start, end);
        return () => onChange(null, null);
    }, [page, windowSize]);
    if (labelPosition == 'hidden')
        console.assert(typeof label == "string");
    return (jsx(Toolbar, { ariaLabel: labelPosition == "hidden" ? label : null, singleSelectionAriaPropName: "aria-current-page", singleSelectionMode: "activation", singleSelectedIndex: page, multiSelectionMode: "disabled", onSingleSelectedIndexChange: useStableCallback((event) => { setPage(event[EventDetail].selectedIndex || 0); }, []), orientation: "horizontal", render: info => {
            const labelJsx = jsx("label", { ...info.propsLabel, children: label });
            return (jsxs(Fragment, { children: [labelPosition == "before" && labelJsx, jsx(KeyboardAssistIcon, { leftRight: true, upDown: false, homeEnd: true, pageKeys: true, typeaheadStatus: 'none', activateSpace: true, activateEnter: true, description: keyboardControlsDescription ?? "Select a page:", children: jsx("nav", { "aria-label": labelPosition == 'hidden' ? label : undefined, children: jsx("ul", { ...useMergedProps(info.propsToolbar, { class: "pagination" }), children: jsx(PaginationChildren, { childCount: childCount, windowSize: windowSize }) }) }) }), labelPosition == "after" && labelJsx] }));
        } }));
}
const PaginationChildren = memo(({ childCount, windowSize }) => {
    const firstIndex = 0;
    const lastIndex = Math.ceil((childCount) / windowSize) - 1; // INCLUSIVE! Not exclusive as usual for ending points.
    useRef(null);
    useRef(null);
    const centerFirstRef = useRef(null);
    const centerLastRef = useRef(null);
    const onFocusFirst = useCallback(() => { centerFirstRef.current?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" }); }, []);
    const onFocusLast = useCallback(() => { centerLastRef.current?.scrollIntoView({ behavior: "smooth", inline: "end", block: "nearest" }); }, []);
    return (jsxs(Fragment, { children: [jsx(PaginationButtonFirst, { index: firstIndex, onFocus: onFocusFirst }), jsxs("span", { className: "pagination-center scroll-shadows scroll-shadows-x", children: [jsx(PaginationButton, { index: firstIndex + 1, ref: centerFirstRef, children: firstIndex + 1 + 1 }, `first`), Array.from(function* () {
                        for (let page = firstIndex + 2; page <= lastIndex - 2; ++page) {
                            const start = ((page + 0) * windowSize);
                            const end = ((page + 1) * windowSize);
                            yield jsx(PaginationButton, { index: page, children: page + 1 }, `${start}-${end}`);
                        }
                    }()), jsx(PaginationButton, { index: lastIndex - 1, ref: centerLastRef, children: lastIndex - 1 + 1 }, `last`)] }), jsx(PaginationButtonLast, { index: lastIndex, onFocus: onFocusLast })] }));
});
const PaginationButtonFirst = memo(forwardElementRef(({ index, onFocus }, ref) => {
    return (jsxs(PaginationButton, { index: index, onFocus: onFocus, ref: ref, children: [jsx(BootstrapIcon, { icon: "chevron-bar-left", label: null }), " ", index + 1] }));
}));
const PaginationButtonLast = memo(forwardElementRef(({ index, onFocus }, ref) => {
    return (jsxs(PaginationButton, { index: index, onFocus: onFocus, ref: ref, children: [index + 1, " ", jsx(BootstrapIcon, { icon: "chevron-bar-right", label: null })] }));
}));
const PaginationButton = memo(forwardElementRef(function PaginationButton({ index, children, onFocus }, ref) {
    return (jsx(ToolbarChild, { index: index, disabledProp: "disabled", render: info => {
            const { refElementReturn, propsStable } = useRefElement({ refElementParameters: {} });
            const focusSelf = useCallback((e) => { e.focus(); }, []);
            const { pressReturn, props: propsPress } = usePress({
                pressParameters: {
                    ...info.pressParameters,
                    allowRepeatPresses: false,
                    excludeEnter: null,
                    excludePointer: null,
                    longPressThreshold: null,
                    onPressingChange: null,
                    focusSelf
                },
                refElementReturn
            });
            // @ts-expect-error onfocusin is correct, not onFocusIn
            const p = useMergedProps(info.propsChild, info.propsTabbable, propsStable, propsPress, { class: "page-link", ref, onfocusin: onFocus || undefined });
            return (jsx("li", { className: clsx$1("page-item", info.singleSelectionChildReturn.singleSelected && "active"), children: jsx("button", { ...p, children: children }) }));
        } }));
}));
const Paginated = memo(function Paginated({ childCount, setPaginationEnd, setPaginationStart, paginationLabel, paginationLocation, paginationSize, children }) {
    const paginationJsx = jsx(Pagination, { windowSize: paginationSize || 500, labelPosition: "hidden", label: paginationLabel, childCount: childCount, onChange: (start, end) => {
            setPaginationStart(start);
            setPaginationEnd(end);
        } });
    return (jsxs(Fragment, { children: [paginationSize && paginationLocation == "before" && paginationJsx, children, paginationSize && paginationLocation == "after" && paginationJsx] }));
});

const DefaultDisabled = createContext(false);
const TypeaheadStatus = createContext("none");
const List = memo(forwardRef((function List({ disabled, selectedIndex, selectionMode, onSelectedIndexChange, label, labelPosition, children, paginationLabel, paginationLocation, paginationSize, staggered, ...props }, ref) {
    labelPosition ??= "before";
    //const [focusedInner, setFocusedInner] = useState(false);
    //const { refElementReturn, propsStable } = useRefElement<HTMLDivElement>({ refElementParameters: {} })
    //const { hasCurrentFocusReturn } = useHasCurrentFocus<HTMLDivElement>({ hasCurrentFocusParameters: { onCurrentFocusedChanged: null, onCurrentFocusedInnerChanged }, refElementReturn })
    const [paginationStart, setPaginationStart] = useState(paginationSize == null ? null : 0);
    const [paginationEnd, setPaginationEnd] = useState(paginationSize ?? null);
    if (selectedIndex != null || onSelectedIndexChange != null) {
        console.assert(selectionMode == "single", `selectedIndex was specified even though selection is not enabled. Use the selectionMode prop to enable selection.`);
    }
    if (paginationSize)
        paginationLocation ||= "before";
    if (labelPosition == "hidden")
        console.assert(typeof label == "string");
    return (jsx(DefaultDisabled.Provider, { value: disabled ?? false, children: jsx(Gridlist, { initiallyTabbableColumn: 1, singleSelectedIndex: selectedIndex ?? null, singleSelectionAriaPropName: "aria-selected", onSingleSelectedIndexChange: useStableCallback(e => { debugger; onSelectedIndexChange?.(e[EventDetail].selectedIndex); }), paginationMin: paginationStart, paginationMax: paginationEnd, ariaLabel: labelPosition == "hidden" ? label : null, groupingType: "without-groups", singleSelectionMode: selectionMode == "single" ? "activation" : "disabled", multiSelectionMode: selectionMode == "multi" ? "activation" : "disabled", render: info => {
                const labelJsx = jsx("label", { ...info.propsGridlistLabel, children: label });
                children ??= [];
                return (jsxs(TypeaheadStatus.Provider, { value: info.typeaheadNavigationReturn.typeaheadStatus, children: [labelPosition == "before" && labelJsx, jsx(Paginated, { childCount: children.length ?? 0, paginationLabel: paginationLabel, paginationLocation: paginationLocation, paginationSize: paginationSize, setPaginationEnd: setPaginationEnd, setPaginationStart: setPaginationStart, children: jsx("div", { ...useMergedProps(props, info.propsGridlist, { ref, class: `list-group gridlist-group` }), children: jsx(GridlistRows, { children: children, paginationMin: paginationStart, paginationMax: paginationEnd, staggered: staggered || false, render: useCallback(infoRows => {
                                        return (jsx(Fragment, { children: infoRows.rearrangeableChildrenReturn.children }));
                                    }, []) }) }) }), labelPosition == "after" && labelJsx] }));
            } }) }));
})));
const ListItemNonPaginated = memo((function ListItemNonPaginated({ onPressSync, infoRowProps, hideBecausePaginated, hideBecauseStaggered, excludeSpace, onPress, loadingLabel, badge, disabled, iconEnd, iconStart, variantTheme, selected, keyboardControlsDescription, children, props, ref2 }) {
    return (jsx(ProgressWithHandler, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", asyncHandler: async (a, b) => {
            // TODO: How'd we end up with onPress (from the user) AND onPress (from selection)?
            // Should selection have taken care of that? Does it already? What if it's async?
            let p = onPress?.(a, b);
            onPressSync?.(b);
            if (p && typeof p == "object" && "then" in p)
                await p;
        }, capture: returnUndefined, tagProgressIndicator: "span", render: progressInfo => {
            const { refElementReturn: { getElement }, refElementReturn, propsStable: p2 } = useRefElement({ refElementParameters: {} });
            const { pressReturn: { longPress, pressing }, props: p1 } = usePress({
                pressParameters: {
                    focusSelf: useCallback(() => {
                        return getElement()?.focus();
                    }, []),
                    allowRepeatPresses: null,
                    excludeEnter: null,
                    excludePointer: null,
                    longPressThreshold: null,
                    onPressingChange: null,
                    excludeSpace,
                    onPressSync: progressInfo.asyncHandlerReturn.syncHandler
                },
                refElementReturn
            });
            const show = !hideBecauseStaggered;
            const { propsProgressIndicator, propsProgressRegion } = progressInfo;
            const loadingJsx = (jsx(Fade, { show: progressInfo.asyncHandlerReturn.pending, exitVisibility: "removed", children: jsx("span", { className: "spinner-border spinner-border-sm text-secondary", ...propsProgressIndicator }) }));
            //const buttonClass = clsx(`btn position-relative`, variantDropdown && "dropdown-toggle", variantDropdown == "split" && "dropdown-toggle-split", variantSize && `btn-${variantSize}`, `btn${variantFill == "outline" ? "-outline" : ""}-${variantTheme || "primary"}`, pending && "pending", pressed && "pressed", disabled && "disabled", buttonInfo.pressReturn.pseudoActive && "active");
            const finalPropsForText = useMergedProps(p1, p2);
            const finalPropsForDiv = useMergedProps(infoRowProps, { ...props, ref: ref2 }, {
                className: clsx(hideBecausePaginated ? "d-none" : "", `gridlist-item`, variantTheme && `list-group-item-${variantTheme}`, hideBecausePaginated ? "d-none" : "", !show && "gridlist-item-placeholder", "list-group-item list-group-item-action", !!iconStart && "list-group-item-with-icon-start", !!iconEnd && "list-group-item-with-icon-end", !!badge && "list-group-item-with-badge", !!progressInfo.asyncHandlerReturn.pending && "list-group-item-with-pending", disabled && "disabled", (selected) && `active`)
            });
            const c = jsxs(Fragment, { children: [jsx(ListItemStartEnd, { index: 0, hidden: iconStart == null, children: iconStart }), jsxs(ListItemText, { onPress: progressInfo.asyncHandlerReturn.syncHandler, ...finalPropsForText, children: [children, jsxs("span", { className: "list-group-item-badge-and-spinner", children: [jsx("div", { children: badge }), jsx("div", { children: loadingJsx })] })] }), jsx(ListItemStartEnd, { index: 2, hidden: iconEnd == null, children: iconEnd })] });
            const typeaheadStatus = useContext(TypeaheadStatus);
            if (!show)
                if (hideBecausePaginated)
                    return null;
                else
                    return jsx("div", { "aria-busy": "true", className: "gridlist-item gridlist-item-placeholder", children: jsx("span", { className: clsx(!show ? "opacity-100" : "opacity-0", "placeholder-glow"), children: jsx("span", { className: "placeholder w-100" }) }) });
            return (jsx(KeyboardAssistIcon, { leftRight: (!!iconStart || !!iconEnd), upDown: true, homeEnd: true, pageKeys: true, typeaheadStatus: typeaheadStatus, activateSpace: typeaheadStatus == 'none', activateEnter: true, description: keyboardControlsDescription ?? "Select a list item:", children: jsx("div", { "aria-busy": (!show), ...finalPropsForDiv, children: show && c }) }));
        } }));
}));
const ListItem = memo(forwardElementRef((function ListItem({ index, keyboardControlsDescription, variantTheme, children, selected, disabled, iconEnd, iconStart, badge, onPress, loadingLabel, onSelectedChange, ...props }, ref) {
    const defaultDisabled = useContext(DefaultDisabled);
    disabled ||= defaultDisabled;
    //let everShownPaginated = useRef(false);
    return (jsx(GridlistRow, { index: index, singleSelectionDisabled: disabled, noTypeahead: true, getText: useCallback((e) => { return e?.querySelector(".gridlist-item-text")?.textContent || ""; }, []), render: infoRow => {
            const p2 = (props);
            const p3 = useMergedProps(infoRow.props, props);
            if (infoRow.paginatedChildReturn.hideBecausePaginated)
                return createElement$1("div", { ...p3, key: "hide-because-paginated" });
            // TODO: Get a better placeholder system
            if (infoRow.hidden)
                return createElement$1("div", { ...p3, key: "hide-because-staggered", className: `gridlist-item gridlist-item-placeholder list-group-item`, role: "option", "aria-busy": "true" }); // Besides being a placeholder visually, this is orders of magnitude faster than null, for some reason?
            return jsx(ListItemNonPaginated, { keyboardControlsDescription: keyboardControlsDescription, infoRowProps: infoRow.props, excludeSpace: infoRow.pressParameters.excludeSpace, onPressSync: infoRow.pressParameters.onPressSync, onPress: onPress, hideBecausePaginated: false, hideBecauseStaggered: false, loadingLabel: loadingLabel, badge: badge, children: children, disabled: disabled, iconEnd: iconEnd, iconStart: iconStart, selected: selected, variantTheme: variantTheme, props: p2, ref2: ref }, "show");
        } }));
})));
const ListItemText = memo(forwardElementRef((function ListItemText({ onPress, children, ...props }, ref) {
    return (jsx(GridlistChild, { index: 1, onPressSync: onPress, render: infoCell => {
            return (jsx("div", { ...useMergedProps(infoCell.propsCell, infoCell.propsPress, infoCell.propsTabbable, props, { ref }, { class: clsx("gridlist-item-text") }), children: children }));
        } }));
})));
const ListItemStartEnd = memo((function ListItemStartEnd({ hidden, index, children }) {
    return (jsx(GridlistChild, { index: index, untabbable: hidden, focusSelf: useStableCallback(e => {
            e.focus();
        }), render: infoCell => {
            const ret = (jsx("div", { className: clsx("list-group-item-icon", `list-group-item-icon-${index === 0 ? "start" : "end"}`), children: useClonedElement(children, useMergedProps(infoCell.propsCell, infoCell.propsTabbable), undefined) }));
            if (hidden)
                return jsx(Fragment, { children: null });
            else
                return ret;
        } }));
}));

const Menu = memo(forwardElementRef(function Menu({ anchor, forceOpen, children, selectedIndex, align, keyboardControlsDescription, onSelectedIndexChange, ...props }, ref) {
    const [openFromAnchor, setOpenFromAnchor, getOpenFromAnchor] = useState(forceOpen ?? false);
    const onOpen = useCallback(() => { setOpenFromAnchor(true); }, []);
    const onClose = useCallback(() => { setOpenFromAnchor(false); }, []);
    const onAnchorPress = useStableCallback(() => {
        if (getOpenFromAnchor())
            onClose();
        else
            onOpen();
    });
    // IMPORTANT: The popper must open on a delay, earlier than the menu itself.
    // This is because the menu focuses itself when it opens, and that position may be WRONG while popper is still positioning itself.
    // For performance reasons poppers also don't position themselves until they open, so it could be, at, like, the top of the screen or something.
    // If we focus the popper while it's at the wrong position, the screen will fly off to some random position (probably the top of the page).
    //
    // TODO: Popper positioning is async, so we should probably have a return from that that lets us know when we can open the menu.
    // It might not be 10ms every time.
    const popperOpen = (forceOpen ?? openFromAnchor);
    const [menuOpen, setMenuOpen] = useState(false);
    useTimeout({
        timeout: 10,
        callback: () => setMenuOpen(popperOpen),
        triggerIndex: popperOpen
    });
    return (jsx(Menu$1, { onOpen: onOpen, onDismiss: onClose, active: menuOpen, openDirection: "down", orientation: "vertical", singleSelectionMode: "activation", singleSelectionAriaPropName: "aria-selected", singleSelectedIndex: selectedIndex, onSingleSelectedIndexChange: useStableCallback(e => onSelectedIndexChange?.(e[EventDetail].selectedIndex)), render: (info) => {
            const portalId = usePortalId("menu");
            const { propsArrow, propsPopup, propsSource, propsData } = usePopper({
                popperParameters: {
                    open: popperOpen,
                    placement: `bottom-${align || "start"}`,
                    alignMode: "element",
                    absolutePositioning: false
                }
            });
            return (jsxs(Fragment, { children: [useClonedElement(anchor, useMergedProps({
                        onPress: onAnchorPress,
                        class: popperOpen ? "active" : ""
                    }, props, info.propsTrigger, propsSource), ref), useDefaultRenderPortal({
                        portalId,
                        children: (jsxs(StructureMenuPopper, { ...propsPopup, children: [jsx(StructureMenuArrow, { ...propsArrow }), jsxs(StructureMenuRoot, { ...info.propsSurface, popperOpen: popperOpen, typeaheadStatus: info.typeaheadNavigationReturn.typeaheadStatus, keyboardControlsDescription: keyboardControlsDescription ?? "Move to a menu item:", children: [jsx(StructureMenuFocusSentinel, { ...info.propsSentinel }), jsx(StructureMenuList, { ...info.propsTarget, children: children }), jsx(StructureMenuFocusSentinel, { ...info.propsSentinel })] })] }))
                    })] }));
        } }));
}));
const StructureMenuPopper = memoForwardRef(function StructureMenuPopper({ children, ...props }, ref) {
    return (jsx("div", { ...useMergedProps({ className: "popper-menu" }, { ...props, ref }), children: children }));
});
const StructureMenuRoot = memoForwardRef(function StructureMenuRoot({ popperOpen, typeaheadStatus, children, keyboardControlsDescription, ...props }, ref) {
    return (jsx(ZoomFade, { show: popperOpen, delayMountUntilShown: true, exitVisibility: "removed", zoomOriginInline: 0, zoomOriginBlock: 0, zoomMinInline: 0.85, zoomMinBlock: 0.85, children: jsx(KeyboardAssistIcon, { leftRight: false, upDown: true, homeEnd: true, pageKeys: true, typeaheadStatus: typeaheadStatus, activateSpace: typeaheadStatus == 'none', activateEnter: true, description: keyboardControlsDescription, children: jsx("div", { ...useMergedProps({ className: clsx("dropdown-menu shadow show") }, { ...props, ref }), children: children }) }) }));
});
const StructureMenuList = memoForwardRef(function StructureMenuList({ children, ...props }, ref) {
    return (jsx("div", { ...useMergedProps({ className: "dropdown-menu-list" }, { ...props, ref }), children: children }));
});
const StructureMenuArrow = memoForwardRef(function StructureMenuArrow(props, ref) {
    return (jsx("div", { ...props, ref: ref }));
});
const StructureMenuFocusSentinel = memoForwardRef(function StructureMenuFocusSentinel(props, ref) {
    return (jsx("div", { ...props, ref: ref }));
});
const MenuItem = memo(forwardElementRef(function MenuItem({ index, getSortValue, disabled, loadingLabel, onPress, children, ...props }, ref) {
    const imperativeHandle = useRef(null);
    return (jsx(ProgressWithHandler, { asyncHandler: (_unused, e) => {
            console.assert(!!imperativeHandle.current);
            return onPress?.(imperativeHandle.current.menuItemReturn.closeMenu, e);
        }, ariaLabel: loadingLabel || "The operation is in progress", capture: returnUndefined, tagProgressIndicator: "div", render: progressInfo => {
            const showSpinner = (progressInfo.asyncHandlerReturn.pending || progressInfo.asyncHandlerReturn.debouncingAsync || progressInfo.asyncHandlerReturn.debouncingSync);
            return (jsx(MenuItem$1, { imperativeHandle: imperativeHandle, index: index, singleSelectionDisabled: disabled || showSpinner, onPress: progressInfo.asyncHandlerReturn.syncHandler, render: menuInfo => {
                    return (jsxs(StructureMenuItem, { ...useMergedProps(menuInfo.props, { ...props, ref }), showSpinner: showSpinner, disabled: (!!disabled), pressing: menuInfo.pressReturn.pressing, children: [children, jsx(StructureMenuItemSpinner, { showSpinner: showSpinner, ...progressInfo.propsProgressIndicator })] }));
                    /*const spinnerJsx = (<Fade show={showSpinner} exitVisibility="removed"><div {...progressInfo.propsProgressIndicator} className={clsx("spinner-border", "spinner-border-sm")} /></Fade>)
    
                    return (
                        <div {...useMergedProps(menuInfo.props, { ref, className: clsx("dropdown-item dropdown-item-with-icon-end", showSpinner && "pending", disabled && "disabled", menuInfo.pressReturn.pressing && "active") }, props)}>
                            {children}
                            <div className="dropdown-item-icon dropdown-item-icon-end">{spinnerJsx}</div>
                        </div>
                    )*/
                } }));
        } }));
}));
const StructureMenuItem = memoForwardRef(function StructureMenuItem({ children, showSpinner, disabled, pressing, ...props }, ref) {
    return (jsx("div", { ...useMergedProps({ className: clsx("dropdown-item dropdown-item-with-icon-end", showSpinner && "pending", disabled && "disabled", pressing && "active") }, { ...props, ref }), children: children }));
});
const StructureMenuItemSpinner = memoForwardRef(function StructureMenuItemSpinner({ showSpinner, ...props }, ref) {
    return (jsx("div", { className: "dropdown-item-icon dropdown-item-icon-end", children: jsx(Fade, { show: showSpinner, exitVisibility: "removed", children: jsx("div", { ...useMergedProps({ class: clsx("spinner-border", "spinner-border-sm") }, { ...props, ref }) }) }) }));
});

const StructureOffcanvasPortalRoot = memoForwardRef(function StructureOffcanvasPortalRoot({ children, ...props }, ref) { return (jsx("div", { ...props, ref: ref, children: children })); });
const StructureOffcanvasBackdrop = memoForwardRef(function StructureOffcanvasBackdrop({ open, ...props }, ref) {
    return (jsx(Fade, { show: open, fadeMax: 0.25, duration: 350, children: jsx("div", { ...useMergedProps({ class: "offcanvas-backdrop" }, { ...props, ref }) }) }));
});
const StructureOffcanvasModalTitle = memoForwardRef(function StructureOffcanvasModalTitle({ children, ...props }, ref) {
    return (jsx("div", { ...useMergedProps({ class: "offcanvas-title" }, { ...props, ref }), children: children }));
});
const StructureOffcanvasModalCloseButton = memoForwardRef(function StructureOffcanvasModalCloseButton({ onClose, ...props }, ref) {
    return (jsx(Button, { onPress: (_pressed, e) => onClose(e, "escape"), ...useMergedProps({ class: "btn-close", "aria-label": "Close" }, { ...props, ref }) }));
});
const StructureOffcanvasModalBody = memoForwardRef(function StructureOffcanvasModalBody({ children, ...props }, ref) {
    return (jsx("div", { ...useMergedProps({ class: "offcanvas-body" }, { ...props, ref }), children: children }));
});
const StructureOffcanvasModalHeader = memoForwardRef(function StructureOffcanvasModalHeader({ children, ...props }, ref) {
    return (jsx("div", { ...useMergedProps({ class: "offcanvas-header" }, { ...props, ref }), children: children }));
});
const StructureOffcanvasModal = memoForwardRef(function StructureOffcanvasModal({ open, children, ...props }, ref) {
    const otherProps = {
        tabIndex: -1,
        className: clsx("offcanvas")
    };
    return (jsx(Slide, { show: open, slideTargetInline: -1, duration: 350, children: jsx("div", { ...useMergedProps(otherProps, { ...props, ref }), children: children }) }));
});

const Offcanvas = memo(forwardElementRef(function Offcanvas({ open, header, headerPosition, onClose, anchor, children, propsPortal, ...props }, ref) {
    headerPosition ??= "start";
    if (headerPosition == "hidden") {
        console.assert(typeof header == "string", `An offcanvas whose label is hidden must provide the label to use as a string to the header`);
    }
    return (jsx(Dialog$1, { ariaLabel: headerPosition == "hidden" ? header : null, active: open, onDismiss: onClose, focusPopup: (e, f) => f()?.focus?.(), dismissBackdropActive: true, dismissEscapeActive: true, render: info => {
            return (jsxs(Fragment, { children: [useClonedElement(anchor, useMergedProps(info.propsSource, props), ref), useDefaultRenderPortal({
                        portalId: usePortalId("offcanvas"),
                        children: (jsxs(StructureOffcanvasPortalRoot, { ...useMergedProps(info.propsFocusContainer, propsPortal || {}), children: [jsxs(StructureOffcanvasModal, { open: open, ...info.propsDialog, children: [jsxs(StructureOffcanvasModalHeader, { children: [jsx(StructureOffcanvasModalTitle, { ...info.propsTitle, children: header }), jsx(StructureOffcanvasModalCloseButton, { onClose: onClose })] }), jsx(StructureOffcanvasModalBody, { children: children })] }), jsx(StructureOffcanvasBackdrop, { open: open })] }))
                    })] }));
        } }));
}));

function Popover({ children, label, align, buttonVariantDropdown, buttonVariantFill, buttonVariantSize, buttonVariantTheme, disabled, forceOpen, imperativeHandle, header, onSelectedIndexChange, selectedIndex, ...props }, ref) {
    const [openFromAnchor, setOpenFromAnchor, getOpenFromAnchor] = useState(forceOpen ?? false);
    const onOpen = useCallback(() => { setOpenFromAnchor(true); }, []);
    const onClose = useCallback(() => { setOpenFromAnchor(false); }, []);
    const onAnchorPress = useStableCallback(() => {
        if (getOpenFromAnchor())
            onClose();
        else
            onOpen();
    });
    // IMPORTANT: The popper must open on a delay, earlier than the menu itself.
    // This is because the menu focuses itself when it opens, and that position may be WRONG while popper is still positioning itself.
    // For performance reasons poppers also don't position themselves until they open, so it could be, at, like, the top of the screen or something.
    // If we focus the popper while it's at the wrong position, the screen will fly off to some random position (probably the top of the page).
    //
    // TODO: Popper positioning is async, so we should probably have a return from that that lets us know when we can open the menu.
    // It might not be 10ms every time.
    const popperOpen = (forceOpen ?? openFromAnchor);
    const [menuOpen, setMenuOpen] = useState(false);
    useTimeout({
        timeout: 10,
        callback: () => setMenuOpen(popperOpen),
        triggerIndex: popperOpen
    });
    useImperativeHandle(imperativeHandle, () => info);
    const portalId = usePortalId("menu");
    const { propsArrow, propsPopup, propsSource, propsData } = usePopper({
        popperParameters: {
            open: popperOpen,
            placement: `bottom-${align || "start"}`,
            alignMode: "element"
        }
    });
    const defaultParentDepth = useContext(ParentDepthContext);
    let myDepth = (defaultParentDepth) + 1;
    const { propsSource: randomIdProps, randomIdReturn: { id: surfaceId } } = useRandomId({ randomIdParameters: { prefix: "popover-surface-", otherReferencerProp: "aria-controls" } });
    const info = useMenuSurface({
        activeElementParameters: {
            getDocument: useDefault("getDocument", undefined),
            onActiveElementChange: null,
            onLastActiveElementChange: null,
            onWindowFocusedChange: null
        },
        modalParameters: { active: menuOpen },
        dismissParameters: { onDismiss: onClose },
        escapeDismissParameters: { parentDepth: defaultParentDepth },
        focusTrapParameters: { focusPopup: useStableCallback((e, f) => f()?.focus()) },
        menuSurfaceParameters: { role: "dialog", surfaceId },
    });
    return (jsxs(Fragment, { children: [jsx(Button, { variantDropdown: buttonVariantDropdown, variantFill: buttonVariantFill, variantSize: buttonVariantSize, variantTheme: buttonVariantTheme, onPress: onAnchorPress, disabled: disabled, ...useMergedProps({ class: popperOpen ? "active" : "", ref }, props, info.propsTrigger, propsSource), children: label }), useDefaultRenderPortal({
                portalId,
                children: (jsx(ParentDepthContext.Provider, { value: myDepth, children: jsxs("div", { ...useMergedProps(propsPopup, { className: "popper-popover" }), children: [jsx("div", { ...propsArrow }), jsx(ZoomFade, { show: popperOpen, delayMountUntilShown: true, exitVisibility: "removed", zoomOriginInline: 0, zoomOriginBlock: 0, zoomMinInline: 0.85, zoomMinBlock: 0.85, children: jsxs("div", { ...useMergedProps(info.propsSurface, { className: clsx("popover bs-popover-auto fade show") }), children: [jsx("div", { ...info.propsSentinel }), header && jsx("h3", { className: "popover-header", children: header }), jsx("div", { ...useMergedProps(info.propsTarget, { className: "dpopover-body" }), children: children }), jsx("div", { ...info.propsSentinel })] }) })] }) }))
            })] }));
}

const StructureRadioWrapper = memoForwardRef(function StructureRadioWrapper({ labelPosition, pending, inline, children, ...props }, ref) {
    return (jsx("span", { ...useMergedProps({ ...props, ref }, {
            className: clsx("form-check", pending && "pending", inline && "form-check-inline", labelPosition == "before" && "form-check-reverse")
        }), children: children }));
});

const RadioGroupContext = createContext(null);
const RadioGroup = forwardElementRef(function RadioGroup({ onValueChange: onSelectedIndexChangeAsync, keyboardControlsDescription, fieldset, selectionMode, name, children, inline, selectedValue, debounce, throttle, label, labelPosition, disabled, ...props }, ref) {
    labelPosition ??= (fieldset ? "within" : "before");
    selectionMode ??= "focus";
    const imperativeHandle = useRef(null);
    // Note: We use useAsync, instead of useAsyncHandler, because the actual event handler isn't here.
    // If we were listening for the individual radios' onInput events, we would do that, but
    // we're just listening for a regular ol' function.
    const [capturedValue, setCapturedValue] = useState(null);
    const { syncHandler: onSelectedIndexChangeSync, pending } = useAsync((event) => { return onSelectedIndexChangeAsync?.(event[EventDetail$1].selectedValue, event); }, {
        capture: (event) => { setCapturedValue(event[EventDetail$1].selectedValue); return [event]; },
        throttle,
        debounce
    });
    const pendingValue = (pending ? capturedValue : null);
    inline ??= false;
    if (labelPosition == "hidden")
        console.assert(typeof label == "string");
    return (jsx(DisabledContext$1.Provider, { value: disabled ?? false, children: jsx(RadioGroupContext.Provider, { value: useMemo(() => ({ pendingValue, inline: inline }), [pendingValue, inline]), children: jsx(RadioGroup$1, { ariaLabel: labelPosition == 'hidden' ? label : null, selectedValue: pendingValue ?? selectedValue, imperativeHandle: imperativeHandle, name: name, onSelectedValueChange: onSelectedIndexChangeSync, arrowKeyDirection: inline ? "horizontal" : "vertical", singleSelectionMode: selectionMode, render: info => {
                    const E = (fieldset ? "fieldset" : "span");
                    const L = (fieldset ? "legend" : "label");
                    const visibleLabel = jsx(L, { ...useMergedProps({ class: clsx("form-label radio-group-label") }, info.propsRadioGroupLabel), children: label });
                    return (jsxs(Fragment, { children: [labelPosition == "before" && visibleLabel, jsx(KeyboardAssistIcon, { leftRight: !!inline, upDown: !inline, homeEnd: true, pageKeys: true, typeaheadStatus: info.typeaheadNavigationReturn.typeaheadStatus, activateSpace: info.typeaheadNavigationReturn.typeaheadStatus == 'none', activateEnter: true, description: keyboardControlsDescription ?? "Select an option:", children: jsxs(E, { ...useMergedProps({ className: clsx("radio-group"), ref }, info.propsRadioGroup, props), children: [labelPosition == "within" && visibleLabel, children] }) }), labelPosition == "after" && visibleLabel] }));
                } }) }) }));
});
const Radio = forwardElementRef(function Radio({ index, label, value, labelPosition, loadingLabel, debounce, throttle, disabled: userDisabled, ...props }, ref) {
    labelPosition ||= "after";
    const radioGroupInfo = useContext(RadioGroupContext);
    const { pendingValue, inline } = (radioGroupInfo ?? {});
    const singleSelectPending = pendingValue != null && (pendingValue === value);
    return (jsx(Progress, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", value: singleSelectPending ? "indeterminate" : "disabled", tagProgressIndicator: "span", render: progressInfo => {
            const { propsProgressIndicator, propsProgressRegion, propsProgressLabel } = progressInfo;
            //const inButtonGroup = (useContext(ButtonGroupContext) ?? false);
            const defaultDisabled = useContext(DisabledContext$1);
            const disabledType = useContext(DefaultDisabledType);
            let disabled = userDisabled;
            disabled ||= defaultDisabled;
            disabled ||= (pendingValue != null);
            //disabled ||= progressInfo.asyncHandlerReturn.pending;
            const d = disabled ? disabledType : false;
            //const buttonClass = clsx(`btn`, `btn-${variantTheme ?? "primary"}`, asyncHandlerReturn.pending && "pending", disabled && "disabled");
            const pending = singleSelectPending; //(pendingValue != null);
            const loadingJsx = (jsx(Fade, { show: pending, exitVisibility: "removed", children: jsx("span", { ...useMergedProps(propsProgressIndicator, { class: "spinner-border" }) }) }));
            const labelRef = useRef(null);
            if (labelPosition == "hidden")
                console.assert(typeof label == "string");
            return (jsx(Radio$1, { ariaLabel: labelPosition == 'hidden' ? label : null, value: value, index: index, labelPosition: labelPosition == "hidden" ? "none" : "separate", tagInput: "input", tagLabel: "label", disabled: d, getText: () => labelRef.current?.textContent || `${value}` || "", render: info => {
                    const inputJsx = jsx("input", { className: "form-check-input", ...useMergedProps(info.propsInput, props, { ref }) });
                    return (jsxs(StructureRadioWrapper, { inline: inline || false, pending: pending, labelPosition: labelPosition, children: [loadingJsx, jsxs("label", { ...useMergedProps({ class: "form-check-label", ref: labelRef }, info.propsLabel), children: [labelPosition == "before" && label, labelPosition == "tooltip" ? jsx(Tooltip, { forward: true, tooltip: label, alignMode: "element", absolutePositioning: true, children: inputJsx }) : inputJsx, labelPosition == "after" && label] })] }));
                } }));
        } }));
});

class JSBI extends Array{constructor(i,_){if(super(i),this.sign=_,Object.setPrototypeOf(this,JSBI.prototype),i>JSBI.__kMaxLength)throw new RangeError("Maximum BigInt size exceeded")}static BigInt(i){var _=Math.floor,t=Number.isFinite;if("number"==typeof i){if(0===i)return JSBI.__zero();if(JSBI.__isOneDigitInt(i))return 0>i?JSBI.__oneDigit(-i,!0):JSBI.__oneDigit(i,!1);if(!t(i)||_(i)!==i)throw new RangeError("The number "+i+" cannot be converted to BigInt because it is not an integer");return JSBI.__fromDouble(i)}if("string"==typeof i){const _=JSBI.__fromString(i);if(null===_)throw new SyntaxError("Cannot convert "+i+" to a BigInt");return _}if("boolean"==typeof i)return !0===i?JSBI.__oneDigit(1,!1):JSBI.__zero();if("object"==typeof i){if(i.constructor===JSBI)return i;const _=JSBI.__toPrimitive(i);return JSBI.BigInt(_)}throw new TypeError("Cannot convert "+i+" to a BigInt")}toDebugString(){const i=["BigInt["];for(const _ of this)i.push((_?(_>>>0).toString(16):_)+", ");return i.push("]"),i.join("")}toString(i=10){if(2>i||36<i)throw new RangeError("toString() radix argument must be between 2 and 36");return 0===this.length?"0":0==(i&i-1)?JSBI.__toStringBasePowerOfTwo(this,i):JSBI.__toStringGeneric(this,i,!1)}valueOf(){throw new Error("Convert JSBI instances to native numbers using `toNumber`.")}static toNumber(i){const _=i.length;if(0===_)return 0;if(1===_){const _=i.__unsignedDigit(0);return i.sign?-_:_}const t=i.__digit(_-1),e=JSBI.__clz30(t),n=30*_-e;if(1024<n)return i.sign?-Infinity:1/0;let g=n-1,s=t,o=_-1;const l=e+3;let r=32===l?0:s<<l;r>>>=12;const a=l-12;let u=12<=l?0:s<<20+l,d=20+l;for(0<a&&0<o&&(o--,s=i.__digit(o),r|=s>>>30-a,u=s<<a+2,d=a+2);0<d&&0<o;)o--,s=i.__digit(o),u|=30<=d?s<<d-30:s>>>30-d,d-=30;const h=JSBI.__decideRounding(i,d,o,s);if((1===h||0===h&&1==(1&u))&&(u=u+1>>>0,0===u&&(r++,0!=r>>>20&&(r=0,g++,1023<g))))return i.sign?-Infinity:1/0;const m=i.sign?-2147483648:0;return g=g+1023<<20,JSBI.__kBitConversionInts[1]=m|g|r,JSBI.__kBitConversionInts[0]=u,JSBI.__kBitConversionDouble[0]}static unaryMinus(i){if(0===i.length)return i;const _=i.__copy();return _.sign=!i.sign,_}static bitwiseNot(i){return i.sign?JSBI.__absoluteSubOne(i).__trim():JSBI.__absoluteAddOne(i,!0)}static exponentiate(i,_){if(_.sign)throw new RangeError("Exponent must be positive");if(0===_.length)return JSBI.__oneDigit(1,!1);if(0===i.length)return i;if(1===i.length&&1===i.__digit(0))return i.sign&&0==(1&_.__digit(0))?JSBI.unaryMinus(i):i;if(1<_.length)throw new RangeError("BigInt too big");let t=_.__unsignedDigit(0);if(1===t)return i;if(t>=JSBI.__kMaxLengthBits)throw new RangeError("BigInt too big");if(1===i.length&&2===i.__digit(0)){const _=1+(0|t/30),e=i.sign&&0!=(1&t),n=new JSBI(_,e);n.__initializeDigits();const g=1<<t%30;return n.__setDigit(_-1,g),n}let e=null,n=i;for(0!=(1&t)&&(e=i),t>>=1;0!==t;t>>=1)n=JSBI.multiply(n,n),0!=(1&t)&&(null===e?e=n:e=JSBI.multiply(e,n));return e}static multiply(_,t){if(0===_.length)return _;if(0===t.length)return t;let i=_.length+t.length;30<=_.__clzmsd()+t.__clzmsd()&&i--;const e=new JSBI(i,_.sign!==t.sign);e.__initializeDigits();for(let n=0;n<_.length;n++)JSBI.__multiplyAccumulate(t,_.__digit(n),e,n);return e.__trim()}static divide(i,_){if(0===_.length)throw new RangeError("Division by zero");if(0>JSBI.__absoluteCompare(i,_))return JSBI.__zero();const t=i.sign!==_.sign,e=_.__unsignedDigit(0);let n;if(1===_.length&&32767>=e){if(1===e)return t===i.sign?i:JSBI.unaryMinus(i);n=JSBI.__absoluteDivSmall(i,e,null);}else n=JSBI.__absoluteDivLarge(i,_,!0,!1);return n.sign=t,n.__trim()}static remainder(i,_){if(0===_.length)throw new RangeError("Division by zero");if(0>JSBI.__absoluteCompare(i,_))return i;const t=_.__unsignedDigit(0);if(1===_.length&&32767>=t){if(1===t)return JSBI.__zero();const _=JSBI.__absoluteModSmall(i,t);return 0===_?JSBI.__zero():JSBI.__oneDigit(_,i.sign)}const e=JSBI.__absoluteDivLarge(i,_,!1,!0);return e.sign=i.sign,e.__trim()}static add(i,_){const t=i.sign;return t===_.sign?JSBI.__absoluteAdd(i,_,t):0<=JSBI.__absoluteCompare(i,_)?JSBI.__absoluteSub(i,_,t):JSBI.__absoluteSub(_,i,!t)}static subtract(i,_){const t=i.sign;return t===_.sign?0<=JSBI.__absoluteCompare(i,_)?JSBI.__absoluteSub(i,_,t):JSBI.__absoluteSub(_,i,!t):JSBI.__absoluteAdd(i,_,t)}static leftShift(i,_){return 0===_.length||0===i.length?i:_.sign?JSBI.__rightShiftByAbsolute(i,_):JSBI.__leftShiftByAbsolute(i,_)}static signedRightShift(i,_){return 0===_.length||0===i.length?i:_.sign?JSBI.__leftShiftByAbsolute(i,_):JSBI.__rightShiftByAbsolute(i,_)}static unsignedRightShift(){throw new TypeError("BigInts have no unsigned right shift; use >> instead")}static lessThan(i,_){return 0>JSBI.__compareToBigInt(i,_)}static lessThanOrEqual(i,_){return 0>=JSBI.__compareToBigInt(i,_)}static greaterThan(i,_){return 0<JSBI.__compareToBigInt(i,_)}static greaterThanOrEqual(i,_){return 0<=JSBI.__compareToBigInt(i,_)}static equal(_,t){if(_.sign!==t.sign)return !1;if(_.length!==t.length)return !1;for(let e=0;e<_.length;e++)if(_.__digit(e)!==t.__digit(e))return !1;return !0}static notEqual(i,_){return !JSBI.equal(i,_)}static bitwiseAnd(i,_){var t=Math.max;if(!i.sign&&!_.sign)return JSBI.__absoluteAnd(i,_).__trim();if(i.sign&&_.sign){const e=t(i.length,_.length)+1;let n=JSBI.__absoluteSubOne(i,e);const g=JSBI.__absoluteSubOne(_);return n=JSBI.__absoluteOr(n,g,n),JSBI.__absoluteAddOne(n,!0,n).__trim()}return i.sign&&([i,_]=[_,i]),JSBI.__absoluteAndNot(i,JSBI.__absoluteSubOne(_)).__trim()}static bitwiseXor(i,_){var t=Math.max;if(!i.sign&&!_.sign)return JSBI.__absoluteXor(i,_).__trim();if(i.sign&&_.sign){const e=t(i.length,_.length),n=JSBI.__absoluteSubOne(i,e),g=JSBI.__absoluteSubOne(_);return JSBI.__absoluteXor(n,g,n).__trim()}const e=t(i.length,_.length)+1;i.sign&&([i,_]=[_,i]);let n=JSBI.__absoluteSubOne(_,e);return n=JSBI.__absoluteXor(n,i,n),JSBI.__absoluteAddOne(n,!0,n).__trim()}static bitwiseOr(i,_){var t=Math.max;const e=t(i.length,_.length);if(!i.sign&&!_.sign)return JSBI.__absoluteOr(i,_).__trim();if(i.sign&&_.sign){let t=JSBI.__absoluteSubOne(i,e);const n=JSBI.__absoluteSubOne(_);return t=JSBI.__absoluteAnd(t,n,t),JSBI.__absoluteAddOne(t,!0,t).__trim()}i.sign&&([i,_]=[_,i]);let n=JSBI.__absoluteSubOne(_,e);return n=JSBI.__absoluteAndNot(n,i,n),JSBI.__absoluteAddOne(n,!0,n).__trim()}static asIntN(_,t){var i=Math.floor;if(0===t.length)return t;if(_=i(_),0>_)throw new RangeError("Invalid value: not (convertible to) a safe integer");if(0===_)return JSBI.__zero();if(_>=JSBI.__kMaxLengthBits)return t;const e=0|(_+29)/30;if(t.length<e)return t;const g=t.__unsignedDigit(e-1),s=1<<(_-1)%30;if(t.length===e&&g<s)return t;if(!((g&s)===s))return JSBI.__truncateToNBits(_,t);if(!t.sign)return JSBI.__truncateAndSubFromPowerOfTwo(_,t,!0);if(0==(g&s-1)){for(let n=e-2;0<=n;n--)if(0!==t.__digit(n))return JSBI.__truncateAndSubFromPowerOfTwo(_,t,!1);return t.length===e&&g===s?t:JSBI.__truncateToNBits(_,t)}return JSBI.__truncateAndSubFromPowerOfTwo(_,t,!1)}static asUintN(i,_){var t=Math.floor;if(0===_.length)return _;if(i=t(i),0>i)throw new RangeError("Invalid value: not (convertible to) a safe integer");if(0===i)return JSBI.__zero();if(_.sign){if(i>JSBI.__kMaxLengthBits)throw new RangeError("BigInt too big");return JSBI.__truncateAndSubFromPowerOfTwo(i,_,!1)}if(i>=JSBI.__kMaxLengthBits)return _;const e=0|(i+29)/30;if(_.length<e)return _;const g=i%30;if(_.length==e){if(0===g)return _;const i=_.__digit(e-1);if(0==i>>>g)return _}return JSBI.__truncateToNBits(i,_)}static ADD(i,_){if(i=JSBI.__toPrimitive(i),_=JSBI.__toPrimitive(_),"string"==typeof i)return "string"!=typeof _&&(_=_.toString()),i+_;if("string"==typeof _)return i.toString()+_;if(i=JSBI.__toNumeric(i),_=JSBI.__toNumeric(_),JSBI.__isBigInt(i)&&JSBI.__isBigInt(_))return JSBI.add(i,_);if("number"==typeof i&&"number"==typeof _)return i+_;throw new TypeError("Cannot mix BigInt and other types, use explicit conversions")}static LT(i,_){return JSBI.__compare(i,_,0)}static LE(i,_){return JSBI.__compare(i,_,1)}static GT(i,_){return JSBI.__compare(i,_,2)}static GE(i,_){return JSBI.__compare(i,_,3)}static EQ(i,_){for(;;){if(JSBI.__isBigInt(i))return JSBI.__isBigInt(_)?JSBI.equal(i,_):JSBI.EQ(_,i);if("number"==typeof i){if(JSBI.__isBigInt(_))return JSBI.__equalToNumber(_,i);if("object"!=typeof _)return i==_;_=JSBI.__toPrimitive(_);}else if("string"==typeof i){if(JSBI.__isBigInt(_))return i=JSBI.__fromString(i),null!==i&&JSBI.equal(i,_);if("object"!=typeof _)return i==_;_=JSBI.__toPrimitive(_);}else if("boolean"==typeof i){if(JSBI.__isBigInt(_))return JSBI.__equalToNumber(_,+i);if("object"!=typeof _)return i==_;_=JSBI.__toPrimitive(_);}else if("symbol"==typeof i){if(JSBI.__isBigInt(_))return !1;if("object"!=typeof _)return i==_;_=JSBI.__toPrimitive(_);}else if("object"==typeof i){if("object"==typeof _&&_.constructor!==JSBI)return i==_;i=JSBI.__toPrimitive(i);}else return i==_}}static NE(i,_){return !JSBI.EQ(i,_)}static DataViewGetBigInt64(i,_,t=!1){return JSBI.asIntN(64,JSBI.DataViewGetBigUint64(i,_,t))}static DataViewGetBigUint64(i,_,t=!1){const[e,n]=t?[4,0]:[0,4],g=i.getUint32(_+e,t),s=i.getUint32(_+n,t),o=new JSBI(3,!1);return o.__setDigit(0,1073741823&s),o.__setDigit(1,(268435455&g)<<2|s>>>30),o.__setDigit(2,g>>>28),o.__trim()}static DataViewSetBigInt64(i,_,t,e=!1){JSBI.DataViewSetBigUint64(i,_,t,e);}static DataViewSetBigUint64(i,_,t,e=!1){t=JSBI.asUintN(64,t);let n=0,g=0;if(0<t.length&&(g=t.__digit(0),1<t.length)){const i=t.__digit(1);g|=i<<30,n=i>>>2,2<t.length&&(n|=t.__digit(2)<<28);}const[s,o]=e?[4,0]:[0,4];i.setUint32(_+s,n,e),i.setUint32(_+o,g,e);}static __zero(){return new JSBI(0,!1)}static __oneDigit(i,_){const t=new JSBI(1,_);return t.__setDigit(0,i),t}__copy(){const _=new JSBI(this.length,this.sign);for(let t=0;t<this.length;t++)_[t]=this[t];return _}__trim(){let i=this.length,_=this[i-1];for(;0===_;)i--,_=this[i-1],this.pop();return 0===i&&(this.sign=!1),this}__initializeDigits(){for(let _=0;_<this.length;_++)this[_]=0;}static __decideRounding(i,_,t,e){if(0<_)return -1;let n;if(0>_)n=-_-1;else {if(0===t)return -1;t--,e=i.__digit(t),n=29;}let g=1<<n;if(0==(e&g))return -1;if(g-=1,0!=(e&g))return 1;for(;0<t;)if(t--,0!==i.__digit(t))return 1;return 0}static __fromDouble(i){JSBI.__kBitConversionDouble[0]=i;const _=2047&JSBI.__kBitConversionInts[1]>>>20,t=_-1023,e=(0|t/30)+1,n=new JSBI(e,0>i);let g=1048575&JSBI.__kBitConversionInts[1]|1048576,s=JSBI.__kBitConversionInts[0];const o=20,l=t%30;let r,a=0;if(l<20){const i=o-l;a=i+32,r=g>>>i,g=g<<32-i|s>>>i,s<<=32-i;}else if(l===20)a=32,r=g,g=s,s=0;else {const i=l-o;a=32-i,r=g<<i|s>>>32-i,g=s<<i,s=0;}n.__setDigit(e-1,r);for(let _=e-2;0<=_;_--)0<a?(a-=30,r=g>>>2,g=g<<30|s>>>2,s<<=30):r=0,n.__setDigit(_,r);return n.__trim()}static __isWhitespace(i){return !!(13>=i&&9<=i)||(159>=i?32==i:131071>=i?160==i||5760==i:196607>=i?(i&=131071,10>=i||40==i||41==i||47==i||95==i||4096==i):65279==i)}static __fromString(i,_=0){let t=0;const e=i.length;let n=0;if(n===e)return JSBI.__zero();let g=i.charCodeAt(n);for(;JSBI.__isWhitespace(g);){if(++n===e)return JSBI.__zero();g=i.charCodeAt(n);}if(43===g){if(++n===e)return null;g=i.charCodeAt(n),t=1;}else if(45===g){if(++n===e)return null;g=i.charCodeAt(n),t=-1;}if(0===_){if(_=10,48===g){if(++n===e)return JSBI.__zero();if(g=i.charCodeAt(n),88===g||120===g){if(_=16,++n===e)return null;g=i.charCodeAt(n);}else if(79===g||111===g){if(_=8,++n===e)return null;g=i.charCodeAt(n);}else if(66===g||98===g){if(_=2,++n===e)return null;g=i.charCodeAt(n);}}}else if(16===_&&48===g){if(++n===e)return JSBI.__zero();if(g=i.charCodeAt(n),88===g||120===g){if(++n===e)return null;g=i.charCodeAt(n);}}if(0!=t&&10!==_)return null;for(;48===g;){if(++n===e)return JSBI.__zero();g=i.charCodeAt(n);}const s=e-n;let o=JSBI.__kMaxBitsPerChar[_],l=JSBI.__kBitsPerCharTableMultiplier-1;if(s>1073741824/o)return null;const r=o*s+l>>>JSBI.__kBitsPerCharTableShift,a=new JSBI(0|(r+29)/30,!1),u=10>_?_:10,h=10<_?_-10:0;if(0==(_&_-1)){o>>=JSBI.__kBitsPerCharTableShift;const _=[],t=[];let s=!1;do{let l=0,r=0;for(;;){let _;if(g-48>>>0<u)_=g-48;else if((32|g)-97>>>0<h)_=(32|g)-87;else {s=!0;break}if(r+=o,l=l<<o|_,++n===e){s=!0;break}if(g=i.charCodeAt(n),30<r+o)break}_.push(l),t.push(r);}while(!s);JSBI.__fillFromParts(a,_,t);}else {a.__initializeDigits();let t=!1,s=0;do{let r=0,b=1;for(;;){let o;if(g-48>>>0<u)o=g-48;else if((32|g)-97>>>0<h)o=(32|g)-87;else {t=!0;break}const l=b*_;if(1073741823<l)break;if(b=l,r=r*_+o,s++,++n===e){t=!0;break}g=i.charCodeAt(n);}l=30*JSBI.__kBitsPerCharTableMultiplier-1;const D=0|(o*s+l>>>JSBI.__kBitsPerCharTableShift)/30;a.__inplaceMultiplyAdd(b,r,D);}while(!t)}if(n!==e){if(!JSBI.__isWhitespace(g))return null;for(n++;n<e;n++)if(g=i.charCodeAt(n),!JSBI.__isWhitespace(g))return null}return a.sign=-1==t,a.__trim()}static __fillFromParts(_,t,e){let n=0,g=0,s=0;for(let o=t.length-1;0<=o;o--){const i=t[o],l=e[o];g|=i<<s,s+=l,30===s?(_.__setDigit(n++,g),s=0,g=0):30<s&&(_.__setDigit(n++,1073741823&g),s-=30,g=i>>>l-s);}if(0!==g){if(n>=_.length)throw new Error("implementation bug");_.__setDigit(n++,g);}for(;n<_.length;n++)_.__setDigit(n,0);}static __toStringBasePowerOfTwo(_,i){const t=_.length;let e=i-1;e=(85&e>>>1)+(85&e),e=(51&e>>>2)+(51&e),e=(15&e>>>4)+(15&e);const n=e,g=i-1,s=_.__digit(t-1),o=JSBI.__clz30(s);let l=0|(30*t-o+n-1)/n;if(_.sign&&l++,268435456<l)throw new Error("string too long");const r=Array(l);let a=l-1,u=0,d=0;for(let e=0;e<t-1;e++){const i=_.__digit(e),t=(u|i<<d)&g;r[a--]=JSBI.__kConversionChars[t];const s=n-d;for(u=i>>>s,d=30-s;d>=n;)r[a--]=JSBI.__kConversionChars[u&g],u>>>=n,d-=n;}const h=(u|s<<d)&g;for(r[a--]=JSBI.__kConversionChars[h],u=s>>>n-d;0!==u;)r[a--]=JSBI.__kConversionChars[u&g],u>>>=n;if(_.sign&&(r[a--]="-"),-1!=a)throw new Error("implementation bug");return r.join("")}static __toStringGeneric(_,i,t){const e=_.length;if(0===e)return "";if(1===e){let e=_.__unsignedDigit(0).toString(i);return !1===t&&_.sign&&(e="-"+e),e}const n=30*e-JSBI.__clz30(_.__digit(e-1)),g=JSBI.__kMaxBitsPerChar[i],s=g-1;let o=n*JSBI.__kBitsPerCharTableMultiplier;o+=s-1,o=0|o/s;const l=o+1>>1,r=JSBI.exponentiate(JSBI.__oneDigit(i,!1),JSBI.__oneDigit(l,!1));let a,u;const d=r.__unsignedDigit(0);if(1===r.length&&32767>=d){a=new JSBI(_.length,!1),a.__initializeDigits();let t=0;for(let e=2*_.length-1;0<=e;e--){const i=t<<15|_.__halfDigit(e);a.__setHalfDigit(e,0|i/d),t=0|i%d;}u=t.toString(i);}else {const t=JSBI.__absoluteDivLarge(_,r,!0,!0);a=t.quotient;const e=t.remainder.__trim();u=JSBI.__toStringGeneric(e,i,!0);}a.__trim();let h=JSBI.__toStringGeneric(a,i,!0);for(;u.length<l;)u="0"+u;return !1===t&&_.sign&&(h="-"+h),h+u}static __unequalSign(i){return i?-1:1}static __absoluteGreater(i){return i?-1:1}static __absoluteLess(i){return i?1:-1}static __compareToBigInt(i,_){const t=i.sign;if(t!==_.sign)return JSBI.__unequalSign(t);const e=JSBI.__absoluteCompare(i,_);return 0<e?JSBI.__absoluteGreater(t):0>e?JSBI.__absoluteLess(t):0}static __compareToNumber(i,_){if(JSBI.__isOneDigitInt(_)){const t=i.sign,e=0>_;if(t!==e)return JSBI.__unequalSign(t);if(0===i.length){if(e)throw new Error("implementation bug");return 0===_?0:-1}if(1<i.length)return JSBI.__absoluteGreater(t);const n=Math.abs(_),g=i.__unsignedDigit(0);return g>n?JSBI.__absoluteGreater(t):g<n?JSBI.__absoluteLess(t):0}return JSBI.__compareToDouble(i,_)}static __compareToDouble(i,_){if(_!==_)return _;if(_===1/0)return -1;if(_===-Infinity)return 1;const t=i.sign;if(t!==0>_)return JSBI.__unequalSign(t);if(0===_)throw new Error("implementation bug: should be handled elsewhere");if(0===i.length)return -1;JSBI.__kBitConversionDouble[0]=_;const e=2047&JSBI.__kBitConversionInts[1]>>>20;if(2047==e)throw new Error("implementation bug: handled elsewhere");const n=e-1023;if(0>n)return JSBI.__absoluteGreater(t);const g=i.length;let s=i.__digit(g-1);const o=JSBI.__clz30(s),l=30*g-o,r=n+1;if(l<r)return JSBI.__absoluteLess(t);if(l>r)return JSBI.__absoluteGreater(t);let a=1048576|1048575&JSBI.__kBitConversionInts[1],u=JSBI.__kBitConversionInts[0];const d=20,h=29-o;if(h!==(0|(l-1)%30))throw new Error("implementation bug");let m,b=0;if(20>h){const i=d-h;b=i+32,m=a>>>i,a=a<<32-i|u>>>i,u<<=32-i;}else if(20===h)b=32,m=a,a=u,u=0;else {const i=h-d;b=32-i,m=a<<i|u>>>32-i,a=u<<i,u=0;}if(s>>>=0,m>>>=0,s>m)return JSBI.__absoluteGreater(t);if(s<m)return JSBI.__absoluteLess(t);for(let e=g-2;0<=e;e--){0<b?(b-=30,m=a>>>2,a=a<<30|u>>>2,u<<=30):m=0;const _=i.__unsignedDigit(e);if(_>m)return JSBI.__absoluteGreater(t);if(_<m)return JSBI.__absoluteLess(t)}if(0!==a||0!==u){if(0===b)throw new Error("implementation bug");return JSBI.__absoluteLess(t)}return 0}static __equalToNumber(i,_){var t=Math.abs;return JSBI.__isOneDigitInt(_)?0===_?0===i.length:1===i.length&&i.sign===0>_&&i.__unsignedDigit(0)===t(_):0===JSBI.__compareToDouble(i,_)}static __comparisonResultToBool(i,_){return 0===_?0>i:1===_?0>=i:2===_?0<i:3===_?0<=i:void 0}static __compare(i,_,t){if(i=JSBI.__toPrimitive(i),_=JSBI.__toPrimitive(_),"string"==typeof i&&"string"==typeof _)switch(t){case 0:return i<_;case 1:return i<=_;case 2:return i>_;case 3:return i>=_;}if(JSBI.__isBigInt(i)&&"string"==typeof _)return _=JSBI.__fromString(_),null!==_&&JSBI.__comparisonResultToBool(JSBI.__compareToBigInt(i,_),t);if("string"==typeof i&&JSBI.__isBigInt(_))return i=JSBI.__fromString(i),null!==i&&JSBI.__comparisonResultToBool(JSBI.__compareToBigInt(i,_),t);if(i=JSBI.__toNumeric(i),_=JSBI.__toNumeric(_),JSBI.__isBigInt(i)){if(JSBI.__isBigInt(_))return JSBI.__comparisonResultToBool(JSBI.__compareToBigInt(i,_),t);if("number"!=typeof _)throw new Error("implementation bug");return JSBI.__comparisonResultToBool(JSBI.__compareToNumber(i,_),t)}if("number"!=typeof i)throw new Error("implementation bug");if(JSBI.__isBigInt(_))return JSBI.__comparisonResultToBool(JSBI.__compareToNumber(_,i),2^t);if("number"!=typeof _)throw new Error("implementation bug");return 0===t?i<_:1===t?i<=_:2===t?i>_:3===t?i>=_:void 0}__clzmsd(){return JSBI.__clz30(this.__digit(this.length-1))}static __absoluteAdd(_,t,e){if(_.length<t.length)return JSBI.__absoluteAdd(t,_,e);if(0===_.length)return _;if(0===t.length)return _.sign===e?_:JSBI.unaryMinus(_);let n=_.length;(0===_.__clzmsd()||t.length===_.length&&0===t.__clzmsd())&&n++;const g=new JSBI(n,e);let s=0,o=0;for(;o<t.length;o++){const i=_.__digit(o)+t.__digit(o)+s;s=i>>>30,g.__setDigit(o,1073741823&i);}for(;o<_.length;o++){const i=_.__digit(o)+s;s=i>>>30,g.__setDigit(o,1073741823&i);}return o<g.length&&g.__setDigit(o,s),g.__trim()}static __absoluteSub(_,t,e){if(0===_.length)return _;if(0===t.length)return _.sign===e?_:JSBI.unaryMinus(_);const n=new JSBI(_.length,e);let g=0,s=0;for(;s<t.length;s++){const i=_.__digit(s)-t.__digit(s)-g;g=1&i>>>30,n.__setDigit(s,1073741823&i);}for(;s<_.length;s++){const i=_.__digit(s)-g;g=1&i>>>30,n.__setDigit(s,1073741823&i);}return n.__trim()}static __absoluteAddOne(_,i,t=null){const e=_.length;null===t?t=new JSBI(e,i):t.sign=i;let n=1;for(let g=0;g<e;g++){const i=_.__digit(g)+n;n=i>>>30,t.__setDigit(g,1073741823&i);}return 0!=n&&t.__setDigitGrow(e,1),t}static __absoluteSubOne(_,t){const e=_.length;t=t||e;const n=new JSBI(t,!1);let g=1;for(let s=0;s<e;s++){const i=_.__digit(s)-g;g=1&i>>>30,n.__setDigit(s,1073741823&i);}if(0!=g)throw new Error("implementation bug");for(let g=e;g<t;g++)n.__setDigit(g,0);return n}static __absoluteAnd(_,t,e=null){let n=_.length,g=t.length,s=g;if(n<g){s=n;const i=_,e=n;_=t,n=g,t=i,g=e;}let o=s;null===e?e=new JSBI(o,!1):o=e.length;let l=0;for(;l<s;l++)e.__setDigit(l,_.__digit(l)&t.__digit(l));for(;l<o;l++)e.__setDigit(l,0);return e}static __absoluteAndNot(_,t,e=null){const n=_.length,g=t.length;let s=g;n<g&&(s=n);let o=n;null===e?e=new JSBI(o,!1):o=e.length;let l=0;for(;l<s;l++)e.__setDigit(l,_.__digit(l)&~t.__digit(l));for(;l<n;l++)e.__setDigit(l,_.__digit(l));for(;l<o;l++)e.__setDigit(l,0);return e}static __absoluteOr(_,t,e=null){let n=_.length,g=t.length,s=g;if(n<g){s=n;const i=_,e=n;_=t,n=g,t=i,g=e;}let o=n;null===e?e=new JSBI(o,!1):o=e.length;let l=0;for(;l<s;l++)e.__setDigit(l,_.__digit(l)|t.__digit(l));for(;l<n;l++)e.__setDigit(l,_.__digit(l));for(;l<o;l++)e.__setDigit(l,0);return e}static __absoluteXor(_,t,e=null){let n=_.length,g=t.length,s=g;if(n<g){s=n;const i=_,e=n;_=t,n=g,t=i,g=e;}let o=n;null===e?e=new JSBI(o,!1):o=e.length;let l=0;for(;l<s;l++)e.__setDigit(l,_.__digit(l)^t.__digit(l));for(;l<n;l++)e.__setDigit(l,_.__digit(l));for(;l<o;l++)e.__setDigit(l,0);return e}static __absoluteCompare(_,t){const e=_.length-t.length;if(0!=e)return e;let n=_.length-1;for(;0<=n&&_.__digit(n)===t.__digit(n);)n--;return 0>n?0:_.__unsignedDigit(n)>t.__unsignedDigit(n)?1:-1}static __multiplyAccumulate(_,t,e,n){if(0===t)return;const g=32767&t,s=t>>>15;let o=0,l=0;for(let r,a=0;a<_.length;a++,n++){r=e.__digit(n);const i=_.__digit(a),t=32767&i,u=i>>>15,d=JSBI.__imul(t,g),h=JSBI.__imul(t,s),m=JSBI.__imul(u,g),b=JSBI.__imul(u,s);r+=l+d+o,o=r>>>30,r&=1073741823,r+=((32767&h)<<15)+((32767&m)<<15),o+=r>>>30,l=b+(h>>>15)+(m>>>15),e.__setDigit(n,1073741823&r);}for(;0!=o||0!==l;n++){let i=e.__digit(n);i+=o+l,l=0,o=i>>>30,e.__setDigit(n,1073741823&i);}}static __internalMultiplyAdd(_,t,e,g,s){let o=e,l=0;for(let n=0;n<g;n++){const i=_.__digit(n),e=JSBI.__imul(32767&i,t),g=JSBI.__imul(i>>>15,t),a=e+((32767&g)<<15)+l+o;o=a>>>30,l=g>>>15,s.__setDigit(n,1073741823&a);}if(s.length>g)for(s.__setDigit(g++,o+l);g<s.length;)s.__setDigit(g++,0);else if(0!==o+l)throw new Error("implementation bug")}__inplaceMultiplyAdd(i,_,t){t>this.length&&(t=this.length);const e=32767&i,n=i>>>15;let g=0,s=_;for(let o=0;o<t;o++){const i=this.__digit(o),_=32767&i,t=i>>>15,l=JSBI.__imul(_,e),r=JSBI.__imul(_,n),a=JSBI.__imul(t,e),u=JSBI.__imul(t,n);let d=s+l+g;g=d>>>30,d&=1073741823,d+=((32767&r)<<15)+((32767&a)<<15),g+=d>>>30,s=u+(r>>>15)+(a>>>15),this.__setDigit(o,1073741823&d);}if(0!=g||0!==s)throw new Error("implementation bug")}static __absoluteDivSmall(_,t,e=null){null===e&&(e=new JSBI(_.length,!1));let n=0;for(let g,s=2*_.length-1;0<=s;s-=2){g=(n<<15|_.__halfDigit(s))>>>0;const i=0|g/t;n=0|g%t,g=(n<<15|_.__halfDigit(s-1))>>>0;const o=0|g/t;n=0|g%t,e.__setDigit(s>>>1,i<<15|o);}return e}static __absoluteModSmall(_,t){let e=0;for(let n=2*_.length-1;0<=n;n--){const i=(e<<15|_.__halfDigit(n))>>>0;e=0|i%t;}return e}static __absoluteDivLarge(i,_,t,e){const g=_.__halfDigitLength(),n=_.length,s=i.__halfDigitLength()-g;let o=null;t&&(o=new JSBI(s+2>>>1,!1),o.__initializeDigits());const l=new JSBI(g+2>>>1,!1);l.__initializeDigits();const r=JSBI.__clz15(_.__halfDigit(g-1));0<r&&(_=JSBI.__specialLeftShift(_,r,0));const a=JSBI.__specialLeftShift(i,r,1),u=_.__halfDigit(g-1);let d=0;for(let r,h=s;0<=h;h--){r=32767;const i=a.__halfDigit(h+g);if(i!==u){const t=(i<<15|a.__halfDigit(h+g-1))>>>0;r=0|t/u;let e=0|t%u;const n=_.__halfDigit(g-2),s=a.__halfDigit(h+g-2);for(;JSBI.__imul(r,n)>>>0>(e<<16|s)>>>0&&(r--,e+=u,!(32767<e)););}JSBI.__internalMultiplyAdd(_,r,0,n,l);let e=a.__inplaceSub(l,h,g+1);0!==e&&(e=a.__inplaceAdd(_,h,g),a.__setHalfDigit(h+g,32767&a.__halfDigit(h+g)+e),r--),t&&(1&h?d=r<<15:o.__setDigit(h>>>1,d|r));}if(e)return a.__inplaceRightShift(r),t?{quotient:o,remainder:a}:a;if(t)return o;throw new Error("unreachable")}static __clz15(i){return JSBI.__clz30(i)-15}__inplaceAdd(_,t,e){let n=0;for(let g=0;g<e;g++){const i=this.__halfDigit(t+g)+_.__halfDigit(g)+n;n=i>>>15,this.__setHalfDigit(t+g,32767&i);}return n}__inplaceSub(_,t,e){let n=0;if(1&t){t>>=1;let g=this.__digit(t),s=32767&g,o=0;for(;o<e-1>>>1;o++){const i=_.__digit(o),e=(g>>>15)-(32767&i)-n;n=1&e>>>15,this.__setDigit(t+o,(32767&e)<<15|32767&s),g=this.__digit(t+o+1),s=(32767&g)-(i>>>15)-n,n=1&s>>>15;}const i=_.__digit(o),l=(g>>>15)-(32767&i)-n;n=1&l>>>15,this.__setDigit(t+o,(32767&l)<<15|32767&s);if(t+o+1>=this.length)throw new RangeError("out of bounds");0==(1&e)&&(g=this.__digit(t+o+1),s=(32767&g)-(i>>>15)-n,n=1&s>>>15,this.__setDigit(t+_.length,1073709056&g|32767&s));}else {t>>=1;let g=0;for(;g<_.length-1;g++){const i=this.__digit(t+g),e=_.__digit(g),s=(32767&i)-(32767&e)-n;n=1&s>>>15;const o=(i>>>15)-(e>>>15)-n;n=1&o>>>15,this.__setDigit(t+g,(32767&o)<<15|32767&s);}const i=this.__digit(t+g),s=_.__digit(g),o=(32767&i)-(32767&s)-n;n=1&o>>>15;let l=0;0==(1&e)&&(l=(i>>>15)-(s>>>15)-n,n=1&l>>>15),this.__setDigit(t+g,(32767&l)<<15|32767&o);}return n}__inplaceRightShift(_){if(0===_)return;let t=this.__digit(0)>>>_;const e=this.length-1;for(let n=0;n<e;n++){const i=this.__digit(n+1);this.__setDigit(n,1073741823&i<<30-_|t),t=i>>>_;}this.__setDigit(e,t);}static __specialLeftShift(_,t,e){const g=_.length,n=new JSBI(g+e,!1);if(0===t){for(let t=0;t<g;t++)n.__setDigit(t,_.__digit(t));return 0<e&&n.__setDigit(g,0),n}let s=0;for(let o=0;o<g;o++){const i=_.__digit(o);n.__setDigit(o,1073741823&i<<t|s),s=i>>>30-t;}return 0<e&&n.__setDigit(g,s),n}static __leftShiftByAbsolute(_,i){const t=JSBI.__toShiftAmount(i);if(0>t)throw new RangeError("BigInt too big");const e=0|t/30,n=t%30,g=_.length,s=0!==n&&0!=_.__digit(g-1)>>>30-n,o=g+e+(s?1:0),l=new JSBI(o,_.sign);if(0===n){let t=0;for(;t<e;t++)l.__setDigit(t,0);for(;t<o;t++)l.__setDigit(t,_.__digit(t-e));}else {let t=0;for(let _=0;_<e;_++)l.__setDigit(_,0);for(let s=0;s<g;s++){const i=_.__digit(s);l.__setDigit(s+e,1073741823&i<<n|t),t=i>>>30-n;}if(s)l.__setDigit(g+e,t);else if(0!==t)throw new Error("implementation bug")}return l.__trim()}static __rightShiftByAbsolute(_,i){const t=_.length,e=_.sign,n=JSBI.__toShiftAmount(i);if(0>n)return JSBI.__rightShiftByMaximum(e);const g=0|n/30,s=n%30;let o=t-g;if(0>=o)return JSBI.__rightShiftByMaximum(e);let l=!1;if(e){if(0!=(_.__digit(g)&(1<<s)-1))l=!0;else for(let t=0;t<g;t++)if(0!==_.__digit(t)){l=!0;break}}if(l&&0===s){const i=_.__digit(t-1);0==~i&&o++;}let r=new JSBI(o,e);if(0===s){r.__setDigit(o-1,0);for(let e=g;e<t;e++)r.__setDigit(e-g,_.__digit(e));}else {let e=_.__digit(g)>>>s;const n=t-g-1;for(let t=0;t<n;t++){const i=_.__digit(t+g+1);r.__setDigit(t,1073741823&i<<30-s|e),e=i>>>s;}r.__setDigit(n,e);}return l&&(r=JSBI.__absoluteAddOne(r,!0,r)),r.__trim()}static __rightShiftByMaximum(i){return i?JSBI.__oneDigit(1,!0):JSBI.__zero()}static __toShiftAmount(i){if(1<i.length)return -1;const _=i.__unsignedDigit(0);return _>JSBI.__kMaxLengthBits?-1:_}static __toPrimitive(i,_="default"){if("object"!=typeof i)return i;if(i.constructor===JSBI)return i;if("undefined"!=typeof Symbol&&"symbol"==typeof Symbol.toPrimitive){const t=i[Symbol.toPrimitive];if(t){const i=t(_);if("object"!=typeof i)return i;throw new TypeError("Cannot convert object to primitive value")}}const t=i.valueOf;if(t){const _=t.call(i);if("object"!=typeof _)return _}const e=i.toString;if(e){const _=e.call(i);if("object"!=typeof _)return _}throw new TypeError("Cannot convert object to primitive value")}static __toNumeric(i){return JSBI.__isBigInt(i)?i:+i}static __isBigInt(i){return "object"==typeof i&&null!==i&&i.constructor===JSBI}static __truncateToNBits(i,_){const t=0|(i+29)/30,e=new JSBI(t,_.sign),n=t-1;for(let t=0;t<n;t++)e.__setDigit(t,_.__digit(t));let g=_.__digit(n);if(0!=i%30){const _=32-i%30;g=g<<_>>>_;}return e.__setDigit(n,g),e.__trim()}static __truncateAndSubFromPowerOfTwo(_,t,e){var n=Math.min;const g=0|(_+29)/30,s=new JSBI(g,e);let o=0;const l=g-1;let a=0;for(const i=n(l,t.length);o<i;o++){const i=0-t.__digit(o)-a;a=1&i>>>30,s.__setDigit(o,1073741823&i);}for(;o<l;o++)s.__setDigit(o,0|1073741823&-a);let u=l<t.length?t.__digit(l):0;const d=_%30;let h;if(0==d)h=0-u-a,h&=1073741823;else {const i=32-d;u=u<<i>>>i;const _=1<<32-i;h=_-u-a,h&=_-1;}return s.__setDigit(l,h),s.__trim()}__digit(_){return this[_]}__unsignedDigit(_){return this[_]>>>0}__setDigit(_,i){this[_]=0|i;}__setDigitGrow(_,i){this[_]=0|i;}__halfDigitLength(){const i=this.length;return 32767>=this.__unsignedDigit(i-1)?2*i-1:2*i}__halfDigit(_){return 32767&this[_>>>1]>>>15*(1&_)}__setHalfDigit(_,i){const t=_>>>1,e=this.__digit(t),n=1&_?32767&e|i<<15:1073709056&e|32767&i;this.__setDigit(t,n);}static __digitPow(i,_){let t=1;for(;0<_;)1&_&&(t*=i),_>>>=1,i*=i;return t}static __isOneDigitInt(i){return (1073741823&i)===i}}JSBI.__kMaxLength=33554432,JSBI.__kMaxLengthBits=JSBI.__kMaxLength<<5,JSBI.__kMaxBitsPerChar=[0,0,32,51,64,75,83,90,96,102,107,111,115,119,122,126,128,131,134,136,139,141,143,145,147,149,151,153,154,156,158,159,160,162,163,165,166],JSBI.__kBitsPerCharTableShift=5,JSBI.__kBitsPerCharTableMultiplier=1<<JSBI.__kBitsPerCharTableShift,JSBI.__kConversionChars=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],JSBI.__kBitConversionBuffer=new ArrayBuffer(8),JSBI.__kBitConversionDouble=new Float64Array(JSBI.__kBitConversionBuffer),JSBI.__kBitConversionInts=new Int32Array(JSBI.__kBitConversionBuffer),JSBI.__clz30=Math.clz32?function(i){return Math.clz32(i)-2}:function(i){return 0===i?30:0|29-(0|Math.log(i>>>0)/Math.LN2)},JSBI.__imul=Math.imul||function(i,_){return 0|i*_};

const t={};function MakeIntrinsicClass(e,t){Object.defineProperty(e.prototype,Symbol.toStringTag,{value:t,writable:!1,enumerable:!1,configurable:!0});for(const t of Object.getOwnPropertyNames(e)){const r=Object.getOwnPropertyDescriptor(e,t);r.configurable&&r.enumerable&&(r.enumerable=!1,Object.defineProperty(e,t,r));}for(const t of Object.getOwnPropertyNames(e.prototype)){const r=Object.getOwnPropertyDescriptor(e.prototype,t);r.configurable&&r.enumerable&&(r.enumerable=!1,Object.defineProperty(e.prototype,t,r));}DefineIntrinsic(t,e),DefineIntrinsic(`${t}.prototype`,e.prototype);}function DefineIntrinsic(e,r){const o=`%${e}%`;if(void 0!==t[o])throw new Error(`intrinsic ${e} already exists`);t[o]=r;}function GetIntrinsic(e){return t[e]}var r$2,o$1;const n$1="slot-epochNanoSeconds",a$1="slot-timezone-identifier",i$2="slot-year",s$2="slot-month",l$2="slot-day",d$2="slot-hour",m$2="slot-minute",c$2="slot-second",h$1="slot-millisecond",u$2="slot-microsecond",T$2="slot-nanosecond",p$1="slot-calendar",f$2="slot-date-brand",y$1="slot-year-month-brand",I$1="slot-month-day-brand",S$1="slot-cached-instant",g$2="slot-time-zone",w$2="slot-years",D$1="slot-months",G="slot-weeks",v$2="slot-days",C$2="slot-hours",O$2="slot-minutes",b="slot-seconds",E$1="slot-milliseconds",M$2="slot-microseconds",R$1="slot-nanoseconds",F$1="slot-calendar-identifier",Y$1=new WeakMap;const P$1=Symbol.for("@@Temporal__GetSlots");(r$2=globalThis)[P$1]||(r$2[P$1]=function _GetSlots(e){return Y$1.get(e)});const Z$1=globalThis[P$1];const B$2=Symbol.for("@@Temporal__CreateSlots");(o$1=globalThis)[B$2]||(o$1[B$2]=function _CreateSlots(e){Y$1.set(e,Object.create(null));});const N$1=globalThis[B$2];function HasSlot(e,...t){if(!e||"object"!=typeof e)return !1;const r=Z$1(e);return !!r&&t.every((e=>e in r))}function GetSlot(e,t){const r=Z$1(e)?.[t];if(void 0===r)throw new TypeError(`Missing internal slot ${t}`);return r}function SetSlot(e,t,r){const o=Z$1(e);if(void 0===o)throw new TypeError("Missing slots for the given container");if(o[t])throw new TypeError(`${t} already has set`);o[t]=r;}const j$2=/\.[-A-Za-z_]|\.\.[-A-Za-z._]{1,12}|\.[-A-Za-z_][-A-Za-z._]{0,12}|[A-Za-z_][-A-Za-z._]{0,13}/,$$2=new RegExp("(?:"+[`(?:${j$2.source})(?:\\/(?:${j$2.source}))*`,"Etc/GMT(?:0|[-+]\\d{1,2})","GMT[-+]?0","EST5EDT","CST6CDT","MST7MDT","PST8PDT",/(?:[+\u2212-][0-2][0-9](?::?[0-5][0-9](?::?[0-5][0-9](?:[.,]\d{1,9})?)?)?)/.source].join("|")+")"),k$2=/(?:[+\u2212-]\d{6}|\d{4})/,U$1=/(?:0[1-9]|1[0-2])/,A$2=/(?:0[1-9]|[12]\d|3[01])/,L$2=new RegExp(`(${k$2.source})(?:-(${U$1.source})-(${A$2.source})|(${U$1.source})(${A$2.source}))`),x$2=/(\d{2})(?::(\d{2})(?::(\d{2})(?:[.,](\d{1,9}))?)?|(\d{2})(?:(\d{2})(?:[.,](\d{1,9}))?)?)?/,W=/([+\u2212-])([01][0-9]|2[0-3])(?::?([0-5][0-9])(?::?([0-5][0-9])(?:[.,](\d{1,9}))?)?)?/,q$1=new RegExp(`([zZ])|${W.source}?`),H$2=/\[(!)?([a-z_][a-z0-9_-]*)=([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\]/g,V$2=new RegExp([`^${L$2.source}`,`(?:(?:T|\\s+)${x$2.source}(?:${q$1.source})?)?`,`(?:\\[!?(${$$2.source})\\])?`,`((?:${H$2.source})*)$`].join(""),"i"),z$3=new RegExp([`^T?${x$2.source}`,`(?:${q$1.source})?`,`(?:\\[!?${$$2.source}\\])?`,`((?:${H$2.source})*)$`].join(""),"i"),_$1=new RegExp(`^(${k$2.source})-?(${U$1.source})(?:\\[!?${$$2.source}\\])?((?:${H$2.source})*)$`),J$1=new RegExp(`^(?:--)?(${U$1.source})-?(${A$2.source})(?:\\[!?${$$2.source}\\])?((?:${H$2.source})*)$`),K$1=/(\d+)(?:[.,](\d{1,9}))?/,X$1=new RegExp(`(?:${K$1.source}H)?(?:${K$1.source}M)?(?:${K$1.source}S)?`),Q$1=new RegExp(`^([+−-])?P${/(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?/.source}(?:T(?!$)${X$1.source})?$`,"i"),ee=Array.prototype.includes,te=Array.prototype.push,re=globalThis.Intl.DateTimeFormat,oe=Math.min,ne=Math.max,ae=Math.abs,ie=Math.floor,se=Math.sign,le=Math.trunc,de=Number.isNaN,me=Number.isFinite,ce=Number,he=String,ue=Number.MAX_SAFE_INTEGER,Te=Object.create,pe=Object.getOwnPropertyDescriptor,fe=Reflect.apply,ye=Reflect.ownKeys,Ie=JSBI.BigInt(0),Se=JSBI.BigInt(1),ge=JSBI.BigInt(60),we=JSBI.BigInt(24),De=JSBI.BigInt(1e3),Ge=JSBI.BigInt(1e6),ve=JSBI.BigInt(1e9),Ce=JSBI.BigInt(-1),Oe=JSBI.multiply(JSBI.BigInt(3600),ve),be=JSBI.multiply(ge,ve),Ee=JSBI.multiply(Oe,we),Me=JSBI.multiply(JSBI.BigInt(-86400),JSBI.BigInt(1e17)),Re=JSBI.multiply(JSBI.BigInt(86400),JSBI.BigInt(1e17)),Fe=-271821,Ye=275760,Pe=JSBI.multiply(JSBI.BigInt(-388152),JSBI.BigInt(1e13)),Ze=JSBI.multiply(Ee,JSBI.BigInt(3660)),Be=JSBI.multiply(Ee,JSBI.BigInt(366)),Ne=JSBI.multiply(Ee,JSBI.BigInt(14)),je=["iso8601","hebrew","islamic","islamic-umalqura","islamic-tbla","islamic-civil","islamic-rgsa","islamicc","persian","ethiopic","ethioaa","coptic","chinese","dangi","roc","indian","buddhist","japanese","gregory"];function isZero(t){return JSBI.equal(t,Ie)}function GetMethod(e,t){const r=e[t];if(void 0!==r)return r}function Call(e,t,r){const o=arguments.length>2?r:[];return fe(e,t,o)}function IsObject(e){return "object"==typeof e&&null!==e||"function"==typeof e}function ToNumber(e){if("bigint"==typeof e)throw new TypeError("Cannot convert BigInt to number");return ce(e)}function ToIntegerOrInfinity(e){const t=ToNumber(e);if(de(t)||0===t)return 0;if(!me(t))return t;const r=ie(ae(t));return 0===r?0:se(t)*r}function IsIntegralNumber(e){if("number"!=typeof e||de(e)||!me(e))return !1;const t=ae(e);return ie(t)===t}function ToString(e){if("symbol"==typeof e)throw new TypeError("Cannot convert a Symbol value to a String");return he(e)}function ToIntegerWithTruncation(e){const t=ToNumber(e);if(0===t)return 0;if(de(t)||!me(t))throw new RangeError("invalid number value");const r=le(t);return 0===r?0:r}function ToPositiveIntegerWithTruncation(e,t){const r=ToIntegerWithTruncation(e);if(r<=0){if(void 0!==t)throw new RangeError(`property '${t}' cannot be a a number less than one`);throw new RangeError("Cannot convert a number less than one to a positive integer")}return r}function ToIntegerIfIntegral(e){const t=ToNumber(e);if(!me(t))throw new RangeError("infinity is out of range");if(!IsIntegralNumber(t))throw new RangeError(`unsupported fractional value ${e}`);return 0===t?0:t}function divmod(t,r){return {quotient:JSBI.divide(t,r),remainder:JSBI.remainder(t,r)}}function isNegativeJSBI(t){return JSBI.lessThan(t,Ie)}function signJSBI(e){return isZero(e)?0:isNegativeJSBI(e)?-1:1}function abs(t){return JSBI.lessThan(t,Ie)?JSBI.multiply(t,Ce):t}const $e=new Map([["year",ToIntegerWithTruncation],["month",ToPositiveIntegerWithTruncation],["monthCode",ToString],["day",ToPositiveIntegerWithTruncation],["hour",ToIntegerWithTruncation],["minute",ToIntegerWithTruncation],["second",ToIntegerWithTruncation],["millisecond",ToIntegerWithTruncation],["microsecond",ToIntegerWithTruncation],["nanosecond",ToIntegerWithTruncation],["years",ToIntegerIfIntegral],["months",ToIntegerIfIntegral],["weeks",ToIntegerIfIntegral],["days",ToIntegerIfIntegral],["hours",ToIntegerIfIntegral],["minutes",ToIntegerIfIntegral],["seconds",ToIntegerIfIntegral],["milliseconds",ToIntegerIfIntegral],["microseconds",ToIntegerIfIntegral],["nanoseconds",ToIntegerIfIntegral],["era",ToString],["eraYear",ToIntegerOrInfinity],["offset",ToString]]),ke=new Map([["hour",0],["minute",0],["second",0],["millisecond",0],["microsecond",0],["nanosecond",0]]),Ue=[["years","year","date"],["months","month","date"],["weeks","week","date"],["days","day","date"],["hours","hour","time"],["minutes","minute","time"],["seconds","second","time"],["milliseconds","millisecond","time"],["microseconds","microsecond","time"],["nanoseconds","nanosecond","time"]],Ae=new Map(Ue.map((e=>[e[0],e[1]]))),Le=new Map(Ue.map((([e,t])=>[t,e]))),xe=Ue.map((([,e])=>e)),We=Array.from(Ae.keys()).sort(),qe=new Map;function getIntlDateTimeFormatEnUsForTimeZone(e){let t=qe.get(e);return void 0===t&&(t=new re("en-us",{timeZone:he(e),hour12:!1,era:"short",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}),qe.set(e,t)),t}function ToObject(e){if(null==e)throw new TypeError(`Expected object not ${e}`);return Object(e)}function CopyDataProperties(e,t,r,o){if(null==t)return;const n=ye(t);for(const a of n)if(!r.some((e=>Object.is(e,a)))&&Object.prototype.propertyIsEnumerable.call(t,a)){const r=t[a];if(o&&o.some((e=>Object.is(e,r))))continue;e[a]=r;}}function IsTemporalInstant(e){return HasSlot(e,n$1)&&!HasSlot(e,g$2,p$1)}function IsTemporalTimeZone(e){return HasSlot(e,a$1)}function IsTemporalCalendar(e){return HasSlot(e,F$1)}function IsTemporalDuration(e){return HasSlot(e,w$2,D$1,v$2,C$2,O$2,b,E$1,M$2,R$1)}function IsTemporalDate(e){return HasSlot(e,f$2)}function IsTemporalTime(e){return HasSlot(e,d$2,m$2,c$2,h$1,u$2,T$2)&&!HasSlot(e,i$2,s$2,l$2)}function IsTemporalDateTime(e){return HasSlot(e,i$2,s$2,l$2,d$2,m$2,c$2,h$1,u$2,T$2)}function IsTemporalYearMonth(e){return HasSlot(e,y$1)}function IsTemporalMonthDay(e){return HasSlot(e,I$1)}function IsTemporalZonedDateTime(e){return HasSlot(e,n$1,g$2,p$1)}function RejectTemporalLikeObject(e){if(HasSlot(e,p$1)||HasSlot(e,g$2))throw new TypeError("with() does not support a calendar or timeZone property");if(IsTemporalTime(e))throw new TypeError("with() does not accept Temporal.PlainTime, use withPlainTime() instead");if(void 0!==e.calendar)throw new TypeError("with() does not support a calendar property");if(void 0!==e.timeZone)throw new TypeError("with() does not support a timeZone property")}function ParseTemporalTimeZone(e){const{ianaName:t,offset:r,z:o}=function ParseTemporalTimeZoneString(e){if(new RegExp(`^${$$2.source}$`,"i").test(e))return {ianaName:e};try{const t=ParseISODateTime(e);if(t.z||t.offset||t.ianaName)return t}catch{}throw new RangeError(`Invalid time zone: ${e}`)}(e);if(t)return GetCanonicalTimeZoneIdentifier(t);if(o)return "UTC";return FormatTimeZoneOffsetString(ParseTimeZoneOffsetString(r))}function MaybeFormatCalendarAnnotation(e,t){return "never"===t?"":FormatCalendarAnnotation(ToTemporalCalendarIdentifier(e),t)}function FormatCalendarAnnotation(e,t){if("never"===t)return "";if("auto"===t&&"iso8601"===e)return "";return `[${"critical"===t?"!":""}u-ca=${e}]`}function ParseISODateTime(e){const t=V$2.exec(e);if(!t)throw new RangeError(`invalid ISO 8601 string: ${e}`);let r=t[1];if("−"===r[0]&&(r=`-${r.slice(1)}`),"-000000"===r)throw new RangeError(`invalid ISO 8601 string: ${e}`);const o=ToIntegerOrInfinity(r),n=ToIntegerOrInfinity(t[2]||t[4]),a=ToIntegerOrInfinity(t[3]||t[5]),i=ToIntegerOrInfinity(t[6]),s=void 0!==t[6],l=ToIntegerOrInfinity(t[7]||t[10]);let d=ToIntegerOrInfinity(t[8]||t[11]);60===d&&(d=59);const m=(t[9]||t[12])+"000000000",c=ToIntegerOrInfinity(m.slice(0,3)),h=ToIntegerOrInfinity(m.slice(3,6)),u=ToIntegerOrInfinity(m.slice(6,9));let T,p=!1;if(t[13])T=void 0,p=!0;else if(t[14]&&t[15]){const e="-"===t[14]||"−"===t[14]?"-":"+",r=t[15]||"00",o=t[16]||"00",n=t[17]||"00";let a=t[18]||"0";if(T=`${e}${r}:${o}`,+a){for(;a.endsWith("0");)a=a.slice(0,-1);T+=`:${n}.${a}`;}else +n&&(T+=`:${n}`);"-00:00"===T&&(T="+00:00");}const f=t[19],y=t[20];let I;for(const[,e,t,r]of y.matchAll(H$2))if("u-ca"===t)void 0===I&&(I=r);else if("!"===e)throw new RangeError(`Unrecognized annotation: !${t}=${r}`);return RejectDateTime(o,n,a,i,l,d,c,h,u),{year:o,month:n,day:a,hasTime:s,hour:i,minute:l,second:d,millisecond:c,microsecond:h,nanosecond:u,ianaName:f,offset:T,z:p,calendar:I}}function ParseTemporalYearMonthString(e){const t=_$1.exec(e);let r,o,n,a;if(t){let a=t[1];if("−"===a[0]&&(a=`-${a.slice(1)}`),"-000000"===a)throw new RangeError(`invalid ISO 8601 string: ${e}`);r=ToIntegerOrInfinity(a),o=ToIntegerOrInfinity(t[2]);const i=t[3];for(const[,e,t,r]of i.matchAll(H$2))if("u-ca"===t)void 0===n&&(n=r);else if("!"===e)throw new RangeError(`Unrecognized annotation: !${t}=${r}`);if(void 0!==n&&"iso8601"!==n)throw new RangeError("YYYY-MM format is only valid with iso8601 calendar")}else {let t;if(({year:r,month:o,calendar:n,day:a,z:t}=ParseISODateTime(e)),t)throw new RangeError("Z designator not supported for PlainYearMonth")}return {year:r,month:o,calendar:n,referenceISODay:a}}function ParseTemporalMonthDayString(e){const t=J$1.exec(e);let r,o,n,a;if(t){r=ToIntegerOrInfinity(t[1]),o=ToIntegerOrInfinity(t[2]);const e=t[3];for(const[,t,r,o]of e.matchAll(H$2))if("u-ca"===r)void 0===n&&(n=o);else if("!"===t)throw new RangeError(`Unrecognized annotation: !${r}=${o}`);if(void 0!==n&&"iso8601"!==n)throw new RangeError("MM-DD format is only valid with iso8601 calendar")}else {let t;if(({month:r,day:o,calendar:n,year:a,z:t}=ParseISODateTime(e)),t)throw new RangeError("Z designator not supported for PlainMonthDay")}return {month:r,day:o,calendar:n,referenceISOYear:a}}function ParseTemporalInstant(e){let{year:t,month:r,day:o,hour:n,minute:a,second:i,millisecond:s,microsecond:l,nanosecond:d,offset:m,z:c}=function ParseTemporalInstantString(e){const t=ParseISODateTime(e);if(!t.z&&!t.offset)throw new RangeError("Temporal.Instant requires a time zone offset");return t}(e);if(!c&&!m)throw new RangeError("Temporal.Instant requires a time zone offset");const h=c?0:ParseTimeZoneOffsetString(m);({year:t,month:r,day:o,hour:n,minute:a,second:i,millisecond:s,microsecond:l,nanosecond:d}=BalanceISODateTime(t,r,o,n,a,i,s,l,d-h));const u=GetUTCEpochNanoseconds(t,r,o,n,a,i,s,l,d);if(null===u)throw new RangeError("DateTime outside of supported range");return u}function RegulateISODate(e,t,r,o){let n=e,a=t,i=r;switch(o){case"reject":RejectISODate(n,a,i);break;case"constrain":({year:n,month:a,day:i}=ConstrainISODate(n,a,i));}return {year:n,month:a,day:i}}function RegulateTime(e,t,r,o,n,a,i){let s=e,l=t,d=r,m=o,c=n,h=a;switch(i){case"reject":RejectTime(s,l,d,m,c,h);break;case"constrain":({hour:s,minute:l,second:d,millisecond:m,microsecond:c,nanosecond:h}=function ConstrainTime(e,t,r,o,n,a){const i=ConstrainToRange(e,0,23),s=ConstrainToRange(t,0,59),l=ConstrainToRange(r,0,59),d=ConstrainToRange(o,0,999),m=ConstrainToRange(n,0,999),c=ConstrainToRange(a,0,999);return {hour:i,minute:s,second:l,millisecond:d,microsecond:m,nanosecond:c}}(s,l,d,m,c,h));}return {hour:s,minute:l,second:d,millisecond:m,microsecond:c,nanosecond:h}}function ToTemporalDurationRecord(e){if(!IsObject(e))return function ParseTemporalDurationString(e){const t=Q$1.exec(e);if(!t)throw new RangeError(`invalid duration: ${e}`);if(t.slice(2).every((e=>void 0===e)))throw new RangeError(`invalid duration: ${e}`);const r="-"===t[1]||"−"===t[1]?-1:1,o=void 0===t[2]?0:ToIntegerWithTruncation(t[2])*r,n=void 0===t[3]?0:ToIntegerWithTruncation(t[3])*r,a=void 0===t[4]?0:ToIntegerWithTruncation(t[4])*r,i=void 0===t[5]?0:ToIntegerWithTruncation(t[5])*r,s=void 0===t[6]?0:ToIntegerWithTruncation(t[6])*r,l=t[7],d=t[8],m=t[9],c=t[10],h=t[11];let u=0,T=0,p=0;if(void 0!==l){if(d??m??c??h)throw new RangeError("only the smallest unit can be fractional");p=3600*ToIntegerOrInfinity((l+"000000000").slice(0,9))*r;}else if(u=void 0===d?0:ToIntegerWithTruncation(d)*r,void 0!==m){if(c??h)throw new RangeError("only the smallest unit can be fractional");p=60*ToIntegerOrInfinity((m+"000000000").slice(0,9))*r;}else T=void 0===c?0:ToIntegerWithTruncation(c)*r,void 0!==h&&(p=ToIntegerOrInfinity((h+"000000000").slice(0,9))*r);const f=p%1e3,y=le(p/1e3)%1e3,I=le(p/1e6)%1e3;return T+=le(p/1e9)%60,u+=le(p/6e10),RejectDuration(o,n,a,i,s,u,T,I,y,f),{years:o,months:n,weeks:a,days:i,hours:s,minutes:u,seconds:T,milliseconds:I,microseconds:y,nanoseconds:f}}(ToString(e));if(IsTemporalDuration(e))return {years:GetSlot(e,w$2),months:GetSlot(e,D$1),weeks:GetSlot(e,G),days:GetSlot(e,v$2),hours:GetSlot(e,C$2),minutes:GetSlot(e,O$2),seconds:GetSlot(e,b),milliseconds:GetSlot(e,E$1),microseconds:GetSlot(e,M$2),nanoseconds:GetSlot(e,R$1)};const t={years:0,months:0,weeks:0,days:0,hours:0,minutes:0,seconds:0,milliseconds:0,microseconds:0,nanoseconds:0};let r=function ToTemporalPartialDurationRecord(e){if(!IsObject(e))throw new TypeError("invalid duration-like");const t={years:void 0,months:void 0,weeks:void 0,days:void 0,hours:void 0,minutes:void 0,seconds:void 0,milliseconds:void 0,microseconds:void 0,nanoseconds:void 0};let r=!1;for(const o of We){const n=e[o];void 0!==n&&(r=!0,t[o]=ToIntegerIfIntegral(n));}if(!r)throw new TypeError("invalid duration-like");return t}(e);for(const e of We){const o=r[e];void 0!==o&&(t[e]=o);}let{years:o,months:n,weeks:a,days:i,hours:s,minutes:l,seconds:d,milliseconds:m,microseconds:c,nanoseconds:h}=t;return RejectDuration(o,n,a,i,s,l,d,m,c,h),{years:o,months:n,weeks:a,days:i,hours:s,minutes:l,seconds:d,milliseconds:m,microseconds:c,nanoseconds:h}}function ToTemporalOverflow(e){return void 0===e?"constrain":GetOption(e,"overflow",["constrain","reject"],"constrain")}function ToTemporalDisambiguation(e){return void 0===e?"compatible":GetOption(e,"disambiguation",["compatible","earlier","later","reject"],"compatible")}function ToTemporalRoundingMode(e,t){return GetOption(e,"roundingMode",["ceil","floor","expand","trunc","halfCeil","halfFloor","halfExpand","halfTrunc","halfEven"],t)}function ToTemporalOffset(e,t){return void 0===e?t:GetOption(e,"offset",["prefer","use","ignore","reject"],t)}function ToCalendarNameOption(e){return GetOption(e,"calendarName",["auto","always","never","critical"],"auto")}function ToTemporalRoundingIncrement(e){let t=e.roundingIncrement;if(void 0===t)return 1;if(t=ToNumber(t),!me(t))throw new RangeError("roundingIncrement must be finite");const r=le(t);if(r<1||r>1e9)throw new RangeError(`roundingIncrement must be at least 1 and at most 1e9, not ${t}`);return r}function ValidateTemporalRoundingIncrement(e,t,r){const o=r?t:t-1;if(e>o)throw new RangeError(`roundingIncrement must be at least 1 and less than ${o}, not ${e}`);if(t%e!=0)throw new RangeError(`Rounding increment must divide evenly into ${t}`)}function ToFractionalSecondDigits(e){const t=e.fractionalSecondDigits;if(void 0===t)return "auto";if("number"!=typeof t){if("auto"!==ToString(t))throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`);return "auto"}const r=ie(t);if(!me(r)||r<0||r>9)throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`);return r}function ToSecondsStringPrecisionRecord(e,t){switch(e){case"minute":return {precision:"minute",unit:"minute",increment:1};case"second":return {precision:0,unit:"second",increment:1};case"millisecond":return {precision:3,unit:"millisecond",increment:1};case"microsecond":return {precision:6,unit:"microsecond",increment:1};case"nanosecond":return {precision:9,unit:"nanosecond",increment:1}}switch(t){case"auto":return {precision:t,unit:"nanosecond",increment:1};case 0:return {precision:t,unit:"second",increment:1};case 1:case 2:case 3:return {precision:t,unit:"millisecond",increment:10**(3-t)};case 4:case 5:case 6:return {precision:t,unit:"microsecond",increment:10**(6-t)};case 7:case 8:case 9:return {precision:t,unit:"nanosecond",increment:10**(9-t)};default:throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`)}}const He=Symbol("~required~");function GetTemporalUnit(e,t,r,o,n=[]){const a=[];for(const[,e,t]of Ue)"datetime"!==r&&r!==t||a.push(e);a.push(...n);let i=o;i===He?i=void 0:void 0!==i&&a.push(i);const s=[...a];for(const e of a){const t=Le.get(e);void 0!==t&&s.push(t);}let l=GetOption(e,t,s,i);if(void 0===l&&o===He)throw new RangeError(`${t} is required`);return Ae.has(l)?Ae.get(l):l}function ToRelativeTemporalObject(e){const t=e.relativeTo;if(void 0===t)return t;let r,o,n,a,i,s,l,d,m,c,h,u,T="option",p=!1;if(IsObject(t)){if(IsTemporalZonedDateTime(t)||IsTemporalDate(t))return t;if(IsTemporalDateTime(t))return TemporalDateTimeToDate(t);c=GetTemporalCalendarSlotValueWithISODefault(t);const e=CalendarFields(c,["day","hour","microsecond","millisecond","minute","month","monthCode","nanosecond","second","year"]);e.push("timeZone","offset");const p=PrepareTemporalFields(t,e,[]),f=Te(null);f.overflow="constrain",({year:r,month:o,day:n,hour:a,minute:i,second:s,millisecond:l,microsecond:d,nanosecond:m}=InterpretTemporalDateTimeFields(c,p,f)),u=p.offset,void 0===u&&(T="wall"),h=p.timeZone,void 0!==h&&(h=ToTemporalTimeZoneSlotValue(h));}else {let e,f;if(({year:r,month:o,day:n,hour:a,minute:i,second:s,millisecond:l,microsecond:d,nanosecond:m,calendar:c,ianaName:e,offset:u,z:f}=ParseISODateTime(ToString(t))),e)h=ToTemporalTimeZoneSlotValue(e),f?T="exact":u||(T="wall"),p=!0;else if(f)throw new RangeError("Z designator not supported for PlainDate relativeTo; either remove the Z or add a bracketed time zone");if(c||(c="iso8601"),!IsBuiltinCalendar(c))throw new RangeError(`invalid calendar identifier ${c}`);c=ASCIILowercase(c);}if(void 0===h)return CreateTemporalDate(r,o,n,c);return CreateTemporalZonedDateTime(InterpretISODateTimeOffset(r,o,n,a,i,s,l,d,m,T,"option"===T?ParseTimeZoneOffsetString(u):0,h,"compatible","reject",p),h,c)}function DefaultTemporalLargestUnit(e,t,r,o,n,a,i,s,l,d){for(const[m,c]of [["years",e],["months",t],["weeks",r],["days",o],["hours",n],["minutes",a],["seconds",i],["milliseconds",s],["microseconds",l],["nanoseconds",d]])if(0!==c)return Ae.get(m);return "nanosecond"}function LargerOfTwoTemporalUnits(e,t){return xe.indexOf(e)>xe.indexOf(t)?t:e}function PrepareTemporalFields(e,t,r,{emptySourceErrorMessage:o}={emptySourceErrorMessage:"no supported properties found"}){const n=Te(null);let a=!1;t.sort();for(const o of t){let t=e[o];if(void 0!==t)a=!0,$e.has(o)&&(t=$e.get(o)(t)),n[o]=t;else if("partial"!==r){if(ee.call(r,o))throw new TypeError(`required property '${o}' missing or undefined`);t=ke.get(o),n[o]=t;}}if("partial"===r&&!a)throw new TypeError(o);return n}function ToTemporalTimeRecord(e,t="complete"){const r=["hour","microsecond","millisecond","minute","nanosecond","second"],o=PrepareTemporalFields(e,r,"partial",{emptySourceErrorMessage:"invalid time-like"}),n={};for(const e of r){const r=pe(o,e);void 0!==r?n[e]=r.value:"complete"===t&&(n[e]=0);}return n}function ToTemporalDate(e,t){let r=e;if(IsObject(r)){if(IsTemporalDate(r))return r;if(IsTemporalZonedDateTime(r)&&(ToTemporalOverflow(t),r=GetPlainDateTimeFor(GetSlot(r,g$2),GetSlot(r,S$1),GetSlot(r,p$1))),IsTemporalDateTime(r))return ToTemporalOverflow(t),CreateTemporalDate(GetSlot(r,i$2),GetSlot(r,s$2),GetSlot(r,l$2),GetSlot(r,p$1));const e=GetTemporalCalendarSlotValueWithISODefault(r);return CalendarDateFromFields(e,PrepareTemporalFields(r,CalendarFields(e,["day","month","monthCode","year"]),[]),t)}ToTemporalOverflow(t);let{year:o,month:n,day:a,calendar:d,z:m}=function ParseTemporalDateString(e){return ParseISODateTime(e)}(ToString(r));if(m)throw new RangeError("Z designator not supported for PlainDate");if(d||(d="iso8601"),!IsBuiltinCalendar(d))throw new RangeError(`invalid calendar identifier ${d}`);return d=ASCIILowercase(d),CreateTemporalDate(o,n,a,d)}function InterpretTemporalDateTimeFields(e,t,r){let{hour:o,minute:n,second:a,millisecond:d,microsecond:m,nanosecond:c}=ToTemporalTimeRecord(t);const h=ToTemporalOverflow(r),u=CalendarDateFromFields(e,t,r),T=GetSlot(u,i$2),p=GetSlot(u,s$2),f=GetSlot(u,l$2);return ({hour:o,minute:n,second:a,millisecond:d,microsecond:m,nanosecond:c}=RegulateTime(o,n,a,d,m,c,h)),{year:T,month:p,day:f,hour:o,minute:n,second:a,millisecond:d,microsecond:m,nanosecond:c}}function ToTemporalDateTime(e,t){let r,o,n,a,d,m,c,h,u,T;if(IsObject(e)){if(IsTemporalDateTime(e))return e;if(IsTemporalZonedDateTime(e))return ToTemporalOverflow(t),GetPlainDateTimeFor(GetSlot(e,g$2),GetSlot(e,S$1),GetSlot(e,p$1));if(IsTemporalDate(e))return ToTemporalOverflow(t),CreateTemporalDateTime(GetSlot(e,i$2),GetSlot(e,s$2),GetSlot(e,l$2),0,0,0,0,0,0,GetSlot(e,p$1));T=GetTemporalCalendarSlotValueWithISODefault(e);const f=PrepareTemporalFields(e,CalendarFields(T,["day","hour","microsecond","millisecond","minute","month","monthCode","nanosecond","second","year"]),[]);({year:r,month:o,day:n,hour:a,minute:d,second:m,millisecond:c,microsecond:h,nanosecond:u}=InterpretTemporalDateTimeFields(T,f,t));}else {let i;if(ToTemporalOverflow(t),({year:r,month:o,day:n,hour:a,minute:d,second:m,millisecond:c,microsecond:h,nanosecond:u,calendar:T,z:i}=function ParseTemporalDateTimeString(e){return ParseISODateTime(e)}(ToString(e))),i)throw new RangeError("Z designator not supported for PlainDateTime");if(RejectDateTime(r,o,n,a,d,m,c,h,u),T||(T="iso8601"),!IsBuiltinCalendar(T))throw new RangeError(`invalid calendar identifier ${T}`);T=ASCIILowercase(T);}return CreateTemporalDateTime(r,o,n,a,d,m,c,h,u,T)}function ToTemporalDuration(e){if(IsTemporalDuration(e))return e;let{years:t,months:r,weeks:o,days:n,hours:a,minutes:i,seconds:s,milliseconds:l,microseconds:d,nanoseconds:m}=ToTemporalDurationRecord(e);return new(GetIntrinsic("%Temporal.Duration%"))(t,r,o,n,a,i,s,l,d,m)}function ToTemporalInstant(e){if(IsTemporalInstant(e))return e;if(IsTemporalZonedDateTime(e)){return new(GetIntrinsic("%Temporal.Instant%"))(GetSlot(e,n$1))}const t=ParseTemporalInstant(ToString(e));return new(GetIntrinsic("%Temporal.Instant%"))(t)}function ToTemporalMonthDay(e,t){let r=e;if(IsObject(r)){if(IsTemporalMonthDay(r))return r;let e,o;if(HasSlot(r,p$1))e=GetSlot(r,p$1),o=!1;else {let t=r.calendar;o=void 0===t,void 0===t&&(t="iso8601"),e=ToTemporalCalendarSlotValue(t);}const n=PrepareTemporalFields(r,CalendarFields(e,["day","month","monthCode","year"]),[]);return o&&void 0!==n.month&&void 0===n.monthCode&&void 0===n.year&&(n.year=1972),CalendarMonthDayFromFields(e,n,t)}ToTemporalOverflow(t);let{month:o,day:n,referenceISOYear:a,calendar:i}=ParseTemporalMonthDayString(ToString(r));if(void 0===i&&(i="iso8601"),!IsBuiltinCalendar(i))throw new RangeError(`invalid calendar identifier ${i}`);if(i=ASCIILowercase(i),void 0===a)return RejectISODate(1972,o,n),CreateTemporalMonthDay(o,n,i);return CalendarMonthDayFromFields(i,CreateTemporalMonthDay(o,n,i,a))}function ToTemporalTime(e,t="constrain"){let r,o,n,a,i,s,l=e;if(IsObject(l)){if(IsTemporalTime(l))return l;if(IsTemporalZonedDateTime(l)&&(l=GetPlainDateTimeFor(GetSlot(l,g$2),GetSlot(l,S$1),GetSlot(l,p$1))),IsTemporalDateTime(l)){return new(GetIntrinsic("%Temporal.PlainTime%"))(GetSlot(l,d$2),GetSlot(l,m$2),GetSlot(l,c$2),GetSlot(l,h$1),GetSlot(l,u$2),GetSlot(l,T$2))}(({hour:r,minute:o,second:n,millisecond:a,microsecond:i,nanosecond:s}=ToTemporalTimeRecord(l))),({hour:r,minute:o,second:n,millisecond:a,microsecond:i,nanosecond:s}=RegulateTime(r,o,n,a,i,s,t));}else (({hour:r,minute:o,second:n,millisecond:a,microsecond:i,nanosecond:s}=function ParseTemporalTimeString(e){const t=z$3.exec(e);let r,o,n,a,i,s,l;if(t){r=ToIntegerOrInfinity(t[1]),o=ToIntegerOrInfinity(t[2]||t[5]),n=ToIntegerOrInfinity(t[3]||t[6]),60===n&&(n=59);const e=(t[4]||t[7])+"000000000";a=ToIntegerOrInfinity(e.slice(0,3)),i=ToIntegerOrInfinity(e.slice(3,6)),s=ToIntegerOrInfinity(e.slice(6,9)),l=t[14];for(const[,e,t,r]of l.matchAll(H$2))if("u-ca"!==t&&"!"===e)throw new RangeError(`Unrecognized annotation: !${t}=${r}`);if(t[8])throw new RangeError("Z designator not supported for PlainTime")}else {let t,l;if(({hasTime:l,hour:r,minute:o,second:n,millisecond:a,microsecond:i,nanosecond:s,z:t}=ParseISODateTime(e)),!l)throw new RangeError(`time is missing in string: ${e}`);if(t)throw new RangeError("Z designator not supported for PlainTime")}if(/[tT ][0-9][0-9]/.test(e))return {hour:r,minute:o,second:n,millisecond:a,microsecond:i,nanosecond:s};try{const{month:t,day:r}=ParseTemporalMonthDayString(e);RejectISODate(1972,t,r);}catch{try{const{year:t,month:r}=ParseTemporalYearMonthString(e);RejectISODate(t,r,1);}catch{return {hour:r,minute:o,second:n,millisecond:a,microsecond:i,nanosecond:s}}}throw new RangeError(`invalid ISO 8601 time-only string ${e}; may need a T prefix`)}(ToString(l)))),RejectTime(r,o,n,a,i,s);return new(GetIntrinsic("%Temporal.PlainTime%"))(r,o,n,a,i,s)}function ToTemporalYearMonth(e,t){if(IsObject(e)){if(IsTemporalYearMonth(e))return e;const r=GetTemporalCalendarSlotValueWithISODefault(e);return CalendarYearMonthFromFields(r,PrepareTemporalFields(e,CalendarFields(r,["month","monthCode","year"]),[]),t)}ToTemporalOverflow(t);let{year:r,month:o,referenceISODay:n,calendar:a}=ParseTemporalYearMonthString(ToString(e));if(void 0===a&&(a="iso8601"),!IsBuiltinCalendar(a))throw new RangeError(`invalid calendar identifier ${a}`);if(a=ASCIILowercase(a),void 0===n)return RejectISODate(r,o,1),CreateTemporalYearMonth(r,o,a);return CalendarYearMonthFromFields(a,CreateTemporalYearMonth(r,o,a,n))}function InterpretISODateTimeOffset(t,r,o,i,s,l,d,m,c,h,u,T,p,f,y){const I=new(GetIntrinsic("%Temporal.PlainDateTime%"))(t,r,o,i,s,l,d,m,c);if("wall"===h||"ignore"===f){return GetSlot(GetInstantFor(T,I,p),n$1)}if("exact"===h||"use"===f){const n=GetUTCEpochNanoseconds(t,r,o,i,s,l,d,m,c);if(null===n)throw new RangeError("ZonedDateTime outside of supported range");return JSBI.subtract(n,JSBI.BigInt(u))}const S=GetPossibleInstantsFor(T,I);for(const t of S){const r=GetOffsetNanosecondsFor(T,t),o=JSBI.toNumber(RoundNumberToIncrement(JSBI.BigInt(r),be,"halfExpand"));if(r===u||y&&o===u)return GetSlot(t,n$1)}if("reject"===f){const e=FormatTimeZoneOffsetString(u),t=IsTemporalTimeZone(T)?GetSlot(T,a$1):"time zone";throw new RangeError(`Offset ${e} is invalid for ${I.toString()} in ${t}`)}return GetSlot(DisambiguatePossibleInstants(S,T,I,p),n$1)}function ToTemporalZonedDateTime(e,t){let r,o,n,a,i,s,l,d,m,c,h,u,T,p,f=!1,y="option";if(IsObject(e)){if(IsTemporalZonedDateTime(e))return e;u=GetTemporalCalendarSlotValueWithISODefault(e);const f=CalendarFields(u,["day","hour","microsecond","millisecond","minute","month","monthCode","nanosecond","second","year"]);f.push("timeZone","offset");const I=PrepareTemporalFields(e,f,["timeZone"]);c=ToTemporalTimeZoneSlotValue(I.timeZone),h=I.offset,void 0===h&&(y="wall"),T=ToTemporalDisambiguation(t),p=ToTemporalOffset(t,"reject"),({year:r,month:o,day:n,hour:a,minute:i,second:s,millisecond:l,microsecond:d,nanosecond:m}=InterpretTemporalDateTimeFields(u,I,t));}else {let I,S;if(({year:r,month:o,day:n,hour:a,minute:i,second:s,millisecond:l,microsecond:d,nanosecond:m,ianaName:I,offset:h,z:S,calendar:u}=function ParseTemporalZonedDateTimeString(e){const t=ParseISODateTime(e);if(!t.ianaName)throw new RangeError("Temporal.ZonedDateTime requires a time zone ID in brackets");return t}(ToString(e))),c=ToTemporalTimeZoneSlotValue(I),S?y="exact":h||(y="wall"),u||(u="iso8601"),!IsBuiltinCalendar(u))throw new RangeError(`invalid calendar identifier ${u}`);u=ASCIILowercase(u),f=!0,T=ToTemporalDisambiguation(t),p=ToTemporalOffset(t,"reject"),ToTemporalOverflow(t);}let I=0;"option"===y&&(I=ParseTimeZoneOffsetString(h));return CreateTemporalZonedDateTime(InterpretISODateTimeOffset(r,o,n,a,i,s,l,d,m,y,I,c,T,p,f),c,u)}function CreateTemporalDateSlots(e,t,r,o,n){RejectISODate(t,r,o),RejectDateRange(t,r,o),N$1(e),SetSlot(e,i$2,t),SetSlot(e,s$2,r),SetSlot(e,l$2,o),SetSlot(e,p$1,n),SetSlot(e,f$2,!0);}function CreateTemporalDate(e,t,r,o="iso8601"){const n=GetIntrinsic("%Temporal.PlainDate%"),a=Te(n.prototype);return CreateTemporalDateSlots(a,e,t,r,o),a}function CreateTemporalDateTimeSlots(e,t,r,o,n,a,f,y,I,S,g){RejectDateTime(t,r,o,n,a,f,y,I,S),RejectDateTimeRange(t,r,o,n,a,f,y,I,S),N$1(e),SetSlot(e,i$2,t),SetSlot(e,s$2,r),SetSlot(e,l$2,o),SetSlot(e,d$2,n),SetSlot(e,m$2,a),SetSlot(e,c$2,f),SetSlot(e,h$1,y),SetSlot(e,u$2,I),SetSlot(e,T$2,S),SetSlot(e,p$1,g);}function CreateTemporalDateTime(e,t,r,o,n,a,i,s,l,d="iso8601"){const m=GetIntrinsic("%Temporal.PlainDateTime%"),c=Te(m.prototype);return CreateTemporalDateTimeSlots(c,e,t,r,o,n,a,i,s,l,d),c}function CreateTemporalMonthDaySlots(e,t,r,o,n){RejectISODate(n,t,r),RejectDateRange(n,t,r),N$1(e),SetSlot(e,s$2,t),SetSlot(e,l$2,r),SetSlot(e,i$2,n),SetSlot(e,p$1,o),SetSlot(e,I$1,!0);}function CreateTemporalMonthDay(e,t,r="iso8601",o=1972){const n=GetIntrinsic("%Temporal.PlainMonthDay%"),a=Te(n.prototype);return CreateTemporalMonthDaySlots(a,e,t,r,o),a}function CreateTemporalYearMonthSlots(e,t,r,o,n){RejectISODate(t,r,n),function RejectYearMonthRange(e,t){RejectToRange(e,Fe,Ye),e===Fe?RejectToRange(t,4,12):e===Ye&&RejectToRange(t,1,9);}(t,r),N$1(e),SetSlot(e,i$2,t),SetSlot(e,s$2,r),SetSlot(e,l$2,n),SetSlot(e,p$1,o),SetSlot(e,y$1,!0);}function CreateTemporalYearMonth(e,t,r="iso8601",o=1){const n=GetIntrinsic("%Temporal.PlainYearMonth%"),a=Te(n.prototype);return CreateTemporalYearMonthSlots(a,e,t,r,o),a}function CreateTemporalZonedDateTimeSlots(e,t,r,o){ValidateEpochNanoseconds(t),N$1(e),SetSlot(e,n$1,t),SetSlot(e,g$2,r),SetSlot(e,p$1,o);const a=new(GetIntrinsic("%Temporal.Instant%"))(GetSlot(e,n$1));SetSlot(e,S$1,a);}function CreateTemporalZonedDateTime(e,t,r="iso8601"){const o=GetIntrinsic("%Temporal.ZonedDateTime%"),n=Te(o.prototype);return CreateTemporalZonedDateTimeSlots(n,e,t,r),n}function CalendarFields(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.fields%"),r,[t])}const r=Call(GetMethod(e,"fields"),e,[t]),o=[];for(const e of r){if("string"!=typeof e)throw new TypeError("bad return from calendar.fields()");te.call(o,e);}return o}function CalendarMergeFields(e,t,r){if("string"==typeof e){const o=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.mergeFields%"),o,[t,r])}const o=Call(GetMethod(e,"mergeFields"),e,[t,r]);if(!IsObject(o))throw new TypeError("bad return from calendar.mergeFields()");return o}function CalendarDateAdd(e,t,r,o,n){let a=n;if("string"==typeof e){const n=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.dateAdd%"),n,[t,r,o])}void 0===a&&(a=GetMethod(e,"dateAdd"));const i=fe(a,e,[t,r,o]);if(!IsTemporalDate(i))throw new TypeError("invalid result");return i}function CalendarDateUntil(e,t,r,o,n){let a=n;if("string"==typeof e){const n=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.dateUntil%"),n,[t,r,o])}void 0===a&&(a=GetMethod(e,"dateUntil"));const i=fe(a,e,[t,r,o]);if(!IsTemporalDuration(i))throw new TypeError("invalid result");return i}function CalendarYear(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.year%"),r,[t])}let r=Call(GetMethod(e,"year"),e,[t]);if("number"!=typeof r)throw new TypeError("calendar year result must be an integer");if(!IsIntegralNumber(r))throw new RangeError("calendar year result must be an integer");return r}function CalendarMonth(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.month%"),r,[t])}let r=Call(GetMethod(e,"month"),e,[t]);if("number"!=typeof r)throw new TypeError("calendar month result must be a positive integer");if(!IsIntegralNumber(r)||r<1)throw new RangeError("calendar month result must be a positive integer");return r}function CalendarMonthCode(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.monthCode%"),r,[t])}let r=Call(GetMethod(e,"monthCode"),e,[t]);if("string"!=typeof r)throw new TypeError("calendar monthCode result must be a string");return r}function CalendarDay(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.day%"),r,[t])}const r=Call(GetMethod(e,"day"),e,[t]);if("number"!=typeof r)throw new TypeError("calendar day result must be a positive integer");if(!IsIntegralNumber(r)||r<1)throw new RangeError("calendar day result must be a positive integer");return r}function CalendarEra(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.era%"),r,[t])}let r=Call(GetMethod(e,"era"),e,[t]);if(void 0===r)return r;if("string"!=typeof r)throw new TypeError("calendar era result must be a string or undefined");return r}function CalendarEraYear(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.eraYear%"),r,[t])}let r=Call(GetMethod(e,"eraYear"),e,[t]);if(void 0===r)return r;if("number"!=typeof r)throw new TypeError("calendar eraYear result must be an integer or undefined");if(!IsIntegralNumber(r))throw new RangeError("calendar eraYear result must be an integer or undefined");return r}function CalendarDayOfWeek(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.dayOfWeek%"),r,[t])}const r=Call(GetMethod(e,"dayOfWeek"),e,[t]);if("number"!=typeof r)throw new TypeError("calendar dayOfWeek result must be a positive integer");if(!IsIntegralNumber(r)||r<1)throw new RangeError("calendar dayOfWeek result must be a positive integer");return r}function CalendarDayOfYear(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.dayOfYear%"),r,[t])}const r=Call(GetMethod(e,"dayOfYear"),e,[t]);if("number"!=typeof r)throw new TypeError("calendar dayOfYear result must be a positive integer");if(!IsIntegralNumber(r)||r<1)throw new RangeError("calendar dayOfYear result must be a positive integer");return r}function CalendarWeekOfYear(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.weekOfYear%"),r,[t])}const r=Call(GetMethod(e,"weekOfYear"),e,[t]);if("number"!=typeof r)throw new TypeError("calendar weekOfYear result must be a positive integer");if(!IsIntegralNumber(r)||r<1)throw new RangeError("calendar weekOfYear result must be a positive integer");return r}function CalendarYearOfWeek(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.yearOfWeek%"),r,[t])}const r=Call(GetMethod(e,"yearOfWeek"),e,[t]);if("number"!=typeof r)throw new TypeError("calendar yearOfWeek result must be an integer");if(!IsIntegralNumber(r))throw new RangeError("calendar yearOfWeek result must be an integer");return r}function CalendarDaysInWeek(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.daysInWeek%"),r,[t])}const r=Call(GetMethod(e,"daysInWeek"),e,[t]);if("number"!=typeof r)throw new TypeError("calendar daysInWeek result must be a positive integer");if(!IsIntegralNumber(r)||r<1)throw new RangeError("calendar daysInWeek result must be a positive integer");return r}function CalendarDaysInMonth(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.daysInMonth%"),r,[t])}const r=Call(GetMethod(e,"daysInMonth"),e,[t]);if("number"!=typeof r)throw new TypeError("calendar daysInMonth result must be a positive integer");if(!IsIntegralNumber(r)||r<1)throw new RangeError("calendar daysInMonth result must be a positive integer");return r}function CalendarDaysInYear(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.daysInYear%"),r,[t])}const r=Call(GetMethod(e,"daysInYear"),e,[t]);if("number"!=typeof r)throw new TypeError("calendar daysInYear result must be a positive integer");if(!IsIntegralNumber(r)||r<1)throw new RangeError("calendar daysInYear result must be a positive integer");return r}function CalendarMonthsInYear(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.monthsInYear%"),r,[t])}const r=Call(GetMethod(e,"monthsInYear"),e,[t]);if("number"!=typeof r)throw new TypeError("calendar monthsInYear result must be a positive integer");if(!IsIntegralNumber(r)||r<1)throw new RangeError("calendar monthsInYear result must be a positive integer");return r}function CalendarInLeapYear(e,t){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.inLeapYear%"),r,[t])}const r=Call(GetMethod(e,"inLeapYear"),e,[t]);if("boolean"!=typeof r)throw new TypeError("calendar inLeapYear result must be a boolean");return r}function ToTemporalCalendarSlotValue(e){if(IsObject(e)){if(HasSlot(e,p$1))return GetSlot(e,p$1);if(!function ObjectImplementsTemporalCalendarProtocol(e){return !!IsTemporalCalendar(e)||"dateAdd"in e&&"dateFromFields"in e&&"dateUntil"in e&&"day"in e&&"dayOfWeek"in e&&"dayOfYear"in e&&"daysInMonth"in e&&"daysInWeek"in e&&"daysInYear"in e&&"fields"in e&&"id"in e&&"inLeapYear"in e&&"mergeFields"in e&&"month"in e&&"monthCode"in e&&"monthDayFromFields"in e&&"monthsInYear"in e&&"weekOfYear"in e&&"year"in e&&"yearMonthFromFields"in e&&"yearOfWeek"in e}(e))throw new TypeError("expected a Temporal.Calendar or object implementing the Temporal.Calendar protocol");return e}const t=ToString(e);if(IsBuiltinCalendar(t))return ASCIILowercase(t);let r;try{({calendar:r}=ParseISODateTime(t));}catch{try{({calendar:r}=ParseTemporalYearMonthString(t));}catch{({calendar:r}=ParseTemporalMonthDayString(t));}}if(r||(r="iso8601"),!IsBuiltinCalendar(r))throw new RangeError(`invalid calendar identifier ${r}`);return ASCIILowercase(r)}function GetTemporalCalendarSlotValueWithISODefault(e){if(HasSlot(e,p$1))return GetSlot(e,p$1);const{calendar:t}=e;return void 0===t?"iso8601":ToTemporalCalendarSlotValue(t)}function ToTemporalCalendarIdentifier(e){if("string"==typeof e)return e;const t=e.id;if("string"!=typeof t)throw new TypeError("calendar.id should be a string");return t}function ToTemporalCalendarObject(e){if(IsObject(e))return e;return new(GetIntrinsic("%Temporal.Calendar%"))(e)}function CalendarEquals(e,t){if(e===t)return !0;return ToTemporalCalendarIdentifier(e)===ToTemporalCalendarIdentifier(t)}function ThrowIfCalendarsNotEqual(e,t,r){if(e===t)return;const o=ToTemporalCalendarIdentifier(e),n=ToTemporalCalendarIdentifier(t);if(o!==n)throw new RangeError(`cannot ${r} of ${o} and ${n} calendars`)}function ConsolidateCalendars(e,t){if(e===t)return t;const r=ToTemporalCalendarIdentifier(e),o=ToTemporalCalendarIdentifier(t);if(r===o||"iso8601"===r)return t;if("iso8601"===o)return e;throw new RangeError("irreconcilable calendars")}function CalendarDateFromFields(e,t,r,o){if("string"==typeof e){const o=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.dateFromFields%"),o,[t,r])}const n=Call(GetMethod(e,"dateFromFields"),e,[t,r]);if(!IsTemporalDate(n))throw new TypeError("invalid result");return n}function CalendarYearMonthFromFields(e,t,r){if("string"==typeof e){const o=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.yearMonthFromFields%"),o,[t,r])}let o=Call(GetMethod(e,"yearMonthFromFields"),e,[t,r]);if(!IsTemporalYearMonth(o))throw new TypeError("invalid result");return o}function CalendarMonthDayFromFields(e,t,r){if("string"==typeof e){const o=new(GetIntrinsic("%Temporal.Calendar%"))(e);return Call(GetIntrinsic("%Temporal.Calendar.prototype.monthDayFromFields%"),o,[t,r])}let o=Call(GetMethod(e,"monthDayFromFields"),e,[t,r]);if(!IsTemporalMonthDay(o))throw new TypeError("invalid result");return o}function ToTemporalTimeZoneSlotValue(e){if(IsObject(e)){if(IsTemporalZonedDateTime(e))return GetSlot(e,g$2);if(!function ObjectImplementsTemporalTimeZoneProtocol(e){return !!IsTemporalTimeZone(e)||"getOffsetNanosecondsFor"in e&&"getPossibleInstantsFor"in e&&"id"in e}(e))throw new TypeError("expected a Temporal.TimeZone or object implementing the Temporal.TimeZone protocol");return e}return ParseTemporalTimeZone(ToString(e))}function ToTemporalTimeZoneIdentifier(e){if("string"==typeof e)return e;const t=e.id;if("string"!=typeof t)throw new TypeError("timeZone.id should be a string");return t}function ToTemporalTimeZoneObject(e){if(IsObject(e))return e;return new(GetIntrinsic("%Temporal.TimeZone%"))(e)}function TimeZoneEquals(e,t){if(e===t)return !0;return ToTemporalTimeZoneIdentifier(e)===ToTemporalTimeZoneIdentifier(t)}function TemporalDateTimeToDate(e){return CreateTemporalDate(GetSlot(e,i$2),GetSlot(e,s$2),GetSlot(e,l$2),GetSlot(e,p$1))}function TemporalDateTimeToTime(e){return new(GetIntrinsic("%Temporal.PlainTime%"))(GetSlot(e,d$2),GetSlot(e,m$2),GetSlot(e,c$2),GetSlot(e,h$1),GetSlot(e,u$2),GetSlot(e,T$2))}function GetOffsetNanosecondsFor(e,t,r){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.TimeZone%"))(e);return Call(GetIntrinsic("%Temporal.TimeZone.prototype.getOffsetNanosecondsFor%"),r,[t])}const o=Call(GetMethod(e,"getOffsetNanosecondsFor"),e,[t]);if("number"!=typeof o)throw new TypeError("bad return from getOffsetNanosecondsFor");if(!IsIntegralNumber(o)||ae(o)>=864e11)throw new RangeError("out-of-range return from getOffsetNanosecondsFor");return o}function GetOffsetStringFor(e,t){return FormatTimeZoneOffsetString(GetOffsetNanosecondsFor(e,t))}function GetPlainDateTimeFor(e,t,r){const o=GetSlot(t,n$1),a=GetOffsetNanosecondsFor(e,t);let{year:i,month:s,day:l,hour:d,minute:m,second:c,millisecond:h,microsecond:u,nanosecond:T}=GetISOPartsFromEpoch(o);return ({year:i,month:s,day:l,hour:d,minute:m,second:c,millisecond:h,microsecond:u,nanosecond:T}=BalanceISODateTime(i,s,l,d,m,c,h,u,T+a)),CreateTemporalDateTime(i,s,l,d,m,c,h,u,T,r)}function GetInstantFor(e,t,r){return DisambiguatePossibleInstants(GetPossibleInstantsFor(e,t),e,t,r)}function DisambiguatePossibleInstants(t,r,o,n){const a=GetIntrinsic("%Temporal.Instant%"),f=t.length;if(1===f)return t[0];if(f)switch(n){case"compatible":case"earlier":return t[0];case"later":return t[f-1];case"reject":throw new RangeError("multiple instants found")}const y=GetSlot(o,i$2),I=GetSlot(o,s$2),S=GetSlot(o,l$2),g=GetSlot(o,d$2),w=GetSlot(o,m$2),D=GetSlot(o,c$2),G=GetSlot(o,h$1),v=GetSlot(o,u$2),C=GetSlot(o,T$2),O=GetUTCEpochNanoseconds(y,I,S,g,w,D,G,v,C);if(null===O)throw new RangeError("DateTime outside of supported range");const b=new a(JSBI.subtract(O,Ee)),E=new a(JSBI.add(O,Ee)),M=GetOffsetNanosecondsFor(r,b),R=GetOffsetNanosecondsFor(r,E)-M;switch(n){case"earlier":{const e=GetSlot(o,p$1),t=GetIntrinsic("%Temporal.PlainDateTime%"),n=AddDateTime(y,I,S,g,w,D,G,v,C,e,0,0,0,0,0,0,0,0,0,-R,void 0);return GetPossibleInstantsFor(r,new t(n.year,n.month,n.day,n.hour,n.minute,n.second,n.millisecond,n.microsecond,n.nanosecond,e))[0]}case"compatible":case"later":{const e=GetSlot(o,p$1),t=GetIntrinsic("%Temporal.PlainDateTime%"),n=AddDateTime(y,I,S,g,w,D,G,v,C,e,0,0,0,0,0,0,0,0,0,R,void 0),a=GetPossibleInstantsFor(r,new t(n.year,n.month,n.day,n.hour,n.minute,n.second,n.millisecond,n.microsecond,n.nanosecond,e));return a[a.length-1]}case"reject":throw new RangeError("no such instant found")}}function GetPossibleInstantsFor(e,t,r){if("string"==typeof e){const r=new(GetIntrinsic("%Temporal.TimeZone%"))(e);return Call(GetIntrinsic("%Temporal.TimeZone.prototype.getPossibleInstantsFor%"),r,[t])}const o=Call(GetMethod(e,"getPossibleInstantsFor"),e,[t]),n=[];for(const e of o){if(!IsTemporalInstant(e))throw new TypeError("bad return from getPossibleInstantsFor");te.call(n,e);}return n}function ISOYearString(e){let t;if(e<0||e>9999){t=(e<0?"-":"+")+`000000${ae(e)}`.slice(-6);}else t=`0000${e}`.slice(-4);return t}function ISODateTimePartString(e){return `00${e}`.slice(-2)}function FormatSecondsStringPart(e,t,r,o,n){if("minute"===n)return "";const a=`:${ISODateTimePartString(e)}`;let i,s=1e6*t+1e3*r+o;if("auto"===n){if(0===s)return a;for(i=`${s}`.padStart(9,"0");"0"===i[i.length-1];)i=i.slice(0,-1);}else {if(0===n)return a;i=`${s}`.padStart(9,"0").slice(0,n);}return `${a}.${i}`}function TemporalInstantToString(e,t,r){let o=t;void 0===o&&(o="UTC");const n=GetPlainDateTimeFor(o,e,"iso8601"),a=ISOYearString(GetSlot(n,i$2)),p=ISODateTimePartString(GetSlot(n,s$2)),f=ISODateTimePartString(GetSlot(n,l$2)),y=ISODateTimePartString(GetSlot(n,d$2)),I=ISODateTimePartString(GetSlot(n,m$2)),S=FormatSecondsStringPart(GetSlot(n,c$2),GetSlot(n,h$1),GetSlot(n,u$2),GetSlot(n,T$2),r);let g="Z";if(void 0!==t){g=FormatISOTimeZoneOffsetString(GetOffsetNanosecondsFor(o,e));}return `${a}-${p}-${f}T${y}:${I}${S}${g}`}function TemporalDurationToString(t,r="auto",o){function formatNumber(t){return t<=ue?t.toString(10):JSBI.BigInt(t).toString(10)}const n=GetSlot(t,w$2),a=GetSlot(t,D$1),i=GetSlot(t,G),s=GetSlot(t,v$2),l=GetSlot(t,C$2),d=GetSlot(t,O$2);let m=GetSlot(t,b),c=GetSlot(t,E$1),h=GetSlot(t,M$2),u=GetSlot(t,R$1);const T=DurationSign(n,a,i,s,l,d,m,c,h,u);if(o){const{unit:e,increment:t,roundingMode:r}=o;({seconds:m,milliseconds:c,microseconds:h,nanoseconds:u}=RoundDuration(0,0,0,0,0,0,m,c,h,u,t,e,r));}const p=[];n&&p.push(`${formatNumber(ae(n))}Y`),a&&p.push(`${formatNumber(ae(a))}M`),i&&p.push(`${formatNumber(ae(i))}W`),s&&p.push(`${formatNumber(ae(s))}D`);const f=[];l&&f.push(`${formatNumber(ae(l))}H`),d&&f.push(`${formatNumber(ae(d))}M`);const y=[];let I,S,g,F,Y=TotalDurationNanoseconds(0,0,0,m,c,h,u,0);(({quotient:Y,remainder:I}=divmod(Y,De))),({quotient:Y,remainder:S}=divmod(Y,De)),({quotient:F,remainder:g}=divmod(Y,De));const P=1e6*ae(JSBI.toNumber(g))+1e3*ae(JSBI.toNumber(S))+ae(JSBI.toNumber(I));let Z;if("auto"===r){if(0!==P)for(Z=`${P}`.padStart(9,"0");"0"===Z[Z.length-1];)Z=Z.slice(0,-1);}else 0!==r&&(Z=`${P}`.padStart(9,"0").slice(0,r));return Z&&y.unshift(".",Z),JSBI.equal(F,Ie)&&!y.length&&"auto"===r||y.unshift(abs(F).toString()),y.length&&f.push(`${y.join("")}S`),f.length&&f.unshift("T"),p.length||f.length?`${T<0?"-":""}P${p.join("")}${f.join("")}`:"PT0S"}function TemporalDateToString(e,t="auto"){return `${ISOYearString(GetSlot(e,i$2))}-${ISODateTimePartString(GetSlot(e,s$2))}-${ISODateTimePartString(GetSlot(e,l$2))}${MaybeFormatCalendarAnnotation(GetSlot(e,p$1),t)}`}function TemporalDateTimeToString(e,t,r="auto",o){let n=GetSlot(e,i$2),a=GetSlot(e,s$2),f=GetSlot(e,l$2),y=GetSlot(e,d$2),I=GetSlot(e,m$2),S=GetSlot(e,c$2),g=GetSlot(e,h$1),w=GetSlot(e,u$2),D=GetSlot(e,T$2);if(o){const{unit:e,increment:t,roundingMode:r}=o;({year:n,month:a,day:f,hour:y,minute:I,second:S,millisecond:g,microsecond:w,nanosecond:D}=RoundISODateTime(n,a,f,y,I,S,g,w,D,t,e,r));}return `${ISOYearString(n)}-${ISODateTimePartString(a)}-${ISODateTimePartString(f)}T${ISODateTimePartString(y)}:${ISODateTimePartString(I)}${FormatSecondsStringPart(S,g,w,D,t)}${MaybeFormatCalendarAnnotation(GetSlot(e,p$1),r)}`}function TemporalMonthDayToString(e,t="auto"){let r=`${ISODateTimePartString(GetSlot(e,s$2))}-${ISODateTimePartString(GetSlot(e,l$2))}`;const o=ToTemporalCalendarIdentifier(GetSlot(e,p$1));if("always"===t||"critical"===t||"iso8601"!==o){r=`${ISOYearString(GetSlot(e,i$2))}-${r}`;}const n=FormatCalendarAnnotation(o,t);return n&&(r+=n),r}function TemporalYearMonthToString(e,t="auto"){let r=`${ISOYearString(GetSlot(e,i$2))}-${ISODateTimePartString(GetSlot(e,s$2))}`;const o=ToTemporalCalendarIdentifier(GetSlot(e,p$1));if("always"===t||"critical"===t||"iso8601"!==o){r+=`-${ISODateTimePartString(GetSlot(e,l$2))}`;}const n=FormatCalendarAnnotation(o,t);return n&&(r+=n),r}function TemporalZonedDateTimeToString(e,t,r="auto",o="auto",a="auto",f){let y=GetSlot(e,S$1);if(f){const{unit:t,increment:r,roundingMode:o}=f,a=RoundInstant(GetSlot(e,n$1),r,t,o);y=new(GetIntrinsic("%Temporal.Instant%"))(a);}const I=GetSlot(e,g$2),w=GetPlainDateTimeFor(I,y,"iso8601");let D=`${ISOYearString(GetSlot(w,i$2))}-${ISODateTimePartString(GetSlot(w,s$2))}-${ISODateTimePartString(GetSlot(w,l$2))}T${ISODateTimePartString(GetSlot(w,d$2))}:${ISODateTimePartString(GetSlot(w,m$2))}${FormatSecondsStringPart(GetSlot(w,c$2),GetSlot(w,h$1),GetSlot(w,u$2),GetSlot(w,T$2),t)}`;if("never"!==a){D+=FormatISOTimeZoneOffsetString(GetOffsetNanosecondsFor(I,y));}if("never"!==o){D+=`[${"critical"===o?"!":""}${ToTemporalTimeZoneIdentifier(I)}]`;}return D+=MaybeFormatCalendarAnnotation(GetSlot(e,p$1),r),D}function IsTimeZoneOffsetString(e){return ze.test(he(e))}function ParseTimeZoneOffsetString(e){const t=ze.exec(he(e));if(!t)throw new RangeError(`invalid time zone offset: ${e}`);return ("-"===t[1]||"−"===t[1]?-1:1)*(1e9*(60*(60*+t[2]+ +(t[3]||0))+ +(t[4]||0))+ +((t[5]||0)+"000000000").slice(0,9))}function GetCanonicalTimeZoneIdentifier(e){if(IsTimeZoneOffsetString(e)){return FormatTimeZoneOffsetString(ParseTimeZoneOffsetString(e))}return getIntlDateTimeFormatEnUsForTimeZone(he(e)).resolvedOptions().timeZone}function GetNamedTimeZoneOffsetNanoseconds(t,r){const{year:o,month:n,day:a,hour:i,minute:s,second:l,millisecond:d,microsecond:m,nanosecond:c}=GetNamedTimeZoneDateTimeParts(t,r),h=o%400,u=(o-h)/400,T=JSBI.multiply(JSBI.BigInt(146097),Ee),p=GetUTCEpochNanoseconds(h,n,a,i,s,l,d,m,c),f=JSBI.add(p,JSBI.multiply(T,JSBI.BigInt(u)));return JSBI.toNumber(JSBI.subtract(f,r))}function FormatTimeZoneOffsetString(e){const t=e<0?"-":"+",r=ae(e),o=r%1e9,n=ie(r/1e9)%60,a=ie(r/6e10)%60,i=ISODateTimePartString(ie(r/36e11)),s=ISODateTimePartString(a),l=ISODateTimePartString(n);let d="";if(o){let e=`${o}`.padStart(9,"0");for(;"0"===e[e.length-1];)e=e.slice(0,-1);d=`:${l}.${e}`;}else n&&(d=`:${l}`);return `${t}${i}:${s}${d}`}function FormatISOTimeZoneOffsetString(t){let r=JSBI.toNumber(RoundNumberToIncrement(JSBI.BigInt(t),be,"halfExpand"));const o=r<0?"-":"+";r=ae(r);const n=r/6e10%60;return `${o}${ISODateTimePartString(ie(r/36e11))}:${ISODateTimePartString(n)}`}function GetUTCEpochNanoseconds(t,r,o,n,a,i,s,l,d){const m=new Date;m.setUTCHours(n,a,i,s),m.setUTCFullYear(t,r-1,o);const c=m.getTime();if(de(c))return null;let h=JSBI.multiply(JSBI.BigInt(c),Ge);return h=JSBI.add(h,JSBI.multiply(JSBI.BigInt(l),De)),h=JSBI.add(h,JSBI.BigInt(d)),JSBI.lessThan(h,Me)||JSBI.greaterThan(h,Re)?null:h}function GetISOPartsFromEpoch(t){const{quotient:r,remainder:o}=divmod(t,Ge);let n=JSBI.toNumber(r),a=JSBI.toNumber(o);a<0&&(a+=1e6,n-=1);const i=ie(a/1e3)%1e3,s=a%1e3,l=new Date(n);return {epochMilliseconds:n,year:l.getUTCFullYear(),month:l.getUTCMonth()+1,day:l.getUTCDate(),hour:l.getUTCHours(),minute:l.getUTCMinutes(),second:l.getUTCSeconds(),millisecond:l.getUTCMilliseconds(),microsecond:i,nanosecond:s}}function GetNamedTimeZoneDateTimeParts(e,t){const{epochMilliseconds:r,millisecond:o,microsecond:n,nanosecond:a}=GetISOPartsFromEpoch(t),{year:i,month:s,day:l,hour:d,minute:m,second:c}=function GetFormatterParts(e,t){const r=getIntlDateTimeFormatEnUsForTimeZone(e).format(new Date(t));return function parseFromEnUsFormat(e){const t=e.split(/[^\w]+/);if(7!==t.length)throw new RangeError(`expected 7 parts in "${e}`);const r=+t[0],o=+t[1];let n=+t[2];const a=t[3].toUpperCase();if("B"===a||"BC"===a)n=1-n;else if("A"!==a&&"AD"!==a)throw new RangeError(`Unknown era ${a} in "${e}`);let i=+t[4];24===i&&(i=0);const s=+t[5],l=+t[6];if(!(me(n)&&me(r)&&me(o)&&me(i)&&me(s)&&me(l)))throw new RangeError(`Invalid number in "${e}`);return {year:n,month:r,day:o,hour:i,minute:s,second:l}}(r)}(e,r);return BalanceISODateTime(i,s,l,d,m,c,o,n,a)}function maxJSBI(t,r){return JSBI.lessThan(t,r)?r:t}function afterLatestPossibleTzdbRuleChange(){return JSBI.add(Ve(),Ze)}function GetNamedTimeZoneNextTransition(t,r){if(JSBI.lessThan(r,Pe))return GetNamedTimeZoneNextTransition(t,Pe);const o=JSBI.add(r,Be),n=maxJSBI(afterLatestPossibleTzdbRuleChange(),o);let a=maxJSBI(Pe,r);const i=GetNamedTimeZoneOffsetNanoseconds(t,a);let s=a,l=i;for(;i===l&&JSBI.lessThan(JSBI.BigInt(a),n);){if(s=JSBI.add(a,Ne),JSBI.greaterThan(s,Re))return null;l=GetNamedTimeZoneOffsetNanoseconds(t,s),i===l&&(a=s);}if(i===l)return null;return bisect((e=>GetNamedTimeZoneOffsetNanoseconds(t,e)),a,s,i,l)}function GetNamedTimeZonePreviousTransition(t,r){const o=afterLatestPossibleTzdbRuleChange(),a=JSBI.greaterThan(r,o),i=a?JSBI.subtract(r,Be):Pe;if("Africa/Casablanca"===t||"Africa/El_Aaiun"===t){const o=GetSlot(ToTemporalInstant("2088-01-01T00Z"),n$1);if(JSBI.lessThan(o,r))return GetNamedTimeZonePreviousTransition(t,o)}let s=JSBI.subtract(r,Se);if(JSBI.lessThan(s,Pe))return null;const l=GetNamedTimeZoneOffsetNanoseconds(t,s);let d=s,m=l;for(;l===m&&JSBI.greaterThan(s,i);){if(d=JSBI.subtract(s,Ne),JSBI.lessThan(d,Pe))return null;m=GetNamedTimeZoneOffsetNanoseconds(t,d),l===m&&(s=d);}if(l===m){if(a){const r=JSBI.subtract(o,Ee);return GetNamedTimeZonePreviousTransition(t,r)}return null}return bisect((e=>GetNamedTimeZoneOffsetNanoseconds(t,e)),d,s,m,l)}function LeapYear(e){if(void 0===e)return !1;return e%4==0&&(!(e%100==0)||e%400==0)}function ISODaysInMonth(e,t){return {standard:[31,28,31,30,31,30,31,31,30,31,30,31],leapyear:[31,29,31,30,31,30,31,31,30,31,30,31]}[LeapYear(e)?"leapyear":"standard"][t-1]}function DayOfWeek(e,t,r){const o=t+(t<3?10:-2),n=e-(t<3?1:0),a=ie(n/100),i=n-100*a,s=(r+ie(2.6*o-.2)+(i+ie(i/4))+(ie(a/4)-2*a))%7;return s+(s<=0?7:0)}function DayOfYear(e,t,r){let o=r;for(let r=t-1;r>0;r--)o+=ISODaysInMonth(e,r);return o}function WeekOfYear(e,t,r){const o=DayOfYear(e,t,r),n=DayOfWeek(e,t,r)||7,a=DayOfWeek(e,1,1),i=ie((o-n+10)/7);return i<1?5===a||6===a&&LeapYear(e-1)?{week:53,year:e-1}:{week:52,year:e-1}:53===i&&(LeapYear(e)?366:365)-o<4-n?{week:1,year:e+1}:{week:i,year:e}}function DurationSign(e,t,r,o,n,a,i,s,l,d){for(const m of [e,t,r,o,n,a,i,s,l,d])if(0!==m)return m<0?-1:1;return 0}function BalanceISOYearMonth(e,t){let r=e,o=t;if(!me(r)||!me(o))throw new RangeError("infinity is out of range");return o-=1,r+=ie(o/12),o%=12,o<0&&(o+=12),o+=1,{year:r,month:o}}function BalanceISODate(e,t,r){let o=e,n=t,a=r;if(!me(a))throw new RangeError("infinity is out of range");({year:o,month:n}=BalanceISOYearMonth(o,n));const i=146097;if(ae(a)>i){const e=le(a/i);o+=400*e,a-=e*i;}let s=0,l=n>2?o:o-1;for(;s=LeapYear(l)?366:365,a<-s;)o-=1,l-=1,a+=s;for(l+=1;s=LeapYear(l)?366:365,a>s;)o+=1,l+=1,a-=s;for(;a<1;)(({year:o,month:n}=BalanceISOYearMonth(o,n-1))),a+=ISODaysInMonth(o,n);for(;a>ISODaysInMonth(o,n);)a-=ISODaysInMonth(o,n),({year:o,month:n}=BalanceISOYearMonth(o,n+1));return {year:o,month:n,day:a}}function BalanceISODateTime(e,t,r,o,n,a,i,s,l){const{deltaDays:d,hour:m,minute:c,second:h,millisecond:u,microsecond:T,nanosecond:p}=BalanceTime(o,n,a,i,s,l),{year:f,month:y,day:I}=BalanceISODate(e,t,r+d);return {year:f,month:y,day:I,hour:m,minute:c,second:h,millisecond:u,microsecond:T,nanosecond:p}}function BalanceTime(t,r,o,n,a,i){let s,l=JSBI.BigInt(t),d=JSBI.BigInt(r),m=JSBI.BigInt(o),c=JSBI.BigInt(n),h=JSBI.BigInt(a),u=JSBI.BigInt(i);return ({quotient:s,remainder:u}=NonNegativeBigIntDivmod(u,De)),h=JSBI.add(h,s),({quotient:s,remainder:h}=NonNegativeBigIntDivmod(h,De)),c=JSBI.add(c,s),({quotient:s,remainder:c}=NonNegativeBigIntDivmod(c,De)),m=JSBI.add(m,s),({quotient:s,remainder:m}=NonNegativeBigIntDivmod(m,ge)),d=JSBI.add(d,s),({quotient:s,remainder:d}=NonNegativeBigIntDivmod(d,ge)),l=JSBI.add(l,s),({quotient:s,remainder:l}=NonNegativeBigIntDivmod(l,we)),{deltaDays:JSBI.toNumber(s),hour:JSBI.toNumber(l),minute:JSBI.toNumber(d),second:JSBI.toNumber(m),millisecond:JSBI.toNumber(c),microsecond:JSBI.toNumber(h),nanosecond:JSBI.toNumber(u)}}function TotalDurationNanoseconds(t,r,o,n,a,i,s,l){const d=JSBI.BigInt(t);let m=JSBI.BigInt(s);0!==t&&(m=JSBI.subtract(JSBI.BigInt(s),JSBI.BigInt(l)));const c=JSBI.add(JSBI.BigInt(r),JSBI.multiply(d,JSBI.BigInt(24))),h=JSBI.add(JSBI.BigInt(o),JSBI.multiply(c,ge)),u=JSBI.add(JSBI.BigInt(n),JSBI.multiply(h,ge)),T=JSBI.add(JSBI.BigInt(a),JSBI.multiply(u,De)),p=JSBI.add(JSBI.BigInt(i),JSBI.multiply(T,De));return JSBI.add(JSBI.BigInt(m),JSBI.multiply(p,De))}function NanosecondsToDays(t,r){const o=GetIntrinsic("%Temporal.Instant%"),a=se(JSBI.toNumber(t));let f=JSBI.BigInt(t),y=864e11;if(0===a)return {days:0,nanoseconds:Ie,dayLengthNs:y};if(!IsTemporalZonedDateTime(r)){let t;return ({quotient:t,remainder:f}=divmod(f,JSBI.BigInt(y))),{days:JSBI.toNumber(t),nanoseconds:f,dayLengthNs:y}}const I=GetSlot(r,n$1),w=GetSlot(r,S$1),D=JSBI.add(I,f),G=new o(D),v=GetSlot(r,g$2),C=GetSlot(r,p$1),O=GetPlainDateTimeFor(v,w,C),b=GetPlainDateTimeFor(v,G,C);let{days:E}=DifferenceISODateTime(GetSlot(O,i$2),GetSlot(O,s$2),GetSlot(O,l$2),GetSlot(O,d$2),GetSlot(O,m$2),GetSlot(O,c$2),GetSlot(O,h$1),GetSlot(O,u$2),GetSlot(O,T$2),GetSlot(b,i$2),GetSlot(b,s$2),GetSlot(b,l$2),GetSlot(b,d$2),GetSlot(b,m$2),GetSlot(b,c$2),GetSlot(b,h$1),GetSlot(b,u$2),GetSlot(b,T$2),C,"day",Te(null)),M=AddZonedDateTime(w,v,C,0,0,0,E,0,0,0,0,0,0),R=JSBI.BigInt(E);if(1===a)for(;JSBI.greaterThan(R,Ie)&&JSBI.greaterThan(M,D);)R=JSBI.subtract(R,Se),M=AddZonedDateTime(w,v,C,0,0,0,JSBI.toNumber(R),0,0,0,0,0,0);f=JSBI.subtract(D,M);let F=!1,Y=new o(M);do{const t=AddZonedDateTime(Y,v,C,0,0,0,a,0,0,0,0,0,0),r=GetSlot(Y,n$1);y=JSBI.toNumber(JSBI.subtract(t,r)),F=JSBI.greaterThanOrEqual(JSBI.multiply(JSBI.subtract(f,JSBI.BigInt(y)),JSBI.BigInt(a)),Ie),F&&(f=JSBI.subtract(f,JSBI.BigInt(y)),Y=new o(t),R=JSBI.add(R,JSBI.BigInt(a)));}while(F);if(!isZero(R)&&signJSBI(R)!==a)throw new RangeError("Time zone or calendar converted nanoseconds into a number of days with the opposite sign");if(!isZero(f)&&signJSBI(f)!==a){if(isNegativeJSBI(f)&&1===a)throw new Error("assert not reached");throw new RangeError("Time zone or calendar ended up with a remainder of nanoseconds with the opposite sign")}if(JSBI.greaterThanOrEqual(abs(f),abs(JSBI.BigInt(y))))throw new Error("assert not reached");return {days:JSBI.toNumber(R),nanoseconds:f,dayLengthNs:ae(y)}}function BalanceDuration(e,t,r,o,n,a,i,s,l){let d=BalancePossiblyInfiniteDuration(e,t,r,o,n,a,i,s,l);if("positive overflow"===d||"negative overflow"===d)throw new RangeError("Duration out of range");return d}function BalancePossiblyInfiniteDuration(t,r,o,a,i,s,l,d,m){let c,h,u,T,f,y,I=t;if(IsTemporalZonedDateTime(m)){const t=AddZonedDateTime(GetSlot(m,S$1),GetSlot(m,g$2),GetSlot(m,p$1),0,0,0,I,r,o,a,i,s,l),d=GetSlot(m,n$1);c=JSBI.subtract(t,d);}else c=TotalDurationNanoseconds(I,r,o,a,i,s,l,0);"year"===d||"month"===d||"week"===d||"day"===d?({days:I,nanoseconds:c}=NanosecondsToDays(c,m)):I=0;const w=JSBI.lessThan(c,Ie)?-1:1;switch(c=abs(c),h=u=T=f=y=Ie,d){case"year":case"month":case"week":case"day":case"hour":(({quotient:h,remainder:c}=divmod(c,De))),({quotient:u,remainder:h}=divmod(h,De)),({quotient:T,remainder:u}=divmod(u,De)),({quotient:f,remainder:T}=divmod(T,ge)),({quotient:y,remainder:f}=divmod(f,ge));break;case"minute":(({quotient:h,remainder:c}=divmod(c,De))),({quotient:u,remainder:h}=divmod(h,De)),({quotient:T,remainder:u}=divmod(u,De)),({quotient:f,remainder:T}=divmod(T,ge));break;case"second":(({quotient:h,remainder:c}=divmod(c,De))),({quotient:u,remainder:h}=divmod(h,De)),({quotient:T,remainder:u}=divmod(u,De));break;case"millisecond":(({quotient:h,remainder:c}=divmod(c,De))),({quotient:u,remainder:h}=divmod(h,De));break;case"microsecond":({quotient:h,remainder:c}=divmod(c,De));break;case"nanosecond":break;default:throw new Error("assert not reached")}const D=JSBI.toNumber(y)*w,G=JSBI.toNumber(f)*w,v=JSBI.toNumber(T)*w,C=JSBI.toNumber(u)*w,O=JSBI.toNumber(h)*w,b=JSBI.toNumber(c)*w;for(const e of [I,D,G,v,C,O,b])if(!me(e))return 1===w?"positive overflow":"negative overflow";return {days:I,hours:D,minutes:G,seconds:v,milliseconds:C,microseconds:O,nanoseconds:b}}function UnbalanceDurationRelative(t,r,o,n,a,i){const s=GetIntrinsic("%Temporal.Duration%"),l=DurationSign(t,r,o,n,0,0,0,0,0,0);if(0===l)return {years:t,months:r,weeks:o,days:n};const d=JSBI.BigInt(l);let m,c,h=JSBI.BigInt(t),u=JSBI.BigInt(r),T=JSBI.BigInt(o),f=JSBI.BigInt(n);i&&(c=ToTemporalDate(i),m=GetSlot(c,p$1));const y=new s(l),I=new s(0,l),S=new s(0,0,l);switch(a){case"year":break;case"month":{if(!m)throw new RangeError("a starting point is required for months balancing");let t,r;for("string"!=typeof m&&(t=GetMethod(m,"dateAdd"),r=GetMethod(m,"dateUntil"));!isZero(h);){const o=CalendarDateAdd(m,c,y,void 0,t),n=Te(null);n.largestUnit="month";const a=CalendarDateUntil(m,c,o,n,r),i=JSBI.BigInt(GetSlot(a,D$1));c=o,u=JSBI.add(u,i),h=JSBI.subtract(h,d);}}break;case"week":{if(!m)throw new RangeError("a starting point is required for weeks balancing");const t="string"!=typeof m?GetMethod(m,"dateAdd"):void 0;for(;!isZero(h);){let r;(({relativeTo:c,days:r}=MoveRelativeDate(m,c,y,t))),f=JSBI.add(f,JSBI.BigInt(r)),h=JSBI.subtract(h,d);}for(;!isZero(u);){let r;(({relativeTo:c,days:r}=MoveRelativeDate(m,c,I,t))),f=JSBI.add(f,JSBI.BigInt(r)),u=JSBI.subtract(u,d);}break}default:{if(isZero(h)&&isZero(u)&&isZero(T))break;if(!m)throw new RangeError("a starting point is required for balancing calendar units");const t="string"!=typeof m?GetMethod(m,"dateAdd"):void 0;for(;!isZero(h);){let r;(({relativeTo:c,days:r}=MoveRelativeDate(m,c,y,t))),f=JSBI.add(f,JSBI.BigInt(r)),h=JSBI.subtract(h,d);}for(;!isZero(u);){let r;(({relativeTo:c,days:r}=MoveRelativeDate(m,c,I,t))),f=JSBI.add(f,JSBI.BigInt(r)),u=JSBI.subtract(u,d);}for(;!isZero(T);){let r;(({relativeTo:c,days:r}=MoveRelativeDate(m,c,S,t))),f=JSBI.add(f,JSBI.BigInt(r)),T=JSBI.subtract(T,d);}break}}return {years:JSBI.toNumber(h),months:JSBI.toNumber(u),weeks:JSBI.toNumber(T),days:JSBI.toNumber(f)}}function CalculateOffsetShift(e,t,r,o,n){if(IsTemporalZonedDateTime(e)){const a=GetSlot(e,S$1),i=GetSlot(e,g$2),s=GetSlot(e,p$1),l=GetOffsetNanosecondsFor(i,a),d=AddZonedDateTime(a,i,s,t,r,o,n,0,0,0,0,0,0);return GetOffsetNanosecondsFor(i,new(GetIntrinsic("%Temporal.Instant%"))(d))-l}return 0}function CreateNegatedTemporalDuration(e){return new(GetIntrinsic("%Temporal.Duration%"))(-GetSlot(e,w$2),-GetSlot(e,D$1),-GetSlot(e,G),-GetSlot(e,v$2),-GetSlot(e,C$2),-GetSlot(e,O$2),-GetSlot(e,b),-GetSlot(e,E$1),-GetSlot(e,M$2),-GetSlot(e,R$1))}function ConstrainToRange(e,t,r){return oe(r,ne(t,e))}function ConstrainISODate(e,t,r){const o=ConstrainToRange(t,1,12);return {year:e,month:o,day:ConstrainToRange(r,1,ISODaysInMonth(e,o))}}function RejectToRange(e,t,r){if(e<t||e>r)throw new RangeError(`value out of range: ${t} <= ${e} <= ${r}`)}function RejectISODate(e,t,r){RejectToRange(t,1,12),RejectToRange(r,1,ISODaysInMonth(e,t));}function RejectDateRange(e,t,r){RejectDateTimeRange(e,t,r,12,0,0,0,0,0);}function RejectTime(e,t,r,o,n,a){RejectToRange(e,0,23),RejectToRange(t,0,59),RejectToRange(r,0,59),RejectToRange(o,0,999),RejectToRange(n,0,999),RejectToRange(a,0,999);}function RejectDateTime(e,t,r,o,n,a,i,s,l){RejectISODate(e,t,r),RejectTime(o,n,a,i,s,l);}function RejectDateTimeRange(e,t,r,o,n,a,i,s,l){if(RejectToRange(e,Fe,Ye),e===Fe&&null==GetUTCEpochNanoseconds(e,t,r+1,o,n,a,i,s,l-1)||e===Ye&&null==GetUTCEpochNanoseconds(e,t,r-1,o,n,a,i,s,l+1))throw new RangeError("DateTime outside of supported range")}function ValidateEpochNanoseconds(t){if(JSBI.lessThan(t,Me)||JSBI.greaterThan(t,Re))throw new RangeError("Instant outside of supported range")}function RejectDuration(e,t,r,o,n,a,i,s,l,d){const m=DurationSign(e,t,r,o,n,a,i,s,l,d);for(const c of [e,t,r,o,n,a,i,s,l,d]){if(!me(c))throw new RangeError("infinite values not allowed as duration fields");const e=se(c);if(0!==e&&e!==m)throw new RangeError("mixed-sign values not allowed as duration fields")}}function DifferenceISODate(e,t,r,o,n,a,i){switch(i){case"year":case"month":{const s=-CompareISODate(e,t,r,o,n,a);if(0===s)return {years:0,months:0,weeks:0,days:0};const l={year:e,month:t,day:r},d={year:o,month:n,day:a};let m=d.year-l.year,c=AddISODate(e,t,r,m,0,0,0,"constrain"),h=-CompareISODate(c.year,c.month,c.day,o,n,a);if(0===h)return "year"===i?{years:m,months:0,weeks:0,days:0}:{years:0,months:12*m,weeks:0,days:0};let u=d.month-l.month;if(h!==s&&(m-=s,u+=12*s),c=AddISODate(e,t,r,m,u,0,0,"constrain"),h=-CompareISODate(c.year,c.month,c.day,o,n,a),0===h)return "year"===i?{years:m,months:u,weeks:0,days:0}:{years:0,months:u+12*m,weeks:0,days:0};h!==s&&(u-=s,u===-s&&(m-=s,u=11*s),c=AddISODate(e,t,r,m,u,0,0,"constrain"));let T=0;return T=c.month===d.month?d.day-c.day:s<0?-c.day-(ISODaysInMonth(d.year,d.month)-d.day):d.day+(ISODaysInMonth(c.year,c.month)-c.day),"month"===i&&(u+=12*m,m=0),{years:m,months:u,weeks:0,days:T}}case"week":case"day":{let s,l,d;CompareISODate(e,t,r,o,n,a)<0?(l={year:e,month:t,day:r},s={year:o,month:n,day:a},d=1):(l={year:o,month:n,day:a},s={year:e,month:t,day:r},d=-1);let m=DayOfYear(s.year,s.month,s.day)-DayOfYear(l.year,l.month,l.day);for(let e=l.year;e<s.year;++e)m+=LeapYear(e)?366:365;let c=0;return "week"===i&&(c=ie(m/7),m%=7),c*=d,m*=d,{years:0,months:0,weeks:c,days:m}}default:throw new Error("assert not reached")}}function DifferenceTime(e,t,r,o,n,a,i,s,l,d,m,c){let h=i-e,u=s-t,T=l-r,p=d-o,f=m-n,y=c-a;const I=DurationSign(0,0,0,0,h,u,T,p,f,y);h*=I,u*=I,T*=I,p*=I,f*=I,y*=I;let S=0;if(({deltaDays:S,hour:h,minute:u,second:T,millisecond:p,microsecond:f,nanosecond:y}=BalanceTime(h,u,T,p,f,y)),0!=S)throw new Error("assertion failure in DifferenceTime: _bt_.[[Days]] should be 0");return h*=I,u*=I,T*=I,p*=I,f*=I,y*=I,{hours:h,minutes:u,seconds:T,milliseconds:p,microseconds:f,nanoseconds:y}}function DifferenceInstant(t,r,o,n,a,i){const s=JSBI.subtract(r,t);let l=0,d=0,m=JSBI.toNumber(JSBI.remainder(s,De)),c=JSBI.toNumber(JSBI.remainder(JSBI.divide(s,De),De)),h=JSBI.toNumber(JSBI.remainder(JSBI.divide(s,Ge),De)),u=JSBI.toNumber(JSBI.divide(s,ve));return ({hours:l,minutes:d,seconds:u,milliseconds:h,microseconds:c,nanoseconds:m}=RoundDuration(0,0,0,0,0,0,u,h,c,m,o,n,i)),BalanceDuration(0,l,d,u,h,c,m,a)}function DifferenceISODateTime(e,t,r,o,n,a,i,s,l,d,m,c,h,u,T,p,f,y,I,S,g){let w=e,D=t,G=r,{hours:v,minutes:C,seconds:O,milliseconds:b,microseconds:E,nanoseconds:M}=DifferenceTime(o,n,a,i,s,l,h,u,T,p,f,y);const R=DurationSign(0,0,0,0,v,C,O,b,E,M);CompareISODate(d,m,c,w,D,G)===-R&&(({year:w,month:D,day:G}=BalanceISODate(w,D,G-R)),({hours:v,minutes:C,seconds:O,milliseconds:b,microseconds:E,nanoseconds:M}=BalanceDuration(-R,v,C,O,b,E,M,S)));const F=CreateTemporalDate(w,D,G,I),Y=CreateTemporalDate(d,m,c,I),P=LargerOfTwoTemporalUnits("day",S),Z=CopyOptions(g);Z.largestUnit=P;let{years:B,months:N,weeks:j,days:$}=CalendarDateUntil(I,F,Y,Z);return ({days:$,hours:v,minutes:C,seconds:O,milliseconds:b,microseconds:E,nanoseconds:M}=BalanceDuration($,v,C,O,b,E,M,S)),{years:B,months:N,weeks:j,days:$,hours:v,minutes:C,seconds:O,milliseconds:b,microseconds:E,nanoseconds:M}}function DifferenceZonedDateTime(t,r,o,n,a,p){const f=JSBI.subtract(r,t);if(JSBI.equal(f,Ie))return {years:0,months:0,weeks:0,days:0,hours:0,minutes:0,seconds:0,milliseconds:0,microseconds:0,nanoseconds:0};const y=GetIntrinsic("%Temporal.Instant%"),I=new y(t),S=new y(r),g=GetPlainDateTimeFor(o,I,n),w=GetPlainDateTimeFor(o,S,n);let{years:D,months:G,weeks:v,days:C}=DifferenceISODateTime(GetSlot(g,i$2),GetSlot(g,s$2),GetSlot(g,l$2),GetSlot(g,d$2),GetSlot(g,m$2),GetSlot(g,c$2),GetSlot(g,h$1),GetSlot(g,u$2),GetSlot(g,T$2),GetSlot(w,i$2),GetSlot(w,s$2),GetSlot(w,l$2),GetSlot(w,d$2),GetSlot(w,m$2),GetSlot(w,c$2),GetSlot(w,h$1),GetSlot(w,u$2),GetSlot(w,T$2),n,a,p);const O=AddZonedDateTime(I,o,n,D,G,v,0,0,0,0,0,0,0);let b=JSBI.subtract(r,O);const E=CreateTemporalZonedDateTime(O,o,n);({nanoseconds:b,days:C}=NanosecondsToDays(b,E));const{hours:M,minutes:R,seconds:F,milliseconds:Y,microseconds:P,nanoseconds:Z}=BalanceDuration(0,0,0,0,0,0,JSBI.toNumber(b),"hour");return {years:D,months:G,weeks:v,days:C,hours:M,minutes:R,seconds:F,milliseconds:Y,microseconds:P,nanoseconds:Z}}function GetDifferenceSettings(e,t,r,o,n,a){const i=Ue.reduce(((e,t)=>{const n=t[0],a=t[1],i=t[2];return "datetime"!==r&&i!==r||o.includes(a)||e.push(a,n),e}),[]);let s=GetTemporalUnit(t,"largestUnit",r,"auto");if(o.includes(s))throw new RangeError(`largestUnit must be one of ${i.join(", ")}, not ${s}`);const l=ToTemporalRoundingIncrement(t);let d=ToTemporalRoundingMode(t,"trunc");"since"===e&&(d=function NegateTemporalRoundingMode(e){switch(e){case"ceil":return "floor";case"floor":return "ceil";case"halfCeil":return "halfFloor";case"halfFloor":return "halfCeil";default:return e}}(d));const m=GetTemporalUnit(t,"smallestUnit",r,n);if(o.includes(m))throw new RangeError(`smallestUnit must be one of ${i.join(", ")}, not ${m}`);const c=LargerOfTwoTemporalUnits(a,m);if("auto"===s&&(s=c),LargerOfTwoTemporalUnits(s,m)!==s)throw new RangeError(`largestUnit ${s} cannot be smaller than smallestUnit ${m}`);const h={hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[m];return void 0!==h&&ValidateTemporalRoundingIncrement(l,h,!1),{largestUnit:s,roundingIncrement:l,roundingMode:d,smallestUnit:m}}function DifferenceTemporalInstant(e,t,r,o){const a="since"===e?-1:1,i=ToTemporalInstant(r),s=GetDifferenceSettings(e,CopyOptions(o),"time",[],"nanosecond","second"),l=GetSlot(t,n$1),d=GetSlot(i,n$1);let{hours:m,minutes:c,seconds:h,milliseconds:u,microseconds:T,nanoseconds:p}=DifferenceInstant(l,d,s.roundingIncrement,s.smallestUnit,s.largestUnit,s.roundingMode);return new(GetIntrinsic("%Temporal.Duration%"))(0,0,0,0,a*m,a*c,a*h,a*u,a*T,a*p)}function DifferenceTemporalPlainDate(e,t,r,o){const n="since"===e?-1:1,a=ToTemporalDate(r),i=GetSlot(t,p$1);ThrowIfCalendarsNotEqual(i,GetSlot(a,p$1),"compute difference between dates");const s=CopyOptions(o),l=GetDifferenceSettings(e,s,"date",[],"day","day");s.largestUnit=l.largestUnit;let{years:d,months:m,weeks:c,days:h}=CalendarDateUntil(i,t,a,s);"day"===l.smallestUnit&&1===l.roundingIncrement||({years:d,months:m,weeks:c,days:h}=RoundDuration(d,m,c,h,0,0,0,0,0,0,l.roundingIncrement,l.smallestUnit,l.roundingMode,t));return new(GetIntrinsic("%Temporal.Duration%"))(n*d,n*m,n*c,n*h,0,0,0,0,0,0)}function DifferenceTemporalPlainDateTime(e,t,r,o){const n="since"===e?-1:1,a=ToTemporalDateTime(r),f=GetSlot(t,p$1);ThrowIfCalendarsNotEqual(f,GetSlot(a,p$1),"compute difference between dates");const y=CopyOptions(o),I=GetDifferenceSettings(e,y,"datetime",[],"nanosecond","day");let{years:S,months:g,weeks:w,days:D,hours:G,minutes:v,seconds:C,milliseconds:O,microseconds:b,nanoseconds:E}=DifferenceISODateTime(GetSlot(t,i$2),GetSlot(t,s$2),GetSlot(t,l$2),GetSlot(t,d$2),GetSlot(t,m$2),GetSlot(t,c$2),GetSlot(t,h$1),GetSlot(t,u$2),GetSlot(t,T$2),GetSlot(a,i$2),GetSlot(a,s$2),GetSlot(a,l$2),GetSlot(a,d$2),GetSlot(a,m$2),GetSlot(a,c$2),GetSlot(a,h$1),GetSlot(a,u$2),GetSlot(a,T$2),f,I.largestUnit,y);const M=TemporalDateTimeToDate(t);(({years:S,months:g,weeks:w,days:D,hours:G,minutes:v,seconds:C,milliseconds:O,microseconds:b,nanoseconds:E}=RoundDuration(S,g,w,D,G,v,C,O,b,E,I.roundingIncrement,I.smallestUnit,I.roundingMode,M))),({days:D,hours:G,minutes:v,seconds:C,milliseconds:O,microseconds:b,nanoseconds:E}=BalanceDuration(D,G,v,C,O,b,E,I.largestUnit));return new(GetIntrinsic("%Temporal.Duration%"))(n*S,n*g,n*w,n*D,n*G,n*v,n*C,n*O,n*b,n*E)}function DifferenceTemporalPlainTime(e,t,r,o){const n="since"===e?-1:1,a=ToTemporalTime(r),i=GetDifferenceSettings(e,CopyOptions(o),"time",[],"nanosecond","hour");let{hours:s,minutes:l,seconds:p,milliseconds:f,microseconds:y,nanoseconds:I}=DifferenceTime(GetSlot(t,d$2),GetSlot(t,m$2),GetSlot(t,c$2),GetSlot(t,h$1),GetSlot(t,u$2),GetSlot(t,T$2),GetSlot(a,d$2),GetSlot(a,m$2),GetSlot(a,c$2),GetSlot(a,h$1),GetSlot(a,u$2),GetSlot(a,T$2));(({hours:s,minutes:l,seconds:p,milliseconds:f,microseconds:y,nanoseconds:I}=RoundDuration(0,0,0,0,s,l,p,f,y,I,i.roundingIncrement,i.smallestUnit,i.roundingMode))),({hours:s,minutes:l,seconds:p,milliseconds:f,microseconds:y,nanoseconds:I}=BalanceDuration(0,s,l,p,f,y,I,i.largestUnit));return new(GetIntrinsic("%Temporal.Duration%"))(0,0,0,0,n*s,n*l,n*p,n*f,n*y,n*I)}function DifferenceTemporalPlainYearMonth(e,t,r,o){const n="since"===e?-1:1,a=ToTemporalYearMonth(r),i=GetSlot(t,p$1);ThrowIfCalendarsNotEqual(i,GetSlot(a,p$1),"compute difference between months");const s=CopyOptions(o),l=GetDifferenceSettings(e,s,"date",["week","day"],"month","year");s.largestUnit=l.largestUnit;const d=CalendarFields(i,["monthCode","year"]),m=PrepareTemporalFields(t,d,[]);m.day=1;const c=CalendarDateFromFields(i,m),h=PrepareTemporalFields(a,d,[]);h.day=1;const u=CalendarDateFromFields(i,h);let{years:T,months:f}=CalendarDateUntil(i,c,u,s);"month"===l.smallestUnit&&1===l.roundingIncrement||({years:T,months:f}=RoundDuration(T,f,0,0,0,0,0,0,0,0,l.roundingIncrement,l.smallestUnit,l.roundingMode,c));return new(GetIntrinsic("%Temporal.Duration%"))(n*T,n*f,0,0,0,0,0,0,0,0)}function DifferenceTemporalZonedDateTime(e,t,r,o){const a="since"===e?-1:1,i=ToTemporalZonedDateTime(r),s=GetSlot(t,p$1);ThrowIfCalendarsNotEqual(s,GetSlot(i,p$1),"compute difference between dates");const l=CopyOptions(o),d=GetDifferenceSettings(e,l,"datetime",[],"nanosecond","hour");l.largestUnit=d.largestUnit;const m=GetSlot(t,n$1),c=GetSlot(i,n$1);let h,u,T,f,y,I,S,w,D,G;if("year"!==d.largestUnit&&"month"!==d.largestUnit&&"week"!==d.largestUnit&&"day"!==d.largestUnit)h=0,u=0,T=0,f=0,({hours:y,minutes:I,seconds:S,milliseconds:w,microseconds:D,nanoseconds:G}=DifferenceInstant(m,c,d.roundingIncrement,d.smallestUnit,d.largestUnit,d.roundingMode));else {const e=GetSlot(t,g$2);if(!TimeZoneEquals(e,GetSlot(i,g$2)))throw new RangeError("When calculating difference between time zones, largestUnit must be 'hours' or smaller because day lengths can vary between time zones due to DST or time zone offset changes.");(({years:h,months:u,weeks:T,days:f,hours:y,minutes:I,seconds:S,milliseconds:w,microseconds:D,nanoseconds:G}=DifferenceZonedDateTime(m,c,e,s,d.largestUnit,l))),({years:h,months:u,weeks:T,days:f,hours:y,minutes:I,seconds:S,milliseconds:w,microseconds:D,nanoseconds:G}=RoundDuration(h,u,T,f,y,I,S,w,D,G,d.roundingIncrement,d.smallestUnit,d.roundingMode,t)),({years:h,months:u,weeks:T,days:f,hours:y,minutes:I,seconds:S,milliseconds:w,microseconds:D,nanoseconds:G}=AdjustRoundedDurationDays(h,u,T,f,y,I,S,w,D,G,d.roundingIncrement,d.smallestUnit,d.roundingMode,t));}return new(GetIntrinsic("%Temporal.Duration%"))(a*h,a*u,a*T,a*f,a*y,a*I,a*S,a*w,a*D,a*G)}function AddISODate(e,t,r,o,n,a,i,s){let l=e,d=t,m=r,c=a,h=i;return l+=o,d+=n,({year:l,month:d}=BalanceISOYearMonth(l,d)),({year:l,month:d,day:m}=RegulateISODate(l,d,m,s)),h+=7*c,m+=h,({year:l,month:d,day:m}=BalanceISODate(l,d,m)),{year:l,month:d,day:m}}function AddTime(e,t,r,o,n,a,i,s,l,d,m,c){let h=e,u=t,T=r,p=o,f=n,y=a;h+=i,u+=s,T+=l,p+=d,f+=m,y+=c;let I=0;return ({deltaDays:I,hour:h,minute:u,second:T,millisecond:p,microsecond:f,nanosecond:y}=BalanceTime(h,u,T,p,f,y)),{deltaDays:I,hour:h,minute:u,second:T,millisecond:p,microsecond:f,nanosecond:y}}function AddDuration(t,r,o,a,i,s,l,d,m,c,h,u,T,f,y,I,w,D,G,v,C){const O=LargerOfTwoTemporalUnits(DefaultTemporalLargestUnit(t,r,o,a,i,s,l,d,m,c),DefaultTemporalLargestUnit(h,u,T,f,y,I,w,D,G,v));let b,E,M,R,F,Y,P,Z,B,N;if(C)if(IsTemporalDate(C)){const n=GetIntrinsic("%Temporal.Duration%"),S=GetSlot(C,p$1),g=new n(t,r,o,a,0,0,0,0,0,0),j=new n(h,u,T,f,0,0,0,0,0,0),$="string"!=typeof S?GetMethod(S,"dateAdd"):void 0,k=CalendarDateAdd(S,C,g,void 0,$),U=CalendarDateAdd(S,k,j,void 0,$),A=LargerOfTwoTemporalUnits("day",O),L=Te(null);L.largestUnit=A,({years:b,months:E,weeks:M,days:R}=CalendarDateUntil(S,C,U,L)),({days:R,hours:F,minutes:Y,seconds:P,milliseconds:Z,microseconds:B,nanoseconds:N}=BalanceDuration(R,JSBI.add(JSBI.BigInt(i),JSBI.BigInt(y)),JSBI.add(JSBI.BigInt(s),JSBI.BigInt(I)),JSBI.add(JSBI.BigInt(l),JSBI.BigInt(w)),JSBI.add(JSBI.BigInt(d),JSBI.BigInt(D)),JSBI.add(JSBI.BigInt(m),JSBI.BigInt(G)),JSBI.add(JSBI.BigInt(c),JSBI.BigInt(v)),O));}else {const e=GetIntrinsic("%Temporal.Instant%"),j=GetSlot(C,g$2),$=GetSlot(C,p$1),k=AddZonedDateTime(GetSlot(C,S$1),j,$,t,r,o,a,i,s,l,d,m,c),U=AddZonedDateTime(new e(k),j,$,h,u,T,f,y,I,w,D,G,v);"year"!==O&&"month"!==O&&"week"!==O&&"day"!==O?(b=0,E=0,M=0,R=0,({hours:F,minutes:Y,seconds:P,milliseconds:Z,microseconds:B,nanoseconds:N}=DifferenceInstant(GetSlot(C,n$1),U,1,"nanosecond",O,"halfExpand"))):({years:b,months:E,weeks:M,days:R,hours:F,minutes:Y,seconds:P,milliseconds:Z,microseconds:B,nanoseconds:N}=DifferenceZonedDateTime(GetSlot(C,n$1),U,j,$,O,Te(null)));}else {if("year"===O||"month"===O||"week"===O)throw new RangeError("relativeTo is required for years, months, or weeks arithmetic");b=E=M=0,({days:R,hours:F,minutes:Y,seconds:P,milliseconds:Z,microseconds:B,nanoseconds:N}=BalanceDuration(a+f,JSBI.add(JSBI.BigInt(i),JSBI.BigInt(y)),JSBI.add(JSBI.BigInt(s),JSBI.BigInt(I)),JSBI.add(JSBI.BigInt(l),JSBI.BigInt(w)),JSBI.add(JSBI.BigInt(d),JSBI.BigInt(D)),JSBI.add(JSBI.BigInt(m),JSBI.BigInt(G)),JSBI.add(JSBI.BigInt(c),JSBI.BigInt(v)),O));}return RejectDuration(b,E,M,R,F,Y,P,Z,B,N),{years:b,months:E,weeks:M,days:R,hours:F,minutes:Y,seconds:P,milliseconds:Z,microseconds:B,nanoseconds:N}}function AddInstant(t,r,o,n,a,i,s){let l=Ie;l=JSBI.add(l,JSBI.BigInt(s)),l=JSBI.add(l,JSBI.multiply(JSBI.BigInt(i),De)),l=JSBI.add(l,JSBI.multiply(JSBI.BigInt(a),Ge)),l=JSBI.add(l,JSBI.multiply(JSBI.BigInt(n),ve)),l=JSBI.add(l,JSBI.multiply(JSBI.BigInt(o),JSBI.BigInt(6e10))),l=JSBI.add(l,JSBI.multiply(JSBI.BigInt(r),JSBI.BigInt(36e11)));const d=JSBI.add(t,l);return ValidateEpochNanoseconds(d),d}function AddDateTime(e,t,r,o,n,a,d,m,c,h,u,T,p,f,y,I,S,g,w,D,G){let v=f,{deltaDays:C,hour:O,minute:b,second:E,millisecond:M,microsecond:R,nanosecond:F}=AddTime(o,n,a,d,m,c,y,I,S,g,w,D);v+=C;const Y=GetIntrinsic("%Temporal.Duration%"),P=CalendarDateAdd(h,CreateTemporalDate(e,t,r,h),new Y(u,T,p,v,0,0,0,0,0,0),G);return {year:GetSlot(P,i$2),month:GetSlot(P,s$2),day:GetSlot(P,l$2),hour:O,minute:b,second:E,millisecond:M,microsecond:R,nanosecond:F}}function AddZonedDateTime(e,t,r,o,a,p,f,y,I,S,g,w,D,G){const v=GetIntrinsic("%Temporal.Duration%");if(0===DurationSign(o,a,p,f,0,0,0,0,0,0))return AddInstant(GetSlot(e,n$1),y,I,S,g,w,D);const C=GetPlainDateTimeFor(t,e,r),O=CalendarDateAdd(r,CreateTemporalDate(GetSlot(C,i$2),GetSlot(C,s$2),GetSlot(C,l$2),r),new v(o,a,p,f,0,0,0,0,0,0),G),b=CreateTemporalDateTime(GetSlot(O,i$2),GetSlot(O,s$2),GetSlot(O,l$2),GetSlot(C,d$2),GetSlot(C,m$2),GetSlot(C,c$2),GetSlot(C,h$1),GetSlot(C,u$2),GetSlot(C,T$2),r);return AddInstant(GetSlot(GetInstantFor(t,b,"compatible"),n$1),y,I,S,g,w,D)}function AddDurationToOrSubtractDurationFromDuration(e,t,r,o){const n="subtract"===e?-1:1;let{years:a,months:i,weeks:s,days:l,hours:d,minutes:m,seconds:c,milliseconds:h,microseconds:u,nanoseconds:T}=ToTemporalDurationRecord(r);const p=ToRelativeTemporalObject(GetOptionsObject(o));({years:a,months:i,weeks:s,days:l,hours:d,minutes:m,seconds:c,milliseconds:h,microseconds:u,nanoseconds:T}=AddDuration(GetSlot(t,w$2),GetSlot(t,D$1),GetSlot(t,G),GetSlot(t,v$2),GetSlot(t,C$2),GetSlot(t,O$2),GetSlot(t,b),GetSlot(t,E$1),GetSlot(t,M$2),GetSlot(t,R$1),n*a,n*i,n*s,n*l,n*d,n*m,n*c,n*h,n*u,n*T,p));return new(GetIntrinsic("%Temporal.Duration%"))(a,i,s,l,d,m,c,h,u,T)}function AddDurationToOrSubtractDurationFromInstant(e,t,r){const o="subtract"===e?-1:1,{hours:a,minutes:i,seconds:s,milliseconds:l,microseconds:d,nanoseconds:m}=function ToLimitedTemporalDuration(e,t){let r=ToTemporalDurationRecord(e);for(const e of t)if(0!==r[e])throw new RangeError(`Duration field ${e} not supported by Temporal.Instant. Try Temporal.ZonedDateTime instead.`);return r}(r,["years","months","weeks","days"]),c=AddInstant(GetSlot(t,n$1),o*a,o*i,o*s,o*l,o*d,o*m);return new(GetIntrinsic("%Temporal.Instant%"))(c)}function AddDurationToOrSubtractDurationFromPlainDateTime(e,t,r,o){const n="subtract"===e?-1:1,{years:a,months:f,weeks:y,days:I,hours:S,minutes:g,seconds:w,milliseconds:D,microseconds:G,nanoseconds:v}=ToTemporalDurationRecord(r),C=GetOptionsObject(o),O=GetSlot(t,p$1),{year:b,month:E,day:M,hour:R,minute:F,second:Y,millisecond:P,microsecond:Z,nanosecond:B}=AddDateTime(GetSlot(t,i$2),GetSlot(t,s$2),GetSlot(t,l$2),GetSlot(t,d$2),GetSlot(t,m$2),GetSlot(t,c$2),GetSlot(t,h$1),GetSlot(t,u$2),GetSlot(t,T$2),O,n*a,n*f,n*y,n*I,n*S,n*g,n*w,n*D,n*G,n*v,C);return CreateTemporalDateTime(b,E,M,R,F,Y,P,Z,B,O)}function AddDurationToOrSubtractDurationFromPlainTime(e,t,r){const o="subtract"===e?-1:1,{hours:n,minutes:a,seconds:i,milliseconds:s,microseconds:l,nanoseconds:p}=ToTemporalDurationRecord(r);let{hour:f,minute:y,second:I,millisecond:S,microsecond:g,nanosecond:w}=AddTime(GetSlot(t,d$2),GetSlot(t,m$2),GetSlot(t,c$2),GetSlot(t,h$1),GetSlot(t,u$2),GetSlot(t,T$2),o*n,o*a,o*i,o*s,o*l,o*p);({hour:f,minute:y,second:I,millisecond:S,microsecond:g,nanosecond:w}=RegulateTime(f,y,I,S,g,w,"reject"));return new(GetIntrinsic("%Temporal.PlainTime%"))(f,y,I,S,g,w)}function AddDurationToOrSubtractDurationFromPlainYearMonth(e,t,r,o){let n=ToTemporalDurationRecord(r);"subtract"===e&&(n={years:-n.years,months:-n.months,weeks:-n.weeks,days:-n.days,hours:-n.hours,minutes:-n.minutes,seconds:-n.seconds,milliseconds:-n.milliseconds,microseconds:-n.microseconds,nanoseconds:-n.nanoseconds});let{years:a,months:i,weeks:s,days:l,hours:d,minutes:m,seconds:c,milliseconds:h,microseconds:u,nanoseconds:T}=n;({days:l}=BalanceDuration(l,d,m,c,h,u,T,"day"));const f=GetOptionsObject(o),y=GetSlot(t,p$1),I=CalendarFields(y,["monthCode","year"]),S=PrepareTemporalFields(t,I,[]),g=Te(null);CopyDataProperties(g,S,[]),S.day=1;let w=CalendarDateFromFields(y,S);const D=DurationSign(a,i,s,l,0,0,0,0,0,0),G=GetMethod(y,"dateAdd"),v=GetIntrinsic("%Temporal.Duration%");if(D<0){const e=CalendarDateAdd(y,w,new v(0,1,0,0,0,0,0,0,0,0),void 0,G),t=CalendarDateAdd(y,e,new v(0,0,0,-1,0,0,0,0,0,0),void 0,G);g.day=CalendarDay(y,t),w=CalendarDateFromFields(y,g);}const C=new v(a,i,s,l,0,0,0,0,0,0),O=CopyOptions(f);return CalendarYearMonthFromFields(y,PrepareTemporalFields(CalendarDateAdd(y,w,C,f,G),I,[]),O)}function AddDurationToOrSubtractDurationFromZonedDateTime(e,t,r,o){const n="subtract"===e?-1:1,{years:a,months:i,weeks:s,days:l,hours:d,minutes:m,seconds:c,milliseconds:h,microseconds:u,nanoseconds:T}=ToTemporalDurationRecord(r),f=GetOptionsObject(o),y=GetSlot(t,g$2),I=GetSlot(t,p$1);return CreateTemporalZonedDateTime(AddZonedDateTime(GetSlot(t,S$1),y,I,n*a,n*i,n*s,n*l,n*d,n*m,n*c,n*h,n*u,n*T,f),y,I)}function RoundNumberToIncrement(t,r,o){if(JSBI.equal(r,Se))return t;let{quotient:n,remainder:a}=divmod(t,r);if(JSBI.equal(a,Ie))return t;const i=JSBI.lessThan(a,Ie)?-1:1,s=abs(JSBI.multiply(a,JSBI.BigInt(2))),l=JSBI.equal(s,r),d=JSBI.greaterThan(s,r);switch(o){case"ceil":i>0&&(n=JSBI.add(n,JSBI.BigInt(i)));break;case"floor":i<0&&(n=JSBI.add(n,JSBI.BigInt(i)));break;case"expand":n=JSBI.add(n,JSBI.BigInt(i));break;case"trunc":break;case"halfCeil":(d||l&&i>0)&&(n=JSBI.add(n,JSBI.BigInt(i)));break;case"halfFloor":(d||l&&i<0)&&(n=JSBI.add(n,JSBI.BigInt(i)));break;case"halfExpand":(d||l)&&(n=JSBI.add(n,JSBI.BigInt(i)));break;case"halfTrunc":d&&(n=JSBI.add(n,JSBI.BigInt(i)));break;case"halfEven":(d||l&&1===JSBI.toNumber(JSBI.remainder(abs(n),JSBI.BigInt(2))))&&(n=JSBI.add(n,JSBI.BigInt(i)));}return JSBI.multiply(n,r)}function RoundInstant(t,r,o,n){let{remainder:a}=NonNegativeBigIntDivmod(t,Ee);const i=JSBI.subtract(t,a),s=RoundNumberToIncrement(a,JSBI.BigInt(_e[o]*r),n);return JSBI.add(i,s)}function RoundISODateTime(e,t,r,o,n,a,i,s,l,d,m,c,h=864e11){const{deltaDays:u,hour:T,minute:p,second:f,millisecond:y,microsecond:I,nanosecond:S}=RoundTime(o,n,a,i,s,l,d,m,c,h),{year:g,month:w,day:D}=BalanceISODate(e,t,r+u);return {year:g,month:w,day:D,hour:T,minute:p,second:f,millisecond:y,microsecond:I,nanosecond:S}}function RoundTime(t,r,o,n,a,i,s,l,d,m=864e11){let c=Ie;switch(l){case"day":case"hour":c=JSBI.BigInt(t);case"minute":c=JSBI.add(JSBI.multiply(c,ge),JSBI.BigInt(r));case"second":c=JSBI.add(JSBI.multiply(c,ge),JSBI.BigInt(o));case"millisecond":c=JSBI.add(JSBI.multiply(c,De),JSBI.BigInt(n));case"microsecond":c=JSBI.add(JSBI.multiply(c,De),JSBI.BigInt(a));case"nanosecond":c=JSBI.add(JSBI.multiply(c,De),JSBI.BigInt(i));}const h="day"===l?m:_e[l],u=RoundNumberToIncrement(c,JSBI.BigInt(h*s),d),T=JSBI.toNumber(JSBI.divide(u,JSBI.BigInt(h)));switch(l){case"day":return {deltaDays:T,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0};case"hour":return BalanceTime(T,0,0,0,0,0);case"minute":return BalanceTime(t,T,0,0,0,0);case"second":return BalanceTime(t,r,T,0,0,0);case"millisecond":return BalanceTime(t,r,o,T,0,0);case"microsecond":return BalanceTime(t,r,o,n,T,0);case"nanosecond":return BalanceTime(t,r,o,n,a,T);default:throw new Error(`Invalid unit ${l}`)}}function DaysUntil(e,t){return DifferenceISODate(GetSlot(e,i$2),GetSlot(e,s$2),GetSlot(e,l$2),GetSlot(t,i$2),GetSlot(t,s$2),GetSlot(t,l$2),"day").days}function MoveRelativeDate(e,t,r,o){const n=CalendarDateAdd(e,t,r,void 0,o);return {relativeTo:n,days:DaysUntil(t,n)}}function MoveRelativeZonedDateTime(e,t,r,o,n){const a=GetSlot(e,g$2),i=GetSlot(e,p$1);return CreateTemporalZonedDateTime(AddZonedDateTime(GetSlot(e,S$1),a,i,t,r,o,n,0,0,0,0,0,0),a,i)}function AdjustRoundedDurationDays(t,r,o,n,a,i,s,l,d,m,c,h,u,T){let f=t,y=r,I=o,w=n,D=a,G=i,v=s,C=l,O=d,b=m;if(!IsTemporalZonedDateTime(T)||"year"===h||"month"===h||"week"===h||"day"===h||"nanosecond"===h&&1===c)return {years:f,months:y,weeks:I,days:w,hours:D,minutes:G,seconds:v,milliseconds:C,microseconds:O,nanoseconds:b};let E=TotalDurationNanoseconds(0,D,G,v,C,O,b,0);const M=se(JSBI.toNumber(E)),R=GetSlot(T,g$2),F=GetSlot(T,p$1),Y=AddZonedDateTime(GetSlot(T,S$1),R,F,f,y,I,w,0,0,0,0,0,0),P=AddZonedDateTime(new(GetIntrinsic("%Temporal.Instant%"))(Y),R,F,0,0,0,M,0,0,0,0,0,0),Z=JSBI.subtract(P,Y);return JSBI.greaterThanOrEqual(JSBI.multiply(JSBI.subtract(E,Z),JSBI.BigInt(M)),Ie)&&(({years:f,months:y,weeks:I,days:w}=AddDuration(f,y,I,w,0,0,0,0,0,0,0,0,0,M,0,0,0,0,0,0,T)),E=RoundInstant(JSBI.subtract(E,Z),c,h,u),({hours:D,minutes:G,seconds:v,milliseconds:C,microseconds:O,nanoseconds:b}=BalanceDuration(0,0,0,0,0,0,JSBI.toNumber(E),"hour"))),{years:f,months:y,weeks:I,days:w,hours:D,minutes:G,seconds:v,milliseconds:C,microseconds:O,nanoseconds:b}}function RoundDuration(t,r,o,n,a,i,s,l,d,m,c,h,u,T){let f=t,y=r,I=o,S=n,g=a,w=i,D=s,G=l,v=d,C=JSBI.BigInt(m);const O=GetIntrinsic("%Temporal.Duration%");let b,E,M,R,F=T;if(F){if(IsTemporalZonedDateTime(F))E=F,F=ToTemporalDate(F);else if(!IsTemporalDate(F))throw new TypeError("starting point must be PlainDate or ZonedDateTime");b=GetSlot(F,p$1);}if("year"===h||"month"===h||"week"===h||"day"===h){let t,r,o;C=TotalDurationNanoseconds(0,g,w,D,G,v,m,0),E&&(t=MoveRelativeZonedDateTime(E,f,y,I,S)),({days:r,nanoseconds:C,dayLengthNs:o}=NanosecondsToDays(C,t)),M=JSBI.BigInt(o),S+=r,g=w=D=G=v=0;}switch(h){case"year":{if(!b)throw new RangeError("A starting point is required for years rounding");const t=new O(f),r="string"!=typeof b?GetMethod(b,"dateAdd"):void 0,o=CalendarDateAdd(b,F,t,void 0,r),n=CalendarDateAdd(b,F,new O(f,y,I),void 0,r);F=o,S+=DaysUntil(o,n);const a=CalendarDateAdd(b,F,new O(0,0,0,S),void 0,r),i=Te(null);i.largestUnit="year";const s=CalendarDateUntil(b,F,a,i).years;f+=s;const l=F;F=CalendarDateAdd(b,F,new O(s),void 0,r);S-=DaysUntil(l,F);const d=new O(S<0?-1:1);let{days:m}=MoveRelativeDate(b,F,d,r);m=ae(m);const h=JSBI.multiply(JSBI.BigInt(m),M);C=JSBI.add(JSBI.add(JSBI.multiply(h,JSBI.BigInt(f)),JSBI.multiply(JSBI.BigInt(S),M)),C);const T=RoundNumberToIncrement(C,JSBI.multiply(h,JSBI.BigInt(c)),u);R=BigIntDivideToNumber(C,h),f=JSBI.toNumber(JSBI.divide(T,h)),C=Ie,y=I=S=0;break}case"month":{if(!b)throw new RangeError("A starting point is required for months rounding");const t=new O(f,y),r="string"!=typeof b?GetMethod(b,"dateAdd"):void 0,o=CalendarDateAdd(b,F,t,void 0,r),n=CalendarDateAdd(b,F,new O(f,y,I),void 0,r);F=o,S+=DaysUntil(o,n);const a=se(S),i=new O(0,S<0?-1:1);let s;for(({relativeTo:F,days:s}=MoveRelativeDate(b,F,i,r));ae(S)>=ae(s);)y+=a,S-=s,({relativeTo:F,days:s}=MoveRelativeDate(b,F,i,r));s=ae(s);const l=JSBI.multiply(JSBI.BigInt(s),M);C=JSBI.add(JSBI.add(JSBI.multiply(l,JSBI.BigInt(y)),JSBI.multiply(JSBI.BigInt(S),M)),C);const d=RoundNumberToIncrement(C,JSBI.multiply(l,JSBI.BigInt(c)),u);R=BigIntDivideToNumber(C,l),y=JSBI.toNumber(JSBI.divide(d,l)),C=Ie,I=S=0;break}case"week":{if(!b)throw new RangeError("A starting point is required for weeks rounding");const t=se(S),r=new O(0,0,S<0?-1:1),o="string"!=typeof b?GetMethod(b,"dateAdd"):void 0;let n;for(({relativeTo:F,days:n}=MoveRelativeDate(b,F,r,o));ae(S)>=ae(n);)I+=t,S-=n,({relativeTo:F,days:n}=MoveRelativeDate(b,F,r,o));n=ae(n);const a=JSBI.multiply(JSBI.BigInt(n),M);C=JSBI.add(JSBI.add(JSBI.multiply(a,JSBI.BigInt(I)),JSBI.multiply(JSBI.BigInt(S),M)),C);const i=RoundNumberToIncrement(C,JSBI.multiply(a,JSBI.BigInt(c)),u);R=BigIntDivideToNumber(C,a),I=JSBI.toNumber(JSBI.divide(i,a)),C=Ie,S=0;break}case"day":{const t=M;C=JSBI.add(JSBI.multiply(t,JSBI.BigInt(S)),C);const r=RoundNumberToIncrement(C,JSBI.multiply(t,JSBI.BigInt(c)),u);R=BigIntDivideToNumber(C,t),S=JSBI.toNumber(JSBI.divide(r,t)),C=Ie;break}case"hour":{const t=36e11;let r=JSBI.multiply(JSBI.BigInt(g),JSBI.BigInt(36e11));r=JSBI.add(r,JSBI.multiply(JSBI.BigInt(w),JSBI.BigInt(6e10))),r=JSBI.add(r,JSBI.multiply(JSBI.BigInt(D),ve)),r=JSBI.add(r,JSBI.multiply(JSBI.BigInt(G),Ge)),r=JSBI.add(r,JSBI.multiply(JSBI.BigInt(v),De)),r=JSBI.add(r,C),R=BigIntDivideToNumber(r,JSBI.BigInt(t));const o=RoundNumberToIncrement(r,JSBI.BigInt(t*c),u);g=JSBI.toNumber(JSBI.divide(o,JSBI.BigInt(t))),C=Ie,w=D=G=v=0;break}case"minute":{const t=6e10;let r=JSBI.multiply(JSBI.BigInt(w),JSBI.BigInt(6e10));r=JSBI.add(r,JSBI.multiply(JSBI.BigInt(D),ve)),r=JSBI.add(r,JSBI.multiply(JSBI.BigInt(G),Ge)),r=JSBI.add(r,JSBI.multiply(JSBI.BigInt(v),De)),r=JSBI.add(r,C),R=BigIntDivideToNumber(r,JSBI.BigInt(t));const o=RoundNumberToIncrement(r,JSBI.BigInt(t*c),u);w=JSBI.toNumber(JSBI.divide(o,JSBI.BigInt(t))),C=Ie,D=G=v=0;break}case"second":{const t=1e9;let r=JSBI.multiply(JSBI.BigInt(D),ve);r=JSBI.add(r,JSBI.multiply(JSBI.BigInt(G),Ge)),r=JSBI.add(r,JSBI.multiply(JSBI.BigInt(v),De)),r=JSBI.add(r,C),R=BigIntDivideToNumber(r,JSBI.BigInt(t));const o=RoundNumberToIncrement(r,JSBI.BigInt(t*c),u);D=JSBI.toNumber(JSBI.divide(o,JSBI.BigInt(t))),C=Ie,G=v=0;break}case"millisecond":{const t=1e6;let r=JSBI.multiply(JSBI.BigInt(G),Ge);r=JSBI.add(r,JSBI.multiply(JSBI.BigInt(v),De)),r=JSBI.add(r,C),R=BigIntDivideToNumber(r,JSBI.BigInt(t));const o=RoundNumberToIncrement(r,JSBI.BigInt(t*c),u);G=JSBI.toNumber(JSBI.divide(o,JSBI.BigInt(t))),C=Ie,v=0;break}case"microsecond":{const t=1e3;let r=JSBI.multiply(JSBI.BigInt(v),De);r=JSBI.add(r,C),R=BigIntDivideToNumber(r,JSBI.BigInt(t));const o=RoundNumberToIncrement(r,JSBI.BigInt(t*c),u);v=JSBI.toNumber(JSBI.divide(o,JSBI.BigInt(t))),C=Ie;break}case"nanosecond":R=JSBI.toNumber(C),C=RoundNumberToIncrement(JSBI.BigInt(C),JSBI.BigInt(c),u);}return {years:f,months:y,weeks:I,days:S,hours:g,minutes:w,seconds:D,milliseconds:G,microseconds:v,nanoseconds:JSBI.toNumber(C),total:R}}function CompareISODate(e,t,r,o,n,a){for(const[i,s]of [[e,o],[t,n],[r,a]])if(i!==s)return ComparisonResult(i-s);return 0}function NonNegativeBigIntDivmod(t,r){let{quotient:o,remainder:n}=divmod(t,r);return JSBI.lessThan(n,Ie)&&(o=JSBI.subtract(o,Se),n=JSBI.add(n,r)),{quotient:o,remainder:n}}function BigIntFloorDiv(t,r){const{quotient:o,remainder:n}=divmod(t,r);return isZero(n)||!isNegativeJSBI(t)==!isNegativeJSBI(r)?o:JSBI.subtract(o,Se)}function BigIntDivideToNumber(t,r){const{quotient:o,remainder:n}=divmod(t,r);return JSBI.toNumber(o)+JSBI.toNumber(n)/JSBI.toNumber(r)}function ToBigIntExternal(e){const t=ToBigInt(e);return void 0!==globalThis.BigInt?globalThis.BigInt(t.toString(10)):t}function ToBigInt(t){let r=t;if("object"==typeof t){const e=t[Symbol.toPrimitive];e&&"function"==typeof e&&(r=fe(e,t,["number"]));}if("number"==typeof r)throw new TypeError("cannot convert number to bigint");return "bigint"==typeof r?JSBI.BigInt(r.toString(10)):JSBI.BigInt(r)}const Ve=(()=>{let t=JSBI.BigInt(Date.now()%1e6);return ()=>{const r=JSBI.BigInt(Date.now()),o=JSBI.add(JSBI.multiply(r,Ge),t);return t=JSBI.remainder(r,Ge),JSBI.greaterThan(o,Re)?Re:JSBI.lessThan(o,Me)?Me:o}})();function DefaultTimeZone(){return (new re).resolvedOptions().timeZone}function ComparisonResult(e){return e<0?-1:e>0?1:e}function GetOptionsObject(e){if(void 0===e)return Te(null);if(IsObject(e)&&null!==e)return e;throw new TypeError("Options parameter must be an object, not "+(null===e?"null":""+typeof e))}function CreateOnePropObject(e,t){const r=Te(null);return r[e]=t,r}function CopyOptions(e){const t=Te(null);return CopyDataProperties(t,GetOptionsObject(e),[]),t}function GetOption(e,t,r,o){let n=e[t];if(void 0!==n){if(n=ToString(n),!r.includes(n))throw new RangeError(`${t} must be one of ${r.join(", ")}, not ${n}`);return n}return o}function IsBuiltinCalendar(e){return je.includes(ASCIILowercase(e))}function ASCIILowercase(e){return e.replace(/[A-Z]/g,(e=>{const t=e.charCodeAt(0);return String.fromCharCode(t+32)}))}const ze=new RegExp(`^${W.source}$`);function bisect(t,r,o,n=t(r),a=t(o)){let i=JSBI.BigInt(r),s=JSBI.BigInt(o),l=n,d=a;for(;JSBI.greaterThan(JSBI.subtract(s,i),Se);){const r=JSBI.divide(JSBI.add(i,s),JSBI.BigInt(2)),o=t(r);if(o===l)i=r,l=o;else {if(o!==d)throw new Error(`invalid state in bisection ${l} - ${o} - ${d}`);s=r,d=o;}}return s}const _e={hour:36e11,minute:6e10,second:1e9,millisecond:1e6,microsecond:1e3,nanosecond:1},Je=Symbol("date"),Ke=Symbol("ym"),Xe=Symbol("md"),Qe=Symbol("time"),et=Symbol("datetime"),tt=Symbol("instant"),rt=Symbol("original"),ot=Symbol("timezone"),nt=Symbol("calendar-id"),at=Symbol("locale"),it=Symbol("options"),descriptor=e=>({value:e,enumerable:!0,writable:!1,configurable:!0}),st=globalThis.Intl.DateTimeFormat,lt=Object.assign,dt=Object.prototype.hasOwnProperty,mt=Reflect.apply;function getPropLazy(e,t){let r=e[t];return "function"==typeof r&&(r=new st(e[at],r(e[it])),e[t]=r),r}function DateTimeFormatImpl(e,t={}){if(!(this instanceof DateTimeFormatImpl))return new DateTimeFormatImpl(e,t);const r=void 0!==t,o=r?lt({},t):{},n=new st(e,o),a=n.resolvedOptions();if(r){const e=lt({},a);for(const t in e)mt(dt,o,[t])||delete e[t];this[it]=e;}else this[it]=o;this[at]=a.locale,this[rt]=n,this[ot]=a.timeZone,this[nt]=a.calendar,this[Je]=dateAmend,this[Ke]=yearMonthAmend,this[Xe]=monthDayAmend,this[Qe]=timeAmend,this[et]=datetimeAmend,this[tt]=instantAmend;}Object.defineProperty(DateTimeFormatImpl,"name",{writable:!0,value:"DateTimeFormat"}),DateTimeFormatImpl.supportedLocalesOf=function(e,t){return st.supportedLocalesOf(e,t)};const ct={resolvedOptions:descriptor((function resolvedOptions(){return this[rt].resolvedOptions()})),format:descriptor((function format(e,...t){let{instant:r,formatter:o}=extractOverrides(e,this);if(r&&o)return o.format(r.epochMilliseconds);return this[rt].format(e,...t)})),formatRange:descriptor((function formatRange(e,t){if(isTemporalObject(e)||isTemporalObject(t)){if(!sameTemporalType(e,t))throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");const{instant:r,formatter:o}=extractOverrides(e,this),{instant:n,formatter:a}=extractOverrides(t,this);if(r&&n&&o&&a&&o===a)return o.formatRange(r.epochMilliseconds,n.epochMilliseconds)}return this[rt].formatRange(e,t)}))};"formatToParts"in st.prototype&&(ct.formatToParts=descriptor((function formatToParts(e,...t){let{instant:r,formatter:o}=extractOverrides(e,this);if(r&&o)return o.formatToParts(r.epochMilliseconds);return this[rt].formatToParts(e,...t)}))),"formatRangeToParts"in st.prototype&&(ct.formatRangeToParts=descriptor((function formatRangeToParts(e,t){if(isTemporalObject(e)||isTemporalObject(t)){if(!sameTemporalType(e,t))throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");const{instant:r,formatter:o}=extractOverrides(e,this),{instant:n,formatter:a}=extractOverrides(t,this);if(r&&n&&o&&a&&o===a)return o.formatRangeToParts(r.epochMilliseconds,n.epochMilliseconds)}return this[rt].formatRangeToParts(e,t)}))),DateTimeFormatImpl.prototype=Object.create(st.prototype,ct),Object.defineProperty(DateTimeFormatImpl,"prototype",{writable:!1,enumerable:!1,configurable:!1});const ht=DateTimeFormatImpl;function amend(e={},t={}){const r=lt({},e);for(const e of ["year","month","day","hour","minute","second","weekday","dayPeriod","timeZoneName","dateStyle","timeStyle"])r[e]=e in t?t[e]:r[e],!1!==r[e]&&void 0!==r[e]||delete r[e];return r}function timeAmend(e){let t=amend(e,{year:!1,month:!1,day:!1,weekday:!1,timeZoneName:!1,dateStyle:!1});return hasTimeOptions(t)||(t=lt({},t,{hour:"numeric",minute:"numeric",second:"numeric"})),t}function yearMonthAmend(e){let t=amend(e,{day:!1,hour:!1,minute:!1,second:!1,weekday:!1,dayPeriod:!1,timeZoneName:!1,dateStyle:!1,timeStyle:!1});return "year"in t||"month"in t||(t=lt(t,{year:"numeric",month:"numeric"})),t}function monthDayAmend(e){let t=amend(e,{year:!1,hour:!1,minute:!1,second:!1,weekday:!1,dayPeriod:!1,timeZoneName:!1,dateStyle:!1,timeStyle:!1});return "month"in t||"day"in t||(t=lt({},t,{month:"numeric",day:"numeric"})),t}function dateAmend(e){let t=amend(e,{hour:!1,minute:!1,second:!1,dayPeriod:!1,timeZoneName:!1,timeStyle:!1});return hasDateOptions(t)||(t=lt({},t,{year:"numeric",month:"numeric",day:"numeric"})),t}function datetimeAmend(e){let t=amend(e,{timeZoneName:!1});return hasTimeOptions(t)||hasDateOptions(t)||(t=lt({},t,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})),t}function instantAmend(e){let t=e;return hasTimeOptions(t)||hasDateOptions(t)||(t=lt({},t,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})),t}function hasDateOptions(e){return "year"in e||"month"in e||"day"in e||"weekday"in e||"dateStyle"in e}function hasTimeOptions(e){return "hour"in e||"minute"in e||"second"in e||"timeStyle"in e||"dayPeriod"in e}function isTemporalObject(e){return IsTemporalDate(e)||IsTemporalTime(e)||IsTemporalDateTime(e)||IsTemporalZonedDateTime(e)||IsTemporalYearMonth(e)||IsTemporalMonthDay(e)||IsTemporalInstant(e)}function sameTemporalType(e,t){return !(!isTemporalObject(e)||!isTemporalObject(t))&&(!(IsTemporalTime(e)&&!IsTemporalTime(t))&&(!(IsTemporalDate(e)&&!IsTemporalDate(t))&&(!(IsTemporalDateTime(e)&&!IsTemporalDateTime(t))&&(!(IsTemporalZonedDateTime(e)&&!IsTemporalZonedDateTime(t))&&(!(IsTemporalYearMonth(e)&&!IsTemporalYearMonth(t))&&(!(IsTemporalMonthDay(e)&&!IsTemporalMonthDay(t))&&!(IsTemporalInstant(e)&&!IsTemporalInstant(t))))))))}function extractOverrides(e,t){const r=GetIntrinsic("%Temporal.PlainDateTime%");if(IsTemporalTime(e)){const o=new r(1970,1,1,GetSlot(e,d$2),GetSlot(e,m$2),GetSlot(e,c$2),GetSlot(e,h$1),GetSlot(e,u$2),GetSlot(e,T$2),t[nt]);return {instant:GetInstantFor(t[ot],o,"compatible"),formatter:getPropLazy(t,Qe)}}if(IsTemporalYearMonth(e)){const o=GetSlot(e,i$2),n=GetSlot(e,s$2),a=GetSlot(e,l$2),d=ToTemporalCalendarIdentifier(GetSlot(e,p$1));if(d!==t[nt])throw new RangeError(`cannot format PlainYearMonth with calendar ${d} in locale with calendar ${t[nt]}`);const m=new r(o,n,a,12,0,0,0,0,0,d);return {instant:GetInstantFor(t[ot],m,"compatible"),formatter:getPropLazy(t,Ke)}}if(IsTemporalMonthDay(e)){const o=GetSlot(e,i$2),n=GetSlot(e,s$2),a=GetSlot(e,l$2),d=ToTemporalCalendarIdentifier(GetSlot(e,p$1));if(d!==t[nt])throw new RangeError(`cannot format PlainMonthDay with calendar ${d} in locale with calendar ${t[nt]}`);const m=new r(o,n,a,12,0,0,0,0,0,d);return {instant:GetInstantFor(t[ot],m,"compatible"),formatter:getPropLazy(t,Xe)}}if(IsTemporalDate(e)){const o=GetSlot(e,i$2),n=GetSlot(e,s$2),a=GetSlot(e,l$2),d=ToTemporalCalendarIdentifier(GetSlot(e,p$1));if("iso8601"!==d&&d!==t[nt])throw new RangeError(`cannot format PlainDate with calendar ${d} in locale with calendar ${t[nt]}`);const m=new r(o,n,a,12,0,0,0,0,0,t[nt]);return {instant:GetInstantFor(t[ot],m,"compatible"),formatter:getPropLazy(t,Je)}}if(IsTemporalDateTime(e)){const o=GetSlot(e,i$2),n=GetSlot(e,s$2),a=GetSlot(e,l$2),f=GetSlot(e,d$2),y=GetSlot(e,m$2),I=GetSlot(e,c$2),S=GetSlot(e,h$1),g=GetSlot(e,u$2),w=GetSlot(e,T$2),D=ToTemporalCalendarIdentifier(GetSlot(e,p$1));if("iso8601"!==D&&D!==t[nt])throw new RangeError(`cannot format PlainDateTime with calendar ${D} in locale with calendar ${t[nt]}`);let G=e;return "iso8601"===D&&(G=new r(o,n,a,f,y,I,S,g,w,t[nt])),{instant:GetInstantFor(t[ot],G,"compatible"),formatter:getPropLazy(t,et)}}if(IsTemporalZonedDateTime(e))throw new TypeError("Temporal.ZonedDateTime not supported in DateTimeFormat methods. Use toLocaleString() instead.");return IsTemporalInstant(e)?{instant:e,formatter:getPropLazy(t,tt)}:{}}class Instant{constructor(e){if(arguments.length<1)throw new TypeError("missing argument: epochNanoseconds is required");const t=ToBigInt(e);ValidateEpochNanoseconds(t),N$1(this),SetSlot(this,n$1,t);}get epochSeconds(){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");const t=GetSlot(this,n$1);return JSBI.toNumber(BigIntFloorDiv(t,ve))}get epochMilliseconds(){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");const t=JSBI.BigInt(GetSlot(this,n$1));return JSBI.toNumber(BigIntFloorDiv(t,Ge))}get epochMicroseconds(){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");return ToBigIntExternal(BigIntFloorDiv(JSBI.BigInt(GetSlot(this,n$1)),De))}get epochNanoseconds(){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");return ToBigIntExternal(JSBI.BigInt(GetSlot(this,n$1)))}add(e){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");return AddDurationToOrSubtractDurationFromInstant("add",this,e)}subtract(e){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");return AddDurationToOrSubtractDurationFromInstant("subtract",this,e)}until(e,t){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");return DifferenceTemporalInstant("until",this,e,t)}since(e,t){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");return DifferenceTemporalInstant("since",this,e,t)}round(e){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");if(void 0===e)throw new TypeError("options parameter is required");const t="string"==typeof e?CreateOnePropObject("smallestUnit",e):GetOptionsObject(e),r=ToTemporalRoundingIncrement(t),o=ToTemporalRoundingMode(t,"halfExpand"),a=GetTemporalUnit(t,"smallestUnit","time",He);ValidateTemporalRoundingIncrement(r,{hour:24,minute:1440,second:86400,millisecond:864e5,microsecond:864e8,nanosecond:864e11}[a],!0);const i=RoundInstant(GetSlot(this,n$1),r,a,o);return new Instant(i)}equals(t){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");const r=ToTemporalInstant(t),o=GetSlot(this,n$1),a=GetSlot(r,n$1);return JSBI.equal(JSBI.BigInt(o),JSBI.BigInt(a))}toString(e){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");const t=GetOptionsObject(e),r=ToFractionalSecondDigits(t),o=ToTemporalRoundingMode(t,"trunc"),a=GetTemporalUnit(t,"smallestUnit","time",void 0);if("hour"===a)throw new RangeError('smallestUnit must be a time unit other than "hour"');let i=t.timeZone;void 0!==i&&(i=ToTemporalTimeZoneSlotValue(i));const{precision:s,unit:l,increment:d}=ToSecondsStringPrecisionRecord(a,r),m=RoundInstant(GetSlot(this,n$1),d,l,o);return TemporalInstantToString(new Instant(m),i,s)}toJSON(){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");return TemporalInstantToString(this,void 0,"auto")}toLocaleString(e,t){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");return new ht(e,t).format(this)}valueOf(){throw new TypeError("use compare() or equals() to compare Temporal.Instant")}toZonedDateTime(e){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");if(!IsObject(e))throw new TypeError("invalid argument in toZonedDateTime");const t=e.calendar;if(void 0===t)throw new TypeError("missing calendar property in toZonedDateTime");const r=ToTemporalCalendarSlotValue(t),o=e.timeZone;if(void 0===o)throw new TypeError("missing timeZone property in toZonedDateTime");const a=ToTemporalTimeZoneSlotValue(o);return CreateTemporalZonedDateTime(GetSlot(this,n$1),a,r)}toZonedDateTimeISO(e){if(!IsTemporalInstant(this))throw new TypeError("invalid receiver");const t=ToTemporalTimeZoneSlotValue(e);return CreateTemporalZonedDateTime(GetSlot(this,n$1),t,"iso8601")}static fromEpochSeconds(t){const r=ToNumber(t),o=JSBI.multiply(JSBI.BigInt(r),ve);return ValidateEpochNanoseconds(o),new Instant(o)}static fromEpochMilliseconds(t){const r=ToNumber(t),o=JSBI.multiply(JSBI.BigInt(r),Ge);return ValidateEpochNanoseconds(o),new Instant(o)}static fromEpochMicroseconds(t){const r=ToBigInt(t),o=JSBI.multiply(r,De);return ValidateEpochNanoseconds(o),new Instant(o)}static fromEpochNanoseconds(e){const t=ToBigInt(e);return ValidateEpochNanoseconds(t),new Instant(t)}static from(e){return IsTemporalInstant(e)?new Instant(GetSlot(e,n$1)):ToTemporalInstant(e)}static compare(t,r){const o=ToTemporalInstant(t),a=ToTemporalInstant(r),i=GetSlot(o,n$1),s=GetSlot(a,n$1);return JSBI.lessThan(i,s)?-1:JSBI.greaterThan(i,s)?1:0}}MakeIntrinsicClass(Instant,"Temporal.Instant");const Tt=Array.prototype.includes,pt=Array.prototype.push,ft=globalThis.Intl.DateTimeFormat,yt=Array.prototype.sort,It=Math.abs,St=Math.floor,gt=Object.create,wt=Object.entries,Dt=Set,Gt=Reflect.ownKeys,vt=Set.prototype.add,Ct=Set.prototype.values,Ot={};class Calendar{constructor(e){if(arguments.length<1)throw new RangeError("missing argument: id is required");const t=ToString(e);if(!IsBuiltinCalendar(t))throw new RangeError(`invalid calendar identifier ${t}`);N$1(this),SetSlot(this,F$1,ASCIILowercase(t));}get id(){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");return GetSlot(this,F$1)}dateFromFields(e,t){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");if(!IsObject(e))throw new TypeError("invalid fields");const r=GetOptionsObject(t),o=GetSlot(this,F$1);return Ot[o].dateFromFields(e,r,o)}yearMonthFromFields(e,t){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");if(!IsObject(e))throw new TypeError("invalid fields");const r=GetOptionsObject(t),o=GetSlot(this,F$1);return Ot[o].yearMonthFromFields(e,r,o)}monthDayFromFields(e,t){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");if(!IsObject(e))throw new TypeError("invalid fields");const r=GetOptionsObject(t),o=GetSlot(this,F$1);return Ot[o].monthDayFromFields(e,r,o)}fields(e){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");const t=[],r=new Set(["year","month","monthCode","day","hour","minute","second","millisecond","microsecond","nanosecond"]);for(const o of e){if("string"!=typeof o)throw new TypeError("invalid fields");if(!r.has(o))throw new RangeError(`invalid field name ${o}`);r.delete(o),pt.call(t,o);}return Ot[GetSlot(this,F$1)].fields(t)}mergeFields(e,t){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");const r=ToObject(e),o=gt(null);CopyDataProperties(o,r,[],[void 0]);const n=ToObject(t),a=gt(null);CopyDataProperties(a,n,[],[void 0]);const i=Gt(a),s=Ot[GetSlot(this,F$1)].fieldKeysToIgnore(i),l=gt(null),d=Gt(o);for(const e of d){let t;t=Call(Tt,s,[e])?a[e]:o[e],void 0!==t&&(l[e]=t);}return CopyDataProperties(l,a,[]),l}dateAdd(e,t,r){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");const o=ToTemporalDate(e),n=ToTemporalDuration(t),a=ToTemporalOverflow(GetOptionsObject(r)),{days:i}=BalanceDuration(GetSlot(n,v$2),GetSlot(n,C$2),GetSlot(n,O$2),GetSlot(n,b),GetSlot(n,E$1),GetSlot(n,M$2),GetSlot(n,R$1),"day"),s=GetSlot(this,F$1);return Ot[s].dateAdd(o,GetSlot(n,w$2),GetSlot(n,D$1),GetSlot(n,G),i,a,s)}dateUntil(e,t,r){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");const o=ToTemporalDate(e),n=ToTemporalDate(t);let a=GetTemporalUnit(GetOptionsObject(r),"largestUnit","date","auto");"auto"===a&&(a="day");const{years:i,months:s,weeks:l,days:d}=Ot[GetSlot(this,F$1)].dateUntil(o,n,a);return new(GetIntrinsic("%Temporal.Duration%"))(i,s,l,d,0,0,0,0,0,0)}year(e){let t=e;if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");return IsTemporalYearMonth(t)||(t=ToTemporalDate(t)),Ot[GetSlot(this,F$1)].year(t)}month(e){let t=e;if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");if(IsTemporalMonthDay(t))throw new TypeError("use monthCode on PlainMonthDay instead");return IsTemporalYearMonth(t)||(t=ToTemporalDate(t)),Ot[GetSlot(this,F$1)].month(t)}monthCode(e){let t=e;if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");return IsTemporalYearMonth(t)||IsTemporalMonthDay(t)||(t=ToTemporalDate(t)),Ot[GetSlot(this,F$1)].monthCode(t)}day(e){let t=e;if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");return IsTemporalMonthDay(t)||(t=ToTemporalDate(t)),Ot[GetSlot(this,F$1)].day(t)}era(e){let t=e;if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");return IsTemporalYearMonth(t)||(t=ToTemporalDate(t)),Ot[GetSlot(this,F$1)].era(t)}eraYear(e){let t=e;if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");return IsTemporalYearMonth(t)||(t=ToTemporalDate(t)),Ot[GetSlot(this,F$1)].eraYear(t)}dayOfWeek(e){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");const t=ToTemporalDate(e);return Ot[GetSlot(this,F$1)].dayOfWeek(t)}dayOfYear(e){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");const t=ToTemporalDate(e);return Ot[GetSlot(this,F$1)].dayOfYear(t)}weekOfYear(e){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");const t=ToTemporalDate(e);return Ot[GetSlot(this,F$1)].weekOfYear(t)}yearOfWeek(e){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");const t=ToTemporalDate(e);return Ot[GetSlot(this,F$1)].yearOfWeek(t)}daysInWeek(e){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");const t=ToTemporalDate(e);return Ot[GetSlot(this,F$1)].daysInWeek(t)}daysInMonth(e){let t=e;if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");return IsTemporalYearMonth(t)||(t=ToTemporalDate(t)),Ot[GetSlot(this,F$1)].daysInMonth(t)}daysInYear(e){let t=e;if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");return IsTemporalYearMonth(t)||(t=ToTemporalDate(t)),Ot[GetSlot(this,F$1)].daysInYear(t)}monthsInYear(e){let t=e;if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");return IsTemporalYearMonth(t)||(t=ToTemporalDate(t)),Ot[GetSlot(this,F$1)].monthsInYear(t)}inLeapYear(e){let t=e;if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");return IsTemporalYearMonth(t)||(t=ToTemporalDate(t)),Ot[GetSlot(this,F$1)].inLeapYear(t)}toString(){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");return GetSlot(this,F$1)}toJSON(){if(!IsTemporalCalendar(this))throw new TypeError("invalid receiver");return GetSlot(this,F$1)}static from(e){return ToTemporalCalendarObject(ToTemporalCalendarSlotValue(e))}}function monthCodeNumberPart(e){if(!e.startsWith("M"))throw new RangeError(`Invalid month code: ${e}.  Month codes must start with M.`);const t=+e.slice(1);if(isNaN(t))throw new RangeError(`Invalid month code: ${e}`);return t}function buildMonthCode(e,t=!1){return `M${e.toString().padStart(2,"0")}${t?"L":""}`}function resolveNonLunisolarMonth(e,t,r=12){let{month:o,monthCode:n}=e;if(void 0===n){if(void 0===o)throw new TypeError("Either month or monthCode are required");"reject"===t&&RejectToRange(o,1,r),"constrain"===t&&(o=ConstrainToRange(o,1,r)),n=buildMonthCode(o);}else {const e=monthCodeNumberPart(n);if(void 0!==o&&o!==e)throw new RangeError(`monthCode ${n} and month ${o} must match if both are present`);if(n!==buildMonthCode(e))throw new RangeError(`Invalid month code: ${n}`);if(o=e,o<1||o>r)throw new RangeError(`Invalid monthCode: ${n}`)}return {...e,month:o,monthCode:n}}MakeIntrinsicClass(Calendar,"Temporal.Calendar"),DefineIntrinsic("Temporal.Calendar.from",Calendar.from),DefineIntrinsic("Temporal.Calendar.prototype.dateAdd",Calendar.prototype.dateAdd),DefineIntrinsic("Temporal.Calendar.prototype.dateFromFields",Calendar.prototype.dateFromFields),DefineIntrinsic("Temporal.Calendar.prototype.dateUntil",Calendar.prototype.dateUntil),DefineIntrinsic("Temporal.Calendar.prototype.day",Calendar.prototype.day),DefineIntrinsic("Temporal.Calendar.prototype.dayOfWeek",Calendar.prototype.dayOfWeek),DefineIntrinsic("Temporal.Calendar.prototype.dayOfYear",Calendar.prototype.dayOfYear),DefineIntrinsic("Temporal.Calendar.prototype.daysInMonth",Calendar.prototype.daysInMonth),DefineIntrinsic("Temporal.Calendar.prototype.daysInWeek",Calendar.prototype.daysInWeek),DefineIntrinsic("Temporal.Calendar.prototype.daysInYear",Calendar.prototype.daysInYear),DefineIntrinsic("Temporal.Calendar.prototype.era",Calendar.prototype.era),DefineIntrinsic("Temporal.Calendar.prototype.eraYear",Calendar.prototype.eraYear),DefineIntrinsic("Temporal.Calendar.prototype.fields",Calendar.prototype.fields),DefineIntrinsic("Temporal.Calendar.prototype.inLeapYear",Calendar.prototype.inLeapYear),DefineIntrinsic("Temporal.Calendar.prototype.mergeFields",Calendar.prototype.mergeFields),DefineIntrinsic("Temporal.Calendar.prototype.month",Calendar.prototype.month),DefineIntrinsic("Temporal.Calendar.prototype.monthCode",Calendar.prototype.monthCode),DefineIntrinsic("Temporal.Calendar.prototype.monthDayFromFields",Calendar.prototype.monthDayFromFields),DefineIntrinsic("Temporal.Calendar.prototype.monthsInYear",Calendar.prototype.monthsInYear),DefineIntrinsic("Temporal.Calendar.prototype.weekOfYear",Calendar.prototype.weekOfYear),DefineIntrinsic("Temporal.Calendar.prototype.year",Calendar.prototype.year),DefineIntrinsic("Temporal.Calendar.prototype.yearMonthFromFields",Calendar.prototype.yearMonthFromFields),DefineIntrinsic("Temporal.Calendar.prototype.yearOfWeek",Calendar.prototype.yearOfWeek),Ot.iso8601={dateFromFields(e,t,r){let o=PrepareTemporalFields(e,["day","month","monthCode","year"],["year","day"]);const n=ToTemporalOverflow(t);o=resolveNonLunisolarMonth(o);let{year:a,month:i,day:s}=o;return ({year:a,month:i,day:s}=RegulateISODate(a,i,s,n)),CreateTemporalDate(a,i,s,r)},yearMonthFromFields(e,t,r){let o=PrepareTemporalFields(e,["month","monthCode","year"],["year"]);const n=ToTemporalOverflow(t);o=resolveNonLunisolarMonth(o);let{year:a,month:i}=o;return ({year:a,month:i}=function RegulateISOYearMonth(e,t,r){let o=e,n=t;switch(r){case"reject":RejectISODate(o,n,1);break;case"constrain":({year:o,month:n}=ConstrainISODate(o,n));}return {year:o,month:n}}(a,i,n)),CreateTemporalYearMonth(a,i,r,1)},monthDayFromFields(e,t,r){let o=PrepareTemporalFields(e,["day","month","monthCode","year"],["day"]);const n=ToTemporalOverflow(t);if(void 0!==o.month&&void 0===o.year&&void 0===o.monthCode)throw new TypeError("either year or monthCode required with month");const a=void 0===o.monthCode;o=resolveNonLunisolarMonth(o);let{month:i,day:s,year:l}=o;return ({month:i,day:s}=RegulateISODate(a?l:1972,i,s,n)),CreateTemporalMonthDay(i,s,r,1972)},fields:e=>e,fieldKeysToIgnore(e){const t=new Dt;for(let r=0;r<e.length;r++){const o=e[r];Call(vt,t,[o]),"month"===o?Call(vt,t,["monthCode"]):"monthCode"===o&&Call(vt,t,["month"]);}return [...Call(Ct,t,[])]},dateAdd(e,t,r,o,n,a,d){let m=GetSlot(e,i$2),c=GetSlot(e,s$2),h=GetSlot(e,l$2);return ({year:m,month:c,day:h}=AddISODate(m,c,h,t,r,o,n,a)),CreateTemporalDate(m,c,h,d)},dateUntil:(e,t,r)=>DifferenceISODate(GetSlot(e,i$2),GetSlot(e,s$2),GetSlot(e,l$2),GetSlot(t,i$2),GetSlot(t,s$2),GetSlot(t,l$2),r),year:e=>GetSlot(e,i$2),era(){},eraYear(){},month:e=>GetSlot(e,s$2),monthCode:e=>buildMonthCode(GetSlot(e,s$2)),day:e=>GetSlot(e,l$2),dayOfWeek:e=>DayOfWeek(GetSlot(e,i$2),GetSlot(e,s$2),GetSlot(e,l$2)),dayOfYear:e=>DayOfYear(GetSlot(e,i$2),GetSlot(e,s$2),GetSlot(e,l$2)),weekOfYear:e=>WeekOfYear(GetSlot(e,i$2),GetSlot(e,s$2),GetSlot(e,l$2)).week,yearOfWeek:e=>WeekOfYear(GetSlot(e,i$2),GetSlot(e,s$2),GetSlot(e,l$2)).year,daysInWeek:()=>7,daysInMonth:e=>ISODaysInMonth(GetSlot(e,i$2),GetSlot(e,s$2)),daysInYear(e){let t=e;return HasSlot(t,i$2)||(t=ToTemporalDate(t)),LeapYear(GetSlot(t,i$2))?366:365},monthsInYear:()=>12,inLeapYear(e){let t=e;return HasSlot(t,i$2)||(t=ToTemporalDate(t)),LeapYear(GetSlot(t,i$2))}};class OneObjectCache{constructor(e){if(this.map=new Map,this.calls=0,this.hits=0,this.misses=0,this.now=globalThis.performance?globalThis.performance.now():Date.now(),void 0!==e){let t=0;for(const r of e.map.entries()){if(++t>OneObjectCache.MAX_CACHE_ENTRIES)break;this.map.set(...r);}}}get(e){const t=this.map.get(e);return t&&(this.hits++,this.report()),this.calls++,t}set(e,t){this.map.set(e,t),this.misses++,this.report();}report(){}setObject(e){if(OneObjectCache.objectMap.get(e))throw new RangeError("object already cached");OneObjectCache.objectMap.set(e,this),this.report();}static getCacheForObject(e){let t=OneObjectCache.objectMap.get(e);return t||(t=new OneObjectCache,OneObjectCache.objectMap.set(e,t)),t}}function toUtcIsoDateString({isoYear:e,isoMonth:t,isoDay:r}){return `${ISOYearString(e)}-${ISODateTimePartString(t)}-${ISODateTimePartString(r)}T00:00Z`}function simpleDateDiff(e,t){return {years:e.year-t.year,months:e.month-t.month,days:e.day-t.day}}OneObjectCache.objectMap=new WeakMap,OneObjectCache.MAX_CACHE_ENTRIES=1e3;class HelperBase{constructor(){this.eraLength="short",this.hasEra=!0,this.erasBeginMidYear=!1;}getFormatter(){return void 0===this.formatter&&(this.formatter=new ft(`en-US-u-ca-${this.id}`,{day:"numeric",month:"numeric",year:"numeric",era:this.eraLength,timeZone:"UTC"})),this.formatter}isoToCalendarDate(e,t){const{year:r,month:o,day:n}=e,a=JSON.stringify({func:"isoToCalendarDate",isoYear:r,isoMonth:o,isoDay:n,id:this.id}),i=t.get(a);if(i)return i;const s=this.getFormatter();let l,d;try{d=toUtcIsoDateString({isoYear:r,isoMonth:o,isoDay:n}),l=s.formatToParts(new Date(d));}catch(e){throw new RangeError(`Invalid ISO date: ${JSON.stringify({isoYear:r,isoMonth:o,isoDay:n})}`)}const m={};for(let{type:e,value:t}of l){if("year"===e&&(m.eraYear=+t),"relatedYear"===e&&(m.eraYear=+t),"month"===e){const e=/^([0-9]*)(.*?)$/.exec(t);if(!e||3!=e.length||!e[1]&&!e[2])throw new RangeError(`Unexpected month: ${t}`);if(m.month=e[1]?+e[1]:1,m.month<1)throw new RangeError(`Invalid month ${t} from ${d}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10527)`);if(m.month>13)throw new RangeError(`Invalid month ${t} from ${d}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10529)`);e[2]&&(m.monthExtra=e[2]);}"day"===e&&(m.day=+t),this.hasEra&&"era"===e&&null!=t&&""!==t&&(t=t.split(" (")[0],m.era=t.normalize("NFD").replace(/[^-0-9 \p{L}]/gu,"").replace(" ","-").toLowerCase());}if(void 0===m.eraYear)throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);if(this.reviseIntlEra){const{era:t,eraYear:r}=this.reviseIntlEra(m,e);m.era=t,m.eraYear=r;}this.checkIcuBugs&&this.checkIcuBugs(e);const c=this.adjustCalendarDate(m,t,"constrain",!0);if(void 0===c.year)throw new RangeError(`Missing year converting ${JSON.stringify(e)}`);if(void 0===c.month)throw new RangeError(`Missing month converting ${JSON.stringify(e)}`);if(void 0===c.day)throw new RangeError(`Missing day converting ${JSON.stringify(e)}`);return t.set(a,c),["constrain","reject"].forEach((r=>{const o=JSON.stringify({func:"calendarToIsoDate",year:c.year,month:c.month,day:c.day,overflow:r,id:this.id});t.set(o,e);})),c}validateCalendarDate(e){const{era:t,month:r,year:o,day:n,eraYear:a,monthCode:i,monthExtra:s}=e;if(void 0!==s)throw new RangeError("Unexpected `monthExtra` value");if(void 0===o&&void 0===a)throw new TypeError("year or eraYear is required");if(void 0===r&&void 0===i)throw new TypeError("month or monthCode is required");if(void 0===n)throw new RangeError("Missing day");if(void 0!==i){if("string"!=typeof i)throw new RangeError("monthCode must be a string, not "+typeof i);if(!/^M([01]?\d)(L?)$/.test(i))throw new RangeError(`Invalid monthCode: ${i}`)}if(this.constantEra){if(void 0!==t&&t!==this.constantEra)throw new RangeError(`era must be ${this.constantEra}, not ${t}`);if(void 0!==a&&void 0!==o&&a!==o)throw new RangeError(`eraYear ${a} does not match year ${o}`)}if(this.hasEra&&void 0===e.era!=(void 0===e.eraYear))throw new RangeError("properties 'era' and 'eraYear' must be provided together")}adjustCalendarDate(e,t,r="constrain",o=!1){if("lunisolar"===this.calendarType)throw new RangeError("Override required for lunisolar calendars");let n=e;if(this.validateCalendarDate(n),this.constantEra){const{year:e,eraYear:t}=n;n={...n,era:this.constantEra,year:void 0!==e?e:t,eraYear:void 0!==t?t:e};}const a=this.monthsInYear(n,t);let{month:i,monthCode:s}=n;return ({month:i,monthCode:s}=resolveNonLunisolarMonth(n,r,a)),{...n,month:i,monthCode:s}}regulateMonthDayNaive(e,t,r){const o=this.monthsInYear(e,r);let{month:n,day:a}=e;return "reject"===t?(RejectToRange(n,1,o),RejectToRange(a,1,this.maximumMonthLength(e))):(n=ConstrainToRange(n,1,o),a=ConstrainToRange(a,1,this.maximumMonthLength({...e,month:n}))),{...e,month:n,day:a}}calendarToIsoDate(e,t="constrain",r){const o=e;let n=this.adjustCalendarDate(e,r,t,!1);n=this.regulateMonthDayNaive(n,t,r);const{year:a,month:i,day:s}=n,l=JSON.stringify({func:"calendarToIsoDate",year:a,month:i,day:s,overflow:t,id:this.id});let d,m=r.get(l);if(m)return m;if(void 0!==o.year&&void 0!==o.month&&void 0!==o.day&&(o.year!==n.year||o.month!==n.month||o.day!==n.day)&&(d=JSON.stringify({func:"calendarToIsoDate",year:o.year,month:o.month,day:o.day,overflow:t,id:this.id}),m=r.get(d),m))return m;let c=this.estimateIsoDate({year:a,month:i,day:s});const calculateSameMonthResult=e=>{let o=this.addDaysIso(c,e);if(n.day>this.minimumMonthLength(n)){let e=this.isoToCalendarDate(o,r);for(;e.month!==i||e.year!==a;){if("reject"===t)throw new RangeError(`day ${s} does not exist in month ${i} of year ${a}`);o=this.addDaysIso(o,-1),e=this.isoToCalendarDate(o,r);}}return o};let h=0,u=this.isoToCalendarDate(c,r),T=simpleDateDiff(n,u);if(0!==T.years||0!==T.months||0!==T.days){const e=365*T.years+30*T.months+T.days;c=this.addDaysIso(c,e),u=this.isoToCalendarDate(c,r),T=simpleDateDiff(n,u),0===T.years&&0===T.months?c=calculateSameMonthResult(T.days):h=this.compareCalendarDates(n,u);}let p=8;for(;h;){c=this.addDaysIso(c,h*p);const e=u;u=this.isoToCalendarDate(c,r);const a=h;if(h=this.compareCalendarDates(n,u),h)if(T=simpleDateDiff(n,u),0===T.years&&0===T.months)c=calculateSameMonthResult(T.days),h=0;else if(a&&h!==a)if(p>1)p/=2;else {if("reject"===t)throw new RangeError(`Can't find ISO date from calendar date: ${JSON.stringify({...o})}`);this.compareCalendarDates(u,e)>0&&(c=this.addDaysIso(c,-1)),h=0;}}if(r.set(l,c),d&&r.set(d,c),void 0===n.year||void 0===n.month||void 0===n.day||void 0===n.monthCode||this.hasEra&&(void 0===n.era||void 0===n.eraYear))throw new RangeError("Unexpected missing property");return c}temporalToCalendarDate(e,t){const r={year:GetSlot(e,i$2),month:GetSlot(e,s$2),day:GetSlot(e,l$2)};return this.isoToCalendarDate(r,t)}compareCalendarDates(e,t){const r=PrepareTemporalFields(e,["day","month","year"],["day","month","year"]),o=PrepareTemporalFields(t,["day","month","year"],["day","month","year"]);return r.year!==o.year?ComparisonResult(r.year-o.year):r.month!==o.month?ComparisonResult(r.month-o.month):r.day!==o.day?ComparisonResult(r.day-o.day):0}regulateDate(e,t="constrain",r){const o=this.calendarToIsoDate(e,t,r);return this.isoToCalendarDate(o,r)}addDaysIso(e,t){return AddISODate(e.year,e.month,e.day,0,0,0,t,"constrain")}addDaysCalendar(e,t,r){const o=this.calendarToIsoDate(e,"constrain",r),n=this.addDaysIso(o,t);return this.isoToCalendarDate(n,r)}addMonthsCalendar(e,t,r,o){let n=e;const{day:a}=n;for(let e=0,r=It(t);e<r;e++){const{month:e}=n,r=n,i=t<0?-Math.max(a,this.daysInPreviousMonth(n,o)):this.daysInMonth(n,o),s=this.calendarToIsoDate(n,"constrain",o);let l=this.addDaysIso(s,i);if(n=this.isoToCalendarDate(l,o),t>0){const t=this.monthsInYear(r,o);for(;n.month-1!=e%t;)l=this.addDaysIso(l,-1),n=this.isoToCalendarDate(l,o);}n.day!==a&&(n=this.regulateDate({...n,day:a},"constrain",o));}if("reject"===r&&n.day!==a)throw new RangeError(`Day ${a} does not exist in resulting calendar month`);return n}addCalendar(e,{years:t=0,months:r=0,weeks:o=0,days:n=0},a,i){const{year:s,day:l,monthCode:d}=e,m=this.adjustCalendarDate({year:s+t,monthCode:d,day:l},i),c=this.addMonthsCalendar(m,r,a,i),h=n+7*o;return this.addDaysCalendar(c,h,i)}untilCalendar(e,t,r,o){let n=0,a=0,i=0,s=0;switch(r){case"day":n=this.calendarDaysUntil(e,t,o);break;case"week":{const r=this.calendarDaysUntil(e,t,o);n=r%7,a=(r-n)/7;break}case"month":case"year":{const a=this.compareCalendarDates(t,e);if(!a)return {years:0,months:0,weeks:0,days:0};const l=t.year-e.year,d=t.day-e.day;if("year"===r&&l){let r=0;t.monthCode>e.monthCode&&(r=1),t.monthCode<e.monthCode&&(r=-1),r||(r=Math.sign(d));s=r*a<0?l-a:l;}let m,c=s?this.addCalendar(e,{years:s},"constrain",o):e;do{i+=a,m=c,c=this.addMonthsCalendar(m,a,"constrain",o),c.day!==e.day&&(c=this.regulateDate({...c,day:e.day},"constrain",o));}while(this.compareCalendarDates(t,c)*a>=0);i-=a;n=this.calendarDaysUntil(m,t,o);break}}return {years:s,months:i,weeks:a,days:n}}daysInMonth(e,t){const{day:r}=e,o=this.maximumMonthLength(e),n=this.minimumMonthLength(e);if(n===o)return n;const a=r<=o-n?o:n,i=this.calendarToIsoDate(e,"constrain",t),s=this.addDaysIso(i,a),l=this.isoToCalendarDate(s,t),d=this.addDaysIso(s,-l.day);return this.isoToCalendarDate(d,t).day}daysInPreviousMonth(e,t){const{day:r,month:o,year:n}=e;let a={year:o>1?n:n-1,month:o,day:1};const i=o>1?o-1:this.monthsInYear(a,t);a={...a,month:i};const s=this.minimumMonthLength(a),l=this.maximumMonthLength(a);if(s===l)return l;const d=this.calendarToIsoDate(e,"constrain",t),m=this.addDaysIso(d,-r);return this.isoToCalendarDate(m,t).day}startOfCalendarYear(e){return {year:e.year,month:1,monthCode:"M01",day:1}}startOfCalendarMonth(e){return {year:e.year,month:e.month,day:1}}calendarDaysUntil(e,t,r){const o=this.calendarToIsoDate(e,"constrain",r),n=this.calendarToIsoDate(t,"constrain",r);return this.isoDaysUntil(o,n)}isoDaysUntil(e,t){return DifferenceISODate(e.year,e.month,e.day,t.year,t.month,t.day,"day").days}monthDayFromFields(e,t,r){let o,n,a,i,s,{monthCode:l,day:d}=e;if(void 0===l){let{year:o,era:n,eraYear:a}=e;if(void 0===o&&(void 0===n||void 0===a))throw new TypeError("when `monthCode` is omitted, `year` (or `era` and `eraYear`) and `month` are required");({monthCode:l,day:d}=this.isoToCalendarDate(this.calendarToIsoDate(e,t,r),r));}const m=this.isoToCalendarDate({year:1972,month:12,day:31},r),c=m.monthCode>l||m.monthCode===l&&m.day>=d?m.year:m.year-1;for(let e=0;e<100;e++){const m=this.adjustCalendarDate({day:d,monthCode:l,year:c-e},r),h=this.calendarToIsoDate(m,"constrain",r),u=this.isoToCalendarDate(h,r);if(({year:o,month:n,day:a}=h),u.monthCode===l&&u.day===d)return {month:n,day:a,year:o};"constrain"===t&&(void 0===i||u.monthCode===i.monthCode&&u.day>i.day)&&(i=u,s=h);}if("constrain"===t&&void 0!==s)return s;throw new RangeError(`No recent ${this.id} year with monthCode ${l} and day ${d}`)}}class HebrewHelper extends HelperBase{constructor(){super(...arguments),this.id="hebrew",this.calendarType="lunisolar",this.months={Tishri:{leap:1,regular:1,monthCode:"M01",days:30},Heshvan:{leap:2,regular:2,monthCode:"M02",days:{min:29,max:30}},Kislev:{leap:3,regular:3,monthCode:"M03",days:{min:29,max:30}},Tevet:{leap:4,regular:4,monthCode:"M04",days:29},Shevat:{leap:5,regular:5,monthCode:"M05",days:30},Adar:{leap:void 0,regular:6,monthCode:"M06",days:29},"Adar I":{leap:6,regular:void 0,monthCode:"M05L",days:30},"Adar II":{leap:7,regular:void 0,monthCode:"M06",days:29},Nisan:{leap:8,regular:7,monthCode:"M07",days:30},Iyar:{leap:9,regular:8,monthCode:"M08",days:29},Sivan:{leap:10,regular:9,monthCode:"M09",days:30},Tamuz:{leap:11,regular:10,monthCode:"M10",days:29},Av:{leap:12,regular:11,monthCode:"M11",days:30},Elul:{leap:13,regular:12,monthCode:"M12",days:29}},this.hasEra=!1;}inLeapYear(e){const{year:t}=e;return (7*t+1)%19<7}monthsInYear(e){return this.inLeapYear(e)?13:12}minimumMonthLength(e){return this.minMaxMonthLength(e,"min")}maximumMonthLength(e){return this.minMaxMonthLength(e,"max")}minMaxMonthLength(e,t){const{month:r,year:o}=e,n=this.getMonthCode(o,r),a=wt(this.months).find((e=>e[1].monthCode===n));if(void 0===a)throw new RangeError(`unmatched Hebrew month: ${r}`);const i=a[1].days;return "number"==typeof i?i:i[t]}estimateIsoDate(e){const{year:t}=e;return {year:t-3760,month:1,day:1}}getMonthCode(e,t){return this.inLeapYear({year:e})?6===t?buildMonthCode(5,!0):buildMonthCode(t<6?t:t-1):buildMonthCode(t)}adjustCalendarDate(e,t,r="constrain",o=!1){let{year:n,eraYear:a,month:i,monthCode:s,day:l,monthExtra:d}=e;if(void 0===n&&void 0!==a&&(n=a),void 0===a&&void 0!==n&&(a=n),o){if(d){const e=this.months[d];if(!e)throw new RangeError(`Unrecognized month from formatToParts: ${d}`);i=this.inLeapYear({year:n})?e.leap:e.regular;}s=this.getMonthCode(n,i);return {year:n,month:i,day:l,era:void 0,eraYear:a,monthCode:s}}if(this.validateCalendarDate(e),void 0===i)if(s.endsWith("L")){if("M05L"!==s)throw new RangeError(`Hebrew leap month must have monthCode M05L, not ${s}`);if(i=6,!this.inLeapYear({year:n})){if("reject"===r)throw new RangeError(`Hebrew monthCode M05L is invalid in year ${n} which is not a leap year`);i=6,s="M06";}}else {i=monthCodeNumberPart(s),this.inLeapYear({year:n})&&i>=6&&i++;const e=this.monthsInYear({year:n});if(i<1||i>e)throw new RangeError(`Invalid monthCode: ${s}`)}else if("reject"===r?(RejectToRange(i,1,this.monthsInYear({year:n})),RejectToRange(l,1,this.maximumMonthLength({year:n,month:i}))):(i=ConstrainToRange(i,1,this.monthsInYear({year:n})),l=ConstrainToRange(l,1,this.maximumMonthLength({year:n,month:i}))),void 0===s)s=this.getMonthCode(n,i);else {if(this.getMonthCode(n,i)!==s)throw new RangeError(`monthCode ${s} doesn't correspond to month ${i} in Hebrew year ${n}`)}return {...e,day:l,month:i,monthCode:s,year:n,eraYear:a}}}class IslamicBaseHelper extends HelperBase{constructor(){super(...arguments),this.calendarType="lunar",this.DAYS_PER_ISLAMIC_YEAR=354+11/30,this.DAYS_PER_ISO_YEAR=365.2425,this.constantEra="ah";}inLeapYear(e,t){return 30===this.daysInMonth({year:e.year,month:12,day:1},t)}monthsInYear(){return 12}minimumMonthLength(){return 29}maximumMonthLength(){return 30}estimateIsoDate(e){const{year:t}=this.adjustCalendarDate(e);return {year:St(t*this.DAYS_PER_ISLAMIC_YEAR/this.DAYS_PER_ISO_YEAR)+622,month:1,day:1}}}class IslamicHelper extends IslamicBaseHelper{constructor(){super(...arguments),this.id="islamic";}}class IslamicUmalquraHelper extends IslamicBaseHelper{constructor(){super(...arguments),this.id="islamic-umalqura";}}class IslamicTblaHelper extends IslamicBaseHelper{constructor(){super(...arguments),this.id="islamic-tbla";}}class IslamicCivilHelper extends IslamicBaseHelper{constructor(){super(...arguments),this.id="islamic-civil";}}class IslamicRgsaHelper extends IslamicBaseHelper{constructor(){super(...arguments),this.id="islamic-rgsa";}}class IslamicCcHelper extends IslamicBaseHelper{constructor(){super(...arguments),this.id="islamicc";}}class PersianHelper extends HelperBase{constructor(){super(...arguments),this.id="persian",this.calendarType="solar",this.constantEra="ap";}inLeapYear(e,t){return IslamicHelper.prototype.inLeapYear.call(this,e,t)}monthsInYear(){return 12}minimumMonthLength(e){const{month:t}=e;return 12===t?29:t<=6?31:30}maximumMonthLength(e){const{month:t}=e;return 12===t?30:t<=6?31:30}estimateIsoDate(e){const{year:t}=this.adjustCalendarDate(e);return {year:t+621,month:1,day:1}}}class IndianHelper extends HelperBase{constructor(){super(...arguments),this.id="indian",this.calendarType="solar",this.constantEra="saka",this.months={1:{length:30,month:3,day:22,leap:{length:31,month:3,day:21}},2:{length:31,month:4,day:21},3:{length:31,month:5,day:22},4:{length:31,month:6,day:22},5:{length:31,month:7,day:23},6:{length:31,month:8,day:23},7:{length:30,month:9,day:23},8:{length:30,month:10,day:23},9:{length:30,month:11,day:22},10:{length:30,month:12,day:22},11:{length:30,month:1,nextYear:!0,day:21},12:{length:30,month:2,nextYear:!0,day:20}},this.vulnerableToBceBug="10/11/-79 Saka"!==new Date("0000-01-01T00:00Z").toLocaleDateString("en-US-u-ca-indian",{timeZone:"UTC"});}inLeapYear(e){return isGregorianLeapYear(e.year+78)}monthsInYear(){return 12}minimumMonthLength(e){return this.getMonthInfo(e).length}maximumMonthLength(e){return this.getMonthInfo(e).length}getMonthInfo(e){const{month:t}=e;let r=this.months[t];if(void 0===r)throw new RangeError(`Invalid month: ${t}`);return this.inLeapYear(e)&&r.leap&&(r=r.leap),r}estimateIsoDate(e){const t=this.adjustCalendarDate(e),r=this.getMonthInfo(t);return AddISODate(t.year+78+(r.nextYear?1:0),r.month,r.day,0,0,0,t.day-1,"constrain")}checkIcuBugs(e){if(this.vulnerableToBceBug&&e.year<1)throw new RangeError(`calendar '${this.id}' is broken for ISO dates before 0001-01-01 (see https://bugs.chromium.org/p/v8/issues/detail?id=10529)`)}}function isGregorianLeapYear(e){return e%4==0&&(e%100!=0||e%400==0)}class GregorianBaseHelper extends HelperBase{constructor(e,t){super(),this.calendarType="solar",this.v8IsVulnerableToJulianBug=new Date("+001001-01-01T00:00Z").toLocaleDateString("en-US-u-ca-japanese",{timeZone:"UTC"}).startsWith("12"),this.calendarIsVulnerableToJulianBug=!1,this.id=e;const{eras:r,anchorEra:o}=function adjustEras(e){let t,r=e;if(0===r.length)throw new RangeError("Invalid era data: eras are required");if(1===r.length&&r[0].reverseOf)throw new RangeError("Invalid era data: anchor era cannot count years backwards");if(1===r.length&&!r[0].name)throw new RangeError("Invalid era data: at least one named era is required");if(r.filter((e=>null!=e.reverseOf)).length>1)throw new RangeError("Invalid era data: only one era can count years backwards");r.forEach((e=>{if(e.isAnchor||!e.anchorEpoch&&!e.reverseOf){if(t)throw new RangeError("Invalid era data: cannot have multiple anchor eras");t=e,e.anchorEpoch={year:e.hasYearZero?0:1};}else if(!e.name)throw new RangeError("If era name is blank, it must be the anchor era")})),r=r.filter((e=>e.name)),r.forEach((e=>{const{reverseOf:t}=e;if(t){const o=r.find((e=>e.name===t));if(void 0===o)throw new RangeError(`Invalid era data: unmatched reverseOf era: ${t}`);e.reverseOf=o,e.anchorEpoch=o.anchorEpoch,e.isoEpoch=o.isoEpoch;}void 0===e.anchorEpoch.month&&(e.anchorEpoch.month=1),void 0===e.anchorEpoch.day&&(e.anchorEpoch.day=1);})),yt.call(r,((e,t)=>{if(e.reverseOf)return 1;if(t.reverseOf)return -1;if(!e.isoEpoch||!t.isoEpoch)throw new RangeError("Invalid era data: missing ISO epoch");return t.isoEpoch.year-e.isoEpoch.year}));const o=r[r.length-1].reverseOf;if(o&&o!==r[r.length-2])throw new RangeError("Invalid era data: invalid reverse-sign era");return r.forEach(((e,t)=>{e.genericName="era"+(r.length-1-t);})),{eras:r,anchorEra:t||r[0]}}(t);this.anchorEra=o,this.eras=r;}inLeapYear(e){const{year:t}=this.estimateIsoDate({month:1,day:1,year:e.year});return isGregorianLeapYear(t)}monthsInYear(){return 12}minimumMonthLength(e){const{month:t}=e;return 2===t?this.inLeapYear(e)?29:28:[4,6,9,11].indexOf(t)>=0?30:31}maximumMonthLength(e){return this.minimumMonthLength(e)}completeEraYear(e){const checkField=(t,r)=>{const o=e[t];if(null!=o&&o!=r)throw new RangeError(`Input ${t} ${o} doesn't match calculated value ${r}`)},eraFromYear=t=>{let r;const o={...e,year:t},n=this.eras.find(((e,n)=>{if(n===this.eras.length-1){if(e.reverseOf){if(t>0)throw new RangeError(`Signed year ${t} is invalid for era ${e.name}`);return r=e.anchorEpoch.year-t,!0}return r=t-e.anchorEpoch.year+(e.hasYearZero?0:1),!0}return this.compareCalendarDates(o,e.anchorEpoch)>=0&&(r=t-e.anchorEpoch.year+(e.hasYearZero?0:1),!0)}));if(!n)throw new RangeError(`Year ${t} was not matched by any era`);return {eraYear:r,era:n.name}};let{year:t,eraYear:r,era:o}=e;if(null!=t)(({eraYear:r,era:o}=eraFromYear(t))),checkField("era",o),checkField("eraYear",r);else {if(null==r)throw new RangeError("Either `year` or `eraYear` and `era` are required");{const e=void 0===o?void 0:this.eras.find((e=>e.name===o||e.genericName===o));if(!e)throw new RangeError(`Era ${o} (ISO year ${r}) was not matched by any era`);if(r<1&&e.reverseOf)throw new RangeError(`Years in ${o} era must be positive, not ${t}`);t=e.reverseOf?e.anchorEpoch.year-r:r+e.anchorEpoch.year-(e.hasYearZero?0:1),checkField("year",t),({eraYear:r,era:o}=eraFromYear(t));}}return {...e,year:t,eraYear:r,era:o}}adjustCalendarDate(e,t,r="constrain"){let o=e;const{month:n,monthCode:a}=o;return void 0===n&&(o={...o,month:monthCodeNumberPart(a)}),this.validateCalendarDate(o),o=this.completeEraYear(o),super.adjustCalendarDate(o,t,r)}estimateIsoDate(e){const t=this.adjustCalendarDate(e),{year:r,month:o,day:n}=t,{anchorEra:a}=this;return RegulateISODate(r+a.isoEpoch.year-(a.hasYearZero?0:1),o,n,"constrain")}checkIcuBugs(e){if(this.calendarIsVulnerableToJulianBug&&this.v8IsVulnerableToJulianBug){if(CompareISODate(e.year,e.month,e.day,1582,10,15)<0)throw new RangeError(`calendar '${this.id}' is broken for ISO dates before 1582-10-15 (see https://bugs.chromium.org/p/chromium/issues/detail?id=1173158)`)}}}class OrthodoxBaseHelper extends GregorianBaseHelper{constructor(e,t){super(e,t);}inLeapYear(e){const{year:t}=e;return (t+1)%4==0}monthsInYear(){return 13}minimumMonthLength(e){const{month:t}=e;return 13===t?this.inLeapYear(e)?6:5:30}maximumMonthLength(e){return this.minimumMonthLength(e)}}class EthioaaHelper extends OrthodoxBaseHelper{constructor(){super("ethioaa",[{name:"era0",isoEpoch:{year:-5492,month:7,day:17}}]);}}class CopticHelper extends OrthodoxBaseHelper{constructor(){super("coptic",[{name:"era1",isoEpoch:{year:284,month:8,day:29}},{name:"era0",reverseOf:"era1"}]);}}class EthiopicHelper extends OrthodoxBaseHelper{constructor(){super("ethiopic",[{name:"era0",isoEpoch:{year:-5492,month:7,day:17}},{name:"era1",isoEpoch:{year:8,month:8,day:27},anchorEpoch:{year:5501}}]);}}class RocHelper extends GregorianBaseHelper{constructor(){super("roc",[{name:"minguo",isoEpoch:{year:1912,month:1,day:1}},{name:"before-roc",reverseOf:"minguo"}]),this.calendarIsVulnerableToJulianBug=!0;}}class BuddhistHelper extends GregorianBaseHelper{constructor(){super("buddhist",[{name:"be",hasYearZero:!0,isoEpoch:{year:-543,month:1,day:1}}]),this.calendarIsVulnerableToJulianBug=!0;}}class GregoryHelper extends GregorianBaseHelper{constructor(){super("gregory",[{name:"ce",isoEpoch:{year:1,month:1,day:1}},{name:"bce",reverseOf:"ce"}]);}reviseIntlEra(e){let{era:t,eraYear:r}=e;return "bc"!==t&&"b"!==t||(t="bce"),"ad"!==t&&"a"!==t||(t="ce"),{era:t,eraYear:r}}}class JapaneseHelper extends GregorianBaseHelper{constructor(){super("japanese",[{name:"reiwa",isoEpoch:{year:2019,month:5,day:1},anchorEpoch:{year:2019,month:5,day:1}},{name:"heisei",isoEpoch:{year:1989,month:1,day:8},anchorEpoch:{year:1989,month:1,day:8}},{name:"showa",isoEpoch:{year:1926,month:12,day:25},anchorEpoch:{year:1926,month:12,day:25}},{name:"taisho",isoEpoch:{year:1912,month:7,day:30},anchorEpoch:{year:1912,month:7,day:30}},{name:"meiji",isoEpoch:{year:1868,month:9,day:8},anchorEpoch:{year:1868,month:9,day:8}},{name:"ce",isoEpoch:{year:1,month:1,day:1}},{name:"bce",reverseOf:"ce"}]),this.calendarIsVulnerableToJulianBug=!0,this.eraLength="long",this.erasBeginMidYear=!0;}reviseIntlEra(e,t){const{era:r,eraYear:o}=e,{year:n}=t;return this.eras.find((e=>e.name===r))?{era:r,eraYear:o}:n<1?{era:"bce",eraYear:1-n}:{era:"ce",eraYear:n}}}class ChineseBaseHelper extends HelperBase{constructor(){super(...arguments),this.calendarType="lunisolar",this.hasEra=!1;}inLeapYear(e,t){const r=this.getMonthList(e.year,t);return 13===wt(r).length}monthsInYear(e,t){return this.inLeapYear(e,t)?13:12}minimumMonthLength(){return 29}maximumMonthLength(){return 30}getMonthList(e,t){if(void 0===e)throw new TypeError("Missing year");const r=JSON.stringify({func:"getMonthList",calendarYear:e,id:this.id}),o=t.get(r);if(o)return o;const n=this.getFormatter(),getCalendarDate=(e,t)=>{const r=toUtcIsoDateString({isoYear:e,isoMonth:2,isoDay:1}),o=new Date(r);o.setUTCDate(t+1);const a=n.formatToParts(o),i=a.find((e=>"month"===e.type)).value,s=+a.find((e=>"day"===e.type)).value;let l=a.find((e=>"relatedYear"===e.type));if(void 0===l)throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);return l=+l.value,{calendarMonthString:i,calendarDay:s,calendarYearToVerify:l}};let a=17,{calendarMonthString:i,calendarDay:s,calendarYearToVerify:l}=getCalendarDate(e,a);"1"!==i&&(a+=29,({calendarMonthString:i,calendarDay:s}=getCalendarDate(e,a))),a-=s-5;const d={};let m,c,h=1,u=!1;do{(({calendarMonthString:i,calendarDay:s,calendarYearToVerify:l}=getCalendarDate(e,a))),m&&(d[c].daysInMonth=m+30-s),l!==e?u=!0:(d[i]={monthIndex:h++},a+=30),m=s,c=i;}while(!u);return d[c].daysInMonth=m+30-s,t.set(r,d),d}estimateIsoDate(e){const{year:t,month:r}=e;return {year:t,month:r>=12?12:r+1,day:1}}adjustCalendarDate(e,t,r="constrain",o=!1){let{year:n,month:a,monthExtra:i,day:s,monthCode:l,eraYear:d}=e;if(o){if(n=d,i&&"bis"!==i)throw new RangeError(`Unexpected leap month suffix: ${i}`);const e=buildMonthCode(a,void 0!==i),r=`${a}${i||""}`,o=this.getMonthList(n,t)[r];if(void 0===o)throw new RangeError(`Unmatched month ${r} in Chinese year ${n}`);return a=o.monthIndex,{year:n,month:a,day:s,era:void 0,eraYear:d,monthCode:e}}if(this.validateCalendarDate(e),void 0===n&&(n=d),void 0===d&&(d=n),void 0===a){const e=this.getMonthList(n,t);let o=l.replace("L","bis").slice(1);"0"===o[0]&&(o=o.slice(1));let i=e[o];if(a=i&&i.monthIndex,void 0===a&&l.endsWith("L")&&"M13L"!=l&&"constrain"===r){let t=l.slice(1,-1);"0"===t[0]&&(t=t.slice(1)),i=e[t],i&&(a=i.monthIndex,l=buildMonthCode(t));}if(void 0===a)throw new RangeError(`Unmatched month ${l} in Chinese year ${n}`)}else if(void 0===l){const e=this.getMonthList(n,t),o=wt(e),i=o.length;"reject"===r?(RejectToRange(a,1,i),RejectToRange(s,1,this.maximumMonthLength())):(a=ConstrainToRange(a,1,i),s=ConstrainToRange(s,1,this.maximumMonthLength()));const d=o.find((([,e])=>e.monthIndex===a));if(void 0===d)throw new RangeError(`Invalid month ${a} in Chinese year ${n}`);l=buildMonthCode(d[0].replace("bis",""),-1!==d[0].indexOf("bis"));}else {const e=this.getMonthList(n,t);let r=l.replace("L","bis").slice(1);"0"===r[0]&&(r=r.slice(1));const o=e[r];if(!o)throw new RangeError(`Unmatched monthCode ${l} in Chinese year ${n}`);if(a!==o.monthIndex)throw new RangeError(`monthCode ${l} doesn't correspond to month ${a} in Chinese year ${n}`)}return {...e,year:n,eraYear:d,month:a,monthCode:l,day:s}}}class ChineseHelper extends ChineseBaseHelper{constructor(){super(...arguments),this.id="chinese";}}class DangiHelper extends ChineseBaseHelper{constructor(){super(...arguments),this.id="dangi";}}class NonIsoCalendar{constructor(e){this.helper=e;}dateFromFields(e,t,r){const o=new OneObjectCache,n=PrepareTemporalFields(e,this.fields(["day","month","monthCode","year"]),[]),a=ToTemporalOverflow(t),{year:i,month:s,day:l}=this.helper.calendarToIsoDate(n,a,o),d=CreateTemporalDate(i,s,l,r);return o.setObject(d),d}yearMonthFromFields(e,t,r){const o=new OneObjectCache,n=PrepareTemporalFields(e,this.fields(["month","monthCode","year"]),[]),a=ToTemporalOverflow(t),{year:i,month:s,day:l}=this.helper.calendarToIsoDate({...n,day:1},a,o),d=CreateTemporalYearMonth(i,s,r,l);return o.setObject(d),d}monthDayFromFields(e,t,r){const o=new OneObjectCache,n=PrepareTemporalFields(e,this.fields(["day","month","monthCode","year"]),[]),a=ToTemporalOverflow(t),{year:i,month:s,day:l}=this.helper.monthDayFromFields(n,a,o),d=CreateTemporalMonthDay(s,l,r,i);return o.setObject(d),d}fields(e){let t=e;return Tt.call(t,"year")&&(t=[...t,"era","eraYear"]),t}fieldKeysToIgnore(e){const t=new Dt;for(let r=0;r<e.length;r++){const o=e[r];switch(Call(vt,t,[o]),o){case"era":Call(vt,t,["eraYear"]),Call(vt,t,["year"]);break;case"eraYear":Call(vt,t,["era"]),Call(vt,t,["year"]);break;case"year":Call(vt,t,["era"]),Call(vt,t,["eraYear"]);break;case"month":Call(vt,t,["monthCode"]),this.helper.erasBeginMidYear&&(Call(vt,t,["era"]),Call(vt,t,["eraYear"]));break;case"monthCode":Call(vt,t,["month"]),this.helper.erasBeginMidYear&&(Call(vt,t,["era"]),Call(vt,t,["eraYear"]));break;case"day":this.helper.erasBeginMidYear&&(Call(vt,t,["era"]),Call(vt,t,["eraYear"]));}}return [...Call(Ct,t,[])]}dateAdd(e,t,r,o,n,a,i){const s=OneObjectCache.getCacheForObject(e),l=this.helper.temporalToCalendarDate(e,s),d=this.helper.addCalendar(l,{years:t,months:r,weeks:o,days:n},a,s),m=this.helper.calendarToIsoDate(d,"constrain",s),{year:c,month:h,day:u}=m,T=CreateTemporalDate(c,h,u,i);return new OneObjectCache(s).setObject(T),T}dateUntil(e,t,r){const o=OneObjectCache.getCacheForObject(e),n=OneObjectCache.getCacheForObject(t),a=this.helper.temporalToCalendarDate(e,o),i=this.helper.temporalToCalendarDate(t,n);return this.helper.untilCalendar(a,i,r,o)}year(e){const t=OneObjectCache.getCacheForObject(e);return this.helper.temporalToCalendarDate(e,t).year}month(e){const t=OneObjectCache.getCacheForObject(e);return this.helper.temporalToCalendarDate(e,t).month}day(e){const t=OneObjectCache.getCacheForObject(e);return this.helper.temporalToCalendarDate(e,t).day}era(e){if(!this.helper.hasEra)return;const t=OneObjectCache.getCacheForObject(e);return this.helper.temporalToCalendarDate(e,t).era}eraYear(e){if(!this.helper.hasEra)return;const t=OneObjectCache.getCacheForObject(e);return this.helper.temporalToCalendarDate(e,t).eraYear}monthCode(e){const t=OneObjectCache.getCacheForObject(e);return this.helper.temporalToCalendarDate(e,t).monthCode}dayOfWeek(e){return Ot.iso8601.dayOfWeek(e)}dayOfYear(e){const t=OneObjectCache.getCacheForObject(e),r=this.helper.isoToCalendarDate(e,t),o=this.helper.startOfCalendarYear(r);return this.helper.calendarDaysUntil(o,r,t)+1}weekOfYear(e){return Ot.iso8601.weekOfYear(e)}yearOfWeek(e){return Ot.iso8601.yearOfWeek(e)}daysInWeek(e){return Ot.iso8601.daysInWeek(e)}daysInMonth(e){const t=OneObjectCache.getCacheForObject(e),r=this.helper.temporalToCalendarDate(e,t),o=this.helper.maximumMonthLength(r);if(o===this.helper.minimumMonthLength(r))return o;const n=this.helper.startOfCalendarMonth(r),a=this.helper.addMonthsCalendar(n,1,"constrain",t);return this.helper.calendarDaysUntil(n,a,t)}daysInYear(e){let t=e;HasSlot(t,i$2)||(t=ToTemporalDate(t));const r=OneObjectCache.getCacheForObject(t),o=this.helper.temporalToCalendarDate(t,r),n=this.helper.startOfCalendarYear(o),a=this.helper.addCalendar(n,{years:1},"constrain",r);return this.helper.calendarDaysUntil(n,a,r)}monthsInYear(e){const t=OneObjectCache.getCacheForObject(e),r=this.helper.temporalToCalendarDate(e,t);return this.helper.monthsInYear(r,t)}inLeapYear(e){let t=e;HasSlot(t,i$2)||(t=ToTemporalDate(t));const r=OneObjectCache.getCacheForObject(t),o=this.helper.temporalToCalendarDate(t,r);return this.helper.inLeapYear(o,r)}}for(const e of [HebrewHelper,PersianHelper,EthiopicHelper,EthioaaHelper,CopticHelper,ChineseHelper,DangiHelper,RocHelper,IndianHelper,BuddhistHelper,GregoryHelper,JapaneseHelper,IslamicHelper,IslamicUmalquraHelper,IslamicTblaHelper,IslamicCivilHelper,IslamicRgsaHelper,IslamicCcHelper]){const t=new e;Ot[t.id]=new NonIsoCalendar(t);}class PlainDate{constructor(e,t,r,o="iso8601"){CreateTemporalDateSlots(this,ToIntegerWithTruncation(e),ToIntegerWithTruncation(t),ToIntegerWithTruncation(r),ToTemporalCalendarSlotValue(o));}get calendarId(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return ToTemporalCalendarIdentifier(GetSlot(this,p$1))}get era(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarEra(GetSlot(this,p$1),this)}get eraYear(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarEraYear(GetSlot(this,p$1),this)}get year(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarYear(GetSlot(this,p$1),this)}get month(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarMonth(GetSlot(this,p$1),this)}get monthCode(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarMonthCode(GetSlot(this,p$1),this)}get day(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarDay(GetSlot(this,p$1),this)}get dayOfWeek(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarDayOfWeek(GetSlot(this,p$1),this)}get dayOfYear(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarDayOfYear(GetSlot(this,p$1),this)}get weekOfYear(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarWeekOfYear(GetSlot(this,p$1),this)}get yearOfWeek(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarYearOfWeek(GetSlot(this,p$1),this)}get daysInWeek(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarDaysInWeek(GetSlot(this,p$1),this)}get daysInMonth(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarDaysInMonth(GetSlot(this,p$1),this)}get daysInYear(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarDaysInYear(GetSlot(this,p$1),this)}get monthsInYear(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarMonthsInYear(GetSlot(this,p$1),this)}get inLeapYear(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return CalendarInLeapYear(GetSlot(this,p$1),this)}with(e,t){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");if(!IsObject(e))throw new TypeError("invalid argument");RejectTemporalLikeObject(e);const r=GetOptionsObject(t),o=GetSlot(this,p$1),n=CalendarFields(o,["day","month","monthCode","year"]);let a=PrepareTemporalFields(this,n,[]);return a=CalendarMergeFields(o,a,PrepareTemporalFields(e,n,"partial")),a=PrepareTemporalFields(a,n,[]),CalendarDateFromFields(o,a,r)}withCalendar(e){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");const t=ToTemporalCalendarSlotValue(e);return new PlainDate(GetSlot(this,i$2),GetSlot(this,s$2),GetSlot(this,l$2),t)}add(e,t){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");const r=ToTemporalDuration(e),o=GetOptionsObject(t);return CalendarDateAdd(GetSlot(this,p$1),this,r,o)}subtract(e,t){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");const r=CreateNegatedTemporalDuration(ToTemporalDuration(e)),o=GetOptionsObject(t);return CalendarDateAdd(GetSlot(this,p$1),this,r,o)}until(e,t){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return DifferenceTemporalPlainDate("until",this,e,t)}since(e,t){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return DifferenceTemporalPlainDate("since",this,e,t)}equals(e){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");const t=ToTemporalDate(e);for(const e of [i$2,s$2,l$2]){if(GetSlot(this,e)!==GetSlot(t,e))return !1}return CalendarEquals(GetSlot(this,p$1),GetSlot(t,p$1))}toString(e){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return TemporalDateToString(this,ToCalendarNameOption(GetOptionsObject(e)))}toJSON(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return TemporalDateToString(this)}toLocaleString(e,t){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return new ht(e,t).format(this)}valueOf(){throw new TypeError("use compare() or equals() to compare Temporal.PlainDate")}toPlainDateTime(e){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");const t=GetSlot(this,i$2),r=GetSlot(this,s$2),o=GetSlot(this,l$2),n=GetSlot(this,p$1);if(void 0===e)return CreateTemporalDateTime(t,r,o,0,0,0,0,0,0,n);const a=ToTemporalTime(e);return CreateTemporalDateTime(t,r,o,GetSlot(a,d$2),GetSlot(a,m$2),GetSlot(a,c$2),GetSlot(a,h$1),GetSlot(a,u$2),GetSlot(a,T$2),n)}toZonedDateTime(e){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");let t,r;if(IsObject(e))if(IsTemporalTimeZone(e))t=e;else {const o=e.timeZone;void 0===o?t=ToTemporalTimeZoneSlotValue(e):(t=ToTemporalTimeZoneSlotValue(o),r=e.plainTime);}else t=ToTemporalTimeZoneSlotValue(e);const o=GetSlot(this,i$2),a=GetSlot(this,s$2),f=GetSlot(this,l$2),y=GetSlot(this,p$1);let I=0,S=0,g=0,w=0,D=0,G=0;void 0!==r&&(r=ToTemporalTime(r),I=GetSlot(r,d$2),S=GetSlot(r,m$2),g=GetSlot(r,c$2),w=GetSlot(r,h$1),D=GetSlot(r,u$2),G=GetSlot(r,T$2));return CreateTemporalZonedDateTime(GetSlot(GetInstantFor(t,CreateTemporalDateTime(o,a,f,I,S,g,w,D,G,y),"compatible"),n$1),t,y)}toPlainYearMonth(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");const e=GetSlot(this,p$1);return CalendarYearMonthFromFields(e,PrepareTemporalFields(this,CalendarFields(e,["monthCode","year"]),[]))}toPlainMonthDay(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");const e=GetSlot(this,p$1);return CalendarMonthDayFromFields(e,PrepareTemporalFields(this,CalendarFields(e,["day","monthCode"]),[]))}getISOFields(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return {calendar:GetSlot(this,p$1),isoDay:GetSlot(this,l$2),isoMonth:GetSlot(this,s$2),isoYear:GetSlot(this,i$2)}}getCalendar(){if(!IsTemporalDate(this))throw new TypeError("invalid receiver");return ToTemporalCalendarObject(GetSlot(this,p$1))}static from(e,t){const r=GetOptionsObject(t);return IsTemporalDate(e)?(ToTemporalOverflow(r),CreateTemporalDate(GetSlot(e,i$2),GetSlot(e,s$2),GetSlot(e,l$2),GetSlot(e,p$1))):ToTemporalDate(e,r)}static compare(e,t){const r=ToTemporalDate(e),o=ToTemporalDate(t);return CompareISODate(GetSlot(r,i$2),GetSlot(r,s$2),GetSlot(r,l$2),GetSlot(o,i$2),GetSlot(o,s$2),GetSlot(o,l$2))}}MakeIntrinsicClass(PlainDate,"Temporal.PlainDate");class PlainDateTime{constructor(e,t,r,o=0,n=0,a=0,i=0,s=0,l=0,d="iso8601"){CreateTemporalDateTimeSlots(this,ToIntegerWithTruncation(e),ToIntegerWithTruncation(t),ToIntegerWithTruncation(r),void 0===o?0:ToIntegerWithTruncation(o),void 0===n?0:ToIntegerWithTruncation(n),void 0===a?0:ToIntegerWithTruncation(a),void 0===i?0:ToIntegerWithTruncation(i),void 0===s?0:ToIntegerWithTruncation(s),void 0===l?0:ToIntegerWithTruncation(l),ToTemporalCalendarSlotValue(d));}get calendarId(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return ToTemporalCalendarIdentifier(GetSlot(this,p$1))}get year(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarYear(GetSlot(this,p$1),this)}get month(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarMonth(GetSlot(this,p$1),this)}get monthCode(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarMonthCode(GetSlot(this,p$1),this)}get day(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarDay(GetSlot(this,p$1),this)}get hour(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return GetSlot(this,d$2)}get minute(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return GetSlot(this,m$2)}get second(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return GetSlot(this,c$2)}get millisecond(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return GetSlot(this,h$1)}get microsecond(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return GetSlot(this,u$2)}get nanosecond(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return GetSlot(this,T$2)}get era(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarEra(GetSlot(this,p$1),this)}get eraYear(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarEraYear(GetSlot(this,p$1),this)}get dayOfWeek(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarDayOfWeek(GetSlot(this,p$1),this)}get dayOfYear(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarDayOfYear(GetSlot(this,p$1),this)}get weekOfYear(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarWeekOfYear(GetSlot(this,p$1),this)}get yearOfWeek(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarYearOfWeek(GetSlot(this,p$1),this)}get daysInWeek(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarDaysInWeek(GetSlot(this,p$1),this)}get daysInYear(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarDaysInYear(GetSlot(this,p$1),this)}get daysInMonth(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarDaysInMonth(GetSlot(this,p$1),this)}get monthsInYear(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarMonthsInYear(GetSlot(this,p$1),this)}get inLeapYear(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return CalendarInLeapYear(GetSlot(this,p$1),this)}with(e,t){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");if(!IsObject(e))throw new TypeError("invalid argument");RejectTemporalLikeObject(e);const r=GetOptionsObject(t),o=GetSlot(this,p$1),n=CalendarFields(o,["day","hour","microsecond","millisecond","minute","month","monthCode","nanosecond","second","year"]);let a=PrepareTemporalFields(this,n,[]);a=CalendarMergeFields(o,a,PrepareTemporalFields(e,n,"partial")),a=PrepareTemporalFields(a,n,[]);const{year:i,month:s,day:l,hour:d,minute:m,second:c,millisecond:h,microsecond:u,nanosecond:T}=InterpretTemporalDateTimeFields(o,a,r);return CreateTemporalDateTime(i,s,l,d,m,c,h,u,T,o)}withPlainTime(e){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");const t=GetSlot(this,i$2),r=GetSlot(this,s$2),o=GetSlot(this,l$2),n=GetSlot(this,p$1);if(void 0===e)return CreateTemporalDateTime(t,r,o,0,0,0,0,0,0,n);const a=ToTemporalTime(e);return CreateTemporalDateTime(t,r,o,GetSlot(a,d$2),GetSlot(a,m$2),GetSlot(a,c$2),GetSlot(a,h$1),GetSlot(a,u$2),GetSlot(a,T$2),n)}withPlainDate(e){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");const t=ToTemporalDate(e),r=GetSlot(t,i$2),o=GetSlot(t,s$2),n=GetSlot(t,l$2);let a=GetSlot(t,p$1);const f=GetSlot(this,d$2),y=GetSlot(this,m$2),I=GetSlot(this,c$2),S=GetSlot(this,h$1),g=GetSlot(this,u$2),w=GetSlot(this,T$2);return a=ConsolidateCalendars(GetSlot(this,p$1),a),CreateTemporalDateTime(r,o,n,f,y,I,S,g,w,a)}withCalendar(e){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");const t=ToTemporalCalendarSlotValue(e);return new PlainDateTime(GetSlot(this,i$2),GetSlot(this,s$2),GetSlot(this,l$2),GetSlot(this,d$2),GetSlot(this,m$2),GetSlot(this,c$2),GetSlot(this,h$1),GetSlot(this,u$2),GetSlot(this,T$2),t)}add(e,t){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return AddDurationToOrSubtractDurationFromPlainDateTime("add",this,e,t)}subtract(e,t){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return AddDurationToOrSubtractDurationFromPlainDateTime("subtract",this,e,t)}until(e,t){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return DifferenceTemporalPlainDateTime("until",this,e,t)}since(e,t){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return DifferenceTemporalPlainDateTime("since",this,e,t)}round(e){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");if(void 0===e)throw new TypeError("options parameter is required");const t="string"==typeof e?CreateOnePropObject("smallestUnit",e):GetOptionsObject(e),r=ToTemporalRoundingIncrement(t),o=ToTemporalRoundingMode(t,"halfExpand"),n=GetTemporalUnit(t,"smallestUnit","time",He,["day"]),a={day:1,hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[n];ValidateTemporalRoundingIncrement(r,a,1===a);let f=GetSlot(this,i$2),y=GetSlot(this,s$2),I=GetSlot(this,l$2),S=GetSlot(this,d$2),g=GetSlot(this,m$2),w=GetSlot(this,c$2),D=GetSlot(this,h$1),G=GetSlot(this,u$2),v=GetSlot(this,T$2);return ({year:f,month:y,day:I,hour:S,minute:g,second:w,millisecond:D,microsecond:G,nanosecond:v}=RoundISODateTime(f,y,I,S,g,w,D,G,v,r,n,o)),CreateTemporalDateTime(f,y,I,S,g,w,D,G,v,GetSlot(this,p$1))}equals(e){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");const t=ToTemporalDateTime(e);for(const e of [i$2,s$2,l$2,d$2,m$2,c$2,h$1,u$2,T$2]){if(GetSlot(this,e)!==GetSlot(t,e))return !1}return CalendarEquals(GetSlot(this,p$1),GetSlot(t,p$1))}toString(e){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");const t=GetOptionsObject(e),r=ToCalendarNameOption(t),o=ToFractionalSecondDigits(t),n=ToTemporalRoundingMode(t,"trunc"),a=GetTemporalUnit(t,"smallestUnit","time",void 0);if("hour"===a)throw new RangeError('smallestUnit must be a time unit other than "hour"');const{precision:i,unit:s,increment:l}=ToSecondsStringPrecisionRecord(a,o);return TemporalDateTimeToString(this,i,r,{unit:s,increment:l,roundingMode:n})}toJSON(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return TemporalDateTimeToString(this,"auto")}toLocaleString(e,t){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return new ht(e,t).format(this)}valueOf(){throw new TypeError("use compare() or equals() to compare Temporal.PlainDateTime")}toZonedDateTime(e,t){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");const r=ToTemporalTimeZoneSlotValue(e);return CreateTemporalZonedDateTime(GetSlot(GetInstantFor(r,this,ToTemporalDisambiguation(GetOptionsObject(t))),n$1),r,GetSlot(this,p$1))}toPlainDate(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return TemporalDateTimeToDate(this)}toPlainYearMonth(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");const e=GetSlot(this,p$1);return CalendarYearMonthFromFields(e,PrepareTemporalFields(this,CalendarFields(e,["monthCode","year"]),[]))}toPlainMonthDay(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");const e=GetSlot(this,p$1);return CalendarMonthDayFromFields(e,PrepareTemporalFields(this,CalendarFields(e,["day","monthCode"]),[]))}toPlainTime(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return TemporalDateTimeToTime(this)}getISOFields(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return {calendar:GetSlot(this,p$1),isoDay:GetSlot(this,l$2),isoHour:GetSlot(this,d$2),isoMicrosecond:GetSlot(this,u$2),isoMillisecond:GetSlot(this,h$1),isoMinute:GetSlot(this,m$2),isoMonth:GetSlot(this,s$2),isoNanosecond:GetSlot(this,T$2),isoSecond:GetSlot(this,c$2),isoYear:GetSlot(this,i$2)}}getCalendar(){if(!IsTemporalDateTime(this))throw new TypeError("invalid receiver");return ToTemporalCalendarObject(GetSlot(this,p$1))}static from(e,t){const r=GetOptionsObject(t);return IsTemporalDateTime(e)?(ToTemporalOverflow(r),CreateTemporalDateTime(GetSlot(e,i$2),GetSlot(e,s$2),GetSlot(e,l$2),GetSlot(e,d$2),GetSlot(e,m$2),GetSlot(e,c$2),GetSlot(e,h$1),GetSlot(e,u$2),GetSlot(e,T$2),GetSlot(e,p$1))):ToTemporalDateTime(e,r)}static compare(e,t){const r=ToTemporalDateTime(e),o=ToTemporalDateTime(t);for(const e of [i$2,s$2,l$2,d$2,m$2,c$2,h$1,u$2,T$2]){const t=GetSlot(r,e),n=GetSlot(o,e);if(t!==n)return ComparisonResult(t-n)}return 0}}MakeIntrinsicClass(PlainDateTime,"Temporal.PlainDateTime");class Duration{constructor(e=0,t=0,r=0,o=0,n=0,a=0,i=0,s=0,l=0,d=0){const m=void 0===e?0:ToIntegerIfIntegral(e),c=void 0===t?0:ToIntegerIfIntegral(t),h=void 0===r?0:ToIntegerIfIntegral(r),u=void 0===o?0:ToIntegerIfIntegral(o),T=void 0===n?0:ToIntegerIfIntegral(n),p=void 0===a?0:ToIntegerIfIntegral(a),f=void 0===i?0:ToIntegerIfIntegral(i),y=void 0===s?0:ToIntegerIfIntegral(s),I=void 0===l?0:ToIntegerIfIntegral(l),S=void 0===d?0:ToIntegerIfIntegral(d);RejectDuration(m,c,h,u,T,p,f,y,I,S),N$1(this),SetSlot(this,w$2,m),SetSlot(this,D$1,c),SetSlot(this,G,h),SetSlot(this,v$2,u),SetSlot(this,C$2,T),SetSlot(this,O$2,p),SetSlot(this,b,f),SetSlot(this,E$1,y),SetSlot(this,M$2,I),SetSlot(this,R$1,S);}get years(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return GetSlot(this,w$2)}get months(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return GetSlot(this,D$1)}get weeks(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return GetSlot(this,G)}get days(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return GetSlot(this,v$2)}get hours(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return GetSlot(this,C$2)}get minutes(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return GetSlot(this,O$2)}get seconds(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return GetSlot(this,b)}get milliseconds(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return GetSlot(this,E$1)}get microseconds(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return GetSlot(this,M$2)}get nanoseconds(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return GetSlot(this,R$1)}get sign(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return DurationSign(GetSlot(this,w$2),GetSlot(this,D$1),GetSlot(this,G),GetSlot(this,v$2),GetSlot(this,C$2),GetSlot(this,O$2),GetSlot(this,b),GetSlot(this,E$1),GetSlot(this,M$2),GetSlot(this,R$1))}get blank(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return 0===DurationSign(GetSlot(this,w$2),GetSlot(this,D$1),GetSlot(this,G),GetSlot(this,v$2),GetSlot(this,C$2),GetSlot(this,O$2),GetSlot(this,b),GetSlot(this,E$1),GetSlot(this,M$2),GetSlot(this,R$1))}with(e){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");const t=PrepareTemporalFields(e,["days","hours","microseconds","milliseconds","minutes","months","nanoseconds","seconds","weeks","years"],"partial"),{years:r=GetSlot(this,w$2),months:o=GetSlot(this,D$1),weeks:n=GetSlot(this,G),days:a=GetSlot(this,v$2),hours:i=GetSlot(this,C$2),minutes:s=GetSlot(this,O$2),seconds:l=GetSlot(this,b),milliseconds:d=GetSlot(this,E$1),microseconds:m=GetSlot(this,M$2),nanoseconds:c=GetSlot(this,R$1)}=t;return new Duration(r,o,n,a,i,s,l,d,m,c)}negated(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return CreateNegatedTemporalDuration(this)}abs(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return new Duration(Math.abs(GetSlot(this,w$2)),Math.abs(GetSlot(this,D$1)),Math.abs(GetSlot(this,G)),Math.abs(GetSlot(this,v$2)),Math.abs(GetSlot(this,C$2)),Math.abs(GetSlot(this,O$2)),Math.abs(GetSlot(this,b)),Math.abs(GetSlot(this,E$1)),Math.abs(GetSlot(this,M$2)),Math.abs(GetSlot(this,R$1)))}add(e,t){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return AddDurationToOrSubtractDurationFromDuration("add",this,e,t)}subtract(e,t){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return AddDurationToOrSubtractDurationFromDuration("subtract",this,e,t)}round(t){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");if(void 0===t)throw new TypeError("options parameter is required");let r=GetSlot(this,w$2),o=GetSlot(this,D$1),n=GetSlot(this,G),a=GetSlot(this,v$2),i=GetSlot(this,C$2),s=GetSlot(this,O$2),l=GetSlot(this,b),d=GetSlot(this,E$1),m=GetSlot(this,M$2),c=GetSlot(this,R$1),h=DefaultTemporalLargestUnit(r,o,n,a,i,s,l,d,m,c);const u="string"==typeof t?CreateOnePropObject("smallestUnit",t):GetOptionsObject(t);let T=GetTemporalUnit(u,"largestUnit","datetime",void 0,["auto"]),f=ToRelativeTemporalObject(u);const y=ToTemporalRoundingIncrement(u),I=ToTemporalRoundingMode(u,"halfExpand");let S=GetTemporalUnit(u,"smallestUnit","datetime",void 0),g=!0;S||(g=!1,S="nanosecond"),h=LargerOfTwoTemporalUnits(h,S);let F=!0;if(T||(F=!1,T=h),"auto"===T&&(T=h),!g&&!F)throw new RangeError("at least one of smallestUnit or largestUnit is required");if(LargerOfTwoTemporalUnits(T,S)!==T)throw new RangeError(`largestUnit ${T} cannot be smaller than smallestUnit ${S}`);const Y={hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[S];return void 0!==Y&&ValidateTemporalRoundingIncrement(y,Y,!1),({years:r,months:o,weeks:n,days:a}=UnbalanceDurationRelative(r,o,n,a,T,f)),({years:r,months:o,weeks:n,days:a,hours:i,minutes:s,seconds:l,milliseconds:d,microseconds:m,nanoseconds:c}=RoundDuration(r,o,n,a,i,s,l,d,m,c,y,S,I,f)),({years:r,months:o,weeks:n,days:a,hours:i,minutes:s,seconds:l,milliseconds:d,microseconds:m,nanoseconds:c}=AdjustRoundedDurationDays(r,o,n,a,i,s,l,d,m,c,y,S,I,f)),({days:a,hours:i,minutes:s,seconds:l,milliseconds:d,microseconds:m,nanoseconds:c}=BalanceDuration(a,i,s,l,d,m,c,T,f)),({years:r,months:o,weeks:n,days:a}=function BalanceDurationRelative(t,r,o,n,a,i){const s=GetIntrinsic("%Temporal.Duration%"),l=DurationSign(t,r,o,n,0,0,0,0,0,0);if(0===l)return {years:t,months:r,weeks:o,days:n};const d=JSBI.BigInt(l);let m,c,h=JSBI.BigInt(t),u=JSBI.BigInt(r),T=JSBI.BigInt(o),f=JSBI.BigInt(n);i&&(c=ToTemporalDate(i),m=GetSlot(c,p$1));const y=new s(l),I=new s(0,l),S=new s(0,0,l);switch(a){case"year":{if(!m)throw new RangeError("a starting point is required for years balancing");const t="string"!=typeof m?GetMethod(m,"dateAdd"):void 0;let r,o,n;for(({relativeTo:r,days:o}=MoveRelativeDate(m,c,y,t));JSBI.greaterThanOrEqual(abs(f),JSBI.BigInt(ae(o)));)f=JSBI.subtract(f,JSBI.BigInt(o)),h=JSBI.add(h,d),c=r,({relativeTo:r,days:o}=MoveRelativeDate(m,c,y,t));for(({relativeTo:r,days:n}=MoveRelativeDate(m,c,I,t));JSBI.greaterThanOrEqual(abs(f),JSBI.BigInt(ae(n)));)f=JSBI.subtract(f,JSBI.BigInt(n)),u=JSBI.add(u,d),c=r,({relativeTo:r,days:n}=MoveRelativeDate(m,c,I,t));r=CalendarDateAdd(m,c,y,void 0,t);const a="string"!=typeof m?GetMethod(m,"dateUntil"):void 0,i=Te(null);i.largestUnit="month";let s=CalendarDateUntil(m,c,r,i,a),l=GetSlot(s,D$1);for(;JSBI.greaterThanOrEqual(abs(u),JSBI.BigInt(ae(l)));){u=JSBI.subtract(u,JSBI.BigInt(l)),h=JSBI.add(h,d),c=r,r=CalendarDateAdd(m,c,y,void 0,t);const o=Te(null);o.largestUnit="month",s=CalendarDateUntil(m,c,r,o,a),l=GetSlot(s,D$1);}break}case"month":{if(!m)throw new RangeError("a starting point is required for months balancing");const t="string"!=typeof m?GetMethod(m,"dateAdd"):void 0;let r,o;for(({relativeTo:r,days:o}=MoveRelativeDate(m,c,I,t));JSBI.greaterThanOrEqual(abs(f),JSBI.BigInt(ae(o)));)f=JSBI.subtract(f,JSBI.BigInt(o)),u=JSBI.add(u,d),c=r,({relativeTo:r,days:o}=MoveRelativeDate(m,c,I,t));break}case"week":{if(!m)throw new RangeError("a starting point is required for weeks balancing");const t="string"!=typeof m?GetMethod(m,"dateAdd"):void 0;let r,o;for(({relativeTo:r,days:o}=MoveRelativeDate(m,c,S,t));JSBI.greaterThanOrEqual(abs(f),JSBI.BigInt(ae(o)));)f=JSBI.subtract(f,JSBI.BigInt(o)),T=JSBI.add(T,d),c=r,({relativeTo:r,days:o}=MoveRelativeDate(m,c,S,t));break}}return {years:JSBI.toNumber(h),months:JSBI.toNumber(u),weeks:JSBI.toNumber(T),days:JSBI.toNumber(f)}}(r,o,n,a,T,f)),new Duration(r,o,n,a,i,s,l,d,m,c)}total(e){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");let t=GetSlot(this,w$2),r=GetSlot(this,D$1),o=GetSlot(this,G),n=GetSlot(this,v$2),a=GetSlot(this,C$2),i=GetSlot(this,O$2),s=GetSlot(this,b),l=GetSlot(this,E$1),d=GetSlot(this,M$2),m=GetSlot(this,R$1);if(void 0===e)throw new TypeError("options argument is required");const c="string"==typeof e?CreateOnePropObject("unit",e):GetOptionsObject(e),h=ToRelativeTemporalObject(c),u=GetTemporalUnit(c,"unit","datetime",He);let T;(({years:t,months:r,weeks:o,days:n}=UnbalanceDurationRelative(t,r,o,n,u,h))),IsTemporalZonedDateTime(h)&&(T=MoveRelativeZonedDateTime(h,t,r,o,0));let p=BalancePossiblyInfiniteDuration(n,a,i,s,l,d,m,u,T);if("positive overflow"===p)return 1/0;if("negative overflow"===p)return -1/0;({days:n,hours:a,minutes:i,seconds:s,milliseconds:l,microseconds:d,nanoseconds:m}=p);const{total:f}=RoundDuration(t,r,o,n,a,i,s,l,d,m,1,u,"trunc",h);return f}toString(e){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");const t=GetOptionsObject(e),r=ToFractionalSecondDigits(t),o=ToTemporalRoundingMode(t,"trunc"),n=GetTemporalUnit(t,"smallestUnit","time",void 0);if("hour"===n||"minute"===n)throw new RangeError('smallestUnit must be a time unit other than "hours" or "minutes"');const{precision:a,unit:i,increment:s}=ToSecondsStringPrecisionRecord(n,r);return TemporalDurationToString(this,a,{unit:i,increment:s,roundingMode:o})}toJSON(){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return TemporalDurationToString(this)}toLocaleString(e,t){if(!IsTemporalDuration(this))throw new TypeError("invalid receiver");return "undefined"!=typeof Intl&&void 0!==Intl.DurationFormat?new Intl.DurationFormat(e,t).format(this):(console.warn("Temporal.Duration.prototype.toLocaleString() requires Intl.DurationFormat."),TemporalDurationToString(this))}valueOf(){throw new TypeError("use compare() to compare Temporal.Duration")}static from(e){return IsTemporalDuration(e)?new Duration(GetSlot(e,w$2),GetSlot(e,D$1),GetSlot(e,G),GetSlot(e,v$2),GetSlot(e,C$2),GetSlot(e,O$2),GetSlot(e,b),GetSlot(e,E$1),GetSlot(e,M$2),GetSlot(e,R$1)):ToTemporalDuration(e)}static compare(t,r,o){const n=ToTemporalDuration(t),a=ToTemporalDuration(r),i=ToRelativeTemporalObject(GetOptionsObject(o)),s=GetSlot(n,w$2),l=GetSlot(n,D$1),d=GetSlot(n,G);let m=GetSlot(n,v$2);const c=GetSlot(n,C$2),h=GetSlot(n,O$2),u=GetSlot(n,b),T=GetSlot(n,E$1),p=GetSlot(n,M$2);let f=GetSlot(n,R$1);const y=GetSlot(a,w$2),I=GetSlot(a,D$1),S=GetSlot(a,G);let g=GetSlot(a,v$2);const F=GetSlot(a,C$2),Y=GetSlot(a,O$2),P=GetSlot(a,b),Z=GetSlot(a,E$1),B=GetSlot(a,M$2);let N=GetSlot(a,R$1);const j=CalculateOffsetShift(i,s,l,d,m),$=CalculateOffsetShift(i,y,I,S,g);0===s&&0===y&&0===l&&0===I&&0===d&&0===S||(({days:m}=UnbalanceDurationRelative(s,l,d,m,"day",i)),({days:g}=UnbalanceDurationRelative(y,I,S,g,"day",i)));const k=TotalDurationNanoseconds(m,c,h,u,T,p,f,j),U=TotalDurationNanoseconds(g,F,Y,P,Z,B,N,$);return ComparisonResult(JSBI.toNumber(JSBI.subtract(k,U)))}}MakeIntrinsicClass(Duration,"Temporal.Duration");const bt=Object.create;class PlainMonthDay{constructor(e,t,r="iso8601",o=1972){CreateTemporalMonthDaySlots(this,ToIntegerWithTruncation(e),ToIntegerWithTruncation(t),ToTemporalCalendarSlotValue(r),ToIntegerWithTruncation(o));}get monthCode(){if(!IsTemporalMonthDay(this))throw new TypeError("invalid receiver");return CalendarMonthCode(GetSlot(this,p$1),this)}get day(){if(!IsTemporalMonthDay(this))throw new TypeError("invalid receiver");return CalendarDay(GetSlot(this,p$1),this)}get calendarId(){if(!IsTemporalMonthDay(this))throw new TypeError("invalid receiver");return ToTemporalCalendarIdentifier(GetSlot(this,p$1))}with(e,t){if(!IsTemporalMonthDay(this))throw new TypeError("invalid receiver");if(!IsObject(e))throw new TypeError("invalid argument");RejectTemporalLikeObject(e);const r=GetOptionsObject(t),o=GetSlot(this,p$1),n=CalendarFields(o,["day","month","monthCode","year"]);let a=PrepareTemporalFields(this,n,[]);return a=CalendarMergeFields(o,a,PrepareTemporalFields(e,n,"partial")),a=PrepareTemporalFields(a,n,[]),CalendarMonthDayFromFields(o,a,r)}equals(e){if(!IsTemporalMonthDay(this))throw new TypeError("invalid receiver");const t=ToTemporalMonthDay(e);for(const e of [s$2,l$2,i$2]){if(GetSlot(this,e)!==GetSlot(t,e))return !1}return CalendarEquals(GetSlot(this,p$1),GetSlot(t,p$1))}toString(e){if(!IsTemporalMonthDay(this))throw new TypeError("invalid receiver");return TemporalMonthDayToString(this,ToCalendarNameOption(GetOptionsObject(e)))}toJSON(){if(!IsTemporalMonthDay(this))throw new TypeError("invalid receiver");return TemporalMonthDayToString(this)}toLocaleString(e,t){if(!IsTemporalMonthDay(this))throw new TypeError("invalid receiver");return new ht(e,t).format(this)}valueOf(){throw new TypeError("use equals() to compare Temporal.PlainMonthDay")}toPlainDate(e){if(!IsTemporalMonthDay(this))throw new TypeError("invalid receiver");if(!IsObject(e))throw new TypeError("argument should be an object");const t=GetSlot(this,p$1),r=CalendarFields(t,["day","monthCode"]),o=PrepareTemporalFields(this,r,[]),n=CalendarFields(t,["year"]);let a=CalendarMergeFields(t,o,PrepareTemporalFields(e,n,[]));a=PrepareTemporalFields(a,[...new Set([...r,...n])],[]);const i=bt(null);return i.overflow="reject",CalendarDateFromFields(t,a,i)}getISOFields(){if(!IsTemporalMonthDay(this))throw new TypeError("invalid receiver");return {calendar:GetSlot(this,p$1),isoDay:GetSlot(this,l$2),isoMonth:GetSlot(this,s$2),isoYear:GetSlot(this,i$2)}}getCalendar(){if(!IsTemporalMonthDay(this))throw new TypeError("invalid receiver");return ToTemporalCalendarObject(GetSlot(this,p$1))}static from(e,t){const r=GetOptionsObject(t);return IsTemporalMonthDay(e)?(ToTemporalOverflow(r),CreateTemporalMonthDay(GetSlot(e,s$2),GetSlot(e,l$2),GetSlot(e,p$1),GetSlot(e,i$2))):ToTemporalMonthDay(e,r)}}MakeIntrinsicClass(PlainMonthDay,"Temporal.PlainMonthDay");const instant=()=>new(GetIntrinsic("%Temporal.Instant%"))(Ve()),plainDateTime=(e,t=DefaultTimeZone())=>{const r=ToTemporalTimeZoneSlotValue(t),o=ToTemporalCalendarSlotValue(e);return GetPlainDateTimeFor(r,instant(),o)},plainDateTimeISO=(e=DefaultTimeZone())=>GetPlainDateTimeFor(ToTemporalTimeZoneSlotValue(e),instant(),"iso8601"),zonedDateTime=(e,t=DefaultTimeZone())=>{const r=ToTemporalTimeZoneSlotValue(t),o=ToTemporalCalendarSlotValue(e);return CreateTemporalZonedDateTime(Ve(),r,o)},Et={instant,plainDateTime,plainDateTimeISO,plainDate:(e,t=DefaultTimeZone())=>TemporalDateTimeToDate(plainDateTime(e,t)),plainDateISO:(e=DefaultTimeZone())=>TemporalDateTimeToDate(plainDateTimeISO(e)),plainTimeISO:(e=DefaultTimeZone())=>TemporalDateTimeToTime(plainDateTimeISO(e)),timeZoneId:()=>DefaultTimeZone(),zonedDateTime,zonedDateTimeISO:(e=DefaultTimeZone())=>zonedDateTime("iso8601",e),[Symbol.toStringTag]:"Temporal.Now"};Object.defineProperty(Et,Symbol.toStringTag,{value:"Temporal.Now",writable:!1,enumerable:!1,configurable:!0});const Mt=Object.assign;function TemporalTimeToString(e,t,r){let o=GetSlot(e,d$2),n=GetSlot(e,m$2),a=GetSlot(e,c$2),i=GetSlot(e,h$1),s=GetSlot(e,u$2),l=GetSlot(e,T$2);if(r){const{unit:e,increment:t,roundingMode:d}=r;({hour:o,minute:n,second:a,millisecond:i,microsecond:s,nanosecond:l}=RoundTime(o,n,a,i,s,l,t,e,d));}return `${ISODateTimePartString(o)}:${ISODateTimePartString(n)}${FormatSecondsStringPart(a,i,s,l,t)}`}class PlainTime{constructor(e=0,t=0,r=0,o=0,n=0,a=0){const i=void 0===e?0:ToIntegerWithTruncation(e),s=void 0===t?0:ToIntegerWithTruncation(t),l=void 0===r?0:ToIntegerWithTruncation(r),p=void 0===o?0:ToIntegerWithTruncation(o),f=void 0===n?0:ToIntegerWithTruncation(n),y=void 0===a?0:ToIntegerWithTruncation(a);RejectTime(i,s,l,p,f,y),N$1(this),SetSlot(this,d$2,i),SetSlot(this,m$2,s),SetSlot(this,c$2,l),SetSlot(this,h$1,p),SetSlot(this,u$2,f),SetSlot(this,T$2,y);}get hour(){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");return GetSlot(this,d$2)}get minute(){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");return GetSlot(this,m$2)}get second(){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");return GetSlot(this,c$2)}get millisecond(){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");return GetSlot(this,h$1)}get microsecond(){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");return GetSlot(this,u$2)}get nanosecond(){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");return GetSlot(this,T$2)}with(e,t){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");if(!IsObject(e))throw new TypeError("invalid argument");RejectTemporalLikeObject(e);const r=ToTemporalOverflow(GetOptionsObject(t)),o=ToTemporalTimeRecord(e,"partial"),n=ToTemporalTimeRecord(this);let{hour:a,minute:i,second:s,millisecond:l,microsecond:d,nanosecond:m}=Mt(n,o);return ({hour:a,minute:i,second:s,millisecond:l,microsecond:d,nanosecond:m}=RegulateTime(a,i,s,l,d,m,r)),new PlainTime(a,i,s,l,d,m)}add(e){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");return AddDurationToOrSubtractDurationFromPlainTime("add",this,e)}subtract(e){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");return AddDurationToOrSubtractDurationFromPlainTime("subtract",this,e)}until(e,t){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");return DifferenceTemporalPlainTime("until",this,e,t)}since(e,t){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");return DifferenceTemporalPlainTime("since",this,e,t)}round(e){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");if(void 0===e)throw new TypeError("options parameter is required");const t="string"==typeof e?CreateOnePropObject("smallestUnit",e):GetOptionsObject(e),r=ToTemporalRoundingIncrement(t),o=ToTemporalRoundingMode(t,"halfExpand"),n=GetTemporalUnit(t,"smallestUnit","time",He);ValidateTemporalRoundingIncrement(r,{hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[n],!1);let a=GetSlot(this,d$2),i=GetSlot(this,m$2),s=GetSlot(this,c$2),l=GetSlot(this,h$1),p=GetSlot(this,u$2),f=GetSlot(this,T$2);return ({hour:a,minute:i,second:s,millisecond:l,microsecond:p,nanosecond:f}=RoundTime(a,i,s,l,p,f,r,n,o)),new PlainTime(a,i,s,l,p,f)}equals(e){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");const t=ToTemporalTime(e);for(const e of [d$2,m$2,c$2,h$1,u$2,T$2]){if(GetSlot(this,e)!==GetSlot(t,e))return !1}return !0}toString(e){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");const t=GetOptionsObject(e),r=ToFractionalSecondDigits(t),o=ToTemporalRoundingMode(t,"trunc"),n=GetTemporalUnit(t,"smallestUnit","time",void 0);if("hour"===n)throw new RangeError('smallestUnit must be a time unit other than "hour"');const{precision:a,unit:i,increment:s}=ToSecondsStringPrecisionRecord(n,r);return TemporalTimeToString(this,a,{unit:i,increment:s,roundingMode:o})}toJSON(){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");return TemporalTimeToString(this,"auto")}toLocaleString(e,t){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");return new ht(e,t).format(this)}valueOf(){throw new TypeError("use compare() or equals() to compare Temporal.PlainTime")}toPlainDateTime(e){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");const t=ToTemporalDate(e),r=GetSlot(t,i$2),o=GetSlot(t,s$2),n=GetSlot(t,l$2),a=GetSlot(t,p$1);return CreateTemporalDateTime(r,o,n,GetSlot(this,d$2),GetSlot(this,m$2),GetSlot(this,c$2),GetSlot(this,h$1),GetSlot(this,u$2),GetSlot(this,T$2),a)}toZonedDateTime(e){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");if(!IsObject(e))throw new TypeError("invalid argument");const t=e.plainDate;if(void 0===t)throw new TypeError("missing date property");const r=ToTemporalDate(t),o=e.timeZone;if(void 0===o)throw new TypeError("missing timeZone property");const a=ToTemporalTimeZoneSlotValue(o),f=GetSlot(r,i$2),y=GetSlot(r,s$2),I=GetSlot(r,l$2),S=GetSlot(r,p$1),g=GetSlot(this,d$2),w=GetSlot(this,m$2),D=GetSlot(this,c$2),G=GetSlot(this,h$1),v=GetSlot(this,u$2),C=GetSlot(this,T$2);return CreateTemporalZonedDateTime(GetSlot(GetInstantFor(a,new(GetIntrinsic("%Temporal.PlainDateTime%"))(f,y,I,g,w,D,G,v,C,S),"compatible"),n$1),a,S)}getISOFields(){if(!IsTemporalTime(this))throw new TypeError("invalid receiver");return {isoHour:GetSlot(this,d$2),isoMicrosecond:GetSlot(this,u$2),isoMillisecond:GetSlot(this,h$1),isoMinute:GetSlot(this,m$2),isoNanosecond:GetSlot(this,T$2),isoSecond:GetSlot(this,c$2)}}static from(e,t){const r=ToTemporalOverflow(GetOptionsObject(t));return IsTemporalTime(e)?new PlainTime(GetSlot(e,d$2),GetSlot(e,m$2),GetSlot(e,c$2),GetSlot(e,h$1),GetSlot(e,u$2),GetSlot(e,T$2)):ToTemporalTime(e,r)}static compare(e,t){const r=ToTemporalTime(e),o=ToTemporalTime(t);for(const e of [d$2,m$2,c$2,h$1,u$2,T$2]){const t=GetSlot(r,e),n=GetSlot(o,e);if(t!==n)return ComparisonResult(t-n)}return 0}}MakeIntrinsicClass(PlainTime,"Temporal.PlainTime");class TimeZone{constructor(e){if(arguments.length<1)throw new RangeError("missing argument: identifier is required");const t=GetCanonicalTimeZoneIdentifier(e);N$1(this),SetSlot(this,a$1,t);}get id(){if(!IsTemporalTimeZone(this))throw new TypeError("invalid receiver");return GetSlot(this,a$1)}getOffsetNanosecondsFor(e){if(!IsTemporalTimeZone(this))throw new TypeError("invalid receiver");const t=ToTemporalInstant(e),r=GetSlot(this,a$1);return IsTimeZoneOffsetString(r)?ParseTimeZoneOffsetString(r):GetNamedTimeZoneOffsetNanoseconds(r,GetSlot(t,n$1))}getOffsetStringFor(e){if(!IsTemporalTimeZone(this))throw new TypeError("invalid receiver");return GetOffsetStringFor(this,ToTemporalInstant(e))}getPlainDateTimeFor(e,t="iso8601"){if(!IsTemporalTimeZone(this))throw new TypeError("invalid receiver");return GetPlainDateTimeFor(this,ToTemporalInstant(e),ToTemporalCalendarSlotValue(t))}getInstantFor(e,t){if(!IsTemporalTimeZone(this))throw new TypeError("invalid receiver");return GetInstantFor(this,ToTemporalDateTime(e),ToTemporalDisambiguation(GetOptionsObject(t)))}getPossibleInstantsFor(t){if(!IsTemporalTimeZone(this))throw new TypeError("invalid receiver");const r=ToTemporalDateTime(t),o=GetIntrinsic("%Temporal.Instant%"),n=GetSlot(this,a$1);if(IsTimeZoneOffsetString(n)){const t=GetUTCEpochNanoseconds(GetSlot(r,i$2),GetSlot(r,s$2),GetSlot(r,l$2),GetSlot(r,d$2),GetSlot(r,m$2),GetSlot(r,c$2),GetSlot(r,h$1),GetSlot(r,u$2),GetSlot(r,T$2));if(null===t)throw new RangeError("DateTime outside of supported range");const a=ParseTimeZoneOffsetString(n);return [new o(JSBI.subtract(t,JSBI.BigInt(a)))]}const p=function GetNamedTimeZoneEpochNanoseconds(t,r,o,n,a,i,s,l,d,m){const c=GetUTCEpochNanoseconds(r,o,n,a,i,s,l,d,m);if(null===c)throw new RangeError("DateTime outside of supported range");let h=JSBI.subtract(c,Ee);JSBI.lessThan(h,Me)&&(h=c);let u=JSBI.add(c,Ee);JSBI.greaterThan(u,Re)&&(u=c);const T=GetNamedTimeZoneOffsetNanoseconds(t,h),p=GetNamedTimeZoneOffsetNanoseconds(t,u);return (T===p?[T]:[T,p]).map((h=>{const u=JSBI.subtract(c,JSBI.BigInt(h)),T=GetNamedTimeZoneDateTimeParts(t,u);if(r===T.year&&o===T.month&&n===T.day&&a===T.hour&&i===T.minute&&s===T.second&&l===T.millisecond&&d===T.microsecond&&m===T.nanosecond)return u})).filter((e=>void 0!==e))}(n,GetSlot(r,i$2),GetSlot(r,s$2),GetSlot(r,l$2),GetSlot(r,d$2),GetSlot(r,m$2),GetSlot(r,c$2),GetSlot(r,h$1),GetSlot(r,u$2),GetSlot(r,T$2));return p.map((e=>new o(e)))}getNextTransition(e){if(!IsTemporalTimeZone(this))throw new TypeError("invalid receiver");const t=ToTemporalInstant(e),r=GetSlot(this,a$1);if(IsTimeZoneOffsetString(r)||"UTC"===r)return null;let o=GetSlot(t,n$1);const i=GetIntrinsic("%Temporal.Instant%");return o=GetNamedTimeZoneNextTransition(r,o),null===o?null:new i(o)}getPreviousTransition(e){if(!IsTemporalTimeZone(this))throw new TypeError("invalid receiver");const t=ToTemporalInstant(e),r=GetSlot(this,a$1);if(IsTimeZoneOffsetString(r)||"UTC"===r)return null;let o=GetSlot(t,n$1);const i=GetIntrinsic("%Temporal.Instant%");return o=GetNamedTimeZonePreviousTransition(r,o),null===o?null:new i(o)}toString(){if(!IsTemporalTimeZone(this))throw new TypeError("invalid receiver");return GetSlot(this,a$1)}toJSON(){if(!IsTemporalTimeZone(this))throw new TypeError("invalid receiver");return GetSlot(this,a$1)}static from(e){return ToTemporalTimeZoneObject(ToTemporalTimeZoneSlotValue(e))}}MakeIntrinsicClass(TimeZone,"Temporal.TimeZone"),DefineIntrinsic("Temporal.TimeZone.prototype.getOffsetNanosecondsFor",TimeZone.prototype.getOffsetNanosecondsFor),DefineIntrinsic("Temporal.TimeZone.prototype.getPossibleInstantsFor",TimeZone.prototype.getPossibleInstantsFor);const Rt=Object.create;class PlainYearMonth{constructor(e,t,r="iso8601",o=1){CreateTemporalYearMonthSlots(this,ToIntegerWithTruncation(e),ToIntegerWithTruncation(t),ToTemporalCalendarSlotValue(r),ToIntegerWithTruncation(o));}get year(){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return CalendarYear(GetSlot(this,p$1),this)}get month(){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return CalendarMonth(GetSlot(this,p$1),this)}get monthCode(){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return CalendarMonthCode(GetSlot(this,p$1),this)}get calendarId(){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return ToTemporalCalendarIdentifier(GetSlot(this,p$1))}get era(){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return CalendarEra(GetSlot(this,p$1),this)}get eraYear(){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return CalendarEraYear(GetSlot(this,p$1),this)}get daysInMonth(){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return CalendarDaysInMonth(GetSlot(this,p$1),this)}get daysInYear(){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return CalendarDaysInYear(GetSlot(this,p$1),this)}get monthsInYear(){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return CalendarMonthsInYear(GetSlot(this,p$1),this)}get inLeapYear(){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return CalendarInLeapYear(GetSlot(this,p$1),this)}with(e,t){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");if(!IsObject(e))throw new TypeError("invalid argument");RejectTemporalLikeObject(e);const r=GetOptionsObject(t),o=GetSlot(this,p$1),n=CalendarFields(o,["month","monthCode","year"]);let a=PrepareTemporalFields(this,n,[]);return a=CalendarMergeFields(o,a,PrepareTemporalFields(e,n,"partial")),a=PrepareTemporalFields(a,n,[]),CalendarYearMonthFromFields(o,a,r)}add(e,t){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return AddDurationToOrSubtractDurationFromPlainYearMonth("add",this,e,t)}subtract(e,t){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return AddDurationToOrSubtractDurationFromPlainYearMonth("subtract",this,e,t)}until(e,t){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return DifferenceTemporalPlainYearMonth("until",this,e,t)}since(e,t){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return DifferenceTemporalPlainYearMonth("since",this,e,t)}equals(e){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");const t=ToTemporalYearMonth(e);for(const e of [i$2,s$2,l$2]){if(GetSlot(this,e)!==GetSlot(t,e))return !1}return CalendarEquals(GetSlot(this,p$1),GetSlot(t,p$1))}toString(e){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return TemporalYearMonthToString(this,ToCalendarNameOption(GetOptionsObject(e)))}toJSON(){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return TemporalYearMonthToString(this)}toLocaleString(e,t){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return new ht(e,t).format(this)}valueOf(){throw new TypeError("use compare() or equals() to compare Temporal.PlainYearMonth")}toPlainDate(e){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");if(!IsObject(e))throw new TypeError("argument should be an object");const t=GetSlot(this,p$1),r=CalendarFields(t,["monthCode","year"]),o=PrepareTemporalFields(this,r,[]),n=CalendarFields(t,["day"]);let a=CalendarMergeFields(t,o,PrepareTemporalFields(e,n,[]));a=PrepareTemporalFields(a,[...new Set([...r,...n])],[]);const i=Rt(null);return i.overflow="reject",CalendarDateFromFields(t,a,i)}getISOFields(){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return {calendar:GetSlot(this,p$1),isoDay:GetSlot(this,l$2),isoMonth:GetSlot(this,s$2),isoYear:GetSlot(this,i$2)}}getCalendar(){if(!IsTemporalYearMonth(this))throw new TypeError("invalid receiver");return ToTemporalCalendarObject(GetSlot(this,p$1))}static from(e,t){const r=GetOptionsObject(t);return IsTemporalYearMonth(e)?(ToTemporalOverflow(r),CreateTemporalYearMonth(GetSlot(e,i$2),GetSlot(e,s$2),GetSlot(e,p$1),GetSlot(e,l$2))):ToTemporalYearMonth(e,r)}static compare(e,t){const r=ToTemporalYearMonth(e),o=ToTemporalYearMonth(t);return CompareISODate(GetSlot(r,i$2),GetSlot(r,s$2),GetSlot(r,l$2),GetSlot(o,i$2),GetSlot(o,s$2),GetSlot(o,l$2))}}MakeIntrinsicClass(PlainYearMonth,"Temporal.PlainYearMonth");const Ft=ht.prototype.resolvedOptions,Yt=Object.create;class ZonedDateTime{constructor(e,t,r="iso8601"){if(arguments.length<1)throw new TypeError("missing argument: epochNanoseconds is required");CreateTemporalZonedDateTimeSlots(this,ToBigInt(e),ToTemporalTimeZoneSlotValue(t),ToTemporalCalendarSlotValue(r));}get calendarId(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return ToTemporalCalendarIdentifier(GetSlot(this,p$1))}get timeZoneId(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return ToTemporalTimeZoneIdentifier(GetSlot(this,g$2))}get year(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarYear(GetSlot(this,p$1),dateTime(this))}get month(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarMonth(GetSlot(this,p$1),dateTime(this))}get monthCode(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarMonthCode(GetSlot(this,p$1),dateTime(this))}get day(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarDay(GetSlot(this,p$1),dateTime(this))}get hour(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return GetSlot(dateTime(this),d$2)}get minute(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return GetSlot(dateTime(this),m$2)}get second(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return GetSlot(dateTime(this),c$2)}get millisecond(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return GetSlot(dateTime(this),h$1)}get microsecond(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return GetSlot(dateTime(this),u$2)}get nanosecond(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return GetSlot(dateTime(this),T$2)}get era(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarEra(GetSlot(this,p$1),dateTime(this))}get eraYear(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarEraYear(GetSlot(this,p$1),dateTime(this))}get epochSeconds(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const t=GetSlot(this,n$1);return JSBI.toNumber(BigIntFloorDiv(t,ve))}get epochMilliseconds(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const t=GetSlot(this,n$1);return JSBI.toNumber(BigIntFloorDiv(t,Ge))}get epochMicroseconds(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return ToBigIntExternal(BigIntFloorDiv(GetSlot(this,n$1),De))}get epochNanoseconds(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return ToBigIntExternal(GetSlot(this,n$1))}get dayOfWeek(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarDayOfWeek(GetSlot(this,p$1),dateTime(this))}get dayOfYear(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarDayOfYear(GetSlot(this,p$1),dateTime(this))}get weekOfYear(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarWeekOfYear(GetSlot(this,p$1),dateTime(this))}get yearOfWeek(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarYearOfWeek(GetSlot(this,p$1),dateTime(this))}get hoursInDay(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const t=dateTime(this),r=GetIntrinsic("%Temporal.PlainDateTime%"),o=GetSlot(t,i$2),a=GetSlot(t,s$2),d=GetSlot(t,l$2),m=new r(o,a,d,0,0,0,0,0,0),c=AddISODate(o,a,d,0,0,0,1,"reject"),h=new r(c.year,c.month,c.day,0,0,0,0,0,0),u=GetSlot(this,g$2),T=GetSlot(GetInstantFor(u,m,"compatible"),n$1),p=GetSlot(GetInstantFor(u,h,"compatible"),n$1);return BigIntDivideToNumber(JSBI.subtract(p,T),Oe)}get daysInWeek(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarDaysInWeek(GetSlot(this,p$1),dateTime(this))}get daysInMonth(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarDaysInMonth(GetSlot(this,p$1),dateTime(this))}get daysInYear(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarDaysInYear(GetSlot(this,p$1),dateTime(this))}get monthsInYear(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarMonthsInYear(GetSlot(this,p$1),dateTime(this))}get inLeapYear(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return CalendarInLeapYear(GetSlot(this,p$1),dateTime(this))}get offset(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return GetOffsetStringFor(GetSlot(this,g$2),GetSlot(this,S$1))}get offsetNanoseconds(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return GetOffsetNanosecondsFor(GetSlot(this,g$2),GetSlot(this,S$1))}with(e,t){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");if(!IsObject(e))throw new TypeError("invalid zoned-date-time-like");RejectTemporalLikeObject(e);const r=GetOptionsObject(t),o=GetSlot(this,p$1);let n=CalendarFields(o,["day","hour","microsecond","millisecond","minute","month","monthCode","nanosecond","second","year"]);n.push("offset");let a=PrepareTemporalFields(this,n,["offset"]);a=CalendarMergeFields(o,a,PrepareTemporalFields(e,n,"partial")),a=PrepareTemporalFields(a,n,["offset"]);const i=ToTemporalDisambiguation(r),s=ToTemporalOffset(r,"prefer");let{year:l,month:d,day:m,hour:c,minute:h,second:u,millisecond:T,microsecond:f,nanosecond:y}=InterpretTemporalDateTimeFields(o,a,r);const I=ParseTimeZoneOffsetString(a.offset),S=GetSlot(this,g$2);return CreateTemporalZonedDateTime(InterpretISODateTimeOffset(l,d,m,c,h,u,T,f,y,"option",I,S,i,s,!1),S,o)}withPlainDate(e){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const t=ToTemporalDate(e),r=GetSlot(t,i$2),o=GetSlot(t,s$2),a=GetSlot(t,l$2);let f=GetSlot(t,p$1);const y=dateTime(this),I=GetSlot(y,d$2),S=GetSlot(y,m$2),w=GetSlot(y,c$2),D=GetSlot(y,h$1),G=GetSlot(y,u$2),v=GetSlot(y,T$2);f=ConsolidateCalendars(GetSlot(this,p$1),f);const C=GetSlot(this,g$2);return CreateTemporalZonedDateTime(GetSlot(GetInstantFor(C,new(GetIntrinsic("%Temporal.PlainDateTime%"))(r,o,a,I,S,w,D,G,v,f),"compatible"),n$1),C,f)}withPlainTime(e){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const t=GetIntrinsic("%Temporal.PlainTime%"),r=void 0===e?new t:ToTemporalTime(e),o=dateTime(this),a=GetSlot(o,i$2),f=GetSlot(o,s$2),y=GetSlot(o,l$2),I=GetSlot(this,p$1),S=GetSlot(r,d$2),w=GetSlot(r,m$2),D=GetSlot(r,c$2),G=GetSlot(r,h$1),v=GetSlot(r,u$2),C=GetSlot(r,T$2),O=GetSlot(this,g$2);return CreateTemporalZonedDateTime(GetSlot(GetInstantFor(O,new(GetIntrinsic("%Temporal.PlainDateTime%"))(a,f,y,S,w,D,G,v,C,I),"compatible"),n$1),O,I)}withTimeZone(e){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const t=ToTemporalTimeZoneSlotValue(e);return CreateTemporalZonedDateTime(GetSlot(this,n$1),t,GetSlot(this,p$1))}withCalendar(e){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const t=ToTemporalCalendarSlotValue(e);return CreateTemporalZonedDateTime(GetSlot(this,n$1),GetSlot(this,g$2),t)}add(e,t){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return AddDurationToOrSubtractDurationFromZonedDateTime("add",this,e,t)}subtract(e,t){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return AddDurationToOrSubtractDurationFromZonedDateTime("subtract",this,e,t)}until(e,t){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return DifferenceTemporalZonedDateTime("until",this,e,t)}since(e,t){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return DifferenceTemporalZonedDateTime("since",this,e,t)}round(t){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");if(void 0===t)throw new TypeError("options parameter is required");const r="string"==typeof t?CreateOnePropObject("smallestUnit",t):GetOptionsObject(t),o=ToTemporalRoundingIncrement(r),a=ToTemporalRoundingMode(r,"halfExpand"),f=GetTemporalUnit(r,"smallestUnit","time",He,["day"]),y={day:1,hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[f];ValidateTemporalRoundingIncrement(o,y,1===y);const I=dateTime(this);let w=GetSlot(I,i$2),D=GetSlot(I,s$2),G=GetSlot(I,l$2),v=GetSlot(I,d$2),C=GetSlot(I,m$2),O=GetSlot(I,c$2),b=GetSlot(I,h$1),E=GetSlot(I,u$2),M=GetSlot(I,T$2);const R=GetIntrinsic("%Temporal.PlainDateTime%"),F=GetSlot(this,g$2),Y=GetSlot(this,p$1),P=GetInstantFor(F,new R(GetSlot(I,i$2),GetSlot(I,s$2),GetSlot(I,l$2),0,0,0,0,0,0),"compatible"),Z=AddZonedDateTime(P,F,Y,0,0,0,1,0,0,0,0,0,0),B=JSBI.subtract(Z,JSBI.BigInt(GetSlot(P,n$1)));if(JSBI.lessThanOrEqual(B,Ie))throw new RangeError("cannot round a ZonedDateTime in a calendar with zero or negative length days");({year:w,month:D,day:G,hour:v,minute:C,second:O,millisecond:b,microsecond:E,nanosecond:M}=RoundISODateTime(w,D,G,v,C,O,b,E,M,o,f,a,JSBI.toNumber(B)));return CreateTemporalZonedDateTime(InterpretISODateTimeOffset(w,D,G,v,C,O,b,E,M,"option",GetOffsetNanosecondsFor(F,GetSlot(this,S$1)),F,"compatible","prefer",!1),F,GetSlot(this,p$1))}equals(t){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const r=ToTemporalZonedDateTime(t),o=GetSlot(this,n$1),a=GetSlot(r,n$1);return !!JSBI.equal(JSBI.BigInt(o),JSBI.BigInt(a))&&(!!TimeZoneEquals(GetSlot(this,g$2),GetSlot(r,g$2))&&CalendarEquals(GetSlot(this,p$1),GetSlot(r,p$1)))}toString(e){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const t=GetOptionsObject(e),r=ToCalendarNameOption(t),o=ToFractionalSecondDigits(t),n=function ToShowOffsetOption(e){return GetOption(e,"offset",["auto","never"],"auto")}(t),a=ToTemporalRoundingMode(t,"trunc"),i=GetTemporalUnit(t,"smallestUnit","time",void 0);if("hour"===i)throw new RangeError('smallestUnit must be a time unit other than "hour"');const s=function ToTimeZoneNameOption(e){return GetOption(e,"timeZoneName",["auto","never","critical"],"auto")}(t),{precision:l,unit:d,increment:m}=ToSecondsStringPrecisionRecord(i,o);return TemporalZonedDateTimeToString(this,l,r,s,n,{unit:d,increment:m,roundingMode:a})}toLocaleString(e,t){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const r=GetOptionsObject(t),o=Yt(null);if(CopyDataProperties(o,r,["timeZone"]),void 0!==r.timeZone)throw new TypeError("ZonedDateTime toLocaleString does not accept a timeZone option");void 0===o.year&&void 0===o.month&&void 0===o.day&&void 0===o.weekday&&void 0===o.dateStyle&&void 0===o.hour&&void 0===o.minute&&void 0===o.second&&void 0===o.timeStyle&&void 0===o.dayPeriod&&void 0===o.timeZoneName&&(o.timeZoneName="short");let n=ToTemporalTimeZoneIdentifier(GetSlot(this,g$2));if(IsTimeZoneOffsetString(n))throw new RangeError("toLocaleString does not support offset string time zones");n=GetCanonicalTimeZoneIdentifier(n),o.timeZone=n;const a=new ht(e,o),i=Call(Ft,a,[]).calendar,s=ToTemporalCalendarIdentifier(GetSlot(this,p$1));if("iso8601"!==s&&"iso8601"!==i&&i!==s)throw new RangeError(`cannot format ZonedDateTime with calendar ${s} in locale with calendar ${i}`);return a.format(GetSlot(this,S$1))}toJSON(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return TemporalZonedDateTimeToString(this,"auto")}valueOf(){throw new TypeError("use compare() or equals() to compare Temporal.ZonedDateTime")}startOfDay(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const e=dateTime(this),t=GetIntrinsic("%Temporal.PlainDateTime%"),r=GetSlot(this,p$1),o=new t(GetSlot(e,i$2),GetSlot(e,s$2),GetSlot(e,l$2),0,0,0,0,0,0,r),a=GetSlot(this,g$2);return CreateTemporalZonedDateTime(GetSlot(GetInstantFor(a,o,"compatible"),n$1),a,r)}toInstant(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return new(GetIntrinsic("%Temporal.Instant%"))(GetSlot(this,n$1))}toPlainDate(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return TemporalDateTimeToDate(dateTime(this))}toPlainTime(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return TemporalDateTimeToTime(dateTime(this))}toPlainDateTime(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return dateTime(this)}toPlainYearMonth(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const e=GetSlot(this,p$1);return CalendarYearMonthFromFields(e,PrepareTemporalFields(this,CalendarFields(e,["monthCode","year"]),[]))}toPlainMonthDay(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const e=GetSlot(this,p$1);return CalendarMonthDayFromFields(e,PrepareTemporalFields(this,CalendarFields(e,["day","monthCode"]),[]))}getISOFields(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");const e=dateTime(this),t=GetSlot(this,g$2);return {calendar:GetSlot(this,p$1),isoDay:GetSlot(e,l$2),isoHour:GetSlot(e,d$2),isoMicrosecond:GetSlot(e,u$2),isoMillisecond:GetSlot(e,h$1),isoMinute:GetSlot(e,m$2),isoMonth:GetSlot(e,s$2),isoNanosecond:GetSlot(e,T$2),isoSecond:GetSlot(e,c$2),isoYear:GetSlot(e,i$2),offset:GetOffsetStringFor(t,GetSlot(this,S$1)),timeZone:t}}getCalendar(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return ToTemporalCalendarObject(GetSlot(this,p$1))}getTimeZone(){if(!IsTemporalZonedDateTime(this))throw new TypeError("invalid receiver");return ToTemporalTimeZoneObject(GetSlot(this,g$2))}static from(e,t){const r=GetOptionsObject(t);return IsTemporalZonedDateTime(e)?(ToTemporalDisambiguation(r),ToTemporalOffset(r,"reject"),ToTemporalOverflow(r),CreateTemporalZonedDateTime(GetSlot(e,n$1),GetSlot(e,g$2),GetSlot(e,p$1))):ToTemporalZonedDateTime(e,r)}static compare(t,r){const o=ToTemporalZonedDateTime(t),a=ToTemporalZonedDateTime(r),i=GetSlot(o,n$1),s=GetSlot(a,n$1);return JSBI.lessThan(JSBI.BigInt(i),JSBI.BigInt(s))?-1:JSBI.greaterThan(JSBI.BigInt(i),JSBI.BigInt(s))?1:0}}function dateTime(e){return GetPlainDateTimeFor(GetSlot(e,g$2),GetSlot(e,S$1),GetSlot(e,p$1))}MakeIntrinsicClass(ZonedDateTime,"Temporal.ZonedDateTime");var Pt=Object.freeze({__proto__:null,Calendar,Duration,Instant,Now:Et,PlainDate,PlainDateTime,PlainMonthDay,PlainTime,PlainYearMonth,TimeZone,ZonedDateTime});const Zt=[Instant,Calendar,PlainDate,PlainDateTime,Duration,PlainMonthDay,PlainTime,TimeZone,PlainYearMonth,ZonedDateTime];for(const e of Zt){const t=Object.getOwnPropertyDescriptor(e,"prototype");(t.configurable||t.enumerable||t.writable)&&(t.configurable=!1,t.enumerable=!1,t.writable=!1,Object.defineProperty(e,"prototype",t));}

const TextField = memo(forwardElementRef(function TextField({ type, ...props }, ref) {
    switch (type) {
        case "bigint":
            return (jsx(TextFieldBigInt, { ref: ref, type: type, ...props }));
        case "number":
            return (jsx(TextFieldNumber, { ref: ref, type: type, ...props }));
        case "date":
            return (jsx(TextFieldDate, { ref: ref, type: type, ...props }));
        case "datetime-local":
            return (jsx(TextFieldDateTime, { ref: ref, type: type, ...props }));
        case "time":
            return (jsx(TextFieldTime, { ref: ref, type: type, ...props }));
        case "email":
        case "search":
        default:
            return (jsx(TextFieldText, { ref: ref, type: type, ...props }));
    }
}));
const TextFieldDateTime = memo(forwardElementRef(function TextFieldDateTime({ type, value, onValueChange: onValueChangeDateTime, marginBottom, iconEnd, iconStart, loadingLabel, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }, ref) {
    let value2 = value ? value.toString({ smallestUnit: "second" }) : null;
    if (value2) {
        console.assert(value2.endsWith("Z"));
        value2 = value2.substring(0, value2.length - 1);
    }
    return (jsx(TextFieldBase, { ref: ref, capture: e => {
            if (e.currentTarget.valueAsDate)
                return Pt.Instant.fromEpochMilliseconds(+e.currentTarget.valueAsDate);
            if (e.currentTarget.valueAsNumber != null && isFinite(e.currentTarget.valueAsNumber))
                return Pt.Instant.fromEpochMilliseconds(e.currentTarget.valueAsNumber);
            return null;
        }, iconEnd: iconEnd, iconStart: iconStart, loadingLabel: loadingLabel ?? "Please wait while the operation completes", readonly: readonly ?? false, size: size ?? null, throttle: throttle ?? 0, debounce: debounce ?? 0, resizeable: false, rows: 1, disabled: disabled ?? false, inputMode: inputMode ?? null, placeholder: placeholder ?? null, autocomplete: autocomplete ?? null, label: label, labelPosition: labelPosition, onValueChange: onValueChangeDateTime, propsInput: useMergedProps(props, { type: "datetime-local" }), propsLabel: {}, value: value2, marginBottom: marginBottom }));
}));
const TextFieldDate = memo(forwardElementRef(function TextFieldDateTime({ type, value, onValueChange: onValueChangeDateTime, marginBottom, iconEnd, iconStart, loadingLabel, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }, ref) {
    let value2 = value ? value.toString({}) : null;
    return (jsx(TextFieldBase, { ref: ref, capture: e => {
            //if (e.currentTarget.valueAsDate)
            //    return Temporal.PlainDate.from(e.currentTarget.valueAsDate.toISOString());
            if (e.currentTarget.value)
                return Pt.PlainDate.from(e.currentTarget.value);
            return null;
        }, 
        // capture={e => e.currentTarget.valueAsDate ? Temporal.PlainDate.from(e.currentTarget.valueAsDate.toISOString()) : null}
        iconEnd: iconEnd, iconStart: iconStart, loadingLabel: loadingLabel ?? "Please wait while the operation completes", readonly: readonly ?? false, size: size ?? null, throttle: throttle ?? 0, debounce: debounce ?? 0, resizeable: false, rows: 1, disabled: disabled ?? false, inputMode: inputMode ?? null, placeholder: placeholder ?? null, autocomplete: autocomplete ?? null, label: label, labelPosition: labelPosition, onValueChange: onValueChangeDateTime, propsInput: useMergedProps(props, { type: "date" }), propsLabel: {}, value: value2, marginBottom: marginBottom }));
}));
const TextFieldTime = memo(forwardElementRef(function TextFieldDateTime({ type, value, seconds, onValueChange: onValueChangeDateTime, marginBottom, iconEnd, iconStart, loadingLabel, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }, ref) {
    let value2 = value ? (`${value.hour.toString().padStart(2, "0")}:${value.minute.toString().padStart(2, "0")}${seconds ? `:${value.second.toString().padStart(2, "0")}` : ``}`) : null;
    return (jsx(TextFieldBase, { ref: ref, capture: e => {
            if (e.currentTarget.value) {
                let value = e.currentTarget.value;
                const [hour, minute, second] = value.split(":").map(s => +s);
                if (second == undefined)
                    return Pt.PlainTime.from({
                        hour,
                        minute
                    });
                else
                    return Pt.PlainTime.from({
                        hour,
                        minute,
                        second
                    });
            }
            return null;
        }, iconEnd: iconEnd, iconStart: iconStart, loadingLabel: loadingLabel ?? "Please wait while the operation completes", readonly: readonly ?? false, size: size ?? null, throttle: throttle ?? 0, debounce: debounce ?? 0, resizeable: false, rows: 1, disabled: disabled ?? false, inputMode: inputMode ?? null, placeholder: placeholder ?? null, autocomplete: autocomplete ?? null, label: label, otherClasses: seconds ? "form-text-field-time-seconds" : "", labelPosition: labelPosition, onValueChange: onValueChangeDateTime, propsInput: useMergedProps(props, { type: "time", step: seconds ? 1 : 60 }), propsLabel: {}, value: value2, marginBottom: marginBottom }));
}));
const TextFieldNumber = memo(forwardElementRef(function TextFieldNumber({ type, value, onValueChange: onValueChangeNumber, digitDisplay, showSpinButtons, marginBottom, iconEnd, iconStart, loadingLabel, min, max, step, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }, ref) {
    if (value != null && max != null && value > max)
        value = max;
    if (value != null && min != null && value < min)
        value = min;
    return (jsx(TextFieldBase, { ref: ref, capture: e => Math.max(Math.min(e.currentTarget.valueAsNumber, max ?? Infinity), min ?? -Infinity), iconEnd: iconEnd, iconStart: iconStart, loadingLabel: loadingLabel ?? "Please wait while the operation completes", readonly: readonly ?? false, size: size ?? null, throttle: throttle ?? 0, debounce: debounce ?? 0, resizeable: false, rows: 1, disabled: disabled ?? false, inputMode: inputMode ?? null, placeholder: placeholder ?? null, autocomplete: autocomplete ?? null, label: label, labelPosition: labelPosition, onValueChange: onValueChangeNumber, propsInput: useMergedProps(props, { min, max, type: "number" }), otherClasses: clsx(!showSpinButtons ? "hide-spin-buttons" : "", digitDisplay && "form-text-field-number-sized"), otherProps: { style: (digitDisplay ? { "--form-text-field-digits": (digitDisplay) } : {}) }, propsLabel: {}, value: value, marginBottom: marginBottom }));
}));
const TextFieldBigInt = memo(forwardElementRef(function TextFieldBigInt({ type, value, onValueChange: onValueChangeNumber, marginBottom, loadingLabel, min, max, step, iconEnd, iconStart, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }, ref) {
    return (jsx(TextFieldBase, { ref: ref, marginBottom: marginBottom, capture: e => BigInt(e.currentTarget.value), iconEnd: iconEnd, iconStart: iconStart, loadingLabel: loadingLabel ?? "Please wait while the operation completes", readonly: readonly ?? false, size: size ?? null, throttle: throttle ?? null, resizeable: false, rows: 1, debounce: debounce ?? null, disabled: disabled ?? false, inputMode: inputMode ?? null, placeholder: placeholder ?? null, autocomplete: autocomplete ?? null, label: label, labelPosition: labelPosition, onValueChange: onValueChangeNumber, propsInput: useMergedProps(props, { min, max, step, type: "number" }), propsLabel: {}, value: value?.toString() ?? null }));
}));
/*
function TextFieldText({ type, onValueChange, value, label, labelPosition, disabled, placeholder, readonly, size, debounce, throttle, ...props }: LabelledProps<TextFieldProps, "floating">) {
    const { refElementReturn: { getElement: getInputElement, propsStable: propsInput1 } } = useRefElement<HTMLInputElement>({ refElementParameters: {} });
    const { refElementReturn: { getElement: getLabelElement, propsStable: propsLabel1 } } = useRefElement<HTMLLabelElement>({ refElementParameters: {} });
    const {
        propsInput: propsInput2,
        propsLabel: propsLabel2
    } = useLabel<LabelPosition, HTMLInputElement, HTMLLabelElement>({
        labelParameters: {
            ariaLabel: labelPosition == "hidden" ? label : null,
            labelPosition: "separate",
            onLabelClick: () => { getInputElement()?.focus(); },
            tagInput: "input",
            tagLabel: "label"
        },
        randomIdInputParameters: { prefix: "tfi-" },
        randomIdLabelParameters: { prefix: "tfl-" }
    });
    const {
        pending,
        currentCapture,
        syncHandler
    } = useAsyncHandler<Event, string>({
        asyncHandler: onValueChange ?? null,
        capture: useStableCallback(e => e.currentTarget.value),
        debounce,
        throttle
    });

    const isTextArea = (resizeable || (rows || 0) > 1);

    const labelJsx = (<label className="form-label" {...useMergedProps(propsLabel1, propsLabel2)}>{label}</label>);
    const inputJsx = <input value={value} onInput={syncHandler} type="text" className={clsx("form-control", disabled && "disabled", readonly && "readonly", size && `form-control-${size ?? "md"}`)} {...useMergedProps(propsInput1, propsInput2)} />;
    const textAreaJsx = <textarea className={clsx("form-controls", resizeable && "resizeable")} value={value} onInput={syncHandler} rows={rows ?? 1} />
    return (
        <div className={clsx("mb-3", labelPosition == "floating" && "form-floating")}>
            {labelPosition == "before" && labelJsx}
            {isTextArea ? textAreaJsx : inputJsx}
            {labelPosition == "after" && labelJsx}
        </div>
    );
}*/
const TextFieldText = memo(forwardElementRef(function TextFieldText(allProps, ref) {
    const { onValueChange, autocomplete, inputMode, enterKeyHint, type, value, label, loadingLabel, labelPosition, iconEnd, iconStart, marginBottom, debounce, throttle, disabled, placeholder, readonly, size, rows, resizeable, ...props } = allProps;
    return (jsx(TextFieldBase, { ref: ref, iconEnd: iconEnd, iconStart: iconStart, loadingLabel: loadingLabel ?? "Please wait while the operation completes", value: value ?? "", resizeable: resizeable ?? false, capture: e => e.currentTarget.value, placeholder: placeholder ?? null, rows: rows ?? 1, readonly: readonly || false, onValueChange: onValueChange || null, propsInput: useMergedProps(props, { type: "text" }), propsLabel: {}, size: size || null, inputMode: inputMode || null, autocomplete: autocomplete || null, marginBottom: marginBottom, label: label, labelPosition: labelPosition, debounce: debounce ?? null, throttle: throttle ?? null, disabled: disabled ?? false }));
}));
function useCommitTextField({ getFocused, commit, currentCapture, showSpinner, value }) {
    const updateDOMValue = useStableCallback((newValue) => {
        if (getFocused())
            return;
        const value2 = (showSpinner ? currentCapture : (newValue ?? value));
        commit(value2);
    });
    // Always make sure that, when the value changes, so does the displayed input's value
    // except when it's currently being edited!
    useRef(0);
    useTimeout({
        timeout: 50,
        triggerIndex: value,
        callback: () => {
            if (!getFocused() && !showSpinner)
                updateDOMValue(value);
        }
    });
}
const TextFieldBase = memo(forwardElementRef(function TextFieldBase({ capture, otherClasses, otherProps, marginBottom, autocomplete, iconEnd, iconStart, inputMode, loadingLabel, rows, resizeable, value, onValueChange, label, labelPosition, propsInput, propsLabel, debounce, disabled, placeholder, size, readonly, throttle }, ref) {
    labelPosition ??= "before";
    if (labelPosition == "hidden") {
        console.assert(typeof label == "string");
    }
    const { refElementReturn: { getElement: getInputElement }, propsStable: propsInput1 } = useRefElement({ refElementParameters: {} });
    const { refElementReturn: { getElement: getLabelElement }, propsStable: propsLabel1 } = useRefElement({ refElementParameters: {} });
    const withinInputGroup = useContext(WithinInputGroup);
    const { propsInput: propsInput2, propsLabel: propsLabel2 } = useLabel({
        labelParameters: {
            ariaLabel: labelPosition == "hidden" ? label : null,
            labelPosition: "separate",
            onLabelClick: () => { getInputElement()?.focus(); },
            tagInput: "input",
            tagLabel: "label"
        },
        randomIdInputParameters: { prefix: "tfi-" },
        randomIdLabelParameters: { prefix: "tfl-" }
    });
    if (labelPosition == "floating") {
        placeholder ||= "\xA0";
    }
    /*const {
        pending,
        currentCapture,
        syncHandler
    } = useAsyncHandler<JSX.TargetedEvent<E>, V>({
        asyncHandler: onValueChange ?? null,
        capture: useStableCallback(capture),
        debounce: debounce ?? undefined,
        throttle: throttle ?? undefined
    });*/
    const isTextArea = (resizeable || (rows || 0) > 1);
    return (jsx(ProgressWithHandler, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", asyncHandler: onValueChange, capture: capture, debounce: debounce ?? 500, throttle: throttle ?? 1000, tagProgressIndicator: "span", render: progressInfo => {
            const { asyncHandlerReturn: { pending: p, debouncingAsync, callCount, debouncingSync, currentCapture, syncHandler, invocationResult }, propsProgressIndicator } = progressInfo;
            const showSpinner = (p || debouncingAsync || debouncingSync);
            const updateDOMValue = useStableCallback((newValue) => {
                if (getCurrentFocusedInner())
                    return;
                const element = getElement();
                const value2 = (showSpinner ? currentCapture : (newValue ?? value));
                if (element) {
                    if (element instanceof HTMLInputElement && typeof value2 == "number")
                        element.valueAsNumber = value2;
                    else
                        element.value = (value2 ?? "");
                }
            });
            // Always make sure that, when the value changes, so does the displayed input's value
            // except when it's currently being edited!
            useLayoutEffect(() => {
                if (!getCurrentFocusedInner() && !showSpinner)
                    updateDOMValue(value);
            });
            const { refElementReturn: { getElement }, refElementReturn, propsStable: p1 } = useRefElement({ refElementParameters: {} });
            const { hasCurrentFocusReturn: { propsStable: p2, getCurrentFocusedInner } } = useHasCurrentFocus({
                hasCurrentFocusParameters: {
                    onCurrentFocusedInnerChanged: null, onCurrentFocusedChanged: useStableCallback((focused) => {
                        if (!focused) {
                            updateDOMValue(undefined);
                        }
                        else {
                            updateDOMValue(value);
                        }
                    })
                },
                refElementReturn
            });
            useCommitTextField({
                getFocused: getCurrentFocusedInner,
                currentCapture,
                showSpinner,
                value: value,
                commit: (value2) => {
                    const element = getElement();
                    if (element) {
                        if (element instanceof HTMLInputElement && typeof value2 == "number")
                            element.valueAsNumber = value2;
                        else
                            element.value = (value2 ?? "");
                    }
                }
            });
            const disabledType = useContext(DefaultDisabledType);
            let baseInputClass = clsx("form-control", disabled && "disabled", readonly && "readonly", size && `form-control-${size ?? "md"}`, readonly == 'plaintext' && 'form-control-plaintext');
            if (disabled && disabledType == 'soft') {
                disabled = false;
                readonly = true;
            }
            if (readonly == 'plaintext') {
                readonly = true;
            }
            const onInput = (e) => {
                // Special handling for number
                // Basically, ensure that, if we have a min/max, 
                // we're never allowed to enter a number below/above them.
                //
                // TODO: This can kick the input out from under the user's feet.
                // Ideally it's not intrusive enough to matter 
                if (e.currentTarget.type == "number") {
                    const { valueAsNumber, max: maxS, min: minS } = e.currentTarget;
                    if (valueAsNumber != value) {
                        if (valueAsNumber != null && isFinite(valueAsNumber)) {
                            let max = +maxS;
                            let min = +minS;
                            let clampedValue = null;
                            max = isFinite(max) ? max : null;
                            min = isFinite(min) ? min : null;
                            if (max != null && valueAsNumber > max) {
                                clampedValue = max;
                            }
                            if (min != null && valueAsNumber < min) {
                                clampedValue = min;
                            }
                            if (clampedValue) {
                                e.currentTarget.valueAsNumber = clampedValue;
                            }
                        }
                        syncHandler(e);
                    }
                }
                else {
                    syncHandler(e);
                }
            };
            const dataProps = {
                "data-async-call-count": progressInfo.asyncHandlerReturn.callCount,
                "data-async-resolve-count": progressInfo.asyncHandlerReturn.resolveCount,
                "data-async-reject-count": progressInfo.asyncHandlerReturn.rejectCount,
                "data-async-settle-count": progressInfo.asyncHandlerReturn.settleCount,
                "data-async-has-error": progressInfo.asyncHandlerReturn.hasError,
            };
            const labelJsx = (jsx("label", { className: clsx(!withinInputGroup ? "form-label" : "input-group-text"), ...useMergedProps(propsLabel1, propsLabel2, propsLabel), children: label }));
            const inputJsx = jsx("input", { ...dataProps, inputMode: inputMode || undefined, autocomplete: autocomplete || undefined, placeholder: placeholder ?? undefined, readonly: readonly, onInput: onInput, ...useMergedProps({ ref }, p1, p2, propsInput1, propsInput2, { className: clsx(baseInputClass) }, propsInput) });
            const textAreaJsx = jsx("textarea", { ...dataProps, placeholder: placeholder ?? undefined, readonly: readonly, onInput: onInput, rows: rows ?? 1, ...useMergedProps({ ref }, p1, p2, { className: clsx(baseInputClass, resizeable && "resizeable") }, propsInput1, propsInput2, propsInput) });
            const finalInputJsx = (isTextArea ? textAreaJsx : inputJsx);
            if (!withinInputGroup) {
                return (jsxs("div", { ...useMergedProps({
                        className: clsx("form-text-field", otherClasses, `mb-${marginBottom ?? 3}`, `form-text-field-type-${propsInput.type}`, !!iconStart && "form-text-field-with-icon-start", (!!iconEnd || showSpinner) && "form-text-field-with-icon-end", showSpinner && "pending")
                    }, otherProps || {}), children: [labelPosition == "before" && labelJsx, jsxs("div", { className: clsx("form-text-field-control-container", labelPosition == "floating" && "form-floating"), children: [iconStart && jsx("span", { className: clsx("form-control-icon-start form-control-icon show"), children: iconStart }), labelPosition == "tooltip" ? jsx(Tooltip, { tooltip: label, absolutePositioning: true, children: finalInputJsx }) : finalInputJsx, labelPosition == "floating" && labelJsx, iconEnd && jsx("span", { className: clsx("form-control-icon-end form-control-icon", !showSpinner && "show"), children: iconEnd }), jsx(TextFieldSpinner, { callCount: callCount, containerClass: "form-control-icon-end form-control-icon", invocationResult: invocationResult, debouncingAsync: debouncingAsync, debouncingSync: debouncingSync, pending: p, propsIndicator: propsProgressIndicator })] }), labelPosition == "after" && labelJsx] }));
            }
            else {
                return (jsxs(Fragment, { children: [labelPosition == "before" && labelJsx, iconStart && jsx("span", { className: clsx("input-group-text"), children: iconStart }), labelPosition == "tooltip" ? jsx(Tooltip, { tooltip: label, absolutePositioning: true, children: finalInputJsx }) : finalInputJsx, labelPosition == "floating" && labelJsx, iconEnd && jsx("span", { className: clsx("input-group-text", !showSpinner && "show"), children: iconEnd }), jsx(TextFieldSpinner, { callCount: callCount, containerClass: "", invocationResult: invocationResult, debouncingAsync: debouncingAsync, debouncingSync: debouncingSync, pending: p, propsIndicator: propsProgressIndicator }), labelPosition == "after" && labelJsx] }));
            }
        } }));
}));
const TextFieldSpinner = memo(function A({ debouncingAsync, debouncingSync, pending: p, propsIndicator, containerClass, callCount, invocationResult }) {
    if (invocationResult != "async")
        return null;
    let pendingDisplayType = ((debouncingAsync || debouncingSync) ? 2 : p ? 1 : 0);
    const withinInputGroup = useContext(WithinInputGroup);
    const ret = (jsxs(Fragment, { children: [jsx(Fade, { show: (pendingDisplayType == 1), animateOnMount: false, exitVisibility: "removed", children: jsx("span", { className: clsx(containerClass, `spinner-container`, "show"), children: jsx("span", { className: clsx(`spinner spinner-border spinner-border-sm`), ...((pendingDisplayType == 1) ? propsIndicator : {}) }) }) }), jsx(Fade, { show: (pendingDisplayType == 2), animateOnMount: false, exitVisibility: "removed", children: jsx("span", { className: clsx(containerClass, `spinner-container`, "show"), children: jsx("span", { className: clsx(`spinner spinner-grow spinner-grow-sm`), ...((pendingDisplayType == 2) ? propsIndicator : {}) }) }) })] }));
    if (!withinInputGroup) {
        return ret;
    }
    else {
        return (jsx("div", { className: "input-group-text input-group-text-field-spinners", children: ret }));
    }
});

const CkEditorWrapper = memo(forwardElementRef(function CkEditorWrapper({ children, keyboardControlsDescription, implementation, valueHtml, onValueChange: ovcu, onFocusChange: ofcu, onReady: oru, editorHandle, toolbarItems, placeholder, fontFamilies, mention, fontSizes, htmlEmbed, htmlSupport, link, typing, onCharacterCountChange, onWordCountChange, ...props }, ref2) {
    fontSizes ||= [10, 12, 14, 'default', 18, 20, 22];
    fontFamilies ||= [
        'default',
        'Arial, Helvetica, sans-serif',
        'Courier New, Courier, monospace',
        'Georgia, serif',
        'Lucida Sans Unicode, Lucida Grande, sans-serif',
        'Tahoma, Geneva, sans-serif',
        'Times New Roman, Times, serif',
        'Trebuchet MS, Helvetica, sans-serif',
        'Verdana, Geneva, sans-serif'
    ];
    const getOnValueChange = useStableGetter(ovcu);
    const getOnFocusChange = useStableGetter(ofcu);
    const getOnReady = useStableGetter(oru);
    const getValueHtml = useStableGetter(valueHtml);
    const ref = useRef(null);
    useEffect(() => {
        const editor = implementation.create(ref.current, getArgs()).then((editor) => {
            editor.model.document.on("change:data", (e) => {
                const newData = editor.getData();
                if (newData != getValueHtml()) {
                    getOnValueChange()(newData);
                }
            });
            editor.model.document.on("blur", (e) => { getOnFocusChange()(false); });
            editor.model.document.on("focus", (e) => { getOnFocusChange()(true); });
            if (typeof editorHandle == "function")
                editorHandle(editor);
            else if (editorHandle)
                editorHandle.current = editor;
            getOnReady()?.(editor);
            editor.setData(getValueHtml());
        }).catch((ex) => {
            console.error(ex);
        });
        return () => editor.destroy();
        function getArgs() {
            return {
                // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
                toolbar: {
                    items: toolbarItems,
                    shouldNotGroupWhenFull: true
                },
                // Changing the language of the interface requires loading the language file using the <script> tag.
                // language: 'es',
                list: {
                    properties: {
                        styles: true,
                        startIndex: true,
                        reversed: true
                    }
                },
                typing,
                // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                    ]
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
                placeholder,
                // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
                fontFamily: {
                    options: fontFamilies,
                    supportAllValues: true
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
                fontSize: {
                    options: fontSizes,
                    supportAllValues: true
                },
                wordCount: (onWordCountChange || onCharacterCountChange) ? {
                    onUpdate: ((stats) => {
                        onWordCountChange?.(stats.words);
                        onCharacterCountChange?.(stats.characters);
                    })
                } : undefined,
                // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
                // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
                htmlSupport,
                // Be careful with enabling previews
                // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
                htmlEmbed,
                // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
                link,
                // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
                mention,
                // The "super-build" contains more premium features that require additional configuration, disable them below.
                // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
                removePlugins: [
                    'ExportPdf',
                    'ExportWord',
                    'CKBox',
                    'CKFinder',
                    'EasyImage',
                    'RealTimeCollaborativeComments',
                    'RealTimeCollaborativeTrackChanges',
                    'RealTimeCollaborativeRevisionHistory',
                    'PresenceList',
                    'Comments',
                    'TrackChanges',
                    'TrackChangesData',
                    'RevisionHistory',
                    'Pagination',
                    'WProofreader',
                    'MathType'
                ]
            };
        }
    }, []);
    // dangerouslySetInnerHTML={{__html: valueHtml}}
    return (jsx(KeyboardAssistIcon, { homeEnd: true, leftRight: true, upDown: true, pageKeys: true, textF10: true, typeaheadStatus: null, activateSpace: false, activateEnter: false, description: keyboardControlsDescription ?? "Control the editor:", children: jsx("div", { className: "ck-editor-wrapper", children: useClonedElement(children, { ...props, ref: ref2 }, ref) }) }));
}));

const RTFDefaultItems = ["undo", "redo", "|", "heading", "|", "bold", "italic", "underline", "strikethrough", "highlight", "|", "link", "code", "subscript", "superscript", "|", "removeFormat"];
const DFDefaultItems = [
    "undo", "redo", "|",
    "heading", "|",
    "fontFamily", "fontSize", "|",
    "bold", "italic", "underline", "strikethrough", "highlight", "|",
    "link", "code", "subscript", "superscript", "|",
    "alignment", "fontColor", "fontBackgroundColor", "|",
    "todoList", "bulletedList", "numberedList", "outdent", "indent", "|",
    'removeFormat', "-",
    "findAndReplace", "selectAll", "|",
    "blockQuote", "insertTable", "codeBlock", "insertImage", "horizontalLine", "specialCharacters", "pageBreak", "|",
    "textPartLanguage"
];
function RichTextField({ implementation, toolbarItems, onValueChange, valueHtml, ...props }) {
    return (jsx(ProgressWithHandler, { ariaLabel: "Saving...", asyncHandler: onValueChange, capture: identity, tagProgressIndicator: "div", render: progressInfo => {
            const [getFocused, setFocused] = usePassiveState(null, returnFalse);
            const { asyncHandlerReturn, propsProgressIndicator, propsProgressRegion } = progressInfo;
            const { pending: p, callCount, debouncingAsync, debouncingSync, currentCapture, syncHandler, invocationResult } = asyncHandlerReturn;
            const pending = (p || debouncingAsync || debouncingSync);
            useCommitTextField({
                commit: (str) => {
                    if (editorHandle.current && str != null && str != editorHandle.current.getData()) {
                        editorHandle.current.setData(str);
                    }
                },
                currentCapture,
                getFocused,
                showSpinner: pending,
                value: valueHtml
            });
            const editorHandle = useRef(null);
            return (jsxs("div", { className: clsx("rich-text-field", pending && "pending"), children: [jsx(TextFieldSpinner, { callCount: callCount, containerClass: "", invocationResult: invocationResult, debouncingAsync: debouncingAsync, debouncingSync: debouncingSync, pending: p, propsIndicator: propsProgressIndicator }), jsx(CkEditorWrapper, { editorHandle: editorHandle, implementation: implementation ?? globalThis.CKEDITOR?.ClassicEditor ?? globalThis.ClassicEditor, toolbarItems: toolbarItems ?? RTFDefaultItems, onFocusChange: setFocused, onValueChange: value => {
                            syncHandler(value);
                        }, valueHtml: (pending ? currentCapture : valueHtml) || "", ...props, children: jsx("textarea", {}) })] }));
        } }));
}
function DocumentField({ implementation, toolbarItems, onValueChange, valueHtml, ...props }) {
    return (jsx(ProgressWithHandler, { ariaLabel: "Saving...", asyncHandler: onValueChange, capture: identity, tagProgressIndicator: "div", render: progressInfo => {
            const [getFocused, setFocused] = usePassiveState(null, returnFalse);
            const { asyncHandlerReturn, propsProgressIndicator, propsProgressRegion } = progressInfo;
            const { pending: p, callCount, debouncingAsync, debouncingSync, currentCapture, syncHandler, invocationResult } = asyncHandlerReturn;
            const pending = (p || debouncingAsync || debouncingSync);
            useCommitTextField({
                commit: (str) => {
                    if (editorHandle.current && str != null && str != editorHandle.current.getData()) {
                        editorHandle.current.setData(str);
                    }
                },
                currentCapture,
                getFocused,
                showSpinner: pending,
                value: valueHtml
            });
            const editorHandle = useRef(null);
            return (jsxs("div", { className: clsx("document-field shadow-sm", pending && "pending"), children: [jsx(TextFieldSpinner, { callCount: callCount, containerClass: "", invocationResult: invocationResult, debouncingAsync: debouncingAsync, debouncingSync: debouncingSync, pending: p, propsIndicator: propsProgressIndicator }), jsx("div", { className: "document-field__toolbar shadow-sm" }), jsx("div", { className: "document-field__editable-container", children: jsx(CkEditorWrapper, { implementation: implementation ?? globalThis.CKEDITOR?.DecoupledEditor ?? globalThis.DecoupledEditor, toolbarItems: toolbarItems ?? DFDefaultItems, editorHandle: editorHandle, onFocusChange: setFocused, onValueChange: value => {
                                syncHandler(value);
                            }, valueHtml: (pending ? currentCapture : valueHtml) || "", onReady: editor => {
                                const toolbarContainer = document.querySelector('.document-field__toolbar');
                                toolbarContainer?.appendChild(editor.ui.view.toolbar.element);
                            }, ...props, children: jsx("div", { className: "document-field__editable" }) }) })] }));
        } }));
}

/*! @license DOMPurify 3.1.2 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.2/LICENSE */

const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
let {
  freeze,
  seal,
  create
} = Object; // eslint-disable-line import/no-mutable-exports
let {
  apply,
  construct
} = typeof Reflect !== 'undefined' && Reflect;
if (!freeze) {
  freeze = function freeze(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal(x) {
    return x;
  };
}
if (!apply) {
  apply = function apply(fun, thisValue, args) {
    return fun.apply(thisValue, args);
  };
}
if (!construct) {
  construct = function construct(Func, args) {
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);

/**
 * Creates a new function that calls the given function with a specified thisArg and arguments.
 *
 * @param {Function} func - The function to be wrapped and called.
 * @returns {Function} A new function that calls the given function with a specified thisArg and arguments.
 */
function unapply(func) {
  return function (thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return apply(func, thisArg, args);
  };
}

/**
 * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
 *
 * @param {Function} func - The constructor function to be wrapped and called.
 * @returns {Function} A new function that constructs an instance of the given constructor function with the provided arguments.
 */
function unconstruct(func) {
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return construct(func, args);
  };
}

/**
 * Add properties to a lookup table
 *
 * @param {Object} set - The set to which elements will be added.
 * @param {Array} array - The array containing elements to be added to the set.
 * @param {Function} transformCaseFunc - An optional function to transform the case of each element before adding to the set.
 * @returns {Object} The modified set with added elements.
 */
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    // Make 'in' and truthy checks like Boolean(set.constructor)
    // independent of any properties defined on Object.prototype.
    // Prevent prototype setters from intercepting set as a this value.
    setPrototypeOf(set, null);
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === 'string') {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        // Config presets (e.g. tags.js, attrs.js) are immutable.
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}

/**
 * Clean up an array to harden against CSPP
 *
 * @param {Array} array - The array to be cleaned.
 * @returns {Array} The cleaned version of the array
 */
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}

/**
 * Shallow clone an object
 *
 * @param {Object} object - The object to be cloned.
 * @returns {Object} A new object that copies the original.
 */
function clone(object) {
  const newObject = create(null);
  for (const [property, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (Array.isArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === 'object' && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}

/**
 * This method automatically checks if the prop is function or getter and behaves accordingly.
 *
 * @param {Object} object - The object to look up the getter function in its prototype chain.
 * @param {String} prop - The property name for which to find the getter function.
 * @returns {Function} The getter function found in the prototype chain or a fallback function.
 */
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === 'function') {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}

const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);

// SVG
const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);

// List of SVG elements that are disallowed by default.
// We still need to know them so that we can do namespace
// checks properly in case one wants to add them to
// allow-list.
const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']);

// Similarly to SVG, we want to know all MathML elements,
// even those that we disallow by default.
const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
const text = freeze(['#text']);

const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'wrap', 'xmlns', 'slot']);
const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

// eslint-disable-next-line unicorn/better-regex
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape
const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
);

const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
);

const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);

var EXPRESSIONS = /*#__PURE__*/Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: MUSTACHE_EXPR,
  ERB_EXPR: ERB_EXPR,
  TMPLIT_EXPR: TMPLIT_EXPR,
  DATA_ATTR: DATA_ATTR,
  ARIA_ATTR: ARIA_ATTR,
  IS_ALLOWED_URI: IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
  ATTR_WHITESPACE: ATTR_WHITESPACE,
  DOCTYPE_NAME: DOCTYPE_NAME,
  CUSTOM_ELEMENT: CUSTOM_ELEMENT
});

const getGlobal = function getGlobal() {
  return typeof window === 'undefined' ? null : window;
};

/**
 * Creates a no-op policy for internal use only.
 * Don't export this function outside this module!
 * @param {TrustedTypePolicyFactory} trustedTypes The policy factory.
 * @param {HTMLScriptElement} purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
 * @return {TrustedTypePolicy} The policy created (or null, if Trusted Types
 * are not supported or creating the policy failed).
 */
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
    return null;
  }

  // Allow the callers to control the unique policy name
  // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
  // Policy creation with duplicate names throws in Trusted Types.
  let suffix = null;
  const ATTR_NAME = 'data-tt-policy-suffix';
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html) {
        return html;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_) {
    // Policy creation failed (most likely another DOMPurify script has
    // already run). Skip creating the policy, as this will only cause errors
    // if TT are enforced.
    console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
    return null;
  }
};
function createDOMPurify() {
  let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
  const DOMPurify = root => createDOMPurify(root);

  /**
   * Version label, exposed for easier checks
   * if DOMPurify is up to date or not
   */
  DOMPurify.version = '3.1.2';

  /**
   * Array of elements that DOMPurify removed during sanitation.
   * Empty if nothing was removed.
   */
  DOMPurify.removed = [];
  if (!window || !window.document || window.document.nodeType !== 9) {
    // Not running in a browser, provide a factory function
    // so that you can pass your own Window
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document
  } = window;
  const originalDocument = document;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node,
    Element,
    NodeFilter,
    NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
  const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
  const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
  const getParentNode = lookupGetter(ElementPrototype, 'parentNode');

  // As per issue #47, the web-components registry is inherited by a
  // new document created via createHTMLDocument. As per the spec
  // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
  // a new empty registry is used when creating a template contents owner
  // document, so we use that as our parent document to ensure nothing
  // is inherited.
  if (typeof HTMLTemplateElement === 'function') {
    const template = document.createElement('template');
    if (template.content && template.content.ownerDocument) {
      document = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = '';
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document;
  const {
    importNode
  } = originalDocument;
  let hooks = {};

  /**
   * Expose whether this browser supports running the full DOMPurify.
   */
  DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
  const {
    MUSTACHE_EXPR,
    ERB_EXPR,
    TMPLIT_EXPR,
    DATA_ATTR,
    ARIA_ATTR,
    IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE,
    CUSTOM_ELEMENT
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;

  /**
   * We consider the elements and attributes below to be safe. Ideally
   * don't add any new ones but feel free to remove unwanted ones.
   */

  /* allowed element names */
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);

  /* Allowed attribute names */
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);

  /*
   * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
   * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
   * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
   * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
   */
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));

  /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
  let FORBID_TAGS = null;

  /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
  let FORBID_ATTR = null;

  /* Decide if ARIA attributes are okay */
  let ALLOW_ARIA_ATTR = true;

  /* Decide if custom data attributes are okay */
  let ALLOW_DATA_ATTR = true;

  /* Decide if unknown protocols are okay */
  let ALLOW_UNKNOWN_PROTOCOLS = false;

  /* Decide if self-closing tags in attributes are allowed.
   * Usually removed due to a mXSS issue in jQuery 3.0 */
  let ALLOW_SELF_CLOSE_IN_ATTR = true;

  /* Output should be safe for common template engines.
   * This means, DOMPurify removes data attributes, mustaches and ERB
   */
  let SAFE_FOR_TEMPLATES = false;

  /* Output should be safe even for XML used within HTML and alike.
   * This means, DOMPurify removes comments when containing risky content.
   */
  let SAFE_FOR_XML = true;

  /* Decide if document with <html>... should be returned */
  let WHOLE_DOCUMENT = false;

  /* Track whether config is already set on this instance of DOMPurify. */
  let SET_CONFIG = false;

  /* Decide if all elements (e.g. style, script) must be children of
   * document.body. By default, browsers might move them to document.head */
  let FORCE_BODY = false;

  /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
   * string (or a TrustedHTML object if Trusted Types are supported).
   * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
   */
  let RETURN_DOM = false;

  /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
   * string  (or a TrustedHTML object if Trusted Types are supported) */
  let RETURN_DOM_FRAGMENT = false;

  /* Try to return a Trusted Type object instead of a string, return a string in
   * case Trusted Types are not supported  */
  let RETURN_TRUSTED_TYPE = false;

  /* Output should be free from DOM clobbering attacks?
   * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
   */
  let SANITIZE_DOM = true;

  /* Achieve full DOM Clobbering protection by isolating the namespace of named
   * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
   *
   * HTML/DOM spec rules that enable DOM Clobbering:
   *   - Named Access on Window (§7.3.3)
   *   - DOM Tree Accessors (§3.1.5)
   *   - Form Element Parent-Child Relations (§4.10.3)
   *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
   *   - HTMLCollection (§4.2.10.2)
   *
   * Namespace isolation is implemented by prefixing `id` and `name` attributes
   * with a constant string, i.e., `user-content-`
   */
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';

  /* Keep element content when removing element? */
  let KEEP_CONTENT = true;

  /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
   * of importing it into a new Document and returning a sanitized copy */
  let IN_PLACE = false;

  /* Allow usage of profiles like html, svg and mathMl */
  let USE_PROFILES = {};

  /* Tags to ignore content of when KEEP_CONTENT is true */
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);

  /* Tags that are safe for data: URIs */
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);

  /* Attributes safe for values like "javascript:" */
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
  const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
  const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
  /* Document namespace */
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;

  /* Allowed XHTML+XML namespaces */
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);

  /* Parsing of strict XHTML documents */
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
  const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
  let transformCaseFunc = null;

  /* Keep a reference to config to pass to hooks */
  let CONFIG = null;

  /* Specify the maximum element nesting depth to prevent mXSS */
  const MAX_NESTING_DEPTH = 255;

  /* Ideally, do not touch anything below this line */
  /* ______________________________________________ */

  const formElement = document.createElement('form');
  const isRegexOrFunction = function isRegexOrFunction(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };

  /**
   * _parseConfig
   *
   * @param  {Object} cfg optional config literal
   */
  // eslint-disable-next-line complexity
  const _parseConfig = function _parseConfig() {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }

    /* Shield configuration object from tampering */
    if (!cfg || typeof cfg !== 'object') {
      cfg = {};
    }

    /* Shield configuration object from prototype pollution */
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE =
    // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;

    // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
    transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;

    /* Set configuration parameters */
    ALLOWED_TAGS = objectHasOwnProperty(cfg, 'ALLOWED_TAGS') ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, 'ALLOWED_ATTR') ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, 'ALLOWED_NAMESPACES') ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES),
    // eslint-disable-line indent
    cfg.ADD_URI_SAFE_ATTR,
    // eslint-disable-line indent
    transformCaseFunc // eslint-disable-line indent
    ) // eslint-disable-line indent
    : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, 'ADD_DATA_URI_TAGS') ? addToSet(clone(DEFAULT_DATA_URI_TAGS),
    // eslint-disable-line indent
    cfg.ADD_DATA_URI_TAGS,
    // eslint-disable-line indent
    transformCaseFunc // eslint-disable-line indent
    ) // eslint-disable-line indent
    : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, 'FORBID_CONTENTS') ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, 'FORBID_TAGS') ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
    FORBID_ATTR = objectHasOwnProperty(cfg, 'FORBID_ATTR') ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
    USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false; // Default true
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
    RETURN_DOM = cfg.RETURN_DOM || false; // Default false
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
    FORCE_BODY = cfg.FORCE_BODY || false; // Default false
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
    IN_PLACE = cfg.IN_PLACE || false; // Default false
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }

    /* Parse profile info */
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }

    /* Merge configuration parameters */
    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone(ALLOWED_TAGS);
      }
      addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
    }
    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone(ALLOWED_ATTR);
      }
      addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }

    /* Add #text in case KEEP_CONTENT is set to true */
    if (KEEP_CONTENT) {
      ALLOWED_TAGS['#text'] = true;
    }

    /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
    }

    /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ['tbody']);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }

      // Overwrite existing TrustedTypes policy.
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;

      // Sign local variables required by `sanitize`.
      emptyHTML = trustedTypesPolicy.createHTML('');
    } else {
      // Uninitialized policy, attempt to initialize the internal dompurify policy.
      if (trustedTypesPolicy === undefined) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }

      // If creating the internal policy succeeded sign internal variables.
      if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') {
        emptyHTML = trustedTypesPolicy.createHTML('');
      }
    }

    // Prevent further manipulation of configuration.
    // Not available in IE8, Safari 5, etc.
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  const MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
  const HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'annotation-xml']);

  // Certain elements are allowed in both SVG and HTML
  // namespace. We need to specify them explicitly
  // so that they don't get erroneously deleted from
  // HTML namespace.
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);

  /* Keep track of all possible SVG and MathML tags
   * so that we can perform the namespace checks
   * correctly. */
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);

  /**
   * @param  {Element} element a DOM element whose namespace is being checked
   * @returns {boolean} Return false if the element has a
   *  namespace that a spec-compliant parser would never
   *  return. Return true otherwise.
   */
  const _checkValidNamespace = function _checkValidNamespace(element) {
    let parent = getParentNode(element);

    // In JSDOM, if we're inside shadow DOM, then parentNode
    // can be null. We just simulate parent in this case.
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: 'template'
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      // The only way to switch from HTML namespace to SVG
      // is via <svg>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'svg';
      }

      // The only way to switch from MathML to SVG is via`
      // svg if parent is either <annotation-xml> or MathML
      // text integration points.
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }

      // We only allow elements that are defined in SVG
      // spec. All others are disallowed in SVG namespace.
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      // The only way to switch from HTML namespace to MathML
      // is via <math>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'math';
      }

      // The only way to switch from SVG to MathML is via
      // <math> and HTML integration points
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
      }

      // We only allow elements that are defined in MathML
      // spec. All others are disallowed in MathML namespace.
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      // The only way to switch from SVG to HTML is via
      // HTML integration points, and from MathML to HTML
      // is via MathML text integration points
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }

      // We disallow tags that are specific for MathML
      // or SVG and should never appear in HTML namespace
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }

    // For XHTML and XML documents that support custom namespaces
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }

    // The code should never reach this place (this means
    // that the element somehow got namespace that is not
    // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
    // Return false just in case.
    return false;
  };

  /**
   * _forceRemove
   *
   * @param  {Node} node a DOM node
   */
  const _forceRemove = function _forceRemove(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      node.parentNode.removeChild(node);
    } catch (_) {
      node.remove();
    }
  };

  /**
   * _removeAttribute
   *
   * @param  {String} name an Attribute name
   * @param  {Node} node a DOM node
   */
  const _removeAttribute = function _removeAttribute(name, node) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: node.getAttributeNode(name),
        from: node
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: node
      });
    }
    node.removeAttribute(name);

    // We void attribute values for unremovable "is"" attributes
    if (name === 'is' && !ALLOWED_ATTR[name]) {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(node);
        } catch (_) {}
      } else {
        try {
          node.setAttribute(name, '');
        } catch (_) {}
      }
    }
  };

  /**
   * _initDocument
   *
   * @param  {String} dirty a string of dirty markup
   * @return {Document} a DOM, filled with the dirty markup
   */
  const _initDocument = function _initDocument(dirty) {
    /* Create a HTML document */
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = '<remove></remove>' + dirty;
    } else {
      /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
      // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    /*
     * Use the DOMParser API by default, fallback later if needs be
     * DOMParser not work for svg when has multiple root element.
     */
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {}
    }

    /* Use createHTMLDocument in case DOMParser is not available */
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, 'template', null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_) {
        // Syntax error if dirtyPayload is invalid xml
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }

    /* Work on whole document or just its body */
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };

  /**
   * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
   *
   * @param  {Node} root The root element or node to start traversing on.
   * @return {NodeIterator} The created NodeIterator
   */
  const _createNodeIterator = function _createNodeIterator(root) {
    return createNodeIterator.call(root.ownerDocument || root, root,
    // eslint-disable-next-line no-bitwise
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
  };

  /**
   * _isClobbered
   *
   * @param  {Node} elm element to check for clobbering attacks
   * @return {Boolean} true if clobbered, false if safe
   */
  const _isClobbered = function _isClobbered(elm) {
    return elm instanceof HTMLFormElement && (
    // eslint-disable-next-line unicorn/no-typeof-undefined
    typeof elm.__depth !== 'undefined' && typeof elm.__depth !== 'number' ||
    // eslint-disable-next-line unicorn/no-typeof-undefined
    typeof elm.__removalCount !== 'undefined' && typeof elm.__removalCount !== 'number' || typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function' || typeof elm.hasChildNodes !== 'function');
  };

  /**
   * Checks whether the given object is a DOM node.
   *
   * @param  {Node} object object to check whether it's a DOM node
   * @return {Boolean} true is object is a DOM node
   */
  const _isNode = function _isNode(object) {
    return typeof Node === 'function' && object instanceof Node;
  };

  /**
   * _executeHook
   * Execute user configurable hooks
   *
   * @param  {String} entryPoint  Name of the hook's entry point
   * @param  {Node} currentNode node to work on with the hook
   * @param  {Object} data additional hook parameters
   */
  const _executeHook = function _executeHook(entryPoint, currentNode, data) {
    if (!hooks[entryPoint]) {
      return;
    }
    arrayForEach(hooks[entryPoint], hook => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  };

  /**
   * _sanitizeElements
   *
   * @protect nodeName
   * @protect textContent
   * @protect removeChild
   *
   * @param   {Node} currentNode to check for permission to exist
   * @return  {Boolean} true if node was killed, false if left alive
   */
  const _sanitizeElements = function _sanitizeElements(currentNode) {
    let content = null;

    /* Execute a hook if present */
    _executeHook('beforeSanitizeElements', currentNode, null);

    /* Check if element is clobbered or can clobber */
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Now let's check the element's type and name */
    const tagName = transformCaseFunc(currentNode.nodeName);

    /* Execute a hook if present */
    _executeHook('uponSanitizeElement', currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });

    /* Detect mXSS attempts abusing namespace confusion */
    if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Remove any ocurrence of processing instructions */
    if (currentNode.nodeType === 7) {
      _forceRemove(currentNode);
      return true;
    }

    /* Remove any kind of possibly harmful comments */
    if (SAFE_FOR_XML && currentNode.nodeType === 8 && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Remove element if anything forbids its presence */
    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      /* Check if we have a custom element to handle */
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }

      /* Keep content except for bad-listed elements */
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const childClone = cloneNode(childNodes[i], true);
            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }

    /* Check whether element has a valid namespace */
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Make sure that older browsers don't get fallback-tag mXSS */
    if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Sanitize element content to be template-safe */
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
      /* Get the element's text content */
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
        content = stringReplace(content, expr, ' ');
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeElements', currentNode, null);
    return false;
  };

  /**
   * _isValidAttribute
   *
   * @param  {string} lcTag Lowercase tag name of containing element.
   * @param  {string} lcName Lowercase attribute name.
   * @param  {string} value Attribute value.
   * @return {Boolean} Returns true if `value` is valid, otherwise false.
   */
  // eslint-disable-next-line complexity
  const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
    /* Make sure attribute cannot clobber */
    if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
      return false;
    }

    /* Allow valid data-* attributes: At least one character after "-"
        (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
        XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
        We don't need to check the value; it's always URI safe. */
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
      // First condition does a very basic check if a) it's basically a valid custom element tagname AND
      // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
      _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) ||
      // Alternative, second condition checks if it's an `is`-attribute, AND
      // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
        return false;
      }
      /* Check value is safe. First, is attr inert? If so, is safe */
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if (value) {
      return false;
    } else ;
    return true;
  };

  /**
   * _isBasicCustomElement
   * checks if at least one dash is included in tagName, and it's not the first char
   * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
   *
   * @param {string} tagName name of the tag of the node to sanitize
   * @returns {boolean} Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
   */
  const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
    return tagName !== 'annotation-xml' && stringMatch(tagName, CUSTOM_ELEMENT);
  };

  /**
   * _sanitizeAttributes
   *
   * @protect attributes
   * @protect nodeName
   * @protect removeAttribute
   * @protect setAttribute
   *
   * @param  {Node} currentNode to sanitize
   */
  const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
    /* Execute a hook if present */
    _executeHook('beforeSanitizeAttributes', currentNode, null);
    const {
      attributes
    } = currentNode;

    /* Check if we have attributes; if not we might have a text node */
    if (!attributes) {
      return;
    }
    const hookEvent = {
      attrName: '',
      attrValue: '',
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR
    };
    let l = attributes.length;

    /* Go backwards over all attributes; safely remove bad ones */
    while (l--) {
      const attr = attributes[l];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      let value = name === 'value' ? attrValue : stringTrim(attrValue);

      /* Execute a hook if present */
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
      _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
      value = hookEvent.attrValue;
      /* Did the hooks approve of the attribute? */
      if (hookEvent.forceKeepAttr) {
        continue;
      }

      /* Remove attribute */
      _removeAttribute(name, currentNode);

      /* Did the hooks approve of the attribute? */
      if (!hookEvent.keepAttr) {
        continue;
      }

      /* Work around a security issue in jQuery 3.0 */
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }

      /* Sanitize attribute content to be template-safe */
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          value = stringReplace(value, expr, ' ');
        });
      }

      /* Is `value` valid for this attribute? */
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        continue;
      }

      /* Full DOM Clobbering protection via namespace isolation,
       * Prefix id and name attributes with `user-content-`
       */
      if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
        // Remove the attribute with this value
        _removeAttribute(name, currentNode);

        // Prefix the value and later re-create the attribute with the sanitized value
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }

      /* Handle attributes that require Trusted Types */
      if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
        if (namespaceURI) ; else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case 'TrustedHTML':
              {
                value = trustedTypesPolicy.createHTML(value);
                break;
              }
            case 'TrustedScriptURL':
              {
                value = trustedTypesPolicy.createScriptURL(value);
                break;
              }
          }
        }
      }

      /* Handle invalid data-* attribute set by try-catching it */
      try {
        if (namespaceURI) {
          currentNode.setAttributeNS(namespaceURI, name, value);
        } else {
          /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
          currentNode.setAttribute(name, value);
        }
        arrayPop(DOMPurify.removed);
      } catch (_) {}
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeAttributes', currentNode, null);
  };

  /**
   * _sanitizeShadowDOM
   *
   * @param  {DocumentFragment} fragment to iterate over recursively
   */
  const _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);

    /* Execute a hook if present */
    _executeHook('beforeSanitizeShadowDOM', fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      /* Execute a hook if present */
      _executeHook('uponSanitizeShadowNode', shadowNode, null);

      /* Sanitize tags and elements */
      if (_sanitizeElements(shadowNode)) {
        continue;
      }
      const parentNode = getParentNode(shadowNode);

      /* Set the nesting depth of an element */
      if (shadowNode.nodeType === 1) {
        if (parentNode && parentNode.__depth) {
          /*
            We want the depth of the node in the original tree, which can
            change when it's removed from its parent.
          */
          shadowNode.__depth = (shadowNode.__removalCount || 0) + parentNode.__depth + 1;
        } else {
          shadowNode.__depth = 1;
        }
      }

      /* Remove an element if nested too deeply to avoid mXSS */
      if (shadowNode.__depth >= MAX_NESTING_DEPTH) {
        _forceRemove(shadowNode);
      }

      /* Deep shadow DOM detected */
      if (shadowNode.content instanceof DocumentFragment) {
        shadowNode.content.__depth = shadowNode.__depth;
        _sanitizeShadowDOM(shadowNode.content);
      }

      /* Check attributes, sanitize if necessary */
      _sanitizeAttributes(shadowNode);
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeShadowDOM', fragment, null);
  };

  /**
   * Sanitize
   * Public method providing core sanitation functionality
   *
   * @param {String|Node} dirty string or DOM node
   * @param {Object} cfg object
   */
  // eslint-disable-next-line complexity
  DOMPurify.sanitize = function (dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    /* Make sure we have a string to sanitize.
      DO NOT return early, as this will return the wrong type if
      the user has requested a DOM object rather than a string */
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = '<!-->';
    }

    /* Stringify, in case dirty is an object */
    if (typeof dirty !== 'string' && !_isNode(dirty)) {
      if (typeof dirty.toString === 'function') {
        dirty = dirty.toString();
        if (typeof dirty !== 'string') {
          throw typeErrorCreate('dirty is not a string, aborting');
        }
      } else {
        throw typeErrorCreate('toString is not a function');
      }
    }

    /* Return dirty HTML if DOMPurify cannot run */
    if (!DOMPurify.isSupported) {
      return dirty;
    }

    /* Assign config vars */
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }

    /* Clean up removed elements */
    DOMPurify.removed = [];

    /* Check if dirty is correctly typed for IN_PLACE */
    if (typeof dirty === 'string') {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      /* Do some early pre-sanitization to avoid unsafe root nodes */
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
        }
      }
    } else if (dirty instanceof Node) {
      /* If dirty is a DOM element, append to an empty document to avoid
         elements being stripped by the parser */
      body = _initDocument('<!---->');
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
        /* Node is already a body, use as is */
        body = importedNode;
      } else if (importedNode.nodeName === 'HTML') {
        body = importedNode;
      } else {
        // eslint-disable-next-line unicorn/prefer-dom-node-append
        body.appendChild(importedNode);
      }
    } else {
      /* Exit directly if we have nothing to do */
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
      // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf('<') === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }

      /* Initialize the document to work on */
      body = _initDocument(dirty);

      /* Check we have a DOM node from the data */
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
      }
    }

    /* Remove first element node (ours) if FORCE_BODY is set */
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }

    /* Get node iterator */
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);

    /* Now start iterating over the created document */
    while (currentNode = nodeIterator.nextNode()) {
      /* Sanitize tags and elements */
      if (_sanitizeElements(currentNode)) {
        continue;
      }
      const parentNode = getParentNode(currentNode);

      /* Set the nesting depth of an element */
      if (currentNode.nodeType === 1) {
        if (parentNode && parentNode.__depth) {
          /*
            We want the depth of the node in the original tree, which can
            change when it's removed from its parent.
          */
          currentNode.__depth = (currentNode.__removalCount || 0) + parentNode.__depth + 1;
        } else {
          currentNode.__depth = 1;
        }
      }

      /* Remove an element if nested too deeply to avoid mXSS */
      if (currentNode.__depth >= MAX_NESTING_DEPTH) {
        _forceRemove(currentNode);
      }

      /* Shadow DOM detected, sanitize it */
      if (currentNode.content instanceof DocumentFragment) {
        currentNode.content.__depth = currentNode.__depth;
        _sanitizeShadowDOM(currentNode.content);
      }

      /* Check attributes, sanitize if necessary */
      _sanitizeAttributes(currentNode);
    }

    /* If we sanitized `dirty` in-place, return it. */
    if (IN_PLACE) {
      return dirty;
    }

    /* Return sanitized string or DOM */
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        /*
          AdoptNode() is not used because internal state is not reset
          (e.g. the past names map of a HTMLFormElement), this is safe
          in theory but we would rather not risk another attack vector.
          The state that is cloned by importNode() is explicitly defined
          by the specs.
        */
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;

    /* Serialize doctype if allowed */
    if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
    }

    /* Sanitize final string template-safe */
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
        serializedHTML = stringReplace(serializedHTML, expr, ' ');
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };

  /**
   * Public method to set the configuration once
   * setConfig
   *
   * @param {Object} cfg configuration object
   */
  DOMPurify.setConfig = function () {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };

  /**
   * Public method to remove the configuration
   * clearConfig
   *
   */
  DOMPurify.clearConfig = function () {
    CONFIG = null;
    SET_CONFIG = false;
  };

  /**
   * Public method to check if an attribute value is valid.
   * Uses last set config, if any. Otherwise, uses config defaults.
   * isValidAttribute
   *
   * @param  {String} tag Tag name of containing element.
   * @param  {String} attr Attribute name.
   * @param  {String} value Attribute value.
   * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
   */
  DOMPurify.isValidAttribute = function (tag, attr, value) {
    /* Initialize shared config vars if necessary. */
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };

  /**
   * AddHook
   * Public method to add DOMPurify hooks
   *
   * @param {String} entryPoint entry point for the hook to add
   * @param {Function} hookFunction function to execute
   */
  DOMPurify.addHook = function (entryPoint, hookFunction) {
    if (typeof hookFunction !== 'function') {
      return;
    }
    hooks[entryPoint] = hooks[entryPoint] || [];
    arrayPush(hooks[entryPoint], hookFunction);
  };

  /**
   * RemoveHook
   * Public method to remove a DOMPurify hook at a given entryPoint
   * (pops it from the stack of hooks if more are present)
   *
   * @param {String} entryPoint entry point for the hook to remove
   * @return {Function} removed(popped) hook
   */
  DOMPurify.removeHook = function (entryPoint) {
    if (hooks[entryPoint]) {
      return arrayPop(hooks[entryPoint]);
    }
  };

  /**
   * RemoveHooks
   * Public method to remove all DOMPurify hooks at a given entryPoint
   *
   * @param  {String} entryPoint entry point for the hooks to remove
   */
  DOMPurify.removeHooks = function (entryPoint) {
    if (hooks[entryPoint]) {
      hooks[entryPoint] = [];
    }
  };

  /**
   * RemoveAllHooks
   * Public method to remove all DOMPurify hooks
   */
  DOMPurify.removeAllHooks = function () {
    hooks = {};
  };
  return DOMPurify;
}
var purify = createDOMPurify();

var n,l$1,u$1,i$1,o,r$1,f$1,e$1,c$1,s$1,h={},v$1=[],p=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,y=Array.isArray;function d$1(n,l){for(var u in l)n[u]=l[u];return n}function _(n){var l=n.parentNode;l&&l.removeChild(n);}function g$1(l,u,t){var i,o,r,f={};for(r in u)"key"==r?i=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return k$1(l,f,i,o,null)}function k$1(n,t,i,o,r){var f={type:n,props:t,key:i,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:null==r?++u$1:r,__i:-1,__u:0};return null==r&&null!=l$1.vnode&&l$1.vnode(f),f}function m$1(n){return n.children}function w$1(n,l){this.props=n,this.context=l;}function C$1(n,l){if(null==l)return n.__?C$1(n.__,n.__i+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?C$1(n):null}function x$1(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return x$1(n)}}function P(n){(!n.__d&&(n.__d=!0)&&i$1.push(n)&&!S.__r++||o!==l$1.debounceRendering)&&((o=l$1.debounceRendering)||r$1)(S);}function S(){var n,u,t,o,r,e,c,s;for(i$1.sort(f$1);n=i$1.shift();)n.__d&&(u=i$1.length,o=void 0,e=(r=(t=n).__v).__e,c=[],s=[],t.__P&&((o=d$1({},r)).__v=r.__v+1,l$1.vnode&&l$1.vnode(o),O$1(t.__P,o,r,t.__n,void 0!==t.__P.ownerSVGElement,32&r.__u?[e]:null,c,null==e?C$1(r):e,!!(32&r.__u),s),o.__v=r.__v,o.__.__k[o.__i]=o,j$1(c,o,s),o.__e!=e&&x$1(o)),i$1.length>u&&i$1.sort(f$1));S.__r=0;}function $$1(n,l,u,t,i,o,r,f,e,c,s){var a,p,y,d,_,g=t&&t.__k||v$1,k=l.length;for(u.__d=e,I(u,l,g),e=u.__d,a=0;a<k;a++)null!=(y=u.__k[a])&&"boolean"!=typeof y&&"function"!=typeof y&&(p=-1===y.__i?h:g[y.__i]||h,y.__i=a,O$1(n,y,p,i,o,r,f,e,c,s),d=y.__e,y.ref&&p.ref!=y.ref&&(p.ref&&N(p.ref,null,y),s.push(y.ref,y.__c||d,y)),null==_&&null!=d&&(_=d),65536&y.__u||p.__k===y.__k?(e&&!e.isConnected&&(e=C$1(p)),e=H$1(y,e,n)):"function"==typeof y.type&&void 0!==y.__d?e=y.__d:d&&(e=d.nextSibling),y.__d=void 0,y.__u&=-196609);u.__d=e,u.__e=_;}function I(n,l,u){var t,i,o,r,f,e=l.length,c=u.length,s=c,a=0;for(n.__k=[],t=0;t<e;t++)r=t+a,null!=(i=n.__k[t]=null==(i=l[t])||"boolean"==typeof i||"function"==typeof i?null:"string"==typeof i||"number"==typeof i||"bigint"==typeof i||i.constructor==String?k$1(null,i,null,null,null):y(i)?k$1(m$1,{children:i},null,null,null):void 0===i.constructor&&i.__b>0?k$1(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):i)?(i.__=n,i.__b=n.__b+1,f=A$1(i,u,r,s),i.__i=f,o=null,-1!==f&&(s--,(o=u[f])&&(o.__u|=131072)),null==o||null===o.__v?(-1==f&&a--,"function"!=typeof i.type&&(i.__u|=65536)):f!==r&&(f===r+1?a++:f>r?s>e-r?a+=f-r:a--:f<r?f==r-1&&(a=f-r):a=0,f!==t+a&&(i.__u|=65536))):(o=u[r])&&null==o.key&&o.__e&&0==(131072&o.__u)&&(o.__e==n.__d&&(n.__d=C$1(o)),V$1(o,o,!1),u[r]=null,s--);if(s)for(t=0;t<c;t++)null!=(o=u[t])&&0==(131072&o.__u)&&(o.__e==n.__d&&(n.__d=C$1(o)),V$1(o,o));}function H$1(n,l,u){var t,i;if("function"==typeof n.type){for(t=n.__k,i=0;t&&i<t.length;i++)t[i]&&(t[i].__=n,l=H$1(t[i],l,u));return l}n.__e!=l&&(u.insertBefore(n.__e,l||null),l=n.__e);do{l=l&&l.nextSibling;}while(null!=l&&8===l.nodeType);return l}function T$1(n,l){return l=l||[],null==n||"boolean"==typeof n||(y(n)?n.some(function(n){T$1(n,l);}):l.push(n)),l}function A$1(n,l,u,t){var i=n.key,o=n.type,r=u-1,f=u+1,e=l[u];if(null===e||e&&i==e.key&&o===e.type&&0==(131072&e.__u))return u;if(t>(null!=e&&0==(131072&e.__u)?1:0))for(;r>=0||f<l.length;){if(r>=0){if((e=l[r])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return r;r--;}if(f<l.length){if((e=l[f])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return f;f++;}}return -1}function F(n,l,u){"-"===l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||p.test(l)?u:u+"px";}function L$1(n,l,u,t,i){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||F(n.style,l,"");if(u)for(l in u)t&&u[l]===t[l]||F(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/(PointerCapture)$|Capture$/i,"$1")),l=l.toLowerCase()in n||"onFocusOut"===l||"onFocusIn"===l?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?t?u.u=t.u:(u.u=e$1,n.addEventListener(l,o?s$1:c$1,o)):n.removeEventListener(l,o?s$1:c$1,o);else {if(i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=l&&"height"!=l&&"href"!=l&&"list"!=l&&"form"!=l&&"tabIndex"!=l&&"download"!=l&&"rowSpan"!=l&&"colSpan"!=l&&"role"!=l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||!1===u&&"-"!==l[4]?n.removeAttribute(l):n.setAttribute(l,u));}}function M$1(n){return function(u){if(this.l){var t=this.l[u.type+n];if(null==u.t)u.t=e$1++;else if(u.t<t.u)return;return t(l$1.event?l$1.event(u):u)}}}function O$1(n,u,t,i,o,r,f,e,c,s){var a,h,v,p,_,g,k,b,C,x,P,S,I,H,T,A=u.type;if(void 0!==u.constructor)return null;128&t.__u&&(c=!!(32&t.__u),r=[e=u.__e=t.__e]),(a=l$1.__b)&&a(u);n:if("function"==typeof A)try{if(b=u.props,C=(a=A.contextType)&&i[a.__c],x=a?C?C.props.value:a.__:i,t.__c?k=(h=u.__c=t.__c).__=h.__E:("prototype"in A&&A.prototype.render?u.__c=h=new A(b,x):(u.__c=h=new w$1(b,x),h.constructor=A,h.render=q),C&&C.sub(h),h.props=b,h.state||(h.state={}),h.context=x,h.__n=i,v=h.__d=!0,h.__h=[],h._sb=[]),null==h.__s&&(h.__s=h.state),null!=A.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=d$1({},h.__s)),d$1(h.__s,A.getDerivedStateFromProps(b,h.__s))),p=h.props,_=h.state,h.__v=u,v)null==A.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else {if(null==A.getDerivedStateFromProps&&b!==p&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(b,x),!h.__e&&(null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(b,h.__s,x)||u.__v===t.__v)){for(u.__v!==t.__v&&(h.props=b,h.state=h.__s,h.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.forEach(function(n){n&&(n.__=u);}),P=0;P<h._sb.length;P++)h.__h.push(h._sb[P]);h._sb=[],h.__h.length&&f.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(b,h.__s,x),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(p,_,g);});}if(h.context=x,h.props=b,h.__P=n,h.__e=!1,S=l$1.__r,I=0,"prototype"in A&&A.prototype.render){for(h.state=h.__s,h.__d=!1,S&&S(u),a=h.render(h.props,h.state,h.context),H=0;H<h._sb.length;H++)h.__h.push(h._sb[H]);h._sb=[];}else do{h.__d=!1,S&&S(u),a=h.render(h.props,h.state,h.context),h.state=h.__s;}while(h.__d&&++I<25);h.state=h.__s,null!=h.getChildContext&&(i=d$1(d$1({},i),h.getChildContext())),v||null==h.getSnapshotBeforeUpdate||(g=h.getSnapshotBeforeUpdate(p,_)),$$1(n,y(T=null!=a&&a.type===m$1&&null==a.key?a.props.children:a)?T:[T],u,t,i,o,r,f,e,c,s),h.base=u.__e,u.__u&=-161,h.__h.length&&f.push(h),k&&(h.__E=h.__=null);}catch(n){u.__v=null,c||null!=r?(u.__e=e,u.__u|=c?160:32,r[r.indexOf(e)]=null):(u.__e=t.__e,u.__k=t.__k),l$1.__e(n,u,t);}else null==r&&u.__v===t.__v?(u.__k=t.__k,u.__e=t.__e):u.__e=z$2(t.__e,u,t,i,o,r,f,c,s);(a=l$1.diffed)&&a(u);}function j$1(n,u,t){u.__d=void 0;for(var i=0;i<t.length;i++)N(t[i],t[++i],t[++i]);l$1.__c&&l$1.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l$1.__e(n,u.__v);}});}function z$2(l,u,t,i,o,r,f,e,c){var s,a,v,p,d,g,k,b=t.props,m=u.props,w=u.type;if("svg"===w&&(o=!0),null!=r)for(s=0;s<r.length;s++)if((d=r[s])&&"setAttribute"in d==!!w&&(w?d.localName===w:3===d.nodeType)){l=d,r[s]=null;break}if(null==l){if(null===w)return document.createTextNode(m);l=o?document.createElementNS("http://www.w3.org/2000/svg",w):document.createElement(w,m.is&&m),r=null,e=!1;}if(null===w)b===m||e&&l.data===m||(l.data=m);else {if(r=r&&n.call(l.childNodes),b=t.props||h,!e&&null!=r)for(b={},s=0;s<l.attributes.length;s++)b[(d=l.attributes[s]).name]=d.value;for(s in b)if(d=b[s],"children"==s);else if("dangerouslySetInnerHTML"==s)v=d;else if("key"!==s&&!(s in m)){if("value"==s&&"defaultValue"in m||"checked"==s&&"defaultChecked"in m)continue;L$1(l,s,null,d,o);}for(s in m)d=m[s],"children"==s?p=d:"dangerouslySetInnerHTML"==s?a=d:"value"==s?g=d:"checked"==s?k=d:"key"===s||e&&"function"!=typeof d||b[s]===d||L$1(l,s,d,b[s],o);if(a)e||v&&(a.__html===v.__html||a.__html===l.innerHTML)||(l.innerHTML=a.__html),u.__k=[];else if(v&&(l.innerHTML=""),$$1(l,y(p)?p:[p],u,t,i,o&&"foreignObject"!==w,r,f,r?r[0]:t.__k&&C$1(t,0),e,c),null!=r)for(s=r.length;s--;)null!=r[s]&&_(r[s]);e||(s="value",void 0!==g&&(g!==l[s]||"progress"===w&&!g||"option"===w&&g!==b[s])&&L$1(l,s,g,b[s],!1),s="checked",void 0!==k&&k!==l[s]&&L$1(l,s,k,b[s],!1));}return l}function N(n,u,t){try{"function"==typeof n?n(u):n.current=u;}catch(n){l$1.__e(n,t);}}function V$1(n,u,t){var i,o;if(l$1.unmount&&l$1.unmount(n),(i=n.ref)&&(i.current&&i.current!==n.__e||N(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount();}catch(n){l$1.__e(n,u);}i.base=i.__P=null;}if(i=n.__k)for(o=0;o<i.length;o++)i[o]&&V$1(i[o],u,t||"function"!=typeof n.type);t||null==n.__e||_(n.__e),n.__c=n.__=n.__e=n.__d=void 0;}function q(n,l,u){return this.constructor(n,u)}n=v$1.slice,l$1={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l;}throw n}},u$1=0,w$1.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=d$1({},this.state),"function"==typeof n&&(n=n(d$1({},u),this.props)),n&&d$1(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),P(this));},w$1.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),P(this));},w$1.prototype.render=m$1,i$1=[],r$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,f$1=function(n,l){return n.__v.__b-l.__v.__b},S.__r=0,e$1=0,c$1=M$1(!1),s$1=M$1(!0);

var r,u,i,f=[],c=[],e=l$1,a=e.__b,v=e.__r,l=e.diffed,m=e.__c,s=e.unmount,d=e.__;function j(){for(var n;n=f.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(z$1),n.__H.__h.forEach(B$1),n.__H.__h=[];}catch(t){n.__H.__h=[],e.__e(t,n.__v);}}e.__b=function(n){r=null,a&&a(n);},e.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),d&&d(n,t);},e.__r=function(n){v&&v(n);var i=(r=n.__c).__H;i&&(u===r?(i.__h=[],r.__h=[],i.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=c,n.__N=n.i=void 0;})):(i.__h.forEach(z$1),i.__h.forEach(B$1),i.__h=[],0)),u=r;},e.diffed=function(n){l&&l(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(1!==f.push(t)&&i===e.requestAnimationFrame||((i=e.requestAnimationFrame)||w)(j)),t.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==c&&(n.__=n.__V),n.i=void 0,n.__V=c;})),u=r=null;},e.__c=function(n,t){t.some(function(n){try{n.__h.forEach(z$1),n.__h=n.__h.filter(function(n){return !n.__||B$1(n)});}catch(r){t.some(function(n){n.__h&&(n.__h=[]);}),t=[],e.__e(r,n.__v);}}),m&&m(n,t);},e.unmount=function(n){s&&s(n);var t,r=n.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{z$1(n);}catch(n){t=n;}}),r.__H=void 0,t&&e.__e(t,r.__v));};var k="function"==typeof requestAnimationFrame;function w(n){var t,r=function(){clearTimeout(u),k&&cancelAnimationFrame(t),setTimeout(n);},u=setTimeout(r,100);k&&(t=requestAnimationFrame(r));}function z$1(n){var t=r,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),r=t;}function B$1(n){var t=r;n.__c=n.__(),r=t;}

function g(n,t){for(var e in t)n[e]=t[e];return n}function E(n,t){for(var e in n)if("__source"!==e&&!(e in t))return !0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return !0;return !1}function C(n,t){this.props=n,this.context=t;}function x(n,e){function r(n){var t=this.props.ref,r=t==n.ref;return !r&&t&&(t.call?t(null):t.current=null),e?!e(this.props,n)||!r:E(this.props,n)}function u(e){return this.shouldComponentUpdate=r,g$1(n,e)}return u.displayName="Memo("+(n.displayName||n.name)+")",u.prototype.isReactComponent=!0,u.__f=!0,u}(C.prototype=new w$1).isPureReactComponent=!0,C.prototype.shouldComponentUpdate=function(n,t){return E(this.props,n)||E(this.state,t)};var R=l$1.__b;l$1.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),R&&R(n);};var M=l$1.__e;l$1.__e=function(n,t,e,r){if(n.then)for(var u,o=t;o=o.__;)if((u=o.__c)&&u.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),u.__c(n,t);M(n,t,e,r);};var T=l$1.unmount;function A(n,t,e){return n&&(n.__c&&n.__c.__H&&(n.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c();}),n.__c.__H=null),null!=(n=g({},n)).__c&&(n.__c.__P===e&&(n.__c.__P=t),n.__c=null),n.__k=n.__k&&n.__k.map(function(n){return A(n,t,e)})),n}function D(n,t,e){return n&&e&&(n.__v=null,n.__k=n.__k&&n.__k.map(function(n){return D(n,t,e)}),n.__c&&n.__c.__P===t&&(n.__e&&e.appendChild(n.__e),n.__c.__e=!0,n.__c.__P=e)),n}function L(){this.__u=0,this.t=null,this.__b=null;}function O(n){var t=n.__.__c;return t&&t.__a&&t.__a(n)}function U(){this.u=null,this.o=null;}l$1.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&32&n.__u&&(n.type=null),T&&T(n);},(L.prototype=new w$1).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=O(r.__v),o=!1,i=function(){o||(o=!0,e.__R=null,u?u(l):l());};e.__R=i;var l=function(){if(!--r.__u){if(r.state.__a){var n=r.state.__a;r.__v.__k[0]=D(n,n.__c.__P,n.__c.__O);}var t;for(r.setState({__a:r.__b=null});t=r.t.pop();)t.forceUpdate();}};r.__u++||32&t.__u||r.setState({__a:r.__b=r.__v.__k[0]}),n.then(i,i);},L.prototype.componentWillUnmount=function(){this.t=[];},L.prototype.render=function(n,e){if(this.__b){if(this.__v.__k){var r=document.createElement("div"),o=this.__v.__k[0].__c;this.__v.__k[0]=A(this.__b,r,o.__O=o.__P);}this.__b=null;}var i=e.__a&&g$1(m$1,null,n.fallback);return i&&(i.__u&=-33),[g$1(m$1,null,e.__a?null:n.children),i]};var V=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2];}};(U.prototype=new w$1).__a=function(n){var t=this,e=O(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),V(t,n,r)):u();};e?e(o):o();}},U.prototype.render=function(n){this.u=null,this.o=new Map;var t=T$1(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},U.prototype.componentDidUpdate=U.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){V(n,e,t);});};var z="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,B=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,H=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,Z=/[A-Z0-9]/g,Y="undefined"!=typeof document,$=function(n){return ("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/:/fil|che|ra/).test(n)};w$1.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(t){Object.defineProperty(w$1.prototype,t,{configurable:!0,get:function(){return this["UNSAFE_"+t]},set:function(n){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:n});}});});var J=l$1.event;function K(){}function Q(){return this.cancelBubble}function X(){return this.defaultPrevented}l$1.event=function(n){return J&&(n=J(n)),n.persist=K,n.isPropagationStopped=Q,n.isDefaultPrevented=X,n.nativeEvent=n};var tn={enumerable:!1,configurable:!0,get:function(){return this.class}},en=l$1.vnode;l$1.vnode=function(n){"string"==typeof n.type&&function(n){var t=n.props,e=n.type,u={};for(var o in t){var i=t[o];if(!("value"===o&&"defaultValue"in t&&null==i||Y&&"children"===o&&"noscript"===e||"class"===o||"className"===o)){var l=o.toLowerCase();"defaultValue"===o&&"value"in t&&null==t.value?o="value":"download"===o&&!0===i?i="":"translate"===l&&"no"===i?i=!1:"ondoubleclick"===l?o="ondblclick":"onchange"!==l||"input"!==e&&"textarea"!==e||$(t.type)?"onfocus"===l?o="onfocusin":"onblur"===l?o="onfocusout":H.test(o)?o=l:-1===e.indexOf("-")&&B.test(o)?o=o.replace(Z,"-$&").toLowerCase():null===i&&(i=void 0):l=o="oninput","oninput"===l&&u[o=l]&&(o="oninputCapture"),u[o]=i;}}"select"==e&&u.multiple&&Array.isArray(u.value)&&(u.value=T$1(t.children).forEach(function(n){n.props.selected=-1!=u.value.indexOf(n.props.value);})),"select"==e&&null!=u.defaultValue&&(u.value=T$1(t.children).forEach(function(n){n.props.selected=u.multiple?-1!=u.defaultValue.indexOf(n.props.value):u.defaultValue==n.props.value;})),t.class&&!t.className?(u.class=t.class,Object.defineProperty(u,"className",tn)):(t.className&&!t.class||t.class&&t.className)&&(u.class=u.className=t.className),n.props=u;}(n),n.$$typeof=z,en&&en(n);};var rn=l$1.__r;l$1.__r=function(n){rn&&rn(n),n.__c;};var un=l$1.diffed;l$1.diffed=function(n){un&&un(n);var t=n.props,e=n.__e;null!=e&&"textarea"===n.type&&"value"in t&&t.value!==e.value&&(e.value=null==t.value?"":t.value);};

const DOMPurify = purify(window);
const RichTextView = x(function RichTextView({ valueHtml }) {
    const sanitized = DOMPurify.sanitize(valueHtml);
    return (jsx("span", { className: "rich-text-view", dangerouslySetInnerHTML: { __html: sanitized } }));
});

const RangeThumbContext = createContext(null);
const DebounceContext = createContext(false);
const ValueContext = createContext(null);
const GetValueTextContext = createContext(null);
const GetListContext = createContext("");
const StepContext = createContext(1);
const SnapContext = createContext("discrete");
const DisabledContext = createContext(false);
const OrientationContext$1 = createContext("inline");
const OnValueChangeContext = createContext(null);
const Range = memo(forwardElementRef(function Range({ max, min, debounce, hideTickValues, hideTicks, orientation, children, getValueText, getTooltipText, value, onValueChange, step, snap, label, disabled, ...rest }, ref) {
    const { context, managedChildrenReturn } = useSlider({ managedChildrenParameters: {}, sliderParameters: { min, max } });
    let id = useMemo(generateRandomId, []);
    id ??= "";
    step ??= "any";
    let tickCount = (step == "any" ? Infinity : Math.ceil(1 + (max - min) / step));
    return (jsx(OnValueChangeContext.Provider, { value: onValueChange, children: jsx(RangeThumbContext.Provider, { value: context, children: jsx(DebounceContext.Provider, { value: debounce ?? false, children: jsx(GetValueTextContext.Provider, { value: getTooltipText ?? getValueText ?? defaultGetValueText, children: jsx(GetListContext.Provider, { value: id, children: jsx(StepContext.Provider, { value: step, children: jsx(SnapContext.Provider, { value: snap ?? "discrete", children: jsx(DisabledContext.Provider, { value: disabled ?? false, children: jsx(ValueContext.Provider, { value: value ?? null, children: jsx(OrientationContext$1.Provider, { value: orientation ?? "inline", children: createElement((label ? "label" : "div"), (useMergedProps({ class: clsx("form-range-container", orientation == "block" && "form-range-vertical"), ref, style: isFinite(tickCount) ? { "--form-range-tick-count": tickCount } : undefined }, rest)), label && jsx("div", { className: "form-range-label", children: label }), children ?? jsx(RangeThumb, { index: 0, min: min, max: max, value: value ?? 0, onValueChange: onValueChange, label: label ?? "" }), jsx("div", { className: "form-range-track-background" }), jsx(GetValueTextContext.Provider, { value: getValueText ?? defaultGetValueText, children: jsx(RangeTicks, { min: min, max: max, step: step, id: id, hideTickValues: hideTickValues }) })) }) }) }) }) }) }) }) }) }) }));
}));
function defaultGetValueText(number) {
    return `${number}`;
}
const RangeTicks = memo(function RangeTicks({ step, min, max, id, hideTickValues }) {
    const onValueChange = useContext(OnValueChangeContext);
    if (step == "any")
        return null;
    hideTickValues ??= false;
    const getValueText = useContext(GetValueTextContext);
    let children = [];
    for (let i = min; i <= max; i += step) {
        const atEnds = (i == min || (i + step) > max);
        let shouldHide = (hideTickValues == "auto" ? !atEnds : hideTickValues);
        children.push(jsx("div", { className: clsx("form-range-tick", "form-range-tick-line", onValueChange && "form-range-tick-selectable"), children: jsx("option", { onClick: () => {
                    onValueChange?.(i);
                }, value: i, children: shouldHide ? null : getValueText(i) }, i) }));
    }
    /*for (let i = min; i <= max; i += step) {
        children.push(<option value={i} className={clsx("form-range-tick")}>{getValueText(i)}</option>)
    }*/
    return (jsxs("datalist", { id: id, className: clsx("form-range-ticks"), children: [...children] }));
});
const RangeThumb = memo(forwardElementRef(function RangeThumb({ index, value, max, min, onValueChange: onValueChangeAsync, disabled, label }, ref) {
    const parentOnValueChange = useContext(OnValueChangeContext);
    const context = useContext(RangeThumbContext);
    const debounceSetting = useContext(DebounceContext);
    console.assert(typeof label == "string");
    const { syncHandler, pending, hasError, currentCapture } = useAsyncHandler({
        asyncHandler: async (v, e) => { await parentOnValueChange?.(v); await onValueChangeAsync?.(v); },
        capture,
        debounce: debounceSetting == true ? 1500 : debounceSetting != false ? debounceSetting : undefined,
        throttle: undefined
    });
    const onValueChangeSync = syncHandler; // as UseSliderThumbArguments<HTMLInputElement>["onValueChange"];
    const valueFromParent = useContext(ValueContext);
    value = ((valueFromParent) ?? value ?? currentCapture) ?? 0;
    const getValueText = useContext(GetValueTextContext);
    const valueText = useMemo(() => { return ((getValueText?.(value)) ?? (value == null ? "" : `${value}`)); }, [value, getValueText]);
    const orientation = useContext(OrientationContext$1);
    let parentDisabled = useContext(DisabledContext);
    disabled ||= parentDisabled;
    const [inputHasFocus, setInputHasFocus] = useState(false);
    const { refElementReturn, refElementReturn: { getElement: getInputElement }, propsStable: p1 } = useRefElement({ refElementParameters: {} });
    const { hasCurrentFocusReturn: { propsStable: p2 } } = useHasCurrentFocus({ hasCurrentFocusParameters: { onCurrentFocusedChanged: setInputHasFocus, onCurrentFocusedInnerChanged: null }, refElementReturn });
    let usedStep = (useContext(StepContext) ?? 1);
    let userStep = usedStep;
    const [lastSnappedValue, setLastSnappedValue] = useState(null);
    const [forceSnap, setForceSnap] = useState(false);
    const snap = useContext(SnapContext);
    //const [snap, setSnap] = useState<boolean | null>(null);
    if (snap == "continuous" && !forceSnap)
        usedStep = "any";
    /*if (snap === false)
        step = "any";
    if (snap === true && step == "any")
        step = 1;*/
    const snapTimeout = useRef(-1);
    function onValueChange(e) {
        const newValue = e[EventDetail$1].value;
        if (userStep != "any") {
            let closestStep = Math.round(newValue / userStep) * userStep;
            let distanceToStep = (Math.abs(closestStep - newValue));
            let distanceToLastSnap = lastSnappedValue == null ? null : Math.abs(lastSnappedValue - newValue);
            if (distanceToLastSnap != null && distanceToLastSnap >= userStep) {
                setForceSnap(false);
                setLastSnappedValue(null);
            }
            if (distanceToStep <= 0.125 && closestStep != lastSnappedValue) {
                setLastSnappedValue(closestStep);
                setForceSnap(true);
                if (snapTimeout.current > 0)
                    clearTimeout(snapTimeout.current);
                snapTimeout.current = window.setTimeout(() => { setForceSnap(false); }, 500);
                e[EventDetail$1].value = closestStep;
            }
        }
        return onValueChangeSync?.(e);
    }
    const { propsSliderThumb, managedChildReturn, sliderThumbReturn: { min: usedMin, max: usedMax } } = useSliderThumb({
        info: {
            index,
        },
        sliderThumbParameters: {
            tag: "input",
            value,
            valueText,
            max,
            min,
            onValueChange,
            label
        },
        context
    });
    const valuePercent = (value - usedMin) / (usedMax - usedMin);
    const clampedValuePercent = Math.max(0, Math.min(1, valuePercent));
    useRef(null);
    // TODO: The tooltip is a nice idea, but there are a few problems that need solved conceptually:
    // When hovering, the tooltip needs to show the value under the mouse, which is hard to calculate.
    // It's not a "normal" tooltip, though given that each slider needs its own individual label, it's kind of close, but...
    // The closest thing would just be a CSS mock tooltip with no roles or anything, but then dismiss behavior? etc...
    /*
    
    <Tooltip
        forward
        absolutePositioning
        getElement={(function (e: HTMLElement) { return tooltipRootRef.current || e; })}
        alignMode="element"
        tooltip={`${valueText}`}
        children={}
    />

    */
    useEffect(() => {
        const element = getInputElement();
        if (element)
            element.value = `${value}`;
    }, [value]);
    return (jsxs(Fragment, { children: [jsx("input", { ...useMergedProps(propsSliderThumb, p1, p2, {
                    ref,
                    ...{ orient: orientation == "block" ? "vertical" : undefined },
                    class: clsx("form-range", orientation == "block" && "form-range-vertical"),
                    disabled,
                    tabIndex: 0,
                    step: usedStep,
                    list: useContext(GetListContext)
                }) }), jsx("div", { className: "form-range-track-fill-background", style: { "--form-range-value-percent": clampedValuePercent } })] }));
}));
function capture(e) {
    return e[EventDetail$1].value;
}

const Table = memo(forwardElementRef(function Table({ propsContainer, dark, hover, striped, stripedColumns, variantBorder, bordered, variantSize, variantTheme, verticalAlign, ...props }, ref) {
    return (jsx("div", { ...useMergedProps({ class: clsx("table-container", "table-responsive") }, propsContainer || {}), children: jsx("table", { ...useMergedProps({
                class: clsx("table", striped && "table-striped", stripedColumns && "table-striped-columns", hover && "table-hover", dark && "table-dark", variantTheme && `table-${variantTheme}`, variantSize && `table-${variantSize}`, verticalAlign && `align-${verticalAlign}`, bordered && `table-bordered`, variantBorder && `border-${variantBorder}`),
                ref
            }, props) }) }));
}));
const TableSection = memo(forwardElementRef(function TableSection({ location, divider, variantTheme, ...props }, ref) {
    const TS = (location == "head" ? "thead" : location == "foot" ? "tfoot" : "tbody");
    return (jsx(TS, { ...useMergedProps(props, { ref, className: clsx(variantTheme && `table-${variantTheme}`) }) }));
}));
const TableRow = memo(forwardElementRef(function TableRow({ variantTheme, children, ...props }, ref) {
    //useWhatCausedRender("TableRow", { props: { ...props, children, variantTheme, ref }, state: {} })
    return (jsx("tr", { ...useMergedProps({ ref, className: clsx(variantTheme && `table-${variantTheme}`) }, props), children: children }));
}));
const TableCell = memo(forwardElementRef(function TableCell({ variantTheme, fillY, tableHeadType, children, ...props }, ref) {
    useEnsureStability("TableCell", !!tableHeadType);
    props = useMergedProps({ ref, className: clsx(variantTheme && `table-${variantTheme}`) }, props);
    if (tableHeadType) {
        const thPropsIfSortable = { className: clsx(fillY && "py-0") };
        const thPropsIfUnsortable = useMergedProps(props, thPropsIfSortable);
        const buttonPropsIfUnsortable = { className: "sort-button" };
        const buttonPropsIfSortable = useMergedProps(props, buttonPropsIfUnsortable);
        return (jsx("th", { ...(tableHeadType == "unsortable" ? thPropsIfUnsortable : thPropsIfSortable), children: tableHeadType == "unsortable" ?
                children :
                jsx("button", { ...buttonPropsIfSortable, children: jsx("span", { children: children }) }) }));
    }
    else {
        children = useClonedElement(children, props, ref);
        return (jsx("td", { className: clsx(fillY && "py-0"), children: children }));
    }
}));

// Allow for nicer props (on the Table instead of the TableSection)
const TableContext = createContext({ setChildCount: null, paginationMax: null, paginationMin: null, staggered: false });
const DataTable = memo(forwardElementRef(function DataTable({ staggered, caption, captionPosition, bordered, dark, hover, striped, propsContainer, stripedColumns, variantBorder, variantSize, variantTheme, verticalAlign, children, paginationLabel, paginationLocation, paginationSize, ...props }, ref) {
    staggered ||= false;
    const [childCount, setChildCount] = useState(0);
    const [paginationStart, setPaginationStart] = useState(0);
    const [paginationEnd, setPaginationEnd] = useState(paginationSize ?? null);
    if (caption == "hidden")
        console.assert(typeof caption == "string");
    return (jsx(TableContext.Provider, { value: useMemo(() => ({ setChildCount, paginationMax: paginationEnd, paginationMin: paginationStart, staggered: staggered }), [setChildCount, paginationStart, paginationEnd, staggered]), children: jsx(Table$1, { ariaLabel: captionPosition == "hidden" ? caption : null, singleSelectionMode: "activation", tagTable: "table", render: info => {
                return (jsxs(Paginated, { childCount: childCount, setPaginationEnd: setPaginationEnd, setPaginationStart: setPaginationStart, paginationLabel: paginationLabel, paginationLocation: paginationLocation, paginationSize: paginationSize, children: [caption && captionPosition != "hidden" && jsx("caption", { ...useMergedProps(info.propsLabel, { className: clsx$1(captionPosition == "before" && "caption-top") }), children: caption }), jsx(Table, { bordered: bordered, dark: dark, hover: hover, propsContainer: propsContainer, striped: striped, stripedColumns: stripedColumns, variantBorder: variantBorder, variantSize: variantSize, variantTheme: variantTheme, verticalAlign: verticalAlign, ...useMergedProps(info.propsTable, { className: "table" }, { ref, ...props }), children: children })] }));
            } }) }));
}));
const DataTableHead = memo(forwardElementRef(function DataTableHead(props, ref) { return (jsx(DataTableSection, { ref: ref, location: "head", ...props })); }));
const DataTableBody = memo(forwardElementRef(function DataTableBody(props, ref) { return (jsx(DataTableSection, { ref: ref, location: "body", ...props })); }));
const DataTableFoot = memo(forwardElementRef(function DataTableFoot(props, ref) { return (jsx(DataTableSection, { ref: ref, location: "head", ...props })); }));
const DataTableSection = memo(forwardElementRef(function DataTableSection({ children, keyboardControlsDescription, location, variantTheme, divider, ...props }, ref) {
    const { paginationMax, paginationMin, staggered, setChildCount } = useContext(TableContext);
    return (jsx(IsTableHeadContext.Provider, { value: location == "head", children: jsx(TableSection$1, { 
            //staggered={location == "body" && staggered}
            location: location, 
            //getIndex={vnode => vnode.props.row}
            tagTableSection: `t${location}`, paginationMin: location == "body" ? paginationMin : null, paginationMax: location == "body" ? paginationMax : null, render: info => {
                const childCount = Array.isArray(children) ? children.length : 1;
                useLayoutEffect(() => {
                    if (location == "body")
                        setChildCount?.(childCount);
                }, [location, setChildCount, childCount]);
                return (jsx(KeyboardAssistIcon, { homeEnd: true, leftRight: true, upDown: location == "body", pageKeys: true, typeaheadStatus: info.typeaheadNavigationReturn.typeaheadStatus, activateEnter: false, activateSpace: false, description: keyboardControlsDescription ?? "Navigate the table:", children: jsx(TableSection, { location: location, variantTheme: variantTheme, divider: divider, ...useMergedProps(info.propsTableSection, { ref, ...props }), children: useMemo(() => jsx(DataTableRows, { children: Array.isArray(children) ? children : [children] }), [children]) }) }));
            } }) }));
}));
const DataTableRows = memo((function DataTableRows({ children }) {
    const { paginationMax, paginationMin, staggered, setChildCount } = useContext(TableContext);
    return (jsx(TableRows, { paginationMax: paginationMax, paginationMin: paginationMin, staggered: staggered, children: children, render: info => {
            return jsx(Fragment, { children: info.rearrangeableChildrenReturn.children });
        } }));
}));
const DataTableRow = memo(forwardElementRef(function DataTableRow({ row, children, variantTheme, ...props }, ref) {
    return (jsx(TableRow$1, { index: row, tagTableRow: "tr", render: info => {
            info.staggeredChildReturn.hideBecauseStaggered;
            const hideBecausePaginated = info.paginatedChildReturn.hideBecausePaginated;
            let tr = (jsx(TableRow, { ...useMergedProps(info.props, { ref, ...props }, { className: hideBecausePaginated ? "d-none" : "" }), children: (info.hidden ? null : children) }));
            if (info.paginatedChildReturn.hideBecausePaginated) {
                return tr;
            }
            return (jsx(Fade, { show: !info.hidden, animateOnMount: info.staggeredChildReturn.parentIsStaggered, delayMountUntilShown: true, children: tr }));
        } }));
}));
const IsTableHeadContext = createContext(false);
const DataTableCell = memo(forwardElementRef(function DataTableCell({ column, colSpan, children, value, unsortable, variantTheme, fillY, ...props }, ref) {
    const { refElementReturn, refElementReturn: { getElement }, propsStable } = useRefElement({ refElementParameters: {} });
    const [sortingByThisColumn, setSortingByThisColumn] = useState(false);
    const [sortDirection, setSortDirection] = useState(null);
    const isTableHead = useContext(IsTableHeadContext);
    const focusSelf = (e) => {
        const actualElement = getElement();
        actualElement?.focus();
        if (document.activeElement != actualElement)
            e?.focus();
    };
    return (jsx(TableCell$1, { index: column, tagTableCell: isTableHead ? "th" : "td", focusSelf: focusSelf, getSortValue: useStableGetter(value ?? children), colSpan: colSpan, render: info => {
            const { pressReturn, props: propsPress } = usePress({
                pressParameters: {
                    focusSelf,
                    allowRepeatPresses: null,
                    excludeEnter: null,
                    excludePointer: null,
                    longPressThreshold: null,
                    onPressingChange: null,
                    onPressSync: !isTableHead ? undefined : () => {
                        const { column, direction } = info.tableCellReturn.sortByThisColumn();
                        setSortingByThisColumn(true);
                        setSortDirection(direction);
                    },
                    ...info.pressParameters
                },
                refElementReturn
            });
            const p = useMergedProps(propsStable, propsPress, info.propsCell, { ref, ...props });
            children ??= value;
            children = useClonedElement(children, info.propsFocus, ref);
            return jsx(TableCell, { ...p, tableHeadType: isTableHead ? (unsortable ? "unsortable" : "sortable") : null, fillY: fillY, variantTheme: variantTheme, children: children });
            /*if (isTableHead) {
                return (
                    <th className={clsx(fillY && "py-0")}>
                        <button className="sort-button" {...p as JSX.HTMLAttributes<any>}>
                            <span>{children}</span>
                            {sortDirection == null && <BootstrapIcon icon="filter" label={null} />}
                            {sortDirection == "ascending" && <BootstrapIcon icon="sort-down-alt" label={null} />}
                            {sortDirection == "descending" && <BootstrapIcon icon="sort-up" label={null} />}
                        </button>
                    </th>
                )
            }
            else {
                children ??= (value as string);
                children = useClonedElement(children, p, ref);
                return (
                    <td className={clsx(fillY && "py-0")}>{children}</td>
                )
            }*/
        } }));
}));

const StructureTabPanel = memoForwardRef(function StructureTabPanel({ orientation, visibleOffset, visible, children, ...props }, ref) {
    // Get the names of the properties on the transition that are correct for the `orientation` the parent uses.
    // (i.e. if make the transition slide on the X axis for "horizontal" and the Y axis for "vertical")
    const zeroValued = (orientation == "horizontal" ? "slideTargetBlock" : "slideTargetInline");
    const offsetted = (orientation == "horizontal" ? "slideTargetInline" : "slideTargetBlock");
    const originZero = (orientation == "horizontal" ? "zoomOriginBlock" : "zoomOriginInline");
    const originOffset = (orientation == "horizontal" ? "zoomOriginInline" : "zoomOriginBlock");
    const transitionProps = {
        [zeroValued]: 0,
        [offsetted]: Math.sign(visibleOffset ?? 0) * (1 / 24),
        [originZero]: 0,
        [originOffset]: 0.5
    };
    // IMPORTANT: exitVisibility is "removed" instead of "hidden"
    // because "hidden" can still cause a lot of layout stuff to happen on hidden tabs,
    // which is bad if one tab is heavier than others -- it'll still affect them even when closed.
    return (jsx(SlideZoomFade, { delayMountUntilShown: true, exitVisibility: "removed", duration: 500, show: visible, zoomMin: (11 / 12), ...transitionProps, children: jsx("div", { ...useMergedProps({ className: clsx("tab-panel scroll-shadows scroll-shadows-y") }, { ...props, ref }), children: jsx(TabPanelChildren, { visible: visible || false, children: children }) }) }));
});
const TabPanelChildren = memo(function TabPanelChildren({ children, visible }) {
    // It's more than likely that any given panel's children will be heavy to render,
    // but we *really* don't want that to block the transition animation
    // so we wait until just slightly after the transition starts to actually mount the children.
    const [delayedVisible, setDelayedVisible] = useState(false);
    useTimeout({
        callback: () => setDelayedVisible(true),
        timeout: 10,
        triggerIndex: visible,
    });
    return jsx(Fragment, { children: delayedVisible && children });
});
const StructureTabs = memoForwardRef(function StructureTabs({ orientation, children, ...props }, ref) {
    return (jsx("div", { ...useMergedProps({ class: clsx("tabs-container", orientation == "vertical" && "tabs-container-vertical") }, { ...props, ref }), children: children }));
});
const StructureTabPanelsContainer = memoForwardRef(function StructureTabPanelsContainer({ orientation, children: panels, ...props }, ref) {
    return (jsx(Swappable, { children: jsx("div", { ...useMergedProps({ class: "tab-panels-container" }, { ...props, ref }), children: panels }) }));
});
const StructureTabList = memoForwardRef(function StructureTabList({ orientation, typeaheadStatus, labelPosition, childrenLabel: labelJsx, children: tabs, keyboardControlsDescription, ...props }, ref) {
    return (jsxs(Fragment, { children: [labelPosition == "before" && labelJsx, jsx(KeyboardAssistIcon, { leftRight: orientation == "horizontal", upDown: orientation == "vertical", homeEnd: true, pageKeys: false, typeaheadStatus: typeaheadStatus, activateSpace: typeaheadStatus == 'none', activateEnter: true, description: keyboardControlsDescription ?? "Select a tab:", children: jsx("ul", { ...useMergedProps({ className: clsx(`nav nav-tabs`, `typeahead-status-${typeaheadStatus}`) }, { ...props, ref }), children: tabs }) }), labelPosition == "after" && labelJsx] }));
});

const OrientationContext = createContext("horizontal");
const Tabs = memo(forwardElementRef(function Tabs({ keyboardControlsDescription, orientation, label, localStorageKey, labelPosition, panels, tabs, propsPanelsContainer, propsTabsContainer, ...props }, ref) {
    orientation ??= "horizontal";
    labelPosition ??= "before";
    if (labelPosition == "hidden")
        console.assert(typeof label == "string");
    return (jsx(OrientationContext.Provider, { value: orientation, children: jsx(Tabs$1, { localStorageKey: localStorageKey, orientation: orientation, ariaLabel: labelPosition == "hidden" ? label : null, pageNavigationSize: 0, render: info => {
                const labelJsx = jsx("label", { ...info.propsLabel, children: label });
                return (jsxs(StructureTabs, { orientation: orientation, ref: ref, ...props, children: [jsx(StructureTabList, { ...info.propsContainer, childrenLabel: labelJsx, labelPosition: labelPosition, typeaheadStatus: info.typeaheadNavigationReturn.typeaheadStatus, orientation: orientation, keyboardControlsDescription: keyboardControlsDescription ?? "Move to a tab:", children: tabs }), jsx(StructureTabPanelsContainer, { children: panels })] }));
            } }) }));
}));
const Tab = memo(forwardElementRef(function Tab({ index, children, ...props }, ref) {
    return (jsx(Tab$1, { index: index, render: info => {
            return (jsx("li", { ...useMergedProps(props, { ref, className: `nav-item` }), children: jsx("span", { ...useMergedProps(info.props, { className: clsx(`nav-link`, info.singleSelectionChildReturn.singleSelected && "active") }), children: children }) }));
        } }));
}));
const TabPanel = memo(forwardElementRef(function TabPanel({ index, ...props }, ref) {
    const orientation = useContext(OrientationContext);
    return (jsx(TabPanel$1, { index: index, render: info => {
            return (jsx(StructureTabPanel, { ref: ref, visible: info.tabPanelReturn.visible, visibleOffset: info.tabPanelReturn.visibleOffset || 0, orientation: orientation, ...useMergedProps(info.props, props) }));
        } }));
}));

const PushToastContext = createContext(null);
const UpdateToastContext = createContext(null);
const DefaultToastTimeout = createContext(Infinity);
function ToastsProvider({ children, defaultTimeout, visibleCount }) {
    const { children: portalChildren, portalElement, pushChild, removeChild, updateChild } = usePortalChildren({ target: usePortalId("toast") });
    return (jsx(DefaultToastTimeout.Provider, { value: defaultTimeout ?? Infinity, children: jsx(PushToastContext.Provider, { value: pushChild, children: jsx(UpdateToastContext.Provider, { value: updateChild, children: jsx(Toasts, { visibleCount: visibleCount, render: info => {
                        return (jsxs(Fragment, { children: [children, portalChildren] }));
                    } }) }) }) }));
}
function usePushToast() {
    const pushToast = useContext(PushToastContext);
    return pushToast;
}
function useUpdateToast() {
    const updateToast = useContext(UpdateToastContext);
    return updateToast;
}
const ToastDismissContext = createContext(null);
function Toast({ timeout, politeness, children, ...p }) {
    const { index, ...props } = p;
    useContext(DefaultToastTimeout);
    // const { useToastProps, dismiss, status } = useToast<HTMLDivElement>({ timeout: timeout ?? defaultTimeout, politeness });
    return (jsx(Toast$1, { index: index, timeout: 10000000  , children: children, render: info => {
            const show = (info.toastReturn.showing);
            return (jsx(ToastDismissContext.Provider, { value: info.toastReturn.dismiss, children: jsx(SlideFade, { show: show, slideTargetInline: 1, animateOnMount: show, exitVisibility: "removed", children: jsx("div", { ...useMergedProps(info.props, props, { class: clsx("toast show" /*, colorVariant && `text-bg-${colorVariant}`*/) }), children: jsxs("div", { className: "d-flex", children: [jsx("div", { className: "toast-body", children: children }), jsx(Button, { className: "btn-close me-2 m-auto", "aria-label": "Dismiss alert", onPress: info.toastReturn.dismiss })] }) }) }) }));
        } }));
}
function defaultErrorToToast(error) {
    return jsx(Toast, { timeout: Infinity, children: error instanceof Error ? jsxs("details", { children: [jsx("summary", { children: error.message }), jsx("pre", { children: jsx("code", { children: error.stack }) })] }) : JSON.stringify(error) });
}
/**
 * A component that will catch any errors thrown during render
 * and present them as toasts.
 *
 * Ideally you should provide a custom errorToToast function that can handle expected types of errors,
 * but having a default one at the root of the app probably isn't a bad idea.
 * @param param0
 * @returns
 */
/*function ToastErrorBoundary({ errorToToast, children }: { errorToToast?: (error: any) => JSX.Element, children?: ComponentChildren }) {
    const pushToast = usePushToast();
    //const [error, resetError] = useErrorBoundary(error => void (pushToast((errorToToast ?? defaultErrorToToast)(error))));
    return <>{children}</>;
}*/
class ToastErrorBoundary extends w$1 {
    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true, error, pushedToast: false });
    }
    render() {
        return (jsx(PushToastContext.Consumer, { children: (pushToast) => {
                if (!this.state.pushedToast && this.state.error) {
                    pushToast(defaultErrorToToast(this.state.error));
                    this.setState({ pushedToast: true });
                }
                return jsx(Fragment, { children: this.props.children });
            } }));
    }
}

const Type = memo(forwardElementRef(function Type({ type, ...rest }, ref) {
    switch (type) {
        case 'lead': return jsx(TypeLead, { ...rest, ref: ref });
        case 'bold': return jsx(TypeBold, { ...rest, ref: ref });
        case 'italics': return jsx(TypeItalics, { ...rest, ref: ref });
        case 'small': return jsx(TypeSmall, { ...rest, ref: ref });
        case 'strike': return jsx(TypeStrike, { ...rest, ref: ref });
        case 'highlighted': return jsx(TypeHighlighted, { ...rest, ref: ref });
        case 'underline': return jsx(TypeUnderline, { ...rest, ref: ref });
    }
    return null;
}));
const TypeLead = memo(forwardElementRef(function TypeLead({ children, ...rest }, ref) {
    return useClonedElement(children, useMergedProps({ class: "lead" }, rest), ref, 'p');
}));
const TypeHighlighted = memo(forwardElementRef(function TypeMark({ children, semantics, ...rest }, ref) {
    if (semantics == 'none')
        return useClonedElement(children, useMergedProps({ class: "mark" }, rest), ref, 'span');
    else
        return jsx("mark", { ...rest, ref: ref, children: children });
}));
const TypeStrike = memo(forwardElementRef(function TypeDel({ children, semantics, ...rest }, ref) {
    if (semantics == 'deleted')
        return jsx("del", { ...rest, ref: ref, children: children });
    else if (semantics == 'inaccurate')
        return jsx("del", { ...rest, ref: ref, children: children });
    else
        return useClonedElement(children, useMergedProps({ class: "text-decoration-line-through" }, rest), ref);
}));
const TypeUnderline = memo(forwardElementRef(function TypeIns({ children, semantics, ...rest }, ref) {
    if (semantics == 'inserted')
        return jsx("ins", { ...rest, ref: ref, children: children });
    else if (semantics == 'annotated')
        return jsx("u", { ...rest, ref: ref, children: children });
    else
        return useClonedElement(children, useMergedProps({ class: "text-decoration-underline" }, rest), ref);
}));
const TypeSmall = memo(forwardElementRef(function TypeSmall({ children, semantics, ...rest }, ref) {
    if (semantics == 'fine')
        return jsx("small", { ...rest, ref: ref, children: children });
    else
        return useClonedElement(children, useMergedProps({ class: "small" }, rest), ref);
}));
const TypeBold = memo(forwardElementRef(function TypeStrong({ children, semantics, ...rest }, ref) {
    if (semantics == 'important')
        return jsx("strong", { ...rest, ref: ref, children: children });
    else if (semantics == 'noticeable')
        return jsx("b", { ...rest, ref: ref, children: children });
    else
        return useClonedElement(children, useMergedProps({}, rest), ref);
}));
const TypeItalics = memo(forwardElementRef(function TypeEm({ children, semantics, ...rest }, ref) {
    if (semantics == 'emphasized')
        return jsx("em", { ...rest, ref: ref, children: children });
    else if (semantics == 'idiomatic')
        return jsx("i", { ...rest, ref: ref, children: children });
    else
        return useClonedElement(children, useMergedProps({}, rest), ref);
}));

const AllProviders = memo(({ children, targetAssertive, targetPolite, toastsVisibleCount }) => {
    const { children: portalChildren, context } = useNotificationProvider({ targetAssertive, targetPolite });
    return (jsx(NotificationProviderContext.Provider, { value: context, children: jsx(ToastsProvider, { visibleCount: toastsVisibleCount ?? 4, children: jsx(ToastErrorBoundary, { children: jsx(ExclusiveTransitionProvider, { exclusivityKey: "tooltip", children: jsxs(KeyboardAssistProvider, { children: [children, portalChildren] }) }) }) }) }));
});

/**
 * Autocomplete access to the most common Bootstrap utility classes.
 *
 * Not necessary to use by any means -- just a reminder about what can be used when.
 */
const UtilityClasses = {
    position: {
        relative: 'position-relative',
        static: 'position-static',
        absolute: 'position-absolute',
        fixed: 'position-fixed',
        sticky: 'position-sticky',
    },
    display: {
        none: 'd-none',
        flex: 'd-flex',
        inlineFlex: 'd-inline-flex',
        inline: 'd-inline',
        inlineBlock: 'd-inline-block',
        block: 'd-block',
        grid: 'd-grid',
        table: 'd-table',
        tableRow: 'd-table-row',
        tableCell: 'd-table-cell'
    },
    flex: {
        parent: {
            direction: {
                row: 'flex-row',
                rowReverse: 'flex-row-reverse',
                column: 'flex-column',
                columnReverse: 'flex-column-reverse',
            },
            justify: {
                start: 'justify-content-start',
                end: 'justify-content-end',
                center: 'justify-content-center',
                between: 'justify-content-between',
                around: 'justify-content-around',
                evenly: 'justify-content-evenly',
            },
            align: {
                start: 'align-items-start',
                end: 'align-items-end',
                center: 'align-items-center',
                baseline: 'align-items-baseline',
                stretch: 'align-items-stretch ',
            },
        },
        children: {
            align: {
                start: 'align-self-start',
                end: 'align-self-end',
                center: 'align-self-center',
                baseline: 'align-self-baseline',
                stretch: 'align-self-stretch ',
            },
            wrap: {
                wrap: 'flex-wrap',
                nowrap: 'flex-nowrap',
                wrapReverse: 'flex-wrap-reverse'
            }
        },
    },
    userSelect: {
        all: 'user-select-all',
        auto: 'user-select-auto',
        none: 'user-select-none'
    },
    pointerEvents: {
        none: 'pe-none',
        auto: 'pe-auto'
    },
    overflow: {
        auto: 'overflow-auto',
        hidden: 'overflow-hidden',
        visible: 'overflow-visible',
        scroll: 'overflow-scroll',
    },
    text: {
        align: {
            start: 'text-start',
            center: 'text-center',
            end: 'text-end',
        },
        wrapping: {
            wrap: 'text-wrap',
            nowrap: 'text-nowrap',
            break: 'text-break',
            truncate: 'text-truncate'
        },
        transform: {
            uppercase: 'text-uppercase',
            lowercase: 'text-lowercase',
            capitalize: 'text-capitalize'
        },
        decoration: {
            none: 'text-decoration-none',
            underline: 'text-decoration-underline',
            lineThrough: 'text-decoration-line-through'
        }
    }
};

export { Accordion, AccordionSection, AllProviders, Badge, BootstrapIcon, Button, ButtonGroup, Card, CardElement, CardGroup, Checkbox, CheckboxGroup, CheckboxGroupChild, DataTable, DataTableBody, DataTableCell, DataTableFoot, DataTableHead, DataTableRow, DefaultButtonSize, DefaultButtonTheme, DefaultDisabledType, Dialog, DisabledContext$1 as DisabledContext, DocumentField, Figure, FontIcon, GridBsBreak, GridBsContainer, GridBsItem, GridBsRow, GridCss, GridCssItem, GridResponsive, GridStatic, InputGroup, InputGroupText, KeyboardAssistProvider, List, ListItem, Menu, MenuItem, Offcanvas, Popover, Radio, RadioGroup, Range, RangeThumb, RichTextField, RichTextView, Tab, TabPanel, Tabs, TextField, Toast, ToastsProvider, Tooltip, Type, UtilityClasses, usePushToast, useUpdateToast };
//# sourceMappingURL=index.js.map
