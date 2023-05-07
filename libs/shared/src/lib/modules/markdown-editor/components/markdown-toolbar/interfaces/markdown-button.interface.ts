import { MarkdownSyntaxSides } from './markdown-syntax-sides.interface';

export interface MarkdownButtonSyntax {
    readonly matIconName: string;
    readonly cursorPosition?: number;
    readonly tooltipInfo?: string;
    readonly syntaxSides: MarkdownSyntaxSides;
}
