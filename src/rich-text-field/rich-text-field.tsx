import clsx from "clsx";
import identity from "lodash-es/identity";
import { ProgressWithHandler } from "preact-aria-widgets";
import { returnFalse, usePassiveState } from "preact-prop-helpers";
import { useRef } from "preact/hooks";
import { TextFieldSpinner, useCommitTextField } from "../text-field";
import { CkEditorWrapper, CkEditorWrapperProps, RichTextToolbarItems } from "./ck-editor-wrapper";

declare const CKEDITOR: {
    ClassicEditor: any;
    InlineEditor: any;
    BubbleEditor: any;
    DocumentEditor: any;
}

export interface RichTextFieldProps extends Omit<CkEditorWrapperProps, "onValueChange" | "onFocusChange" | "implementation" | "onReady" | "children" | "toolbarItems"> {
    /**
     * CKEditor, the Rich Text Editor used, is *very* particular about how its built and included on your page 
     * (in particular, it heavily assumes you're using Webpack, and kind of out of luck if not).
     * 
     * So however you get your CKEditor class, whether it's just including it from a CDN or compiling your own build from scratch,
     * you can pass it here to use it.
     * 
     * By default, this is `globalThis.CKEDITOR?.ClassicEditor ?? globalThis.ClassicEditor`
     */
    implementation?: any;

    onValueChange: (unsanitizedHtml: string) => (void | Promise<void>);

    toolbarItems?: CkEditorWrapperProps["toolbarItems"];
}

export interface DocumentFieldProps extends RichTextFieldProps {
    /**
     * CKEditor, the Rich Text Editor used, is *very* particular about how its built and included on your page 
     * (in particular, it heavily assumes you're using Webpack, and kind of out of luck if not).
     * 
     * So however you get your CKEditor class, whether it's just including it from a CDN or compiling your own build from scratch,
     * you can pass it here to use it.
     * 
     * By default, this is `globalThis.CKEDITOR?.ClassicEditor ?? globalThis.ClassicEditor`
     */
    implementation?: any;
}

