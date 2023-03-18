import { MarkdownSyntaxEnum } from '../enums';
import { MarkdownData } from '../interfaces';

export const MARKDOWN_DATA_ARRAY: MarkdownData[] = [
    {
        methodEnumMember: MarkdownSyntaxEnum.Bold,
        matIconName: 'format_bold'
    },
    {
        methodEnumMember: MarkdownSyntaxEnum.Italic,
        matIconName: 'format_italic'
    },
    {
        methodEnumMember: MarkdownSyntaxEnum.Header,
        matIconName: 'text_fields'
    }
];
