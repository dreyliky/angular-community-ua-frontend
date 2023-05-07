import { MarkdownButtonSyntax, MarkdownSyntaxSides } from '../interfaces';

export class BoldButton implements MarkdownButtonSyntax {
    public readonly matIconName = 'format_bold';
    public readonly tooltipInfo = 'Жирний текст';
    public readonly cursorPosition = 2;

    public readonly syntaxSides: MarkdownSyntaxSides = {
        left: '**',
        right: '**'
    };
}
