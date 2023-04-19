import { MarkdownActionEnum } from '../enums';
import { MarkdownButton } from '../interfaces';

export class BoldButtonClass implements MarkdownButton {
    public readonly actionType = MarkdownActionEnum.Bold;
    public readonly matIconName = 'format_bold';

    public getMarkdown(context?: string): string {
        if (context) {
            return `**${context?.trim()}**`;
        }

        return '****';
    }
}
