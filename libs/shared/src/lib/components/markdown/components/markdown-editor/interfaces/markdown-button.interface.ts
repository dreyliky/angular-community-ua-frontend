import { MarkdownActionEnum } from '../enums';
import { MarkdownIconNameType } from '../types';

export interface MarkdownButton {
    readonly markdownSyntaxEnum: MarkdownActionEnum;
    readonly matIconName: MarkdownIconNameType;
    readonly getMarkdownSyntax: (markdownText: string) => string;
}
