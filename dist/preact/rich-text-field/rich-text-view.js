import { jsx as _jsx } from "preact/jsx-runtime";
import createDOMPurify from 'dompurify';
import { memo } from 'preact/compat';
const DOMPurify = createDOMPurify(window);
export const RichTextView = memo(function RichTextView({ valueHtml }) {
    const sanitized = DOMPurify.sanitize(valueHtml);
    return (_jsx("span", { className: "rich-text-view", dangerouslySetInnerHTML: { __html: sanitized } }));
});
//# sourceMappingURL=rich-text-view.js.map