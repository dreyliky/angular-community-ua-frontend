import { MarkdownActionEnum } from '../enums';
import { MarkdownButton } from '../interfaces';

export class HeaderButtonClass implements MarkdownButton {
    public readonly actionType = MarkdownActionEnum.Header;
    public readonly matIconName = 'text_fields';

    public getMarkdown(context?: string): string {
        if (context) {
            return `# ${context?.trim()}`;
        }

        return '# ';
    }
}
