import { Alignment, Placement, Side } from "@floating-ui/dom";
import { CSSProperties } from "preact/compat";
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
        /**
         * * `"mouse"`: The popper will follow the mouse cursor, within the bounds of the element.
         * * `"center"`: The popper will be centered on the element.
         */
        alignMode: "mouse" | "element";
        getElement?: (e: HTMLElement) => HTMLElement;
    };
}
export declare function usePopper<SourceElement extends Element, PopupElement extends HTMLElement, ArrowElement extends HTMLElement>({ popperParameters: { open, getElement, alignMode, placement: requestedPlacement, absolutePositioning } }: UsePopperProps): {
    propsSource: import("preact-prop-helpers").ElementProps<SourceElement>;
    propsPopup: import("preact").JSX.HTMLAttributes<PopupElement>;
    propsArrow: import("preact").JSX.HTMLAttributes<ArrowElement>;
    propsData: {
        accept?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        acceptCharset?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        accessKey?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        action?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        allow?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        allowFullScreen?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        allowTransparency?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        alt?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        as?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        async?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        autocomplete?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        autoComplete?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        autocorrect?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        autoCorrect?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        autofocus?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        autoFocus?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        autoPlay?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        capture?: string | boolean | import("preact").JSX.SignalLike<string | undefined> | undefined;
        cellPadding?: string | number | import("preact").JSX.SignalLike<string | undefined> | undefined;
        cellSpacing?: string | number | import("preact").JSX.SignalLike<string | undefined> | undefined;
        charSet?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        challenge?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        checked?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        cite?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        class?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        className?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        cols?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        colSpan?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        content?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        contentEditable?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        contextMenu?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        controls?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        controlsList?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        coords?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        crossOrigin?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        data?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        dateTime?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        default?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        defaultChecked?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        defaultValue?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        defer?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        dir?: "auto" | "rtl" | "ltr" | import("preact").JSX.SignalLike<"auto" | "rtl" | "ltr" | undefined> | undefined;
        disabled?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        disableRemotePlayback?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        download?: any;
        decoding?: "async" | "auto" | "sync" | import("preact").JSX.SignalLike<"async" | "auto" | "sync" | undefined> | undefined;
        draggable?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        encType?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        enterkeyhint?: "search" | "enter" | "done" | "go" | "next" | "previous" | "send" | import("preact").JSX.SignalLike<"search" | "enter" | "done" | "go" | "next" | "previous" | "send" | undefined> | undefined;
        for?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        form?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        formAction?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        formEncType?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        formMethod?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        formNoValidate?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        formTarget?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        frameBorder?: string | number | import("preact").JSX.SignalLike<string | number | undefined> | undefined;
        headers?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        height?: string | number | import("preact").JSX.SignalLike<string | number | undefined> | undefined;
        hidden?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        high?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        href?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        hrefLang?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        htmlFor?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        httpEquiv?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        icon?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        id?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        indeterminate?: boolean | import("preact").JSX.SignalLike<boolean> | undefined;
        inputMode?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        integrity?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        is?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        keyParams?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        keyType?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        kind?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        label?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        lang?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        list?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        loading?: "eager" | "lazy" | import("preact").JSX.SignalLike<"eager" | "lazy" | undefined> | undefined;
        loop?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        low?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        manifest?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        marginHeight?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        marginWidth?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        max?: string | number | import("preact").JSX.SignalLike<string | undefined> | undefined;
        maxLength?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        media?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        mediaGroup?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        method?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        min?: string | number | import("preact").JSX.SignalLike<string | undefined> | undefined;
        minLength?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        multiple?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        muted?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        name?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        nomodule?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        nonce?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        noValidate?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        open?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        optimum?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        part?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        pattern?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        ping?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        placeholder?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        playsInline?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        poster?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        preload?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        radioGroup?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        readonly?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        readOnly?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        referrerpolicy?: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | import("preact").JSX.SignalLike<"no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | undefined> | undefined;
        rel?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        required?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        reversed?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        role?: import("preact").JSX.AriaRole | import("preact").JSX.SignalLike<import("preact").JSX.AriaRole | undefined> | undefined;
        rows?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        rowSpan?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        sandbox?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        scope?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        scoped?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        scrolling?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        seamless?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        selected?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        shape?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        size?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        sizes?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        slot?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        span?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        spellcheck?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        spellCheck?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        src?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        srcset?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        srcDoc?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        srcLang?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        srcSet?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        start?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        step?: string | number | import("preact").JSX.SignalLike<string | number | undefined> | undefined;
        style?: string | CSSProperties | import("preact").JSX.SignalLike<string | CSSProperties | undefined> | undefined;
        summary?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        tabIndex?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        target?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        title?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        type?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        useMap?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        value?: string | number | string[] | import("preact").JSX.SignalLike<string | number | string[] | undefined> | undefined;
        volume?: string | number | import("preact").JSX.SignalLike<string | number | undefined> | undefined;
        width?: string | number | import("preact").JSX.SignalLike<string | number | undefined> | undefined;
        wmode?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        wrap?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        autocapitalize?: "none" | "off" | "on" | "sentences" | "words" | "characters" | import("preact").JSX.SignalLike<"none" | "off" | "on" | "sentences" | "words" | "characters" | undefined> | undefined;
        autoCapitalize?: "none" | "off" | "on" | "sentences" | "words" | "characters" | import("preact").JSX.SignalLike<"none" | "off" | "on" | "sentences" | "words" | "characters" | undefined> | undefined;
        disablePictureInPicture?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        results?: number | import("preact").JSX.SignalLike<number | undefined> | undefined;
        translate?: "yes" | "no" | import("preact").JSX.SignalLike<"yes" | "no" | undefined> | undefined;
        about?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        datatype?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        inlist?: any;
        prefix?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        property?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        resource?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        typeof?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        vocab?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        itemProp?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        itemScope?: boolean | import("preact").JSX.SignalLike<boolean | undefined> | undefined;
        itemType?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        itemID?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        itemRef?: string | import("preact").JSX.SignalLike<string | undefined> | undefined;
        "aria-atomic"?: string | undefined;
        "aria-autocomplete"?: string | undefined;
        "aria-busy"?: string | undefined;
        "aria-checked"?: string | undefined;
        "aria-colcount"?: string | undefined;
        "aria-colindex"?: string | undefined;
        "aria-colspan"?: string | undefined;
        "aria-controls"?: string | undefined;
        "aria-current"?: boolean | "step" | "page" | "location" | "date" | "time" | undefined;
        "aria-describedby"?: string | undefined;
        "aria-details"?: string | undefined;
        "aria-disabled"?: string | undefined;
        "aria-dropeffect"?: string | undefined;
        "aria-errormessage"?: string | undefined;
        "aria-expanded"?: string | undefined;
        "aria-flowto"?: string | undefined;
        "aria-grabbed"?: string | undefined;
        "aria-haspopup"?: "dialog" | "grid" | "listbox" | "menu" | "tree" | "false" | "true" | undefined;
        "aria-hidden"?: string | undefined;
        "aria-invalid"?: string | undefined;
        "aria-keyshortcuts"?: string | undefined;
        "aria-label"?: string | undefined;
        "aria-labelledby"?: string | undefined;
        "aria-level"?: string | undefined;
        "aria-live"?: "off" | "assertive" | "polite" | undefined;
        "aria-modal"?: string | undefined;
        "aria-multiline"?: string | undefined;
        "aria-multiselectable"?: string | undefined;
        "aria-orientation"?: string | undefined;
        "aria-owns"?: string | undefined;
        "aria-placeholder"?: string | undefined;
        "aria-posinset"?: string | undefined;
        "aria-pressed"?: string | undefined;
        "aria-readonly"?: string | undefined;
        "aria-relevant"?: string | undefined;
        "aria-required"?: string | undefined;
        "aria-roledescription"?: string | undefined;
        "aria-rowcount"?: string | undefined;
        "aria-rowindex"?: string | undefined;
        "aria-rowspan"?: string | undefined;
        "aria-selected"?: string | undefined;
        "aria-activedescendant"?: string | undefined;
        "aria-setsize"?: string | undefined;
        "aria-sort"?: string | undefined;
        "aria-valuemax"?: string | undefined;
        "aria-valuemin"?: string | undefined;
        "aria-valuenow"?: string | undefined;
        "aria-valuetext"?: string | undefined;
        inert?: boolean | undefined;
        ref?: import("preact").Ref<any> | undefined;
        key?: any;
        jsx?: boolean | undefined;
        onLoad?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onLoadCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onError?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onErrorCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onCopy?: import("preact").JSX.ClipboardEventHandler<any> | undefined;
        onCopyCapture?: import("preact").JSX.ClipboardEventHandler<any> | undefined;
        onCut?: import("preact").JSX.ClipboardEventHandler<any> | undefined;
        onCutCapture?: import("preact").JSX.ClipboardEventHandler<any> | undefined;
        onPaste?: import("preact").JSX.ClipboardEventHandler<any> | undefined;
        onPasteCapture?: import("preact").JSX.ClipboardEventHandler<any> | undefined;
        onCompositionEnd?: import("preact").JSX.CompositionEventHandler<any> | undefined;
        onCompositionEndCapture?: import("preact").JSX.CompositionEventHandler<any> | undefined;
        onCompositionStart?: import("preact").JSX.CompositionEventHandler<any> | undefined;
        onCompositionStartCapture?: import("preact").JSX.CompositionEventHandler<any> | undefined;
        onCompositionUpdate?: import("preact").JSX.CompositionEventHandler<any> | undefined;
        onCompositionUpdateCapture?: import("preact").JSX.CompositionEventHandler<any> | undefined;
        onToggle?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onFocus?: import("preact").JSX.FocusEventHandler<any> | undefined;
        onFocusCapture?: import("preact").JSX.FocusEventHandler<any> | undefined;
        onfocusin?: import("preact").JSX.FocusEventHandler<any> | undefined;
        onfocusinCapture?: import("preact").JSX.FocusEventHandler<any> | undefined;
        onfocusout?: import("preact").JSX.FocusEventHandler<any> | undefined;
        onfocusoutCapture?: import("preact").JSX.FocusEventHandler<any> | undefined;
        onBlur?: import("preact").JSX.FocusEventHandler<any> | undefined;
        onBlurCapture?: import("preact").JSX.FocusEventHandler<any> | undefined;
        onChange?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onChangeCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onInput?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onInputCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onBeforeInput?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onBeforeInputCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onSearch?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onSearchCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onSubmit?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onSubmitCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onInvalid?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onInvalidCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onReset?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onResetCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onFormData?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onFormDataCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onKeyDown?: import("preact").JSX.KeyboardEventHandler<any> | undefined;
        onKeyDownCapture?: import("preact").JSX.KeyboardEventHandler<any> | undefined;
        onKeyPress?: import("preact").JSX.KeyboardEventHandler<any> | undefined;
        onKeyPressCapture?: import("preact").JSX.KeyboardEventHandler<any> | undefined;
        onKeyUp?: import("preact").JSX.KeyboardEventHandler<any> | undefined;
        onKeyUpCapture?: import("preact").JSX.KeyboardEventHandler<any> | undefined;
        onAbort?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onAbortCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onCanPlay?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onCanPlayCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onCanPlayThrough?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onCanPlayThroughCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onDurationChange?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onDurationChangeCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onEmptied?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onEmptiedCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onEncrypted?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onEncryptedCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onEnded?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onEndedCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onLoadedData?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onLoadedDataCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onLoadedMetadata?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onLoadedMetadataCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onLoadStart?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onLoadStartCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onPause?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onPauseCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onPlay?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onPlayCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onPlaying?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onPlayingCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onProgress?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onProgressCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onRateChange?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onRateChangeCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onSeeked?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onSeekedCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onSeeking?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onSeekingCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onStalled?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onStalledCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onSuspend?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onSuspendCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onTimeUpdate?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onTimeUpdateCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onVolumeChange?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onVolumeChangeCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onWaiting?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onWaitingCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onClick?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onClickCapture?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onContextMenu?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onContextMenuCapture?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onDblClick?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onDblClickCapture?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onDrag?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDragCapture?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDragEnd?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDragEndCapture?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDragEnter?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDragEnterCapture?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDragExit?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDragExitCapture?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDragLeave?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDragLeaveCapture?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDragOver?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDragOverCapture?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDragStart?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDragStartCapture?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDrop?: import("preact").JSX.DragEventHandler<any> | undefined;
        onDropCapture?: import("preact").JSX.DragEventHandler<any> | undefined;
        onMouseDown?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onMouseDownCapture?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onMouseEnter?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onMouseEnterCapture?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onMouseLeave?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onMouseLeaveCapture?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onMouseMove?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onMouseMoveCapture?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onMouseOut?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onMouseOutCapture?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onMouseOver?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onMouseOverCapture?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onMouseUp?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onMouseUpCapture?: import("preact").JSX.MouseEventHandler<any> | undefined;
        onSelect?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onSelectCapture?: import("preact").JSX.GenericEventHandler<any> | undefined;
        onTouchCancel?: import("preact").JSX.TouchEventHandler<any> | undefined;
        onTouchCancelCapture?: import("preact").JSX.TouchEventHandler<any> | undefined;
        onTouchEnd?: import("preact").JSX.TouchEventHandler<any> | undefined;
        onTouchEndCapture?: import("preact").JSX.TouchEventHandler<any> | undefined;
        onTouchMove?: import("preact").JSX.TouchEventHandler<any> | undefined;
        onTouchMoveCapture?: import("preact").JSX.TouchEventHandler<any> | undefined;
        onTouchStart?: import("preact").JSX.TouchEventHandler<any> | undefined;
        onTouchStartCapture?: import("preact").JSX.TouchEventHandler<any> | undefined;
        onPointerOver?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerOverCapture?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerEnter?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerEnterCapture?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerDown?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerDownCapture?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerMove?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerMoveCapture?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerUp?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerUpCapture?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerCancel?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerCancelCapture?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerOut?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerOutCapture?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerLeave?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onPointerLeaveCapture?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onGotPointerCapture?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onGotPointerCaptureCapture?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onLostPointerCapture?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onLostPointerCaptureCapture?: import("preact").JSX.PointerEventHandler<any> | undefined;
        onScroll?: import("preact").JSX.UIEventHandler<any> | undefined;
        onScrollCapture?: import("preact").JSX.UIEventHandler<any> | undefined;
        onWheel?: import("preact").JSX.WheelEventHandler<any> | undefined;
        onWheelCapture?: import("preact").JSX.WheelEventHandler<any> | undefined;
        onAnimationStart?: import("preact").JSX.AnimationEventHandler<any> | undefined;
        onAnimationStartCapture?: import("preact").JSX.AnimationEventHandler<any> | undefined;
        onAnimationEnd?: import("preact").JSX.AnimationEventHandler<any> | undefined;
        onAnimationEndCapture?: import("preact").JSX.AnimationEventHandler<any> | undefined;
        onAnimationIteration?: import("preact").JSX.AnimationEventHandler<any> | undefined;
        onAnimationIterationCapture?: import("preact").JSX.AnimationEventHandler<any> | undefined;
        onTransitionEnd?: import("preact").JSX.TransitionEventHandler<any> | undefined;
        onTransitionEndCapture?: import("preact").JSX.TransitionEventHandler<any> | undefined;
        children?: import("preact").ComponentChildren;
        dangerouslySetInnerHTML?: {
            __html: string;
        } | undefined;
    };
    popperReturn: {
        usedSide: Side | null;
        usedAlignment: Alignment | null;
        hidden: boolean;
    };
};
//# sourceMappingURL=index.d.ts.map