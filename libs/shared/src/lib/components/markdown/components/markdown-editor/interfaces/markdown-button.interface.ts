import { MarkdownActionEnum } from '../enums';
import { MarkdownIconNameType } from '../types';

export interface MarkdownButton {
    readonly actionType: MarkdownActionEnum;
    readonly matIconName: MarkdownIconNameType;
    getMarkdown(context?: string): string;
}
