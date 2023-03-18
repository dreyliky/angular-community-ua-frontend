import { MarkdownSyntaxEnum } from '../enums';

export function getMarkdownSyntax(
    markdownType: MarkdownSyntaxEnum,
    text: string
): string {
    const newText = text.trim();

    const MARKDOWN_MAP = new Map<string, string>([
        [MarkdownSyntaxEnum.Bold, `**${newText}**`],
        [MarkdownSyntaxEnum.Italic, `_${newText}_`],
        [MarkdownSyntaxEnum.Header, `# ${newText}`]
    ]);

    return MARKDOWN_MAP.get(markdownType)!;
}
