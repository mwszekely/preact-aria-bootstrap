

import DOMPurify from 'dompurify';
import { memo } from 'preact/compat';


export const RichTextView = memo(function RichTextView({ valueHtml }: { valueHtml: string }) {
    const sanitized = DOMPurify.sanitize(valueHtml);

    return (
        <span className="rich-text-view" dangerouslySetInnerHTML={{ __html: sanitized }} />
    )

})