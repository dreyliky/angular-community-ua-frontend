import { MarkdownButtonSyntax, MarkdownSyntaxSides } from '../interfaces';

export class BoldButton implements MarkdownButtonSyntax {
    public readonly matIconName = 'format_bold';
    public readonly cursorPosition = 2;
    public readonly tooltipInfo = 'Додати жирний текст';
    public readonly syntaxSides: MarkdownSyntaxSides = {
        leftSide: '**',
        rightSide: '**'
    };
}
