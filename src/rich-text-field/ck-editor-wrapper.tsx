import { Ref, VNode } from "preact";
import { useStableGetter } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { useClonedElement } from "../utility/use-cloned-element.js";

export type RichTextToolbarItems =
    '|' |
    '-' |
    'exportPDF' |
    'exportWord' |
    'findAndReplace' |
    'selectAll' |
    'heading' |
    'bold' |
    'italic' |
    'strikethrough' |
    'underline' |
    'code' |
    'subscript' |
    'superscript' |
    'removeFormat' |
    'bulletedList' |
    'numberedList' |
    'todoList' |
    'outdent' |
    'indent' |
    'undo' |
    'redo' |
    'fontSize' |
    'fontFamily' |
    'fontColor' |
    'fontBackgroundColor' |
    'highlight' |
    'alignment' | 'alignment:left' | 'alignment:right' | 'alignment:center' | 'alignment:justify' |
    'link' |
    'insertImage' |
    'blockQuote' |
    'insertTable' |
    'mediaEmbed' |
    'codeBlock' |
    'htmlEmbed' |
    'specialCharacters' | 'horizontalLine' | 'pageBreak' |
    'textPartLanguage' |
    'sourceEditing';

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
    fontSizes?: (number | string)[]

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

    children: VNode;

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
    }
}

interface CkEditorTextTransformationDescription {
    from: string | RegExp,
    to: string | (string | null)[] | ((matches: RegExpMatchArray) => (string | null)[])
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
    sanitizeHtml: (inputHtml: string) => { html: string, hasChanged: boolean; }
}

interface CkEditorHtmlSupport {
    allow: CkEditorHtmlSupportAllowDisallow[];
    disallow: CkEditorHtmlSupportAllowDisallow[];
}

interface CkEditorHtmlSupportAllowDisallow {
    // The element name to enable and/or extend with
    // the following styles, classes and other attributes.
    name: string | RegExp;

    // Styles to allow (by name, name and value or just all).
    styles: Record<string, true | string | RegExp> | Array<string> | true;

    // Classes to allow (by name or just all).
    classes: Array<String | RegExp> | true;

    // Other attributes to allow (by name, name and value or just all).
    attributes: Record<string, true | string | RegExp> | Array<string> | true;
}

export const CkEditorWrapper = memo(forwardElementRef(function CkEditorWrapper({ children, keyboardControlsDescription, implementation, valueHtml, onValueChange: ovcu, onFocusChange: ofcu, onReady: oru, editorHandle, toolbarItems, placeholder, fontFamilies, mention, fontSizes, htmlEmbed, htmlSupport, link, typing, onCharacterCountChange, onWordCountChange, ...props }: CkEditorWrapperProps, ref2?: Ref<any>) {

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

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {

        const editor = implementation.create(ref.current, getArgs()).then((editor: any) => {
            editor.model.document.on("change:data", (e: any) => {
                const newData = editor.getData();
                if (newData != getValueHtml()) {
                    getOnValueChange()(newData);
                }
            });
            editor.model.document.on("blur", (e: any) => { getOnFocusChange()(false); });
            editor.model.document.on("focus", (e: any) => { getOnFocusChange()(true); });

            if (typeof editorHandle == "function")
                editorHandle(editor);
            else if (editorHandle)
                editorHandle.current = editor;
            getOnReady()?.(editor);
            editor.setData(getValueHtml());
        }).catch((ex: any) => {
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
                    onUpdate: ((stats: any) => {
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
            }
        }
    }, []);
    // dangerouslySetInnerHTML={{__html: valueHtml}}
    return (
        <KeyboardAssistIcon 
        homeEnd={true} 
        leftRight={true} 
        upDown={true} 
        pageKeys={true} 
        textF10={true} 
        typeaheadStatus={null} 
        activateSpace={false}
        activateEnter={false}
        description={keyboardControlsDescription ?? "Control the editor:"}>
            <div class="ck-editor-wrapper">
                {useClonedElement(children, { ...props, ref: ref2 }, ref)}
            </div>
        </KeyboardAssistIcon>
    )
}))
