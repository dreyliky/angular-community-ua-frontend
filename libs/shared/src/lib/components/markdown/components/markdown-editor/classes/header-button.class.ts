import { MarkdownActionEnum } from '../enums';
import { MarkdownButton } from '../interfaces';

export class HeaderButtonClass implements MarkdownButton {
    public readonly markdownSyntaxEnum = MarkdownActionEnum.Header;
    public readonly matIconName = 'text_fields';

    public getMarkdownSyntax(markdownText: string): string {
        const MARKDOWN_MAP = new Map<string, string>([
            [MarkdownActionEnum.Bold, `**${markdownText.trim()}**`],
            [MarkdownActionEnum.Italic, `_${markdownText.trim()}_`],
            [MarkdownActionEnum.Header, `# ${markdownText.trim()}`]
        ]);

        return MARKDOWN_MAP.get(this.markdownSyntaxEnum)!;
    }
}
