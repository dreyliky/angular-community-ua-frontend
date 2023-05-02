import { MarkdownButtonSyntax, MarkdownSyntaxSides } from '../interfaces';

export class HeaderButton implements MarkdownButtonSyntax {
    public readonly matIconName = 'text_fields';
    public readonly tooltipInfo = 'Додати текст заголовка';
    public readonly cursorPosition = 2;
    public readonly syntaxSides: MarkdownSyntaxSides = {
        leftSide: '# ',
        rightSide: ''
    };
}
