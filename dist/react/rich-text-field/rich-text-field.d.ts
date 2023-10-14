import { CkEditorWrapperProps } from "./ck-editor-wrapper.js";
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
export declare function RichTextField({ implementation, toolbarItems, onValueChange, valueHtml, ...props }: RichTextFieldProps): import("preact-prop-helpers").JSX.Element;
export declare function DocumentField({ implementation, toolbarItems, onValueChange, valueHtml, ...props }: RichTextFieldProps): import("preact-prop-helpers").JSX.Element;
//# sourceMappingURL=rich-text-field.d.ts.map