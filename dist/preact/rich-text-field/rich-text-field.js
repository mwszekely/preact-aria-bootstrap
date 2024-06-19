import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { identity } from "lodash-es";
import { ProgressWithHandler } from "preact-aria-widgets";
import { returnFalse, usePassiveState, useRef } from "preact-prop-helpers";
import { TextFieldSpinner, useCommitTextField } from "../text-field/index.js";
import { CkEditorWrapper } from "./ck-editor-wrapper.js";
import { useAutoAsyncHandler } from "../context.js";
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
export function RichTextField({ implementation, toolbarItems, onValueChange, valueHtml, ...props }) {
    return (_jsx(ProgressWithHandler, { ariaLabel: "Saving...", asyncHandler: useAutoAsyncHandler(onValueChange), capture: identity, tagProgressIndicator: "div", render: progressInfo => {
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
            return (_jsxs("div", { className: clsx("rich-text-field", pending && "pending"), children: [_jsx(TextFieldSpinner, { callCount: callCount, containerClass: "", invocationResult: invocationResult, debouncingAsync: debouncingAsync, debouncingSync: debouncingSync, pending: p, propsIndicator: propsProgressIndicator }), _jsx(CkEditorWrapper, { editorHandle: editorHandle, implementation: implementation ?? globalThis.CKEDITOR?.ClassicEditor ?? globalThis.ClassicEditor, toolbarItems: toolbarItems ?? RTFDefaultItems, onFocusChange: setFocused, onValueChange: value => {
                            syncHandler(value);
                        }, valueHtml: (pending ? currentCapture : valueHtml) || "", ...props, children: _jsx("textarea", {}) })] }));
        } }));
}
export function DocumentField({ implementation, toolbarItems, onValueChange, valueHtml, ...props }) {
    return (_jsx(ProgressWithHandler, { ariaLabel: "Saving...", asyncHandler: useAutoAsyncHandler(onValueChange), capture: identity, tagProgressIndicator: "div", render: progressInfo => {
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
            return (_jsxs("div", { className: clsx("document-field shadow-sm", pending && "pending"), children: [_jsx(TextFieldSpinner, { callCount: callCount, containerClass: "", invocationResult: invocationResult, debouncingAsync: debouncingAsync, debouncingSync: debouncingSync, pending: p, propsIndicator: propsProgressIndicator }), _jsx("div", { className: "document-field__toolbar shadow-sm" }), _jsx("div", { className: "document-field__editable-container", children: _jsx(CkEditorWrapper, { implementation: implementation ?? globalThis.CKEDITOR?.DecoupledEditor ?? globalThis.DecoupledEditor, toolbarItems: toolbarItems ?? DFDefaultItems, editorHandle: editorHandle, onFocusChange: setFocused, onValueChange: value => {
                                syncHandler(value);
                            }, valueHtml: (pending ? currentCapture : valueHtml) || "", onReady: editor => {
                                const toolbarContainer = document.querySelector('.document-field__toolbar');
                                toolbarContainer?.appendChild(editor.ui.view.toolbar.element);
                            }, ...props, children: _jsx("div", { className: "document-field__editable" }) }) })] }));
        } }));
}
function defaultToolbar() {
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
    ];
}
//# sourceMappingURL=rich-text-field.js.map