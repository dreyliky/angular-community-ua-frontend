import { MarkdownIconNameType } from '../types';
import { MarkdownSyntaxSides } from './markdown-syntax-sides.interface';

export interface MarkdownSyntax {
    readonly matIconName: MarkdownIconNameType;
    readonly hasDoubleSide: boolean;
    readonly position?: number;
    readonly tooltipInfo?: string;
    getSyntaxSides(): MarkdownSyntaxSides;
}
