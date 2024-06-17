import { Ref, VNode } from "preact-prop-helpers";
export type RichTextToolbarItems = '|' | '-' | 'exportPDF' | 'exportWord' | 'findAndReplace' | 'selectAll' | 'heading' | 'bold' | 'italic' | 'strikethrough' | 'underline' | 'code' | 'subscript' | 'superscript' | 'removeFormat' | 'bulletedList' | 'numberedList' | 'todoList' | 'outdent' | 'indent' | 'undo' | 'redo' | 'fontSize' | 'fontFamily' | 'fontColor' | 'fontBackgroundColor' | 'highlight' | 'alignment' | 'alignment:left' | 'alignment:right' | 'alignment:center' | 'alignment:justify' | 'link' | 'insertImage' | 'blockQuote' | 'insertTable' | 'mediaEmbed' | 'codeBlock' | 'htmlEmbed' | 'specialCharacters' | 'horizontalLine' | 'pageBreak' | 'textPartLanguage' | 'sourceEditing';
interface CkEditorMention {
    dropdownLimit?: number;
    feeds: CkEditorMentionFeed[];
}
interface CkEditorMentionFeed {
    marker: string;
    feed: string[] | (() => (string[] | Promise<string[]>));
    minimumCharacters: number;
}
export interface CkEditorWrapperProps {
    keyboardControlsDescription?: string;
    editorHandle?: Ref<any>;
    /**
     * The value to display in the editor.
     *
     * While the user is editing, changes to this prop will have no effect until the user is done.
     */
    valueHtml: string;
    /**
     * Called any time the HTML changes.
     *
     * **IMPORTANT**: This must be sanitized somewhere on the backend or before being used again elsewhere.
     */
    onValueChange: (unsanatizedRawHtml: string) => void;
    /**
     * Coming up with an actual CKEditor class is way out of scope for, like, anyone.
     *
     * Just get one and pass it here.  If you're using the superbuild, that'd be, e.g., `CKEDITOR.ClassicEditor`.
     */
    implementation: any;
    /**
     * The toolbar shown. Reminder that `|` is a separator and `-` is for line breaks.
     */
    toolbarItems: RichTextToolbarItems[];
    /**
     * The placeholder content, the same as a regular `textarea`'s
     */
    placeholder?: string;
    /**
     * Can be used to override what fonts are available.
     *
     * @see https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
     */
    fontFamilies?: string[];
    /**
     * Can be used to override the default font sizes available
     *
     * @see https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
     */
    fontSizes?: (number | string)[];
    /**
     * Allows for start-with-character autocompletes.
     *
     * Like `@person` or `#subject`.
     */
    mention?: CkEditorMention;
    /**
     * If provided, allows arbitrary HTML to be input.
     *
     * This is an obvious, hmm, maybe not "security risk", it's a "security 👀👀👀".
     *
     * Even if you use this carefully (and **even if you don't use this**) you still need to sanitize the HTML output you get back *somewhere* is the point.
     *
     * https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
     */
    htmlSupport?: CkEditorHtmlSupport;
    /**
     *
     *
     * https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
     */
    htmlEmbed?: CkEditorHtmlEmbed;
    /**
     * How the anchor link button is handled.
     *
     * @see https://ckeditor.com/docs/ckeditor5/latest/features/link.html#configuration
     */
    link?: CkEditorLink;
    /**
     * How transforms of, e.g., 1/2 to ½ are handled
     */
    typing?: CkEditorTextTransformation;
    onWordCountChange?: (count: number) => void;
    onCharacterCountChange?: (count: number) => void;
    children?: VNode;
    onReady?: (editor: any) => void;
    onFocusChange: (focused: boolean) => void;
}
interface CkEditorTextTransformation {
    transformations: {
        /** Like `extra`, but clobbers any existing includes */
        include?: CkEditorTextTransformationDescription[];
        /** Can be used to remove any of the default includes. (Or set `include` to `[]` to clear them all easily) */
        remove?: ("typography" | "quotes" | "symbols" | "mathematical" | "ellipsis" | "enDash" | "emDash" | "quotesPrimary" | "quotesSecondary" | "trademark" | "registeredTrademark" | "copyright" | "oneHalf" | "oneThird" | "twoThirds" | "oneForth" | "threeQuarters" | "lessThanOrEqual" | "notEqual" | "greaterThanOrEqual" | "arrowLeft" | "arrowRight" | "quotesPrimaryEnGb" | "quotesPrimaryEnPl" | "quotesSecondaryEnGb" | "quotesSecondaryPl")[];
        /** Like `include`, but only adds to any existing includes, instead of replacing them */
        extra?: CkEditorTextTransformationDescription[];
    };
}
interface CkEditorTextTransformationDescription {
    from: string | RegExp;
    to: string | (string | null)[] | ((matches: RegExpMatchArray) => (string | null)[]);
}
interface CkEditorLink {
    /**
     * If true, terget="_blank" and rel="noopener noreferrer" will be applied
     */
    addTargetToExternalLinks?: boolean;
    defaultProtocol?: `${string}://`;
    /**
     * If you want to add attributes, classes, or styles to a link,
     * either as a GUI option or automatically based on the link,
     * provide that information here.
     */
    decorators?: Partial<Record<string, CkEditorLinkDecorator>>;
}
type CkEditorLinkDecorator = CkEditorLinkDecoratorAutomatic | CkEditorLinkDecoratorManual;
interface CkEditorLinkDecoratorAutomatic {
    mode: "automatic";
    callback: (url: string) => boolean;
    attributes: Partial<Record<string, string>>;
    classes?: string | string[];
    styles?: Partial<Record<string, string>>;
}
interface CkEditorLinkDecoratorManual {
    mode: "manual";
    label: string;
    defaultValue: boolean;
    attributes: Partial<Record<string, string>>;
    classes?: string | string[];
    styles?: Partial<Record<string, string>>;
}
interface CkEditorHtmlEmbed {
    showPreviews: boolean;
    sanitizeHtml: (inputHtml: string) => {
        html: string;
        hasChanged: boolean;
    };
}
interface CkEditorHtmlSupport {
    allow: CkEditorHtmlSupportAllowDisallow[];
    disallow: CkEditorHtmlSupportAllowDisallow[];
}
interface CkEditorHtmlSupportAllowDisallow {
    name: string | RegExp;
    styles: Record<string, true | string | RegExp> | Array<string> | true;
    classes: Array<String | RegExp> | true;
    attributes: Record<string, true | string | RegExp> | Array<string> | true;
}
export declare const CkEditorWrapper: ({ children, keyboardControlsDescription, implementation, valueHtml, onValueChange: ovcu, onFocusChange: ofcu, onReady: oru, editorHandle, toolbarItems, placeholder, fontFamilies, mention, fontSizes, htmlEmbed, htmlSupport, link, typing, onCharacterCountChange, onWordCountChange, ...props }: CkEditorWrapperProps, ref2?: Ref<any>) => import("preact-prop-helpers").JSX.Element;
export {};
//# sourceMappingURL=ck-editor-wrapper.d.ts.map