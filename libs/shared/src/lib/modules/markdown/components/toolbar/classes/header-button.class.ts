import { MarkdownButtonSyntax, MarkdownSyntaxSides } from '../interfaces';

export class HeaderButton implements MarkdownButtonSyntax {
    public readonly matIconName = 'text_fields';
    public readonly tooltipInfo = 'Заголовок';
    public readonly cursorPosition = 2;

    public readonly syntaxSides: MarkdownSyntaxSides = {
        left: '# ',
        right: ''
    };
}
