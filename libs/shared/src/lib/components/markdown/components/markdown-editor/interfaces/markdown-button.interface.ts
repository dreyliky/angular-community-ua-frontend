import { MarkdownSyntaxEnum } from '../enums';
import { MarkdownIconNameType } from '../types';

export interface MarkdownButton {
    readonly markdownSyntaxEnum: MarkdownSyntaxEnum;
    readonly matIconName: MarkdownIconNameType;
    readonly getMarkdownSyntax: (markdownText: string) => string;
}