const RTFDefaultItems: RichTextToolbarItems[] = ["undo", "redo", "|", "heading", "|", "bold", "italic", "underline", "strikethrough", "highlight", "|", "link", "code", "subscript", "superscript", "|", "removeFormat"];
const DFDefaultItems: RichTextToolbarItems[] = [
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

export function RichTextField({ implementation, toolbarItems, onValueChange, valueHtml, ...props }: RichTextFieldProps) {


    return (
        <ProgressWithHandler<string, string, HTMLSpanElement, HTMLLabelElement>
            ariaLabel={"Saving..."}
            asyncHandler={onValueChange}
            capture={identity}
            tagIndicator="div"
            render={progressInfo => {
                const [getFocused, setFocused] = usePassiveState(null, returnFalse);
                const { asyncHandlerReturn, propsIndicator, propsRegion } = progressInfo;
                const { pending: p, debouncingAsync, debouncingSync, currentCapture, syncHandler } = asyncHandlerReturn;

                const pending = (p || debouncingAsync || debouncingSync);
                useCommitTextField({
                    commit: (str) => {
                        if (editorHandle.current && str != null && str != editorHandle.current.getData()) {
                            debugger;
                            editorHandle.current.setData(str);
                        }
                    },
                    currentCapture,
                    getFocused,
                    showSpinner: pending,
                    value: valueHtml
                });

                const editorHandle = useRef<any>(null);

                return (

                    <div class={clsx("rich-text-field", pending && "pending")}>
                    <TextFieldSpinner containerClass="" debouncingAsync={debouncingAsync} debouncingSync={debouncingSync} pending={p} propsIndicator={propsIndicator} />
                        <CkEditorWrapper
                            editorHandle={editorHandle}
                            implementation={implementation ?? (globalThis as any).CKEDITOR?.ClassicEditor ?? (globalThis as any).ClassicEditor}
                            toolbarItems={toolbarItems ?? RTFDefaultItems}
                            onFocusChange={setFocused}
                            onValueChange={value => {
                                //if (value != valueHtml) {
                                    debugger;
                                    syncHandler(value);
                                //}
                            }}
                            valueHtml={(pending ? currentCapture : valueHtml) || ""}
                            {...props}
                        ><textarea /></CkEditorWrapper>
                    </div>
                );
            }}
        />
    );
}

export function DocumentField({ implementation, toolbarItems, onValueChange, valueHtml, ...props }: RichTextFieldProps) {
    return (
        <ProgressWithHandler<string, string, HTMLSpanElement, HTMLLabelElement>
            ariaLabel={"Saving..."}
            asyncHandler={onValueChange}
            capture={identity}
            tagIndicator="div"
            render={progressInfo => {
                const [getFocused, setFocused] = usePassiveState(null, returnFalse);
                const { asyncHandlerReturn, propsIndicator, propsRegion } = progressInfo;
                const { pending: p, debouncingAsync, debouncingSync, currentCapture, syncHandler } = asyncHandlerReturn;

                const pending = (p || debouncingAsync || debouncingSync);

                useCommitTextField({
                    commit: (str) => {
                        if (editorHandle.current && str != null && str != editorHandle.current.getData()) {
                            debugger;
                            editorHandle.current.setData(str);
                        }
                    },
                    currentCapture,
                    getFocused,
                    showSpinner: pending,
                    value: valueHtml
                });
                const editorHandle = useRef<any>(null);

                return (

                    <div class={clsx("document-field shadow-sm", pending && "pending")}>
                        <TextFieldSpinner containerClass="" debouncingAsync={debouncingAsync} debouncingSync={debouncingSync} pending={p} propsIndicator={propsIndicator} />
                        <div class="document-field__toolbar shadow-sm"></div>
                        <div class="document-field__editable-container">
                            <CkEditorWrapper
                                implementation={implementation ?? (globalThis as any).CKEDITOR?.DecoupledEditor ?? (globalThis as any).DecoupledEditor}
                                toolbarItems={toolbarItems ?? DFDefaultItems}
                                editorHandle={editorHandle}
                                onFocusChange={setFocused}
                                onValueChange={value => {
                                    //if (value != valueHtml) {
                                        debugger;
                                        syncHandler(value);
                                    //}
                                }}
                                valueHtml={(pending ? currentCapture : valueHtml) || ""}
                                onReady={editor => {
                                    const toolbarContainer = document.querySelector('.document-field__toolbar');
                                    toolbarContainer?.appendChild(editor.ui.view.toolbar.element);
                                }}
                                {...props}
                            >
                                <div class="document-field__editable" />
                            </CkEditorWrapper>
                        </div>
                    </div>
                );
            }}
        />
    )
}


function defaultToolbar(): RichTextToolbarItems[] {

    // Simple 1
    //return ["undo", "redo", "|", "heading", "|", "bold", "italic", "underline", "strikethrough", "highlight", "|", "link", "code", "subscript", "superscript", "|", "removeFormat"];

    // Simple 2
    return [
        "undo", "redo", "|",
        "heading", "|",
        "bold", "italic", "underline", "strikethrough", "highlight", "|",
        "link", "code", "subscript", "superscript", "|",
        "alignment", "fontColor", "fontBackgroundColor", "|",
        "todoList", "bulletedList", "numberedList", "outdent", "indent", "|",
        "removeFormat"
    ];

    // Fullest-featurest toolbar
    return [
        "undo", "redo", "|",
        "heading", "|",
        "fontFamily", "fontSize", "|",
        "bold", "italic", "underline", "strikethrough", "highlight", "|",
        "link", "code", "subscript", "superscript", "|",
        "alignment", "fontColor", "fontBackgroundColor", "|",
        "todoList", "bulletedList", "numberedList", "outdent", "indent", "|",
        'removeFormat', "-",
        "findAndReplace", "selectAll", "|",
        "blockQuote", "insertTable", "codeBlock", "insertImage", "mediaEmbed", 'htmlEmbed', "horizontalLine", "specialCharacters", "pageBreak", "|",
        "textPartLanguage", "|",
        "sourceEditing"
    ]
}
