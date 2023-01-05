
import { memo } from 'preact/compat';
import { sanitize } from "dompurify";

export const RichTextView = memo(function RichTextView({ valueHtml }: { valueHtml: string }) {
    const sanitized = sanitize(valueHtml);

    return (
        <span class="rich-text-view" dangerouslySetInnerHTML={{ __html: sanitized }} />
    )

})