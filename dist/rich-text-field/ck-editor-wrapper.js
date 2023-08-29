import { jsx as _jsx } from "preact/jsx-runtime";
import { useStableGetter } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
export const CkEditorWrapper = memo(forwardElementRef(function CkEditorWrapper({ children, keyboardControlsDescription, implementation, valueHtml, onValueChange: ovcu, onFocusChange: ofcu, onReady: oru, editorHandle, toolbarItems, placeholder, fontFamilies, mention, fontSizes, htmlEmbed, htmlSupport, link, typing, onCharacterCountChange, onWordCountChange, ...props }, ref2) {
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
    return (_jsx(KeyboardAssistIcon, { homeEnd: true, leftRight: true, upDown: true, pageKeys: true, textF10: true, typeahead: false, typeaheadActive: false, description: keyboardControlsDescription ?? "Control the editor:", children: _jsx("div", { class: "ck-editor-wrapper", children: useClonedElement(children, { ...props, ref: ref2 }, ref) }) }));
}));
//# sourceMappingURL=ck-editor-wrapper.js.map