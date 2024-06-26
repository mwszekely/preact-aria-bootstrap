import { jsx as _jsx } from "preact/jsx-runtime";
import DOMPurify from 'dompurify';
import { memo } from 'preact/compat';
export const RichTextView = /* @__PURE__ */ memo(function RichTextView({ valueHtml }) {
    const sanitized = DOMPurify.sanitize(valueHtml);
    return (_jsx("span", { className: "rich-text-view", dangerouslySetInnerHTML: { __html: sanitized } }));
});
//# sourceMappingURL=rich-text-view.js.map