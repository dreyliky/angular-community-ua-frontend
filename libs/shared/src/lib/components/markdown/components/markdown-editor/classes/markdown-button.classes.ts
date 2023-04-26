import { MarkdownSyntax, MarkdownSyntaxSides } from '../interfaces';

export class BoldMarkdownSyntax implements MarkdownSyntax {
    public readonly matIconName = 'format_bold';
    public readonly hasDoubleSide = true;
    public readonly position = 2;
    public readonly tooltipInfo = 'Add bold text';
    public getSyntaxSides(): MarkdownSyntaxSides {
        return {
            leftSide: '**',
            rightSide: '**'
        };
    }
}

export class ItalicMarkdownSyntax implements MarkdownSyntax {
    public readonly matIconName = 'format_italic';
    public readonly hasDoubleSide = true;
    public readonly position = 1;
    public readonly tooltipInfo = 'Add italic text';
    public getSyntaxSides(): MarkdownSyntaxSides {
        return {
            leftSide: '_',
            rightSide: '_'
        };
    }
}

export class HeaderMarkdownSyntax implements MarkdownSyntax {
    public readonly matIconName = 'text_fields';
    public readonly hasDoubleSide = false;
    public readonly tooltipInfo = 'Add heading text';
    public getSyntaxSides(): MarkdownSyntaxSides {
        return {
            leftSide: '# '
        };
    }
}
