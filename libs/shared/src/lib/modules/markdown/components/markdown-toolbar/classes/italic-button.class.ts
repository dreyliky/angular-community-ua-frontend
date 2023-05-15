import { MarkdownButtonSyntax, MarkdownSyntaxSides } from '../interfaces';

export class ItalicButton implements MarkdownButtonSyntax {
    public readonly matIconName = 'format_italic';
    public readonly tooltipInfo = 'Текст курсивом';
    public readonly cursorPosition = 1;

    public readonly syntaxSides: MarkdownSyntaxSides = {
        left: '_',
        right: '_'
    };
}
