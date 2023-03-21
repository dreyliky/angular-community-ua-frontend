import { MarkdownSyntaxEnum } from '../enums';
import { MarkdownButton } from '../interfaces/markdown-button.interface';

export class BoldButtonClass implements MarkdownButton {
    public readonly enumMember = MarkdownSyntaxEnum.Bold;
    public readonly matIconName = 'format_bold';
}
