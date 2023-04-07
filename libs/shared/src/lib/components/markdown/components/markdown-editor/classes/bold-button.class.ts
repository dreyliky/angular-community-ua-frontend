import { MarkdownSyntaxEnum } from '../enums';
import { MarkdownButton } from '../interfaces/markdown-button.interface';

export class BoldButtonClass implements MarkdownButton {
    public readonly markdownSyntaxEnum = MarkdownSyntaxEnum.Bold;
    public readonly matIconName = 'format_italic';

    public getMarkdownSyntax(markdownText: string): string {
        const trimmedMarkdownText = markdownText.trim();

        const MARKDOWN_MAP = new Map<string, string>([
            [MarkdownSyntaxEnum.Bold, `**${trimmedMarkdownText}**`],
            [MarkdownSyntaxEnum.Italic, `_${trimmedMarkdownText}_`],
            [MarkdownSyntaxEnum.Header, `# ${trimmedMarkdownText}`]
        ]);

        return MARKDOWN_MAP.get(this.markdownSyntaxEnum)!;
    }
}
