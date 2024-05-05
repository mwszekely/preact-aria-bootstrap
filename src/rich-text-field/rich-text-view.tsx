

import createDOMPurify from 'dompurify';
import { memo } from 'preact/compat';

const DOMPurify = createDOMPurify(window);

export const RichTextView = memo(function RichTextView({ valueHtml }: { valueHtml: string }) {
    const sanitized = DOMPurify.sanitize(valueHtml);

    return (
        <span className="rich-text-view" dangerouslySetInnerHTML={{ __html: sanitized }} />
    )

})