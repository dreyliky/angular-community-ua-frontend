import { MarkdownActionEnum } from '../enums';
import { MarkdownButton } from '../interfaces';

export class ItalicButtonClass implements MarkdownButton {
    public readonly actionType = MarkdownActionEnum.Italic;
    public readonly matIconName = 'format_italic';

    public getMarkdown(context?: string): string {
        if (context) {
            return `_${context?.trim()}_`;
        }

        return '__';
    }
}
